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
          奖惩信息管理
        </h4>
        <Row>
          <Col>
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
            <Page class="page" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
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
    name: 'reward_manage',
    data () {
      return {
        excelColumns: [
          {
            title: '文件编号',
            key: 'info_id'
          },
          {
            title: '学号',
            key: 'info_stu_id'
          },
          {
            title: '文件名',
            key: 'info_name'
          },
          {
            title: '奖惩内容',
            key: 'info_content',
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
                      this.show(params.index)
                    }
                  }
                }, '查看内容')
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width:100,
            render: (h, params) => {
              return h('Button', [
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
                      this.delReward(params.index);
                    },
                    'on-cancel':()=>{}
                  }
                }, '删除文件')
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
        pageSize:10,
        currentPage:1,
        form:{  //request
          pageSize:10,
          currentPage:1
        }
      };
    },
    mounted() {
      this.$http.post('http://localhost:9090/auth/rewards/getRewards', this.form)
        .then((res) => {
          if (res.data.success) {
            this.table2excelData=res.data.list;
          } else {
            this.$Message.error(res.data.info);
          }
        }, (err) => {
          this.$message.error('请求错误！');
        });
    },
    methods: {
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      show (index) {
        this.$Modal.info({
          title: '详细信息',
          content: `文件编号：${this.table2excelData[index].info_id}<br>学号：${this.table2excelData[index].info_stu_id}<br>文件名：${this.table2excelData[index].info_name}<br>文件内容：${this.table2excelData[index].info_content}`
        })
      },
      onchangePage(val){
        this.currentPage=val;
        this.form.currentPage=val;
        this.$http.post('http://localhost:9090/auth/rewards/getListByStuID', this.form)
          .then((res) => {
            if (res.data.success) {
              this.table2excelData=res.data.list;
            } else {
              this.$Message.error(res.data.info);
            }
          }, (err) => {
            this.$message.error('请求错误！');
          });
      },
      //delete
      delReward(index){
        let form={
          info_id:this.table2excelData[index].info_id
        }
        this.$http.post('http://localhost:9090/auth/rewards/delete', form)
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
    }
  };
</script>
<style scoped>
  .page{
    margin-top: 16px;
  }
</style>
