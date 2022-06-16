<template>
  <div class="home">
    <div class="loading" v-if="isLoading">
      <dv-loading class="txt">数据加载中...</dv-loading>
    </div>
    <div class="header">
      <Header />
    </div>
    <div class="container">
      <dv-border-box-1>
        <div class="container-wrap">
          <div class="container-left">
            <HomeLeft :dataObj="dataObj" />
          </div>
          <div class="container-right">
            <div class="container-center">
              <div class="container-center-left">
                <dv-border-box-10 class="center-item">
                  <Warehouse :dataObj="dataObj" />
                </dv-border-box-10>
                <div class="tab-list">
                  <Lately />
                </div>
              </div>
              <div class="container-center-right">
                <dv-border-box-3 class="info">
                  <User :dataObj="dataObj" />
                </dv-border-box-3>
                <dv-border-box-3 class="classification">
                  <Fans :dataObj="dataObj" />
                </dv-border-box-3>
              </div>
            </div>
          </div>
        </div>
      </dv-border-box-1>
    </div>
  </div>
</template>

<script>
import Header from "./../components/app-header/Header";
import HomeLeft from "./center/HomeLeft";
import Fans from "./../components/fans/Fans";
import User from "./../components/user/User";
import Warehouse from "./../components/warehouse/Warehouse";
import Lately from "./../components/lately/Lately";
export default {
  name: "Home",
  data() {
    return {
      userName: "",
      fans: [], //获取粉丝量
      dataObj: {},
      isLoading: true, //加载状态
    };
  },
  components: {
    Header,
    HomeLeft,
    Fans,
    User,
    Warehouse,
    Lately,
  },
  methods: {
    getUserInfo() {
      this.$axios
        .get(`https://api.github.com/users/${this.userName}`)
        .then((res) => {
          const { data } = res;
          this.dataObj = data;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.userName = this.$route.query.user;
    if (!this.userName || this.userName != localStorage.userkey) {
      this.$router.push({
        name: "Login",
      });
      return;
    }
    this.getUserInfo();
  },
};
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  background-image: url(../assets/bgtu.png);
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 5px;
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    .txt {
      color: #ffffff;
      padding-top: 10px;
    }
  }
  .header {
    height: 15%;
  }
  .container {
    width: 100%;
    height: 85%;
    .container-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      .container-left {
        width: 14%;
        height: 100%;
      }
      .container-right {
        width: 86%;
        height: 100%;
        margin-left: 10px;
        .container-center {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          .container-center-left {
            height: 100%;
            flex: 3;
            .tab-list {
              width: 100%;
              height: 30%;
              margin-top: 5px;
              margin-bottom: 5px;
            }
          }
          .container-center-right {
            height: 100%;
            flex: 1;
          }
          .center-item {
            height: 70%;
          }
          .info {
            width: 100%;
            height: 30%;
            margin-left: 5px;
          }
          .classification {
            height: 70%;
            margin-top: 5px;
            margin-left: 5px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
