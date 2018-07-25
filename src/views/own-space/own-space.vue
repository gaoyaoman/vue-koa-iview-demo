<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form
                    ref="userForm"
                    :model="userForm"
                    :label-width="100"
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="姓名：" prop="name">
                        <span>{{ userForm.name }}</span>
                    </FormItem>
                    <FormItem label="手机：" prop="tel" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.tel" ref="tel" @on-keydown="hasChangePhone"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="学号/工号：" prop="id">
                        <span>{{userForm.id}}</span>
                    </FormItem>
                    <FormItem label="学院：" prop="college">
                        <span>{{ userForm.college }}</span>
                    </FormItem>
                    <FormItem label="专业：" prop="major">
                        <span>{{ userForm.major }}</span>
                    </FormItem>
                    <FormItem label="登录密码：">
                        <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                    <div>
                        <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import jwt from 'jsonwebtoken';
    import Cookies from 'js-cookie';
    export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                name: '',
                id:'',
                tel: '',
                college: '',
                major: ''
            },
            formTel:{
                id:'',
                tel:''
            },
            form:{
                id:''
            },
            url:'',
            uid: '', // 登录用户的userId
            securityCode: '', // 验证码
            phoneHasChanged: false, // 是否编辑了手机
            save_loading: false,
            identifyError: '', // 验证码错误
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false, // 验证码是否正确
            hasGetIdentifyCode: false, // 是否点了获取验证码
            canGetIdentifyCode: false, // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inforValidate: {
                tell: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ]
            },
            editPasswordForm: {
                user_id:'',
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码' // “获取验证码”按钮的文字
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.save_loading=true;
                    this.formTel.id=this.form.id;
                    this.formTel.tel=this.userForm.tel;
                    if(parseInt(Cookies.get('access'))===1){
                        this.url='http://localhost:9090/auth/teacher/updateTel';
                    }
                    if(parseInt(Cookies.get('access'))===2){
                        this.url='http://localhost:9090/auth/student/updateTel';
                    }
                    this.$http.post(this.url, this.formTel)
                        .then((res) => {
                            if (res.data.success) {
                                this.$Message.success(res.data.info);
                                this.save_loading = false;
                            } else {
                                this.$Message.error(res.data.info);
                                this.save_loading = false;
                            }
                        }, (err) => {
                            this.$message.error('请求错误！');
                        });
                }
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
            this.editPasswordForm={
                user_id:'',
                oldPass: '',
                newPass: '',
                rePass: ''
            }
            this.savePassLoading = false;
        },
        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.savePassLoading = true;
                    // you can write ajax request here
                    this.editPasswordForm.user_id=this.form.id;
                    this.$http.post('http://localhost:9090/auth/users/updatePass', this.editPasswordForm)
                        .then((res) => {
                            if (res.data.success) {
                                this.$Message.success(res.data.info);
                                this.savePassLoading = false;
                                this.$Message.success("密码已修改，请重新登录。");
                                this.editPasswordModal = false;
                                localStorage.removeItem('demo-token');
                                Cookies.remove('user');
                                this.$router.push({
                                    name: 'login'
                                });
                            } else {
                                this.$Message.error(res.data.info);
                                this.savePassLoading = false;
                            }
                        }, (err) => {
                            this.$message.error('请求错误！');
                        });
                }
            });
        },
        init () {
            this.form.id=this.getUserInfo().id;
            let access = Cookies.get('access');
            console.log(access);
            if(access==1){
              this.$http.post('http://localhost:9090/auth/teacher', this.form)
                .then((res) => {
                  if (res.data.success) {
                    console.log(res.data.success);
                    this.userForm.id=this.form.id;
                    this.userForm.name = res.data.data.tea_name;
                    this.userForm.tel = res.data.data.tea_tel;
                    this.userForm.college = res.data.data.tea_college;
                    this.userForm.major = res.data.data.tea_major;
                    this.initPhone = '';
                  } else {
                    console.log(res)
                    this.$Message.error(res.data.info);
                  }
                }, (err) => {
                  this.$message.error('请求错误！');
                });
            }
            if(access==2){
              this.$http.post('http://localhost:9090/auth/student', this.form)
                .then((res) => {
                  if (res.data.success) {
                    this.userForm.id=this.form.id;
                    this.userForm.name = res.data.data.stu_name;
                    this.userForm.tel = res.data.data.stu_tel;
                    this.userForm.college = res.data.data.stu_college;
                    this.userForm.major = res.data.data.stu_major;
                    this.initPhone = '';
                  } else {
                    console.log(res)
                    this.$Message.error(res.data.info);
                  }
                }, (err) => {
                  this.$message.error('请求错误！');
                });
            }

        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
        saveInfoAjax () {
            this.save_loading = true;
            setTimeout(() => {
                this.$Message.success('保存成功');
                this.save_loading = false;
            }, 1000);
        },
        getUserInfo() { // 获取用户信息
            const token = localStorage.getItem('demo-token');
            if (token != null && token != 'null') {
                const decode = jwt.verify(token, 'vue-koa-demo'); // 解析token
                return decode
            } else {
                return null
            }
        },
    }
};
</script>
