<template>
  <div class="login-wrap">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login">
      <div class="login-center">
        <p>使用Vue构建 <b>Github</b> 可视化大数据平台</p>
        <div class="form-section">
          <div class="form-item">
            <input
              placeholder="输入您的github账号"
              class="item-input"
              type="text"
              @keyup="onKeyup"
              @blur="onBlur"
              @keyup.enter="onLogin"
              :class="[isShow ? 'active' : '']"
              v-model="userName"
              ref="nameInput"
            />
            <p class="tip" v-if="isShow">{{ tip }}</p>
          </div>
          <div class="form-item">
            <button @click="open" :disabled="btcon">{{ bttxt }}</button>
          </div>
        </div>
        <Message @onClose="onClose" :isConfirm="isConfirm" />
      </div>
    </div>
  </div>
</template>
<script>
import Message from "./../../components/message/Message";
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      tip: "*不能为空",
      isShow: false,
      isConfirm: false,
      btcon: false,
      bttxt: "登录",
    };
  },
  components: {
    Message,
  },
  watch: {
    userName(value) {
      if (value == "") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
  methods: {
    onBlur() {
      this.isShow = false;
    },
    onKeyup(e) {
      if (e.target.value == "") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    open() {
      if (this.userName === "") {
        this.isShow = true;
        return;
      }
      this.onLogin();
    },
    onClose() {
      this.isConfirm = false;
      this.$refs["nameInput"].focus();
    },
    onLogin() {
      this.btcon = true;
      this.bttxt = "请稍候...";
      var that = this;
      setTimeout(function () {
        that.btcon = false;
        that.bttxt = "网速太慢了？试试重新登陆";
      }, 5000);
      this.$axios.get(`https://api.github.com/users/${this.userName}`).then(
        (res) => {
          this.btcon = false;
          this.bttxt = "登陆";
          const { data } = res;
          sessionStorage.setItem("userkey", data.login);
          localStorage.setItem("userkey", data.login);
          this.$router.push({
            name: "Home",
            query: { user: data.login },
          });
        },
        (err) => {
          this.btcon = false;
          this.bttxt = "重新登陆";
          this.isConfirm = true;
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background-color: #006593;
  overflow: hidden;
  #particles-js {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    width: 100%;
    height: 100%;
  }
  .login {
    position: relative;
    width: 600px;
    margin: 0 auto;
    z-index: 100000;
    .login-center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
      z-index: 100000;
      p {
        font-size: 30px;
        color: white;
      }
      .form-section {
        margin-top: 30px;
        width: 70%;

        .form-item {
          .item-input {
            width: 100%;
            height: 40px;
            outline: none;
            color: white;
            font-size: 15px;
            background: none;
            padding-left: 10px;
            border-radius: 10px;
            border: 1px solid #ffffff;
          }
          input::-webkit-input-placeholder {
            color: white;
          }
          input::-moz-input-placeholder {
            color: white;
          }
          input::-ms-input-placeholder {
            color: white;
          }
          .active {
            border: 1px solid red;
          }
          .tip {
            font-size: 15px;
            padding-top: 5px;
            color: red;
          }
          button {
            width: 70%;
            height: 40px;
            line-height: 40px;
            display: block;
            margin: 20px auto auto auto;
            border: none;
            border-color: #fff;
            outline: none;
            border-radius: 10px;
            background: white;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
