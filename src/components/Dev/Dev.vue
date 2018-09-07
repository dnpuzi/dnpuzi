<template>
  <div class="wrapper">
    <div class="header">
      <div class="back_icon">
          <Button @click="goBack" type="primary" icon="el-icon-arrow-left">返回</Button>
      </div>
      {{dev.data.dev}}
    </div>
    <Carousel :interval="4000" type="card" arrow="always" height="450px" v-if="!isPhone">
      <CarouselItem v-for="item in dev.carosel" :key="item.id">
        <img v-lazy="'http://www.dnpuzi.com/Uploads/' + item.path" alt="">
      </CarouselItem>
    </Carousel>
    <Carousel :interval="4000" arrow="always" height="320px" v-if="isPhone">
      <CarouselItem v-for="item in dev.carosel" :key="item.id">
        <img v-lazy="'http://www.dnpuzi.com/Uploads/' + item.path" alt="">
      </CarouselItem>
    </Carousel>
    <p class="price">￥{{dev.data.price}}</p>
    <div class="data_wrapper clearfix">
      <Form  v-if="!isPhone">
        <Col :span="8">
          <FormItem label="型号" label-width="100px">
              <span>{{ dev.data.dev }}</span>
            </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="cpu" label-width="100px">
              <span>{{ dev.data.cpu }}</span>
            </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="内存" label-width="100px">
              <span>{{ dev.data.memory }}</span>
            </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="硬盘" label-width="100px">
              <span>{{ dev.data.disk }}</span>
            </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="显卡" label-width="100px">
              <span>{{ dev.data.video_card }}</span>
            </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="屏幕分辨率" label-width="100px">
              <span>{{ dev.data.screen }}</span>
            </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="屏幕尺寸" label-width="100px">
              <span>{{ dev.data.size }}</span>
            </FormItem>
        </Col>
        <Col :span="16">
          <FormItem label="颜色" label-width="100px">
              <span>{{ dev.data.color }}</span>
            </FormItem>
        </Col>
      </Form>
      <Form  v-if="isPhone">
        <Col :span="12">
          <FormItem label="型号" label-width="100px">
              <span>{{ dev.data.dev }}</span>
            </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="cpu" label-width="100px">
              <span>{{ dev.data.cpu }}</span>
            </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="内存" label-width="100px">
              <span>{{ dev.data.memory }}</span>
            </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="硬盘" label-width="100px">
              <span>{{ dev.data.disk }}</span>
            </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="显卡" label-width="100px">
              <span>{{ dev.data.video_card }}</span>
            </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="屏幕分辨率" label-width="100px">
              <span>{{ dev.data.screen }}</span>
            </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="屏幕尺寸" label-width="100px">
              <span>{{ dev.data.size }}</span>
            </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="颜色" label-width="100px">
              <span>{{ dev.data.color }}</span>
            </FormItem>
        </Col>
      </Form>
    </div>
    <div class="tag_wrapper">
      <Tag :key="tag.id" v-for="tag in dev.label">
        {{tag.label}}
      </Tag>
    </div>
    <div class="detail_wrapper">
      <img v-for="item in dev.detail" :key="item.id" v-lazy="'http://www.dnpuzi.com/Uploads/' + item.path" alt="">
    </div>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import { Carousel, Button, CarouselItem, Tag, Form, FormItem, Col } from 'element-ui';
  import { BackTop } from 'iView';
  import qs from 'qs';
  export default {
    name: 'Dev',
    components: {
      Carousel, CarouselItem, Tag, Form, FormItem, Col, BackTop, Button
    },
    data() {
      return {
        id: '',
        dev: {
          data: {},
          carosel: [],
          label: [],
          detail: []
        },
        url: 'http://www.dnpuzi.com/Uploads/2018-08-16/5b74fff266c82.jpg',
        isPhone: false
      }
    },
    mounted() {
      this.id = this.$route.params.id;
      const clientWidth = document.documentElement.clientWidth;
      if(clientWidth < 672) {
        this.isPhone = true
      }
      this.$axios.post(this.$store.state.host + 'getDevById', qs.stringify({ id: this.id }))
        .then(res => {
          if (res.data.success) {
            this.dev = res.data;
            // console.log(this.dev)
          }
        })
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss" scoped>
$color: #1b1454;
.wrapper {
  .el-form-item {
    margin-bottom: 0;
    overflow: scroll;
  }
  .header {
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: relative;
    font-size: 30px;
    color: $color;
    .back_icon {
      width: 90px;
      height: 40px;
      line-height: 40px;
      position: absolute;
      top: 5px;
      left: 10px;
    }
  }
  .price {
    width: 100%;
    color: #e4393c;
    font-size: 20px;
    line-height: 30px;
    margin-top: 10px;
    padding-left: 20px;
  }
  .name {
    color: #666;
    font-size: 16px;
    line-height: 30px;
    padding-left: 20px;
  }
  .tag_wrapper {
    padding: 20px;
    .el-tag {
      margin: 10px 10px 0 0;
    }
  }
  .detail_wrapper {
    text-align: center;
    img {
      display: block;
      margin: 0 auto;
      /* max-width: 80%; */
    }
  }
}
@media screen and (max-width: 672px) {
  .wrapper {
    .header {
      font-size: 16px;
    }
    .el-carousel__container {
      img {
        width: 100%;
      }
    }
    .detail_wrapper {
      img {
        width: 100%;
      }
    }
  }
}
</style>