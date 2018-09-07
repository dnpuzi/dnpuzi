<template>
  <div id="puzi">
    <i class="el-icon-rank full_screen" @click="fullScreen" v-show="isFullScreen"></i>
    <div class="header">
      <span class="title">学长的电脑铺子</span>
      <div class="advice">{{weather.ganmao}}</div>
    </div>
    <div class="main_wrapper">
      <div class="left_top">
        <div class="temprature">
          <span class="num">{{weather.temprature}}</span>
          <!-- <span class="cn">℃</span> -->
        </div>
        <div class="detail_wrapepr">
          <p class="city">重庆</p>
          <p class="weather">{{weather.weather}}</p>
          <p>今日：{{weather.today.low}} {{weather.today.high}} </p>
          <p>明日：{{weather.tomorrow.low}} {{weather.tomorrow.high}} {{weather.tomorrow.weather}}</p>
        </div>
      </div>
      <div class="right_top">指南</div>
      <div class="left_bot">铺子</div>
      <div class="right_bot" @click="goRouter('Indexlist')">请进</div>
    </div>
  </div>
</template>
<script>  
  export default {
    name: 'Index',
    data() {
      return {
        isFullScreen: true,
        weather: {
          temprature: 0,
          ganmao: '各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间。',
          weather: '',
          today: {
            low: '',
            high: ''
          },
          tomorrow: {
            low: '',
            high: '',
            weather: ''
          }
        }
      }
    },
    mounted() {
      let oApp = document.getElementById('puzi');
      let oHeight = document.documentElement.clientHeight;
      oApp.style.height = oHeight + 'px';
      window.addEventListener('resize', e => {
        let oRheight = document.documentElement.clientHeight;
        if (oRheight == 570) {
          oApp.style.height = 570 + 'px';
        }
        oApp.style.height = oRheight + 'px';
        this.isFullScreen = !this.isFullScreen;
      })
      this.$axios('http://wthrcdn.etouch.cn/weather_mini?city=%E9%87%8D%E5%BA%86')
        .then(res => {
          this.weather.temprature = res.data.data.wendu;
          this.weather.ganmao = res.data.data.ganmao;
          this.weather.weather = res.data.data.forecast[0].type;
          this.weather.today = {
            low: res.data.data.forecast[0].low,
            high: res.data.data.forecast[0].high,
          }
          this.weather.tomorrow = {
            low: res.data.data.forecast[1].low,
            high: res.data.data.forecast[1].high,
            weather: res.data.data.forecast[1].type,
          }
        })
    },
    methods: {
      fullScreen() {
        if (document.documentElement.RequestFullScreen) {
          document.documentElement.RequestFullScreen();
        }
        //兼容火狐
        if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        }
        //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
        if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen();
        }
        //兼容IE,只能写msRequestFullscreen
        if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
        let oHeight = document.documentElement.clientHeight;
        let oApp = document.getElementById('puzi');
        oApp.style.height = oHeight + 'px';
      },
      goRouter(routerpath) {
        this.$router.push(routerpath);
      }
    }
  }
</script>
<style scoped lang="scss">
  @import './index.scss';
  .full_screen {
    font-size: 40px;
    position: absolute;
    top: 20px;
    left: 20px;
  }
</style>