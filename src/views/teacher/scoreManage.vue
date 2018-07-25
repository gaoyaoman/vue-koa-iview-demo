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
          任课班级
        </h4>
        <Row>
          <Col span="8" class="margin-top-10 padding-left-10">
            <Select v-model="term" style="width:300px">
              <Option v-for="item in calendar" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button type="primary" icon="ios-search" @click="search">查询</Button>
          </Col>
          <Col span="16" class="margin-top-10">
            <Table :size="size" border="border" :columns="excelColumns1" :data="tableexcelData" size="small" ref="tableExcel"></Table>
            <Page class="margin-top-20" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
          </Col>
        </Row>
      </Card>
    </Row>
    <Row class="margin-top-10">
      <Card>
        <h4 slot="title">
          <Icon type="android-archive"></Icon>
          录入成绩
        </h4>
        <Row class="margin-top-10">
          <Col span="24" class="margin-top-10">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel1"></Table>
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
    name: 'scoreManage',
    data () {
      return {
        excelColumns: [
          {
            title: '学号',
            key: 'sco_stu_id',
          },
          {
            title: '姓名',
            key: 'sco_stu_name',
          },
          {
            title: '学院',
            key: 'sco_college',
          },
          {
            title: '专业',
            key: 'sco_major',
          },
          {
            title: '课程名称',
            key: 'sco_name',
          },
          {
            title: '成绩',
            key: 'sco_score',
            render: (h, params) => {
              return h('InputNumber',{
                props:{
                  value:this.temp[params.index].sco_score,
                  min:0,
                  max:100,
                  step:0.5
                },
                on:{
                  'on-change':(val)=>{
                    this.updateForm1.sco_score=val;
                    this.updateForm1.sco_name=this.temp[params.index].sco_name;
                    this.updateForm1.sco_class=this.temp[params.index].sco_class;
                    this.updateForm1.term=this.temp[params.index].term;
                    this.updateForm1.sco_stu_id=this.temp[params.index].sco_stu_id;
                    this.$http.post('http://localhost:9090/auth/score/update', this.updateForm1)
                      .then((res) => {
                        if (res.data.success) {
                          this.$Message.success(res.data.info);
                        } else {
                          this.$Message.error(res.data.info);
                        }
                      }, (err) => {
                        this.$message.error('请求错误！');
                      });
                  }
                }
              })
            }
          },
        ],
        excelColumns1:[
          {
            title: '分院',
            key: 'cs_college',
          },
          {
            title: '专业',
            key: 'cs_major',
          },
          {
            title: '班级',
            key: 'cs_class',
          },
          {
            title: '操作',
            key: 'action1',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.search1(params.index);
                    }
                  }
                }, '录入成绩')
              ]);
            }
          },
        ],
        calendar: [
          {
            value: '20162',
            label: '2016-2017学年第二学期'
          },
          {
            value: '20161',
            label: '2016-2017学年第一学期'
          },
          {
            value: '20152',
            label: '2015-2016学年第二学期'
          },
          {
            value: '20151',
            label: '2015-2016学年第一学期'
          },
          {
            value: '20142',
            label: '2014-2015学年第二学期'
          },
          {
            value: '20141',
            label: '2014-2015学年第一学期'
          }
        ],
        term:'',
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
        temp:[],
        form:{  //request
          pageSize:20,
          currentPage:1,
        },
        searchClscore:{  //request
          pageSize:50,
          currentPage:1,
          cs_tea_id:'',
          cs_term:''
        },
        csForm:{
          sco_class:'',
          term:'',
          sco_name:''
        },
        updateForm1:{
          sco_score:0,
          sco_name:'',
          sco_class:'',
          term:'',
          sco_stu_id:''
        }
      };
    },
    mounted() {

    },
    methods: {
      request(){
        this.$http.post('http://localhost:9090/auth/clscore/search', this.searchClscore)
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
        this.$http.post('http://localhost:9090/auth/score/teaScore', this.csForm)
          .then((res) => {
            if (res.data.success) {
              this.table2excelData=res.data.list;
              this.temp=res.data.list;
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      },
      search(){
        this.searchClscore.cs_tea_id=Cookies.get('user');
        this.searchClscore.cs_term=this.term;
        this.request();
      },
      search1(index){
        this.csForm.sco_class=this.tableexcelData[index].cs_class;
        this.csForm.sco_name=this.tableexcelData[index].cs_course;
        this.csForm.term=this.tableexcelData[index].cs_term;
        this.request1();
      }
    }
  };
</script>
<style scoped>

</style>
