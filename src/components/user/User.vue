<template>
  <div class="info-wrap border-box-content">
    <div class="info-left">
      <img :src="dataObj.avatar_url"
           alt="" />
    </div>
    <div class="info-right">
      <h1 v-if="dataObj.login">{{dataObj.login}}</h1>
      <h1 v-else>暂无</h1>
      <span>加入github</span>
      <p v-if="dataObj.created_at">{{dataObj.created_at | formatDate}}</p>
      <p v-else>暂无</p>
      <p>{{dataObj.location}}</p>
    </div>
  </div>
</template>

<script>
import { formatDate } from './../../common/js/date'
export default {
  name: "User",
  props: {
    dataObj: Object
  },
  filters: {
    // 对日期格式化处理
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped lang="scss">
.info-wrap {
  display: flex;
  flex-direction: row;
  z-index: 99;
  .info-left {
    height: 100%;
    border-radius: 50%;
    padding: 10px;
    border: 1px solid #4788fb;
    img {
      display: block;
      width: 100%;
      height: 100%;
      background-size: 100% 100% !important;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .info-right {
    display: flex;
    flex-direction: column;
    vertical-align: top;
    margin-left: 10px;
    h1 {
      flex: 3;
      margin-top: 1.5vh;
      font-size: 3vh;
      line-height: 3vh;
      font-weight: 700;
      color: #25f3e6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      flex: 2;
      display: block;
      color: #f6a645;
      font-size: 2vh;
      text-decoration: none;
      cursor: none;
    }
    span {
      flex: 1;
      display: block;
      font-size: 1vh;
      color: #fff;
    }
  }
}
</style>