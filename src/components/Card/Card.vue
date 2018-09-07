<template>
  <div class="wrapper" @click="goDev">
    <img :src="'http://www.dnpuzi.com/Uploads/'+dev.cover" alt="" class="cover">
    <p class="price">￥{{dev.price}}</p>
    <p class="name">{{dev.dev}}</p>
    <div class="table_data">
      <Tag>{{dev.cpu}}</Tag>
      <Tag>{{dev.memory}}</Tag>
      <Tag>{{dev.disk}}</Tag>
      <Tag>{{dev.size}}</Tag>
    </div>
  </div>
</template>

<script>
import { Tag } from 'element-ui';
export default {
  name: 'Card',
  props: ['dev'],
  components: {
    Tag
  },
  mounted() {
    // console.log(this.dev);
  },
  data() {
    return {
    }
  },
  methods: {
    goDev() {
      this.$router.push({ path: `/DEv/${this.dev.id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #1b1454;
.wrapper {
  width: 31%;
  height: 400px;
  float: left;
  border-radius: 5px;
  margin-right: 3%;
  box-shadow: -1px 3px 12px -1px rgba(0,0,0,.3);
  &:nth-of-type(3n) {
    margin-right: 0;
    margin-bottom: 20px;
  }
  .cover {
    display: block;
    width: 220px;
    height: 220px;
    margin: 0 auto;
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
  .table_data {
    padding: 10px;
    padding-left: 20px;
    .el-tag {
      margin: 10px 10px 0 0;
    }
  }
}
@media screen and (max-width: 672px) {
  .wrapper {
    width: 100%;
    min-height: 40px;
    margin-bottom: 20px;
  }
}
</style>