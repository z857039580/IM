<template>
  <div class="material">
    <header>
      <i @click="$router.back(-1)"><font-awesome-icon :icon="['fas', 'chevron-left']" /></i>
      编辑资料
      <i @click="submitUpload">保存</i>
    </header>
    <ul class="content">

      <li class="userInfo">
        <p>头像</p>
        <span class="bgImg avatarImg" :style='{"background-image":"url("+avatarSrc+")"}'>
          <el-upload class="selectAvatar"
                       ref="uploadAvatar"
                       :auto-upload='false'
                       :headers="myHeaders"
                       :show-file-list="false"
                       action="http://192.168.26.136:3334/v1/avatar"
                       list-type="picture-card"
                       :on-change="selectAvatar">
            <i class="el-icon-plus"></i>
          </el-upload>
        </span>
      </li>

      <li>
        <p>昵称</p>
        <input type="text" v-model="user.data.nickname">
        <i class="rightArrow centerTop"><font-awesome-icon :icon="['fas', 'chevron-right']" /></i>
      </li>
      <li>
        <p>个性签名</p>
        <input type="text" v-model="user.data.signature">
        <i class="rightArrow centerTop"><font-awesome-icon :icon="['fas', 'chevron-right']" /></i>
      </li>
      <li>
        <p>手机号</p>
        <input type="number" v-model="user.data.tel">
        <i class="rightArrow centerTop"><font-awesome-icon :icon="['fas', 'chevron-right']" /></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
  export default {
    name: 'material',
    data () {
      return {
        myHeaders:{},
        avatarSrc: '',
      }
    },
    created:function () {
    },
    computed: {
      ...mapGetters(['user']),
    },
    mounted: function () {
        this.myHeaders['authorization'] = this.user.token;
        this.avatarSrc = this.user.data.avatar || this.defaultAvatar;
    },
    methods: {
      ...mapMutations(['uesrMutations']),
      currentUserInfo(){
        let param = {userId: this.user.data.userId, token:this.user.token};
        this.api_searchUser(param).then((res) => {
            if(res.code===0){
              this.uesrMutations({data:res.data,token:param.token});
            }
        });
      },
      submitUpload() {
        let param = {
          userId: this.$route.params.userId,
          nickname: this.user.data.nickname,
          signature: this.user.data.signature,
          tel: this.user.data.tel,
        };
        this.updateUserInfo(param).then((res) => {
            if(res.code===0){
              this.currentUserInfo();
              this.$router.go(-1);
            };
        });
        this.$refs.uploadAvatar.submit();
      },
      selectAvatar(file) {
        this.avatarSrc = file.url;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .material{
    header{position: fixed; top: 0; left: 0; width: 100%; z-index: 2; color:#fff; background-color: #38383d; height: $size44; line-height: $size44; font-size: $size18; text-align: center;
      i:first-child{ position: absolute; left: $size10; top: 0; font-size: $size18;}
      i:last-child{position: absolute;right: 0.5rem;top: 0; font-size: 0.7rem;}
    }
    ul.content{ border-top: 1px solid $borderGray; border-bottom: 1px solid $borderGray; margin-top: $size54; padding-left: $size10;
      li{position: relative; height: $size44; border-bottom: 1px solid $borderGray;
        &:last-child{ border-bottom: none}
        p{height: $size44; line-height: $size44; position: absolute; left: 0; font-weight: 600}
        input{ border: none; height: $size16; position: absolute;right: $size30; top: $size14; width: 60%; text-align: right; color: #888;}
        .rightArrow{ right: $size10; color: $borderGray;}
      }
      li.userInfo {
        height: $size66;
        padding: $size10;
        position: relative;
        p{ line-height: $size66}
        .avatarImg {
          display: inline-block;
          height: $size66;
          width: $size66;
          position: absolute;
          top: $size10;
          right: $size10;
          border-radius: $size4;
          .selectAvatar{ opacity: 0; width: 100%; height: 100%; position: absolute; top: 0; left: 0; overflow: hidden; }
        }
      }
    }
  }
</style>

