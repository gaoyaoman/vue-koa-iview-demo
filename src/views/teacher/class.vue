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
          教师带班信息
        </h4>
        <Row>
          <Col span="16" class="margin-top-10">
            <Table :size="size" border="border" :columns="excelColumns1" :data="tableexcelData" size="small" ref="tableExcel"></Table>
            <Page class="margin-top-20" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
          </Col>
          <Col span="8" class="margin-top-10 padding-left-10">
            <div class="margin-top-10 margin-left-10">
            <span>输入导出的文件名：</span>
            <Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />
            </div>
            <div class="margin-left-10 margin-top-20">
            <a id="hrefToExportTable" style="position: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
            <Button type="primary" size="large" @click="exportExcel">下载学生表格数据</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Row>
    <Row class="margin-top-10">
      <Card>
        <h4 slot="title">
          <Icon type="android-archive"></Icon>
          班级学生
        </h4>
        <Row class="margin-top-10">
          <Col span="24" class="margin-top-10">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel1"></Table>
            <Page class="margin-top-20" :total="total1" :current="currentPage1" :page-size="pageSize" @on-change="onchangePage1"></Page>
          </Col>
          <!--<Col span='4' class="padding-left-10">-->

          <!--</Col>-->
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import table2excel from '@/libs/table2excel.js';
  import Cookies from 'js-cookie';
  export default {
    name: 'class',
    data () {
      return {
        excelColumns: [
          {
            title: '学号',
            key: 'stu_id',
            width:100,
            fixed:'left',
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
          {
            title: '联系方式',
            key: 'stu_tel',
            width:120
          },
          {
            title: '家庭住址',
            key: 'stu_address',
            width:400
          }
        ],
        excelColumns1:[
          {
            title: '班级',
            key: 'cls_name',
          },
          {
            title: '分院',
            key: 'cls_college',
          },
          {
            title: '专业',
            key: 'cls_major',
          },
          {
            title: '操作',
            key: 'action1',
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
                      this.search(params.index);
                    }
                  }
                }, '查询')
              ]);
            }
          },
        ],
        tableexcelData: [],
        table2excelData: [],
        border:true,
        size:'large',
        excelFileName: '',
        tableExcel: {},
        fontSize: 16,
        total:0,
        total1:0,
        pageSize:20,
        currentPage:1,
        currentPage1:1,
        addModal:false,
        updateModal:false,
        closeable:false,
        closeable1:false,
        maskCloseable:false,
        maskCloseable1:false,
        form:{  //request
          pageSize:20,
          currentPage:1,
        },
        form1:{  //request
          pageSize:20,
          currentPage:1,
          stu_class:''
        },
        teaForm:{
          tea_id:'',
          pageSize:20,
          currentPage:1
        },
      };
    },
    mounted() {

      this.request();
    },
    methods: {
      request(){
        this.teaForm.tea_id=Cookies.get('user');
        this.$http.post('http://localhost:9090/auth/class/search', this.teaForm)
          .then((res) => {
            if (res.data.success) {
              this.tableexcelData=res.data.list;
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
        this.request();
      },
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel1, 'hrefToExportTable', this.excelFileName);
      },
      onchangePage(val){
        this.currentPage=val;
        this.form.currentPage=val;
        this.request();
      },
      onchangePage1(val){
        this.currentPage1=val;
        this.form1.currentPage=val;
        this.request1();
      },
      request1(){
        this.$http.post('http://localhost:9090/auth/student/getStudentsByCls', this.form1)
          .then((res) => {
            if (res.data.success) {
              this.table2excelData=res.data.list;
              this.total1=res.data.total;
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      },
      search(index){
        this.form1.stu_class=this.tableexcelData[index].cls_name;
        this.request1();
      }
    }
  };
</script>
<style scoped>

</style>
