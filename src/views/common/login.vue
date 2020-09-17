<template>
  <div>
    <div class="login-box">
      <div class="form-box">
        <p class="title">欢迎登录</p>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="65px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              style="width: 100%"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { setToken, getToken } from "@/utils/auth";

export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setToken("vtoken", this.ruleForm.name);
          this.$nextTick(() => this.$router.push("/"));
        } else {
          return false;
        }
      });
    }
  },
  created() {
    let token = getToken("vtoken");
    if (token && token.length > 0) {
      this.$message.success("您已登录，已为您自动跳转首页！");
      this.$router.replace("/");
    }
    let that = this;
    document.onkeyup = e => {
      e = e || window.event;
      let key = e.keyCode;
      if (key === 13) {
        that.submitForm("ruleForm");
      }
    };
  },
  destroyed() {
    document.onkeyup = undefined;
  }
};
</script>
