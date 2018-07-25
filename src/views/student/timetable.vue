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
          学生课程表查询
        </h4>
        <Row>
          <Select v-model="term" style="width:300px">
            <Option v-for="item in calendar" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button type="primary" icon="ios-search" @click="search">查询</Button>
        </Row>
        <Row class="margin-top-20">
          <Col span="24">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
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
  import Cookies from 'js-cookie';
  export default {
    name: 'timetable',
    data () {
      return {
        excelColumns: [
          {
            title: '节数',
            key: 't_order'
          },
          {
            title: '周一',
            key: 't_zhouyi'
          },
          {
            title: '周二',
            key: 't_zhouer'
          },
          {
            title: '周三',
            key: 't_zhousan'
          },
          {
            title: '周四',
            key: 't_zhousi'
          },
          {
            title: '周五',
            key: 't_zhouwu'
          },
          {
            title: '周六',
            key: 't_zhouliu'
          },
          {
            title: '周日',
            key: 't_zhouri'
          },
        ],
        table2excelData: [],
        border:true,
        size:'large',
        excelFileName: '',
        tableExcel: {},
        fontSize: 16,
        term:'',
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
        timeForm:{
          id:'',
          term:''
        }
      };
    },
    mounted() {
      this.timeForm.id=Cookies.get('user');
    },
    methods: {
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      search(){
        this.timeForm.term=this.term;
        this.$http.post('http://localhost:9090/auth/timetable', this.timeForm)
          .then((res) => {
            if (res.data.success) {
              if(res.data.list.length){
                this.table2excelData=res.data.list;
              } else{
                this.$Message.error('暂无课程表信息');
              }
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      }
    }
  };
</script>
<style scoped>

</style>
