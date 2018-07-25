<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
      <Row>
        <Col span="16">
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
              <div class="carousel cal2"></div>
            </CarouselItem>
            <CarouselItem>
              <div class="carousel cal3"></div>
            </CarouselItem>
            <CarouselItem>
              <div class="carousel cal4"></div>
            </CarouselItem>
          </Carousel>
        </Col>
        <Col span="8">
          <Card class="margin-left-10">
            <h4 slot="title">
              <Icon type="android-archive"></Icon>
              日历
            </h4>
            <calender></calender>
          </Card>
        </Col>
      </Row>
      <Row class="margin-top-10">
        <Col span="12">
          <Card>
            <h4 slot="title">
              <Icon type="android-archive"></Icon>
              校园公告
            </h4>
            <div class="to-do-list-con">
              <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                <li class="Li" :title="item.title">{{item.title}}</li>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="12">
          <Card class="margin-left-10">
            <h4 slot="title">
              <Icon type="android-archive"></Icon>
              新闻中心
            </h4>
            <div class="to-do-list-con">
              <div v-for="(item, index) in toDoList1" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                <li class="Li" :title="item.title">{{item.title}}</li>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script>
  import calender from './components/calendar.vue';
export default {
    name: 'home',
    components: {
      calender
    },

    data () {
        return {
          value3: 3,
          setting: {
            autoplay: true,
            autoplaySpeed: 4000,
            dots: 'inside',
            trigger: 'click',
            arrow: 'hover'
          },
          toDoList: [
            {
              title: '大连理工大学城市学院关于2018年暑假安排'
            },
            {
              title: '大连理工大学城市学院计算机采购项目招标公告'
            },
            {
              title: '大连理工大学城市学院网络交换机改造项目招标公告'
            },
            {
              title: '大连理工大学城市学院通信电子线路实验室仪器设备更新项目招标公告'
            },
            {
              title: '大连理工大学城市学院电磁场与微波技术实验室设备更新项目招标公告'
            },
            {
              title: '大连理工大学城市学院通信原理实验设备更新项目招标公告'
            },
            {
              title: '关于2018年秋季学期公共选修课程网上选课的通知'
            }
          ],
          toDoList1: [
            {
              title: '我院在三项全国大学生科技创新大赛中取得佳绩'
            },
            {
              title: '电子与自动化学院学生党支部开展主题党日活动\n'
            },
            {
              title: '电院举办2017级M兴趣小组第二季智能车竞赛\n'
            },
            {
              title: '计算机工程学院举办第十届“新蓝剑杯”高级语言编程大赛\n'
            },
            {
              title: '我院组织师生收看“学习新思想百万师生同上一堂课活动”启动仪式暨首场授课直播\n'
            },
            {
              title: '我院教工羽毛球队获大连理工大学2018年教工羽毛球团体赛冠军\n'
            },
            {
              title: '“领导干部上讲台”第二讲：建设社会主义生态文明'
            }
          ],
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {

    }
};
</script>
<style scoped>
  .carousel{
    width: 100%;
    height: 420px;
    background-size: cover;
    background-position: center;
  }
  .cal1{
    background-image: url('../../images/b4.jpeg');
  }
  .cal2{
    background-image: url('../../images/b5.jpeg');
  }
  .cal3{
    background-image: url('../../images/b6.jpeg');
  }
  .cal4{
     background-image: url('../../images/b3.jpg');
   }
  .Li{
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
