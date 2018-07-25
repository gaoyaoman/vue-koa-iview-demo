<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="loginToDo">
        <div class="logo"></div>
        <Carousel
                v-model="value3"
                :autoplay="setting.autoplay"
                :autoplay-speed="setting.autoplaySpeed"
                :dots="setting.dots"
                :radius-dot="setting.radiusDot"
                :trigger="setting.trigger"
                :arrow="setting.arrow">
            <CarouselItem>
                <div class="carousel cal1"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="carousel cal4"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="carousel cal1"></div>
            </CarouselItem>
            <CarouselItem>
                <div class="carousel cal4"></div>
            </CarouselItem>
        </Carousel>
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登陆
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="user_id">
                            <i-input v-model="form.user_id" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </i-input>
                        </FormItem>
                        <FormItem prop="password">
                            <i-input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </i-input>
                        </FormItem>
                        <FormItem>
                            <Button @click="loginToDo" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
export default {
    data () {
        return {
            form: {
                user_id: '',
                password: ''
            },
            rules: {
                user_id: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            value3: 3,
            setting: {
                autoplay: true,
                autoplaySpeed: 4000,
                dots: 'none',
                trigger: 'click',
                arrow: 'hover'
            }
        };
    },
    methods: {
        getUserInfo() { // 获取用户信息
            const token = localStorage.getItem('demo-token');
            if (token != null && token != 'null') {
                const decode = jwt.verify(token, 'vue-koa-demo'); // 解析token
                return decode
            } else {
                return null
            }
        },
        loginToDo () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                this.$http.post('http://localhost:9090/auth/users', this.form)
                    .then((res) => {
                        if (res.data.success) {
                            Cookies.set('user', this.form.user_id);
                            // Cookies.set('password', this.form.password);
                             this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                            // if (this.form.userName === 'admin') {
                            //     Cookies.set('access', 0);
                            // } else {
                            //     Cookies.set('access', 1);
                            // }
                            localStorage.setItem('demo-token', res.data.token); // localStorage 存储 token
                            let role=this.getUserInfo().role;
                            Cookies.set('access', parseInt(role));
                            this.$router.push({
                                name: 'home_index'
                            });
                            this.$Message.success(res.data.info);
                        } else {
                            localStorage.removeItem('demo-token'); // 删除 token
                            this.$Message.error(res.data.info);
                        }
                    }, (err) => {
                        localStorage.removeItem('demo-token'); // 删除 token
                        this.$message.error('请求错误！');
                    });
                }
            });

        }
    }
};
</script>

<style scoped>
    .logo{
        width: 300px;
        height: 80px;
        background-size: 100% 100%;
        background-image: url("../images/logo.png");
        position: absolute;
        top: 15px;
        left: 30px;
        z-index: 300;
    }
    .carousel{
        width: calc(100vw);
        height: calc(100vh);
        background-size: cover;
        background-position: center;
    }
    .cal1{
        background-image: url('../images/cal1.jpg');
    }
    .cal2{
        background-image: url('../images/cal2.jpg');
    }
    .cal3{
        background-image: url('../images/cal3.jpg');
    }
    .cal4{
        background-image: url('../images/cal4.jpg');
    }
</style>
