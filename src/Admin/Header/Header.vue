<template>
  <div class="header_wrapper">
    <div class="container">
      <div class="left">学长的电脑铺子</div>
      <div class="right">
        <ul>
          <li><router-link to="Addcategory">添加分类</router-link></li>
          <li><router-link to="Adddev">添加电脑</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Header',
        mounted() {

        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    $color: #409EFF;
    .header_wrapper {
        background-color: #333;
        height: 60px;
        line-height: 60px;
        color: #fff;
        .container {
            width: 1100px;
            margin: 0 auto;
            .left {
                float: left;
                font-size: 18px;
            }
            .right {
                float: right;
                li {
                    float: left;
                    margin-right: 12px;
                    a {
                        color: #fff;
                        font-size: 14px;
                        transition: .2s ease-in-out;
                        &.current,
                        &.router-link-exact-active,
                        &.router-link-active,
                        &:hover {
                            color: $color;
                        }
                    }
                }
            }
        }
    }
</style>