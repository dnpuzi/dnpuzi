<template>
  <div class="wrapper" id="Indexlist">
    <!-- <i class="el-icon-rank full_screen" @click="fullScreen" v-show="isFullScreen"></i> -->
    <div class="tell_me_wrapper" v-show="tellMe">
      <img src="../../assets/tell_me.jpg" alt="" class="usa_bg">
      <div class="cn">
        告诉我，你想要什么。
        <Button type="primary" @click="_showAll">点击我，展示全部</Button>
      </div>
      <div class="close_wrapper">
        <Button type="danger" @click="_closeTellWrap">关闭</Button>
      </div>
      <div class="rule_form">
        <Form>
          <FormItem label="分类" label-width="80px">
            <Select v-model="ruleForm.cat_id" placeholder="请选择">
              <Option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.cat_name"></Option>
            </Select>
          </FormItem>
          <FormItem label="屏幕尺寸" label-width="80px">
            <Select v-model="ruleForm.size" placeholder="请选择">
              <Option v-for="item in sizeList" :key="item.id" :value="item.value" :label="item.value"></Option>
            </Select>
          </FormItem>
          <FormItem label="价格区间" label-width="80px">
            <Col :span="10">
            <Input placeholder="最低价" type="number" v-model="ruleForm.low"></Input>
            </Col>
            <Col :span="2" style="text-align: center;"> -
            </Col>
            <Col :span="10">
            <Input placeholder="最高价" type="number" v-model="ruleForm.high"></Input>
            </Col>
          </FormItem>
          <FormItem label="" label-width="80px">
            <Col :span="6">
            <Button type="primary" @click="handleClick">确定</Button>
            </Col>
            <!-- <Button type="warning">重置</Button> -->
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="us_man" id="drag_us_man" v-show="usMan" >
      <img src="../../assets/tell_me.jpg" alt="">
    </div>
    <div class="list_wrapper">
      <Card v-for="item in devList" :dev="item" :key="item.id"></Card>
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import Card from '../Card/Card';
  import { BackTop } from 'iView';
  import qs from 'qs';
  import {
    Form,
    FormItem,
    Input,
    Button,
    Select,
    Option,
    Tag,
    Upload,
    Row,
    Col,
    Loading
  } from 'element-ui';
  export default {
    name: 'Indexlist',
    data() {
      return {
        list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        isFullScreen: true,
        tellMe: false,
        usMan: false,
        categoryList: [],
        devList: [],
        sizeList: [
          {
            id: 1,
            value: '13寸'
          },
          {
            id: 2,
            value: '13.3寸'
          },
          {
            id: 3,
            value: '14寸'
          },
          {
            id: 4,
            value: '15寸'
          }
        ],
        ruleForm: {
          cat_id: '',
          low: '',
          high: '',
          size: ''
        }
      }
    },
    components: {
      Form,
      FormItem,
      Input,
      Button,
      Select,
      Option,
      Tag,
      Upload,
      Row,
      Col,
      Card,
      Loading,
      BackTop
    },
    mounted() {
      let oApp = document.getElementById('Indexlist');
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
      document.title = '首页';
      this.$axios.post(this.$store.state.host + 'showCategory')
        .then(res => {
          this.categoryList = res.data.data;
        })
      this._showAll();
      this.drag( document.getElementById('drag_us_man') );
    },
    methods: {
      drag(obj) {
        let me = this
        obj.ontouchstart = function (ev) {
          let originX = ev.touches[0].clientX;
          let originY = ev.touches[0].clientY;
          var ev = ev || event;
          var disX = ev.touches[0].clientX - this.offsetLeft;
          var disY = ev.touches[0].clientY - this.offsetTop;
          document.ontouchmove = function (ev) {
            var L = ev.touches[0].clientX - disX;
            var T = ev.touches[0].clientY - disY;
            obj.style.left = L + 'px';
            obj.style.top = T + 'px';
          }
          document.ontouchend = function (ev) {
            var ev = ev || event;
            document.ontouchmove = document.ontouchstart = null;
            if( ev.changedTouches[0].clientX == originX && ev.changedTouches[0].clientY == originY ) {
              me._showTellWrapper();
            }
          }
          return false;
        }
      },
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
        let oApp = document.getElementById('Indexlist');
        oApp.style.height = oHeight + 'px';
      },
      goRouter(routerpath) {
        this.$router.push(routerpath);
      },
      _showAll() {
        this.tellMe = false;
        this.usMan = true;
        Loading.service({text: '正在加载数据'});
        let loadingInstance = Loading.service({text: '正在加载数据'});
        this.$axios.post(this.$store.state.host + 'getListByLimit')
          .then(res => {
            console.log(res.data);
            if (res.data.success) {
              this.devList = res.data.data;
              loadingInstance.close();
            }
          })
      },
      _showTellWrapper() {
        this.tellMe = true;
        this.usMan = false;
      },
      _closeTellWrap() {
        this.tellMe = false;
        this.usMan = true;
      },
      handleClick() {
        let allData = {}
        allData.data = {}
        allData.price = {
          low: '0',
          high: '999999'
        }
        if(this.ruleForm.cat_id != '') {
          allData.data.cat_id = ['EQ', this.ruleForm.cat_id];
        }
        if(this.ruleForm.size != '' ) {
          allData.data.size = ['EQ', this.ruleForm.size];
        }
        if(this.ruleForm.low != '') {
          allData.price.low = this.ruleForm.low;
        }
        if(this.ruleForm.high != '' && this.ruleForm.high > this.ruleForm.low) {
          allData.price.high = this.ruleForm.high;
        }
        if(this.ruleForm.cat_id == '' && this.ruleForm.size == '') {
          if(this.ruleForm.low == '' && this.ruleForm.high == '') {
            return
          }
        }
        if(Number(allData.price.low) > Number(allData.price.high)) {
          this.$message.error('价格查询：最低价大于最高价');
          return
        }
        // console.log(allData);return
        this.$axios.post(this.$store.state.host + 'getListByLimit', qs.stringify(allData))
          .then(res => {
            console.log(res.data);
            if(res.data.success) {
              this.devList = res.data.data;
              this.tellMe = false;
              this.usMan = true;
            } else {
              this.$message.error('没有查到相关数据！');
            }
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import './index.scss';
</style>