<style lang="less">
  @import '../../styles/common.less';
  @import '../form/article-publish/article-publish.less';
</style>

<template>
  <div>
    <Row>
      <Col span="22">
        <Card>
          <Form :label-width="80" ref="formValidate" :model="addform" :rules="ruleValidate">
            <FormItem label="文件编号" :error="articleError" prop="info_id">
              <Input v-model="addform.info_id" icon="android-list"/>
            </FormItem>
            <FormItem label="学号" :error="articleError" prop="info_stu_id">
              <Input v-model="addform.info_stu_id" icon="android-list"/>
            </FormItem>
            <FormItem label="文件标题" :error="articleError" prop="info_name">
              <Input v-model="addform.info_name" icon="android-list"/>
            </FormItem>
            <FormItem label="文件内容" :error="articleError" prop="info_content">
              <!--<div class="margin-top-20">-->
                <textarea id="articleEditor" v-model="addform.info_content"></textarea>
              <!--</div>-->
            </FormItem>
          </Form>
        </Card>
      </Col>
      <Col span="2">
          <div class="margin-top-20 margin-left-10">
            <Button size="large" type="primary" @click="add('formValidate')">发布</Button>
            <Button size="large" type="warning" @click="cancelInput">重置</Button>
          </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import tinymce from 'tinymce';
  export default {
    name: 'add_reward',
    data () {
      const valideContent = (rule, value, callback) => {
        let activeEditor = tinymce.activeEditor;
        let editBody = activeEditor.getBody();
        activeEditor.selection.select(editBody);
        let text = activeEditor.selection.getContent( { 'format':'text' } );
        if (!text) {
          callback(new Error('请输入文件内容'));
        } else {
          callback();
        }
      };
      return {
        //
        addform:{
          info_id:'',
          info_stu_id:'',
          info_name:'',
          info_content:''
        },
        ruleValidate: {
          info_id: [
            { required: true, message: '请输入文件编号', trigger: 'blur' }
          ],
          info_stu_id: [
            { required: true, message: '请输入学号', trigger: 'blur' }
          ],
          info_name: [
            { required: true, message: '请输入文件标题', trigger: 'blur' }
          ],
          info_content: [
            { validator:valideContent,required: true, trigger: 'blur' }
          ],
        },
        //
        articleTitle: '',
        articleError: '',
        showLink: false,
        fixedLink: '',
        articlePath: '',
        articlePathHasEdited: false,
        editLink: false,
        editPathButtonType: 'ghost',
        editPathButtonText: '编辑',
        articleStateList: [{value: '草稿'}, {value: '等待复审'}],
        editOpenness: false,
        Openness: '公开',
        currentOpenness: '公开',
        topArticle: false,
        publishTime: '',
        publishTimeType: 'immediately',
        editPublishTime: false, // 是否正在编辑发布时间
        articleTagSelected: [], // 文章选中的标签
        articleTagList: [], // 所有标签列表
        classificationList: [],
        classificationSelected: [], // 在所有分类目录中选中的目录数组
        offenUsedClass: [],
        offenUsedClassSelected: [], // 常用目录选中的目录
        classificationFinalSelected: [], // 最后实际选择的目录
        publishLoading: false,
        addingNewTag: false, // 添加新标签
        newTagName: '' // 新建标签名
      };
    },
    methods: {
      //
      add(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            let activeEditor = tinymce.activeEditor;
            let editBody = activeEditor.getBody();
            activeEditor.selection.select(editBody);
            this.addform.info_content = activeEditor.selection.getContent( { 'format':'text' } );
            this.$http.post('http://localhost:9090/auth/rewards/add', this.addform)
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
            console.log('sss')
          }
        })
      },
      cancelInput(){
        this.addform={
          info_id:'',
          info_stu_id:'',
          info_name:'',
          info_content:''
        }
        tinyMCE.activeEditor.setContent('')
      },
      //
      handleArticletitleBlur () {
        if (this.articleTitle.length !== 0) {
          // this.articleError = '';
          localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
          if (!this.articlePathHasEdited) {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
            this.articlePath = this.articleTitle;
            this.articlePathHasEdited = true;
            this.showLink = true;
          }
        } else {
          // this.articleError = '文章标题不可为空哦';
          this.$Message.error('文章标题不可为空哦');
        }
      },
      editArticlePath () {
        this.editLink = !this.editLink;
        this.editPathButtonType = this.editPathButtonType === 'ghost' ? 'success' : 'ghost';
        this.editPathButtonText = this.editPathButtonText === '编辑' ? '完成' : '编辑';
      },
      handleEditOpenness () {
        this.editOpenness = !this.editOpenness;
      },
      handleSaveOpenness () {
        this.Openness = this.currentOpenness;
        this.editOpenness = false;
      },
      cancelEditOpenness () {
        this.currentOpenness = this.Openness;
        this.editOpenness = false;
      },
      handleEditPublishTime () {
        this.editPublishTime = !this.editPublishTime;
      },
      handleSavePublishTime () {
        this.publishTimeType = 'timing';
        this.editPublishTime = false;
      },
      cancelEditPublishTime () {
        this.publishTimeType = 'immediately';
        this.editPublishTime = false;
      },
      setPublishTime (datetime) {
        this.publishTime = datetime;
      },
      setClassificationInAll (selectedArray) {
        this.classificationFinalSelected = selectedArray.map(item => {
          return item.title;
        });
        localStorage.classificationSelected = JSON.stringify(this.classificationFinalSelected); // 本地存储所选目录列表
      },
      setClassificationInOffen (selectedArray) {
        this.classificationFinalSelected = selectedArray;
      },
      handleAddNewTag () {
        this.addingNewTag = !this.addingNewTag;
      },
      createNewTag () {
        if (this.newTagName.length !== 0) {
          this.articleTagList.push({value: this.newTagName});
          this.addingNewTag = false;
          setTimeout(() => {
            this.newTagName = '';
          }, 200);
        } else {
          this.$Message.error('请输入标签名');
        }
      },
      cancelCreateNewTag () {
        this.newTagName = '';
        this.addingNewTag = false;
      },
      canPublish () {
        if (this.articleTitle.length === 0) {
          this.$Message.error('请输入文章标题');
          return false;
        } else {
          return true;
        }
      },
      handlePreview () {
        if (this.canPublish()) {
          if (this.publishTimeType === 'immediately') {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            localStorage.publishTime = year + ' 年 ' + month + ' 月 ' + day + ' 日 -- ' + hour + ' : ' + minute + ' : ' + second;
          } else {
            localStorage.publishTime = this.publishTime; // 本地存储发布时间
          }
          localStorage.content = tinymce.activeEditor.getContent();
          this.$router.push({
            name: 'preview'
          });
        }
      },
      handleSaveDraft () {
        if (!this.canPublish()) {
          //
        }
      },
      handlePublish () {
        if (this.canPublish()) {
          this.publishLoading = true;
          setTimeout(() => {
            this.publishLoading = false;
            this.$Notice.success({
              title: '保存成功',
              desc: '文章《' + this.articleTitle + '》保存成功'
            });
          }, 1000);
        }
      },
      handleSelectTag () {
        localStorage.tagsList = JSON.stringify(this.articleTagSelected); // 本地存储文章标签列表
      }
    },
    computed: {
      completeUrl () {
        let finalUrl = this.fixedLink + this.articlePath;
        localStorage.finalUrl = finalUrl; // 本地存储完整文章路径
        return finalUrl;
      }
    },
    mounted () {
      this.articleTagList = [
        {value: 'vue'},
        {value: 'iview'},
        {value: 'ES6'},
        {value: 'webpack'},
        {value: 'babel'},
        {value: 'eslint'}
      ];
      this.classificationList = [
        {
          title: 'Vue实例',
          expand: true,
          children: [
            {
              title: '数据与方法',
              expand: true
            },
            {
              title: '生命周期',
              expand: true
            }
          ]
        },
        {
          title: 'Class与Style绑定',
          expand: true,
          children: [
            {
              title: '绑定HTML class',
              expand: true,
              children: [
                {
                  title: '对象语法',
                  expand: true
                },
                {
                  title: '数组语法',
                  expand: true
                },
                {
                  title: '用在组件上',
                  expand: true
                }
              ]
            },
            {
              title: '生命周期',
              expand: true
            }
          ]
        },
        {
          title: '模板语法',
          expand: true,
          children: [
            {
              title: '插值',
              expand: true
            },
            {
              title: '指令',
              expand: true
            },
            {
              title: '缩写',
              expand: true
            }
          ]
        }
      ];
      this.offenUsedClass = [
        {
          title: 'vue实例'
        },
        {
          title: '生命周期'
        },
        {
          title: '模板语法'
        },
        {
          title: '插值'
        },
        {
          title: '缩写'
        }
      ];
      tinymce.init({
        selector: '#articleEditor',
        branding: false,
        elementpath: false,
        height: 600,
        // language: 'zh_CN.UTF-8',
        menubar: 'edit insert view format table tools',
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
          'searchreplace visualblocks visualchars code fullscreen fullpage',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons paste textcolor colorpicker textpattern imagetools codesample'
        ],
        toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
        autosave_interval: '1s',
        image_advtab: true,
        table_default_styles: {
          width: '100%',
          borderCollapse: 'collapse'
        }
      });
    },
    destroyed () {
      tinymce.get('articleEditor').destroy();
    },
  };
</script>
