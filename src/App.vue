<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">题目输入</template>
            <el-menu-item index="2-1"><router-link to='/dtsr'></router-link>单题输入</el-menu-item>
            <el-menu-item index="2-1">批量导入</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">题目管理</template>
            <el-menu-item index="3-1">审核</el-menu-item>
            <el-menu-item index="3-2">共享</el-menu-item>
            <el-menu-item index="3-3">批量管理</el-menu-item>
            <el-submenu index="3-4">
              <template slot="title">查询</template>
              <el-menu-item index="3-4-1">模糊查询</el-menu-item>
              <el-menu-item index="3-4-2">统计分析</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if(key == '1'){
          this.$router.push('/')
        }
        if(key=='2-1'){
          this.$router.push('/dtsr')
        }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
