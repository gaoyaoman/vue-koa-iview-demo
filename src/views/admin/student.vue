<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../tables/components/table.less';
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Card>
        <h4 slot="title">
          <Icon type="android-archive"></Icon>
          在校学生信息管理
        </h4>
        <Row span="1">
          <Button type="primary" @click="addBtn">
            <Icon type="plus"></Icon>
            新增学生信息
          </Button>
          <Button type="primary" @click="searchBtn">
            <Icon type="ios-search"></Icon>
            查询
          </Button>
          <Modal v-model="addModal" width="600px" :closable="closeable" :mask-closable="maskCloseable">
            <p slot="header" style="text-align:center">
              <Icon type="plus"></Icon>
              <span>新增学生信息</span>
            </p>
            <div>
              <Form ref="formValidate" :model="addForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="学号" prop="stu_id">
                  <Input v-model="addForm.stu_id" placeholder="学号"></Input>
                </FormItem>
                <FormItem label="姓名" prop="stu_name">
                  <Input v-model="addForm.stu_name" placeholder="学生姓名"></Input>
                </FormItem>
                <FormItem label="性别" prop="stu_gender">
                  <RadioGroup v-model="addForm.stu_gender">
                    <Radio label="男" >男</Radio>
                    <Radio label="女">女</Radio>
                  </RadioGroup>
                </FormItem>
                <!--<FormItem label="出生日期" prop="birth">-->
                  <!--<DatePicker v-model="this.birth" format="yyyy-MM-dd" :type="date" placeholder="选择出生日期" style="width: 300px" @on-change="getBirth"></DatePicker>-->
                <!--</FormItem>-->
                <FormItem label="联系方式" prop="stu_tel">
                  <Input v-model="addForm.stu_tel" placeholder="联系方式"></Input>
                </FormItem>
                <FormItem label="住址" prop="stu_address">
                  <Input v-model="addForm.stu_address" placeholder="住址"></Input>
                </FormItem>
                <FormItem label="学院" prop="stu_college">
                  <Input v-model="addForm.stu_college" placeholder="学院"></Input>
                </FormItem>
                <FormItem label="专业" prop="stu_major">
                  <Input v-model="addForm.stu_major" placeholder="专业"></Input>
                </FormItem>
                <FormItem label="年级" prop="stu_grade">
                  <InputNumber v-model="addForm.stu_grade" :editable="editable" :min="min" :max="max"></InputNumber>
                </FormItem>
                <FormItem label="班级" prop="stu_class">
                  <Input v-model="addForm.stu_class" placeholder="班级"></Input>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="addStudent('formValidate')">添加</Button>
              <Button @click="cancelInput('formValidate')">取消</Button>
            </div>
          </Modal>
          <Modal v-model="updateModal" width="600px" :closable="closeable1" :mask-closable="maskCloseable1">
            <p slot="header" style="text-align:center">
              <Icon type="edit"></Icon>
              <span>修改学生信息</span>
            </p>
            <div>
              <Form ref="formValidate1" :model="updateForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="学号" prop="stu_id">
                  <Input disabled v-model="updateForm.stu_id" placeholder="学号"></Input>
                </FormItem>
                <FormItem  label="姓名" prop="stu_name">
                  <Input disabled v-model="updateForm.stu_name" placeholder="学生姓名"></Input>
                </FormItem>
                <FormItem label="性别" prop="stu_gender">
                  <RadioGroup v-model="updateForm.stu_gender">
                    <Radio label="男" >男</Radio>
                    <Radio label="女">女</Radio>
                  </RadioGroup>
                </FormItem>
                <!--<FormItem label="出生日期" prop="birth">-->
                <!--<DatePicker v-model="this.birth" format="yyyy-MM-dd" :type="date" placeholder="选择出生日期" style="width: 300px" @on-change="getBirth"></DatePicker>-->
                <!--</FormItem>-->
                <FormItem label="联系方式" prop="stu_tel">
                  <Input v-model="updateForm.stu_tel" placeholder="联系方式"></Input>
                </FormItem>
                <FormItem label="住址" prop="stu_address">
                  <Input v-model="updateForm.stu_address" placeholder="住址"></Input>
                </FormItem>
                <FormItem label="学院" prop="stu_college">
                  <Input v-model="updateForm.stu_college" placeholder="学院"></Input>
                </FormItem>
                <FormItem label="专业" prop="stu_major">
                  <Input v-model="updateForm.stu_major" placeholder="专业"></Input>
                </FormItem>
                <FormItem label="年级" prop="stu_grade">
                  <InputNumber v-model="updateForm.stu_grade" :editable="editable" :min="min" :max="max"></InputNumber>
                </FormItem>
                <FormItem label="班级" prop="stu_class">
                  <Input v-model="updateForm.stu_class" placeholder="班级"></Input>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="updateStudent('formValidate1')">更新</Button>
              <Button @click="cancelInput">取消</Button>
            </div>
          </Modal>
        </Row>
        <Row class="margin-top-20">
          <Col span="24">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
            <Page class="margin-top-20" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
          </Col>
          <!--<Col span='4' class="padding-left-10">-->
            <!--<div class="margin-top-10 margin-left-10">-->
              <!--<span>输入导出的文件名：</span>-->
              <!--<Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />-->
            <!--</div>-->
            <!--<div class="margin-left-10 margin-top-20">-->
              <!--<a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>-->
              <!--<Button type="primary" size="large" @click="exportExcel">下载表格数据</Button>-->
            <!--</div>-->
          <!--</Col>-->
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import table2excel from '@/libs/table2excel.js';
  // import Cookies from 'js-cookie';
  export default {
    name: 'student_manage',
    data () {
      const validePhone = (rule, value, callback) => {
        var re = /^1[0-9]{10}$/;
        if (!re.test(value)) {
          callback(new Error('请输入正确格式的手机号'));
        } else {
          callback();
        }
      };
      return {
        excelColumns: [
          {
            title: '学号',
            key: 'stu_id',
            width:100
          },
          {
            title: '姓名',
            key: 'stu_name',
            width:100
          },
          {
            title: '性别',
            key: 'stu_gender',
            width:62,
            align:'center'
          },
          {
            title: '学院',
            key: 'stu_college',
            width:200
          },
          {
            title: '专业',
            key: 'stu_major',
            width:200
          },
          {
            title: '年级',
            key: 'stu_grade',
            width:62,
            align:'center'
          },
          {
            title: '班级',
            key: 'stu_class',
            width:100,
            align:'center'
          },
          // {
          //   title: '出生日期',
          //   key: 'stu_birth',
          //   width:100
          // },
          {
            title: '联系方式',
            key: 'stu_tel',
            width:120
          },
          {
            title: '家庭住址',
            key: 'action1',
            width:150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showAddress(params.index)
                    }
                  }
                }, '详细信息')
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
            width:150,
            fixed:'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.updateForm=this.table2excelData[params.index];
                      this.updateModal=true;
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delStudent(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        table2excelData: [],
        border:true,
        size:'large',
        excelFileName: '',
        tableExcel: {},
        fontSize: 16,
        total:0,
        pageSize:20,
        currentPage:1,
        addModal:false,
        updateModal:false,
        closeable:false,
        closeable1:false,
        maskCloseable:false,
        maskCloseable1:false,
        date:'date',
        birth:'',
        editable:false,
        max:4,
        min:1,
        updateForm:{},
        form:{  //request
          pageSize:20,
          currentPage:1
        },
        addForm:{
          stu_id:'',
          stu_name:'',
          stu_gender:'',
          stu_birth:'',
          stu_grade:null,
          stu_class:'',
          stu_address:'',
          stu_tel:'',
          stu_college:'',
          stu_major:''
        },
        ruleValidate: {
          stu_id: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          stu_name: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' }
          ],
          stu_gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          stu_class: [
            { required: true, message: '请输入班级', trigger: 'blur' }
          ],
          stu_grade: [
            { required: true, type:'number', message: '请选择年级', trigger: 'change' }
          ],
          stu_college: [
            { required: true, message: '请输入学院', trigger: 'blur' }
          ],
          stu_address: [
            { required: true, message: '请输入住址', trigger: 'blur' }
          ],
          stu_major: [
            { required: true, message: '请输入专业', trigger: 'blur' }
          ],
          // birth: [
          //   { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          // ],
          stu_tel: [
            { validator:validePhone,required: true, trigger: 'blur' }
          ],
        }
      };
    },
    mounted() {
      this.request();
    },
    methods: {
      request(){
        this.$http.post('http://localhost:9090/auth/student/list', this.form)
          .then((res) => {
            if (res.data.success) {
              this.table2excelData=res.data.list;
              this.total=res.data.total;
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      },
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      showAddress(index) {
        this.$Modal.info({
          title: '家庭住址',
          content: `${this.table2excelData[index].stu_address}`
        })
      },
      onchangePage(val){
        this.currentPage=val;
        this.form.currentPage=val;
        this.request();
      },
      //delete a student
      delStudent(index){
        if(confirm('确定是否删除？')){
          let delForm={
            stu_id:this.table2excelData[index].stu_id
          }
          this.$http.post('http://localhost:9090/auth/student/delStudent', delForm)
            .then((res) => {
              if (res.data.success) {
                this.$Message.success(res.data.info);
                this.table2excelData.splice(index,1);
              } else {
                this.$Message.error(res.data.info);
              }
            }, (err) => {
              this.$message.error('请求错误！');
            });
        }
      },
      //add a student information
      addBtn(){
        this.addModal=true;
      },
      addStudent(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:9090/auth/student/add', this.addForm)
              .then((res) => {
                if (res.data.success) {
                  this.$Message.success(res.data.info);
                  this.cancelInput();
                } else {
                  this.$Message.error(res.data.info);
                }
              }, (err) => {
                this.$message.error('请求错误！');
              });
          }else{

          }
        })
      },
      cancelInput(name){
        this.addModal=false;
        this.updateModal=false;
        this.updateForm={};
        this.addForm={
          stu_id:'',
          stu_name:'',
          stu_gender:'',
          stu_birth:'',
          stu_grade:null,
          stu_class:'',
          stu_address:'',
          stu_tel:'',
          stu_college:'',
          stu_major:''
        };
        this.birth='';
        // this.$refs[name].resetFields();
      },
      //search
      searchBtn(){
        this.request();
      },
      // change birth
      getBirth(t,p){
        this.addForm.stu_birth=t;
        console.log(this.addForm.stu_birth)
      },
      // update student's information
      updateStudent(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:9090/auth/student/update', this.updateForm)
              .then((res) => {
                if (res.data.success) {
                  this.$Message.success(res.data.info);
                  this.cancelInput();
                } else {
                  this.$Message.error(res.data.info);
                }
              }, (err) => {
                this.$message.error('请求错误！');
              });
          }else{}
        })
      },
    }
  };
</script>
<style scoped>

</style>
