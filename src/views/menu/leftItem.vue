<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="!opened"
      :router="true"
      :default-active="$route.path"
    >
      <template v-for="item in routes">
        <el-menu-item
          v-if="(!item.children || item.children.length < 2) && !item.isHidden"
          :index="
            !item.children
              ? item.path
              : item.children.length == 1
              ? item.path + '/' + item.children[0].path
              : item.path
          "
          :key="item.path"
        >
          <i :class="item.meta.icon"></i>
          <span slot="title" v-text="item.name"></span>
        </el-menu-item>
        <el-submenu
          v-else-if="!item.isHidden"
          :index="item.path == '/' ? item.redirect : item.path"
          :key="item.path"
        >
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span v-text="item.name"></span>
          </template>
          <template v-for="i in item.children">
            <el-menu-item
              :index="item.path + '/' + i.path"
              :key="item.path + '/' + i.path"
              v-if="!i.isHidden"
            >
              <i :class="i.meta.icon"></i>
              <span v-text="i.name"></span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "leftItem",
  data() {
    return {
      routes: []
    };
  },
  computed: {
    ...mapGetters(["opened"])
  },
  created() {
    this.routes = this.$router.options.routes;
  }
};
</script>
