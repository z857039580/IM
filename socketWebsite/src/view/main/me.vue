<template>
  <div class="me">
    <div class="userInfo">
      <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
      <span class="contacts centerTop">
        <h1>名字</h1>
        <p>微信号：123456</p>
      </span>
    </div>
    <div class="switchAccounts">切换帐号</div>
    <router-link to="/loginORregister"><div class="logout">退出登录</div></router-link>
  </div>
</template>

<script>
  export default {
    name: 'me',
    data () {
      return {
        avatarImgStyle: {
          'background-image': "url('static/images/header.jpg')"
        }
      }
    },
    mounted: function () {
    },
    methods: {
    },
  }
</script>

<style lang="scss" scoped>
  .me {
    .userInfo {
      border-bottom: $borderGray solid 1px;
      border-top: $borderGray solid 1px;
      height: $size66;
      padding: $size10;
      position: relative;
      margin: $size15 0 $size20 0;
      span {
        display: block;
      }
      .avatarImg {
        height: $size66;
        width: $size66;
        position: absolute;
        top: $size10;
        left: $size10;
        border-radius: $size4
      }
      .contacts {
        padding-left: $size76;
        h1 {
          font-size: $size15;
          margin-bottom: $size10;
        }
        p {
          font-size: $size12;
          color: $colorGray2;
        }
      }
    }
    .switchAccounts{ padding: $size10; border-top: 1px solid $borderGray; border-bottom: 1px solid $borderGray; text-align: center; margin-top: $size15;}
    .logout{ padding: $size10; border-top: 1px solid $borderGray; border-bottom: 1px solid $borderGray; text-align: center; margin-top: $size15;}



  }
</style>
