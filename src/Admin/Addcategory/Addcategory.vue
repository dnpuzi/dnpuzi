<template>
    <div class="wrapper">
        <Form :model="ruleForm" :rules="rules" ref="ruleForm">
            <FormItem label="添加分类名" prop="categoryname" label-width="100px">
                <Input v-model="ruleForm.categoryname"></Input>
            </FormItem>
            <FormItem label-width="100px">
                <Button type="primary" @click="submitForm('ruleForm')">立即创建</Button>
                <Button @click="reset('ruleForm')">重置</Button>
            </FormItem>
        </Form>

        <Collapse>
            <CollapseItem>
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
        name: 'Addcategory',
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
                ruleForm: {
                    categoryname: ''
                },
                rules: {
                    categoryname: [{
                        required: true,
                        message: '请输入分类名',
                        trigger: 'blur'
                    }]
                },
                categoryList: ''
            }
        },
        methods: {
            submitForm(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let data = {
                            cat_name: this.ruleForm.categoryname
                        }
                        this.$axios.post(this.$store.state.host + 'addCategory', qs.stringify(data))
                            .then(res => {
                                if (res.data.success) {
                                    this.ruleForm.categoryname = '';
                                    this.$message({
                                        message: '添加成功！',
                                        type: 'success'
                                    });
                                    this.$axios.post(this.$store.state.host + 'showCategory')
                                        .then(res => {
                                            this.categoryList = res.data.data;
                                        })
                                } else {
                                    this.$message.error('添加失败！');
                                }
                            })
                    } else {
                        return false;
                    }
                });
            },
            reset(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            document.title = '添加分类';
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