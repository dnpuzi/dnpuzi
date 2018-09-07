<template>
    <div class="wrapper">
        <Collapse v-model="activeCollapse">
            <CollapseItem name="categoryCollapse">
                <template slot="title">
                    查看分类列表
                    <i class="header-icon el-icon-menu"></i>
                </template>
                <div v-for="item in categoryList" class="category_item">|--{{item.cat_name}}
                    <div class="btn">
                        <router-link :to="{path: 'Adddev', query: {catid: item.id}}">
                            <Button>添加商品</Button>
                        </router-link>
                        <router-link :to="{path: 'Showdevlist', query: {catid: item.id}}">
                            <Button>查看商品</Button>
                        </router-link>
                    </div>
                </div>
            </CollapseItem>
        </Collapse>
    </div>
</template>

<script>
    import qs from 'qs';
    import {
        Form,
        FormItem,
        Input,
        Button,
        Collapse,
        CollapseItem
    } from 'element-ui';
    export default {
        name: 'Showcategory',
        components: {
            Form,
            FormItem,
            Input,
            Button,
            Collapse,
            CollapseItem
        },
        data() {
            return {
                activeCollapse: ['categoryCollapse'],
                categoryList: ''
            }
        },
        mounted() {
            document.title = '查看分类';
            this.$axios.post(this.$store.state.host + 'showCategory')
                .then(res => {
                    this.categoryList = res.data.data;
                })
        }
    }
</script>

<style lang="scss" scoped>
    $color: #409EFF;
    .wrapper {
        width: 800px;
        padding: 20px;
        margin: 40px auto;
        transition: .2s ease-in-out;
        &:hover {
            box-shadow: 0 0 10px #ddd;
        }
        .category_item {
            padding-left: 40px;
            line-height: 60px;
            transition: .2s ease-in-out;
            cursor: pointer;
            height: 60px;
            position: relative;
            border-radius: 4px;
            &:hover {
                padding-left: 30px;
                background: $color;
                color: #ffffff;
                .btn {
                    opacity: 1;
                    right: 30px;
                }
            }
            .btn {
                position: absolute;
                right: 20px;
                top: 0;
                opacity: 0;
                transition: .2s ease-in-out;
                .modify_wrapper {
                    display: inline-block;
                    width: 200px;
                    height: 40px;
                }
            }
        }
    }
</style>