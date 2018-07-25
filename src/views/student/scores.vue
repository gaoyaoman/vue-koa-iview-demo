<style lang="less" scoped>
  @import '../../styles/common.less';
  @import '../tables/components/table.less';
</style>

<template>
  <div>
    <Row>
      <Select v-model="term" style="width:300px">
        <Option v-for="item in calendar" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="primary" icon="ios-search" @click="searchScore">查询</Button>
    </Row>
    <Row class="margin-top-10">
      <Card>
        <h4 slot="title">
          <Icon type="android-archive"></Icon>
          成绩单
        </h4>
        <Row>
          <Col span="20">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
          </Col>
          <Col span='4' class="padding-left-10">
            <div class="margin-top-10 margin-left-10">
              <span>输入导出的文件名：</span>
              <Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />
            </div>
            <div class="margin-left-10 margin-top-20">
              <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
              <Button type="primary" size="large" @click="exportExcel">下载表格数据</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
</template>

<script>
  import table2excel from '@/libs/table2excel.js';
  import Cookies from 'js-cookie';
  export default {
    name: 'scores',
    data () {
      return {
        excelColumns: [
          {
            title: '课程名称',
            key: 'cor_name'
          },
          {
            title: '学分',
            key: 'cor_score'
          },
          {
            title: '学时',
            key: 'cor_hour'
          },
          {
            title: '成绩',
            key: 'cor_score1'
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
        table2excelData: [],
        border:true,
        size:'large',
        excelFileName: '',
        tableExcel: {},
        fontSize: 16,
        term:'',
      };
    },
    mounted() {
      // this.form.stu_id=Cookies.get('user');

    },
    methods: {
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      searchScore(){
        let form = {
          sco_stu_id:'',
          term:'',
        }
        form.sco_stu_id=Cookies.get('user');
        form.term=this.term;
        this.$http.post('http://localhost:9090/auth/score/stuScore', form)
          .then((res) => {
            if (res.data.success) {
              console.log(res.data.list1);
              let list=res.data.list;
              let list1=res.data.list1;
              for(var i=0;i<list.length;i++){
                for(var j=0;j<list1.length;j++){
                  if(list1[j].sco_name===list[i].cor_name){
                    list[i].cor_score1=list1[j].sco_score;
                  }
                }
              }
              this.table2excelData=list;

            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      },
    }
  };
</script>
<style scoped>
  .page{
    margin-top: 16px;
  }
</style>
