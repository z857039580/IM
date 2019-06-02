<template>
  <div class="me">
    <router-link :to="{name:'information', params:{ 'userId':user.data.userId}}">
      <div class="userInfo">
        <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
        <span class="contacts centerTop">
          <h1>名字</h1>
          <p>微信号：123456</p>
        </span>
        <i class="rightArrow centerTop"><font-awesome-icon :icon="['fas', 'chevron-right']" /></i>
      </div>
    </router-link>
    <div class="switchAccounts">切换帐号</div>
    <div class="logout" @click="signOut">退出登录</div>
  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
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
    computed: {
      ...mapGetters(['user']),
    },
    methods: {
      signOut:function () {
          this.removeUser();
          this.$router.push({path: '/signUp'});
      }
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
      .rightArrow{right: $size10;color: $colorGray3}
    }
    .switchAccounts{ padding: $size10; border-top: 1px solid $borderGray; border-bottom: 1px solid $borderGray; text-align: center; margin-top: $size15;}
    .logout{ padding: $size10; border-top: 1px solid $borderGray; border-bottom: 1px solid $borderGray; text-align: center; margin-top: $size15;}

  }
</style>
