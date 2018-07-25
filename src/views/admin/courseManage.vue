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
          学校课程管理
        </h4>
        <Row span="1">
          <Col span="8">
            <Cascader :data="collegeAndMajor" trigger="hover" class="margin-right-10" @on-change="select" :value="v1"></Cascader>
          </Col>
          <Col span="16">
            <Button type="primary" @click="searchBtn">
              <Icon type="ios-search"></Icon>
              查询
            </Button>
            <Button type="primary" @click="addBtn">
              <Icon type="plus"></Icon>
              新增课程信息
            </Button>
          </Col>
          <Modal v-model="addModal" width="600px" :closable="closeable" :mask-closable="maskCloseable">
            <p slot="header" style="text-align:center">
              <Icon type="plus"></Icon>
              <span>新增课程信息</span>
            </p>
            <div>
              <Form ref="formValidate" :model="addForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="课程编号" prop="cor_id">
                  <Input v-model="addForm.cor_id" placeholder="课程编号"></Input>
                </FormItem>
                <FormItem label="课程名称" prop="cor_name">
                  <Input v-model="addForm.cor_name" placeholder="课程名称"></Input>
                </FormItem>
                <FormItem label="学时" prop="cor_hour">
                  <Input v-model="addForm.cor_hour" placeholder="学时"></Input>
                </FormItem>
                <FormItem label="学分" prop="cor_score">
                  <Input v-model="addForm.cor_score" placeholder="学分"></Input>
                </FormItem>
                <FormItem label="学院专业" prop="cor_">
                  <Cascader :data="collegeAndMajor" trigger="hover" @on-change="select1"></Cascader>
                </FormItem>
                <FormItem label="年级" prop="cor_grade">
                  <InputNumber v-model="addForm.cor_grade" :editable="editable" :min="min" :max="max"></InputNumber>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="addCourse('formValidate')">添加</Button>
              <Button @click="cancelInput">取消</Button>
            </div>
          </Modal>
        </Row>
        <Row class="margin-top-10">
          <Col span="23" class="margin-top-10">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
            <Page class="margin-top-20" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import table2excel from '@/libs/table2excel.js';
  // import Cookies from 'js-cookie';
  export default {
    name: 'teacher_manage',
    data () {
      return {
        excelColumns: [
          {
            title: '课程编号',
            key: 'cor_id',
            width:120
          },
          {
            title: '课程名称',
            key: 'cor_name',
            width:200
          },
          {
            title: '学时',
            key: 'cor_hour',
            width:64,
            align:'center'
          },
          {
            title: '学分',
            key: 'cor_score',
            width:64
          },
          {
            title: '年级',
            key: 'cor_grade',
            width:64
          },
          {
            title: '学院',
            key: 'cor_college',
            width:200
          },
          {
            title: '专业',
            key: 'cor_major',
            width:200
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', [
                  h('Poptip', {
                    props: {
                      confirm:true,
                      title:'是否删除？',
                      placement:'right',
                      okText:'删除',
                      cancelText:'取消'
                    },
                    on: {
                      'on-ok':()=>{
                        this.delete(params.index);
                      },
                      'on-cancel':()=>{}
                    }
                  }, '删除')
                ])
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
        editable:false,
        max:4,
        min:1,
        v1:[],
        v2:[],
        search:{
          college:'',
          major:''
        },
        form:{  //request
          cor_college:'',
          cor_major:'',
          pageSize:20,
          currentPage:1
        },
        addForm:{
          cor_id:'',
          cor_name:'',
          cor_college:'',
          cor_major:'',
          cor_hour:'',
          cor_score:'',
          cor_grade:null
        },
        collegeAndMajor:[{
          value: '计算机工程学院',
          label: '计算机工程学院',
          children: [
            {
              value: '软件工程',
              label: '软件工程'
            },
            {
              value: '计算机科学与技术',
              label: '计算机科学与技术'
            },
            {
              value: '网络工程',
              label: '网络工程'
            }
          ]
        }],
        ruleValidate: {
          cor_id: [
            { required: true, message: '请输入课程编号', trigger: 'blur' }
          ],
          cor_name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ],
          cor_hour: [
            { required: true, message: '请输入学时', trigger: 'blur' }
          ],
          cor_score: [
            { required: true, message: '请输入学分', trigger: 'blur' }
          ],
          cor_grade: [
            { required: true, type:'number', message: '请选择年级', trigger: 'change' }
          ],
        }
      };
    },
    mounted() {
      this.request();
    },
    methods: {
      request(){
        this.$http.post('http://localhost:9090/auth/course/search', this.form)
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
      //search
      searchBtn(){
        this.form.cor_college=this.search.college;
        this.form.cor_major=this.search.major;
        this.request();
      },
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      onchangePage(val){
        this.currentPage=val;
        this.form.currentPage=val;
        this.form.cor_college=this.search.college;
        this.form.cor_major=this.search.major;
        this.request();
      },
      //add a teacher information
      addBtn(){
        this.addModal=true;
      },
      add(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.updateForm.tea_gender=parseInt(this.updateForm.tea_gender);

            this.$http.post('http://localhost:9090/auth/course/add', this.addForm)
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
          }
        })
      },
      cancelInput(){
        this.addModal=false;
        this.addForm={
          cor_id:'',
          cor_name:'',
          cor_college:'',
          cor_major:'',
          cor_hour:'',
          cor_score:'',
          cor_grade:null
        };
        this.v2=[];
      },
      select(q,w){
        if(w.length){
          this.search.college=w[0].value;
          this.search.major=w[1].value;
        }else{
          this.search.college='';
          this.search.major='';
        }
      },
      select1(q,w){
        if(w.length){
          this.addForm.cor_college=w[0].value;
          this.addForm.cor_major=w[1].value;
        }
      },
      //delete
      delete(index){
        let form={
          cor_id:this.table2excelData[index].cor_id
        }
        this.$http.post('http://localhost:9090/auth/course/del', form)
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
      },
      addCourse(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:9090/auth/course/add', this.addForm)
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
          }
        })
      }
    }
  };
</script>
<style scoped>

</style>
