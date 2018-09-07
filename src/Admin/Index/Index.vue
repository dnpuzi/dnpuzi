<template>
  <div class="admin_index_wrapper">
    <Header></Header>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/Admin/Header/Header';
export default {
  name: 'index',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1100px;
  margin: 0 auto;
}
</style>