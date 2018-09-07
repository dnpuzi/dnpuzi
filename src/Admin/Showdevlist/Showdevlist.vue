<template>
  <div class="wrapper">
    <div class="header">
      |-- {{this.cat_name}}
      <div class="modify_wrapper">
        <Button @click="modifyWrapper">修改</Button>
        <div class="modify_input" v-show="modify_wrapper">
          <Input v-model="cat_name">
          <template slot="append">
            <Button @click="modify">确认</Button>
          </template>
          </Input>
        </div>
      </div>
    </div>
    <div class="list_wrapper">
      <Table :data="dataList" border style="width: 100%">
        <TableColumn prop="dev" label="设备号" width="200">
        </TableColumn>
        <TableColumn prop="price" label="价格" width="100">
        </TableColumn>
        <TableColumn prop="memory" label="内存" width="100">
        </TableColumn>
        <TableColumn prop="disk" label="硬盘" width="100">
        </TableColumn>
        <TableColumn prop="video_card" label="显卡" width="200">
        </TableColumn>
        <TableColumn prop="color" label="颜色" width="200">
        </TableColumn>
        <TableColumn label="操作">
          <template slot-scope="scope">
            <router-link :to="{path: 'Devinfo', query: {dev_id: scope.row.id}}">
                <Button type="primary" size="mini">编辑</Button>
            </router-link>
          </template>
        </TableColumn>
      </Table>
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
    Collapse,
    CollapseItem,
    Table,
    TableColumn
  } from 'element-ui';
  export default {
    name: 'Showdevlist',
    components: {
      Form,
      FormItem,
      Input,
      Button,
      Collapse,
      CollapseItem,
      Table,
      TableColumn
    },
    data() {
      return {
        cat_id: '',
        cat_name: '',
        old_cat_name: '',
        modify_wrapper: false,
        dataList: []
      }
    },
    mounted() {
      this.cat_id = this.$route.query.catid;
      this.$axios.post(this.$store.state.host + 'searchCategoryById', qs.stringify({
        id: this.cat_id,
      }))
        .then(res => {
          if (res.data.success) {
            this.cat_name = res.data.data.cat_name;
            this.old_cat_name = res.data.data.cat_name;
          } else {
            location.reload();
          }
        })
      this.$axios.post(this.$store.state.host + 'showDevList', qs.stringify({
        id: this.cat_id,
      }))
        .then(res => {
          // console.log(res.data);
          this.dataList = res.data.data;
        })
    },
    methods: {
      modifyWrapper() {
        this.modify_wrapper = true;
      },
      modify() {
        if (this.cat_name !== this.old_cat_name) {
          this.$axios.post(this.$store.state.host + 'modifyCategory', qs.stringify({
            id: this.cat_id,
            cat_name: this.cat_name
          }))
            .then(res => {
              if (res.data.success) {
                location.reload();
              }
            })
        }
      },
      _handleModify(dev) {
        console.log(dev);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    transition: .2s ease-in-out;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    &:hover {
      box-shadow: 0 0 10px #ddd;
    }
    .header {
      position: relative;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
      .modify_wrapper {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 40px;
        text-align: right;
        .modify_input {
          display: inline-block;
          transition: .2s ease-in-out;
          width: 200px;
          position: relative;
        }
      }
    }
  }
</style>