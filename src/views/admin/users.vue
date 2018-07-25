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
          用户登录表信息查询
        </h4>
        <Row>
          <Col span="20">
            <Table :size="size" border="border" :columns="excelColumns" :data="table2excelData" size="small" ref="tableExcel"></Table>
            <Page class="page" :total="total" :current="currentPage" :page-size="pageSize" @on-change="onchangePage"></Page>
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
  // import Cookies from 'js-cookie';
  export default {
    name: 'rewards',
    data () {
      return {
        excelColumns: [
          {
            title: '登录账号',
            key: 'user_id'
          },
          {
            title: '用户名',
            key: 'user_name'
          },
          {
            title: '用户权值',
            key: 'user_role',
            render: (h, params) => {
              return h('InputNumber',{
                props:{
                  value:this.table2excelData[params.index].user_role,
                  editable:false,
                  min:0,
                  max:2
                },
                on:{
                  'on-change':(val)=>{
                    console.log(val);
                    this.table2excelData[params.index].user_role=val;
                    this.roleForm.user_id=this.table2excelData[params.index].user_id;
                    this.roleForm.user_role=val;
                    this.$http.post('http://localhost:9090/auth/users/updateRole', this.roleForm)
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
          {
            title: '操作',
            key: 'action',
            align: 'center',
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
                      this.deleteUser(params.index);
                    },
                    'on-cancel':()=>{}
                  }
                }, '删除用户')
              ]);
            }
          }
          // {
          //   title: '',
          //   key: 'user_password',
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'primary',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: () => {
          //             this.show(params.index)
          //           }
          //         }
          //       }, '登录密码')
          //     ]);
          //   }
          // }
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
        form:{  //request
          pageSize:20,
          currentPage:1
        },
        roleForm:{
          user_id:'',
          user_role:null
        }
      };
    },
    mounted() {
      this.request();
    },
    methods: {
      // Ajax request function
      request(){
        this.$http.post('http://localhost:9090/auth/users/list', this.form)
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
      // export tabledate as excel
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);
      },
      //show user's password
      show (index) {
        this.$Modal.info({
          title: '详细信息',
          content: `登录密码：  ${this.table2excelData[index].user_password}`
        })
      },
      //when change page
      onchangePage(val){
        this.currentPage=val;
        this.form.currentPage=val;
        this.request();
      },
      //when delete a user
      deleteUser(index){
        let delForm={
          user_id:this.table2excelData[index].user_id
        }
        this.$http.post('http://localhost:9090/auth/users/delUser', delForm)
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
