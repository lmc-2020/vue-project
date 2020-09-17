<template>
  <div class="top-item">
    <div class="top-left-item">
      <i
        :class="opened ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="close"
      ></i>
      <el-breadcrumb separator="/">
        <template v-if="crumbs[0].name == '首页'">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
        </template>
        <template v-else>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in crumbs" :key="item.path">{{
            item.name
          }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div>
      <router-link to="/message/message">
        <el-badge is-dot class="item" title="我的消息">
          <el-button
            class="share-button"
            icon="el-icon-message"
            type="primary"
            size="mini"
          ></el-button>
        </el-badge>
      </router-link>
      <el-dropdown>
        <div>
          <el-avatar
            size="medium"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <span class="margin-left-10">{{ userName }}，欢迎你！</span>
        </div>
        <el-dropdown-menu slot="dropdown" style="width: 150px">
          <el-dropdown-item
            ><div @click="$router.push('/')">首页</div></el-dropdown-item
          >
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item divided
            ><div @click="loginOut">退出登陆</div></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { removeToken, getToken } from "@/utils/auth";

export default {
  name: "topItem",
  data() {
    return {
      userName: "",
      crumbs: []
    };
  },
  computed: {
    ...mapGetters(["opened"])
  },
  methods: {
    close() {
      this.$store.dispatch("updateIsOpenMenu");
    },
    loginOut() {
      removeToken("vtoken");
      this.$message.success("退出登录！");
      this.$router.push("/login");
    }
  },
  created() {
    this.crumbs = this.$route.matched;
    this.userNames = getToken("vtoken");
    this.userName =
      Array.isArray(this.userNames) && this.userNames.length > 0
        ? this.userNames[0]
        : this.userNames;
  },
  watch: {
    $route(val) {
      this.crumbs = val.matched;
    }
  }
};
</script>
