<template>
  <transition name="el-fade-in-linear">
    <el-form
      v-show="isShow"
      :model="loginForm"
      :rules="fieldRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <!-- <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button> -->
        <el-button
          type="primary"
          style="width:48%"
          @click.native.prevent="login"
          :loading="logining"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
  </transition>
</template>

<script>
export default {
  name: "Login",
  data() {
    //校验用户名和密码
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      //   callback(new Error("Please enter the correct user name"));
      // } else {
      //   callback();
      // }
      if (value == "") {
        callback(new Error("Please enter the user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };

    return {
      isShow: false,
      logining: false,
      loginForm: {
        username: "admin",
        password: "123456"
      },
      fieldRules: {
        //↓与<el-form-item>prop对应
        username: [
          { required: true, validator: validateUsername, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ]
      },
      checked: true
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              console.log('登陆成功！')
              this.$router.push({ path: "/" });
              // this.loading = false;
            })
            .catch(() => {
              // this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.isShow = true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 400px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
