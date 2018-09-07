<template>
    <div class="wrapper">
        <p class="title">
          {{devForm.dev}}
          <Button type="danger" class="delet_btn" @click="_delete">删除该型号</Button>
        </p>
        <Form :model="devForm" :rules="rules" ref="devForm">
          <FormItem label="分类" prop="cat_id" label-width="100px">
            <Select v-model="devForm.cat_id" placeholder="请选择">
              <Option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.cat_name"></Option>
            </Select>
          </FormItem>
          <FormItem label="设备号" prop="dev" label-width="100px">
            <Input v-model="devForm.dev"></Input>
          </FormItem>
          <FormItem label="价格" prop="price" label-width="100px">
            <Input v-model="devForm.price" type="number"></Input>
          </FormItem>
          <FormItem label="CPU" prop="cpu" label-width="100px">
            <Input v-model="devForm.cpu"></Input>
          </FormItem>
          <FormItem label="内存" prop="memory" label-width="100px">
            <Input v-model="devForm.memory"></Input>
          </FormItem>
          <FormItem label="硬盘" prop="disk" label-width="100px">
            <Input v-model="devForm.disk"></Input>
          </FormItem>
          <FormItem label="显卡" prop="video_card" label-width="100px">
            <Input v-model="devForm.video_card"></Input>
          </FormItem>
          <FormItem label="颜色" prop="color" label-width="100px">
            <Input v-model="devForm.color"></Input>
          </FormItem>
          <FormItem label="分辨率" prop="screen" label-width="100px">
            <Input v-model="devForm.screen"></Input>
          </FormItem>
          <FormItem label="屏幕尺寸" prop="size" label-width="100px">
            <Input v-model="devForm.size"></Input>
          </FormItem>
          <FormItem label="封面"" prop="cover" label-width="100px">
            <Upload class="upload-demo" :action="this.$store.state.host + 'uploadImg2Location'" drag
              :on-success="handleCoverSuccess">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>，支持多张上传</div>
            </Upload>
          </FormItem>
          <FormItem label="店长寄语" prop="advice" label-width="100px">
            <Input v-model="devForm.advice" type="textarea" rows="4"></Input>
          </FormItem>
          <FormItem label="京东链接" prop="jdlink" label-width="100px">
            <Input v-model="devForm.jdlink"></Input>
          </FormItem>
          <FormItem label-width="100px">
            <Button type="warning" @click="handleDevModify">修改</Button>
          </FormItem>
        </Form>
        <div class="attach_info_wrapper">
          <div class="label_wrapper clearfix">
            <p class="title">添加标签</p>
            <div class="left">
              <Tag :key="tag" v-for="tag in oldLabelList"  :disable-transitions="false">
                {{tag}}
              </Tag>
              <hr v-show="oldLabelList.length">
              <Tag :key="tag" v-for="tag in labelList" closable :disable-transitions="false" @close="handleClose(tag)">
                {{tag}}
              </Tag>
              <Input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
              </Input>
              <Button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</Button>
            </div>
            <div class="right">
              <span class="custom_tag" :key="tag" v-for="tag in preTags" @click="addTag(tag)">
                {{tag}}
              </span>
            </div>
            <div class="label_submit_wrapper">
              <Button type="primary" @click="handleLabelSubmit">提交标签</Button>
            </div>
          </div>
          <div class="carosel_wrapper">
            <p class="title">添加滚动图</p>
            <Upload class="upload-demo" :action="this.$store.state.host + 'uploadImg2Location'" drag multiple :on-remove="handleCaroselRemove"
              :on-success="handleCaroselSuccess">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>，支持多张上传</div>
            </Upload>
            <div class="carosel_submit_wrapper">
              <Button type="primary" @click="handleCaroselSubmit">提交滚动图</Button>
            </div>
          </div>
          <div class="detail_wrapper">
              <p class="title">添加详细图</p>
              <Upload class="upload-demo" :action="this.$store.state.host + 'uploadImg2Location'" drag multiple :on-remove="handleDetailRemove"
                :on-success="handleDetailSuccess">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或
                  <em>点击上传</em>，支持多张上传</div>
              </Upload>
              <div class="carosel_submit_wrapper">
                <Button type="primary" @click="handleDetailSubmit">提交滚动图</Button>
              </div>
            </div>
        </div>
      </div>
</template>

<script>
  import qs from 'qs';
  import {
    Form,
    FormItem,
    Input,
    Button,
    Select,
    Option,
    Tag,
    Upload
  } from 'element-ui';
  export default {
    name: 'Devinfo',
    components: {
      Form,
      FormItem,
      Input,
      Button,
      Select,
      Option,
      Tag,
      Upload
    },
    data() {
      return {
        devForm: {
          cat_id: '',
          dev: '',
          price: '',
          advice: '',
          jdlink: '',
          cpu: '',
          memory: '',
          disk: '',
          video_card: '',
          color: '',
          cover: '',
          screen: '',
          size: ''
        },
        rules: {
          dev: [{
            required: true,
            message: '请输入设备号',
            trigger: 'blur'
          }],
          cat_id: [{
            required: true,
            message: '请选择分类',
            trigger: 'blur'
          }]
        },
        categoryList: '',
        oldLabelList: [],
        labelList: [],
        preTags: ['颜值高', '颜值还行', '钢铁直男般的性能：钢，铁，“值”', '4g', '8g', '机械硬盘', '办公', '游戏发烧', 'lol', '吃鸡鸡', '主机游戏',],
        inputVisible: false,
        inputValue: '',
        caroselList: [],
        detailList: [],
        attachInfo: false,
        isAdded: false,
        devId: ''
      }
    },
    methods: {
      _delete() {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(this.$store.state.host + 'deleteDev', qs.stringify({dev_id: this.devId}))
            .then( res => {
              console.log(res.data)
            } )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleDevSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$axios.post(this.$store.state.host + 'addDev', qs.stringify(this.devForm))
              .then(res => {
                if (res.data.success) {
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  this.attachInfo = true;
                  this.devId = res.data.data;
                  // console.log(this.devId);
                  this.isAdded = true;
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
      },
      handleDevModify() {
        this.$axios.post(this.$store.state.host + 'modifyDev', qs.stringify(this.devForm))
          .then(res => {
            console.log(res.data);
            if (res.data.success) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
            }
          })
      },
      hasTag(tag) {
        let oold = false;
        let onew = false;
        if(this.oldLabelList.length > 0) {
          this.oldLabelList.forEach( item => {
            if(item === tag) {
              oold = true
            }
          } )
        }
        if(this.labelList.length > 0) {
          this.labelList.forEach( item => {
            if(item === tag) {
              onew = true
            }
          } )
        }
        return oold || onew
      },
      addTag(tag) {
        if( this.hasTag(tag) ) {
          this.$message({
            message: '不能重复添加标签',
            type: 'warning'
          });
        } else {
          this.labelList.push(tag);
        }
      },
      handleClose(tag) {
        this.labelList.splice(this.labelList.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.labelList.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleLabelSubmit() {
        if (this.labelList.length > 0) {
          let data = [];
          for (let i = 0; i < this.labelList.length; i++) {
            data[i] = {
              dev_id: this.devId,
              label: this.labelList[i]
            }
          }
          this.$axios.post(this.$store.state.host + 'addLabel', qs.stringify(data))
            .then(res => {
              console.log(res.data);
              if (res.data.success) {
                this.labelList.forEach( item => {
                  this.oldLabelList.push(item);
                } )
                this.labelList = [];
                this.$message({
                  message: '标签添加成功！',
                  type: 'success'
                });
              }
            })
        }
      },
      handleCoverSuccess(file) {
        this.devForm.cover = file.file.savepath + file.file.savename
      },
      handleCaroselSuccess(file) {
        this.caroselList.push({
          oldImg: file.file.name,
          saveImg: file.file.savepath + file.file.savename
        })
        // console.log(this.caroselList);
      },
      handleCaroselRemove(file) {
        console.log(file)
      },
      handleCaroselSubmit() {
        if (this.caroselList.length > 0) {
          let data = [];
          for (let i = 0; i < this.caroselList.length; i++) {
            data[i] = {
              dev_id: this.devId,
              path: this.caroselList[i].saveImg
            }
          }
          // console.log(data);return
          this.$axios.post(this.$store.state.host + 'addCarosel', qs.stringify(data))
            .then(res => {
              console.log(res.data);
              if (res.data.success) {
                this.$message({
                  message: '滚动图添加成功！',
                  type: 'success'
                });
              }
            })
        }
      },
      handleDetailRemove(file) {
        
      },
      handleDetailSuccess(file) {
        this.detailList.push({
          oldImg: file.file.name,
          saveImg: file.file.savepath + file.file.savename
        })
        // console.log(this.caroselList);
      },
      handleDetailSubmit() {
        if (this.detailList.length > 0) {
          let data = [];
          for (let i = 0; i < this.detailList.length; i++) {
            data[i] = {
              dev_id: this.devId,
              path: this.detailList[i].saveImg
            }
          }
          // console.log(data);return
          this.$axios.post(this.$store.state.host + 'addDetail', qs.stringify(data))
            .then(res => {
              console.log(res.data);
              if (res.data.success) {
                this.$message({
                  message: '详细图添加成功！',
                  type: 'success'
                });
              }
            })
        }
      },
      getLabel() {
        let data = {
          dev_id: this.$route.query.dev_id
        }
        this.$axios.post(this.$store.state.host + 'searchLabelById', qs.stringify(data))
          .then( res => {
            if(res.data.success) {
              if(res.data.data.length > 0) {
                res.data.data.forEach( item => {
                  this.oldLabelList.push(item.label)
                } )
              }
            }
          } )
      }
    },
    mounted() {
      document.title = '商品详情';
      let data = {
        id: this.$route.query.dev_id
      }
      this.devId = this.$route.query.dev_id;
      this.$axios.post(this.$store.state.host + 'searchDevById', qs.stringify(data))
        .then( res => {
          if(res.data.success) {
            this.devForm = res.data.data;
          } else {
            this.$confirm('没有查询到信息，是否跳转主页?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('Addcategory');
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          }
        } )
      this.$axios.post(this.$store.state.host + 'showCategory')
        .then(res => {
          this.categoryList = res.data.data;
        })
      this.getLabel();
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
      .delet_btn {
        float: right;
      }
      .el-tag {
        margin-right: 10px;
        margin-bottom: 10px;
      }
      &:hover {
        box-shadow: 0 0 10px #ddd;
      }
      .title {
        line-height: 60px;
        font-size: 20px;
        font-weight: bold;
        color: #606266;
        border-bottom: 2px solid $color;
        margin-bottom: 20px;
        color: $color;
      }
      .attach_info_wrapper {
        .label_wrapper {
          width: 100%;
          .left {
            float: left;
            width: 50%;
            height: 200px;
            border-right: 1px solid #606266;
            box-sizing: border-box;
          }
          .right {
            float: left;
            width: 50%;
            height: 200px;
            padding-left: 20px;
            box-sizing: border-box;
            .custom_tag {
              background-color: rgba(64, 158, 255, .1);
              display: inline-block;
              padding: 0 10px;
              height: 32px;
              line-height: 30px;
              font-size: 12px;
              color: #409EFF;
              border-radius: 4px;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              border: 1px solid rgba(64, 158, 255, .2);
              margin-right: 10px;
              margin-bottom: 10px;
              cursor: pointer;
            }
          }
        }
        .carosel_wrapper, .detail_wrapper {
          margin-top: 20px;
          .carosel_submit_wrapper {
            padding-top: 20px;
          }
        }
      }
    }
  </style>