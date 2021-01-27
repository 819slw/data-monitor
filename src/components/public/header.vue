<template>
  <div id="header">
    <div class="header-left">
      <img src="../../../static/img/logo.png" />
    </div>
    <div class="login-info" v-for="item in userInfo">
      <div class="user-info">
        <img :src="item.head" />
        <p class="user-box">
          <span class="user-name">{{ item.name }}</span>
          <span class="user-grade">{{ item.grade }}</span>
        </p>
      </div>
      <el-menu
        :default-active="activeIndex"
        :router="true"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-submenu index="2">
          <template slot="title"></template>
          <el-menu-item index="/personalCenter" @click="created"
            >个人中心</el-menu-item
          >
          <el-menu-item index="" @click="backLogin">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      userInfo: null,
    };
  },
  methods: {
    backFail: function (title) {
      this.$notify({
        title: "失败",
        message: title,
        type: "error",
      });
    },
    backFailWarn: function () {
      this.$notify({
        title: "失败",
        message: title,
        type: "请求异常，请刷新重试或联系管理员查看",
      });
    },
    backLogin: function () {
      var _this = this;
      _this.ajaxData(
        _this,
        objs.url.backLogin,
        {
          id: _this.$store.state.userId,
        },
        function (e, data) {
          if (e) {
            _this.$router.push({ path: "/login" });
          }
        }
      );
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    created() {
      this.$store.state.adminleftnavnum = "3";
    },
    initUserInfo: function () {
      var userINfo = localStorage.getItem("userINfo");
      this.userInfo = JSON.parse(userINfo);
    },
  },
  mounted() {
    this.initUserInfo();
  },
};
</script>

<style>
.login-info .el-menu {
  position: relative;
  z-index: 20;
}
.el-menu--horizontal .el-submenu .el-submenu__title:hover {
  background-color: #111620 !important;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: none;
}
.el-submenu__title i {
  font-size: 18px;
  color: #e13c8b;
}
ul.el-menu--horizontal {
  background-color: #111620 !important;
  border-bottom: none;
}
.user-name {
  font-size: 16px;
  color: #fff;
}
.user-grade {
  margin-top: 5px;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 20px;
  background-color: #55d06c;
}
.user-info .user-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-info {
  display: flex;
  padding-left: 40px;
  align-items: center;
}
.user-info img {
  width: 60px;
  height: 60px;
  margin-right: 20px;
  border-radius: 50%;
}
.login-info {
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  margin-right: 50px;
}
.login-info .message {
  width: 88px;
  height: 100%;
  border-left: 2px solid #273142;
  border-right: 2px solid #273142;
  text-align: center;
}
.login-info .message i {
  font-size: 23px;
  color: #6a7885;
  line-height: 90px;
}
#header {
  width: 100%;
  height: 90px;
  background: #111620;
}
.header-left {
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #252e42;
  float: left;
}
.flex {
  display: flex;
}
.el-header {
  padding: 0 !important;
  height: 90px !important;
}
</style>
