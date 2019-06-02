<template>
  <div class="material">
    <header>
      <i @click="$router.back(-1)"><font-awesome-icon :icon="['fas', 'chevron-left']" /></i>
      详细资料
    </header>

    <div class="userInfo">
      <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
      <span class="contacts centerTop">
          <h1>名字</h1>
          <p>微信号：123456</p>
          <p>昵称：11asasda</p>
        </span>
      <i class="rightArrow centerTop"><font-awesome-icon :icon="['fas', 'chevron-right']" /></i>
    </div>

    <el-row class="label">
      <el-col :span="5"><div class="grid-content caption">标签</div></el-col>
      <el-col :span="16"><div class="grid-content labelName"><i>朋友</i><i>同事</i><i>朋友</i><i>同事</i></div></el-col>
      <el-col :span="3"><div class="grid-content rightArrow"><font-awesome-icon :icon="['fas', 'chevron-right']" /></div></el-col>
    </el-row>

    <div class="activity">
      <el-row class="address">
        <el-col :span="5"><div class="grid-content caption">地区</div></el-col>
        <el-col :span="19"><div class="grid-content">广东 深圳</div></el-col>
      </el-row>
      <el-row class="photo">
        <el-col :span="5"><div class="grid-content caption">个人相册</div></el-col>
        <el-col :span="16">
          <div class="grid-content activityImg">
            <i class="bgImg" :style="avatarImgStyle"></i>
            <i class="bgImg" :style="avatarImgStyle"></i>
            <i class="bgImg" :style="avatarImgStyle"></i>
          </div>
        </el-col>
        <el-col :span="3"><div class="grid-content rightArrow"><font-awesome-icon :icon="['fas', 'chevron-right']" /></div></el-col>
      </el-row>

      <el-row class="more">
        <el-col :span="21"><div class="grid-content caption">更多</div></el-col>
        <el-col :span="3"><div class="grid-content rightArrow"><font-awesome-icon :icon="['fas', 'chevron-right']" /></div></el-col>
      </el-row>
    </div>

    <button class="addUser" @click="addDialog = true">添加</button>
    <button v-if="friendStatus==null" class="addUser">添加到通讯录</button>
    <button v-else-if="friendStatus.status==2 || friendStatus.status==4" class="addUser">添加到通讯录</button>
    <router-link v-else-if="friendStatus.status==1" :to="{name:'chat', params:{ 'userId':friend.userId}}"><button class="sendMsg">发消息</button></router-link>


    <el-dialog :visible.sync="addDialog" custom-class="addSendMsg" :fullscreen=true>
      <div slot>
        <div class="content">
          <div class="addSenHeader">
            <i @click="addDialog=false"><font-awesome-icon :icon="['fas', 'chevron-left']" /></i>
            朋友验证
            <b @click="sendMsg">发送</b>
          </div>
          <h1>你需要发送验证申请，等对方通过</h1>
          <div class="sendText">
            <input type="text" v-model="messageText">
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
export default {
  name: 'material',
  data () {
    return {
      addDialog:false,
      avatarImgStyle: {
        'background-image': "url('static/images/header.jpg')"
      },
      friend: {},
      messageText:'',
    }
  },
  created:function () {
  },
  computed: {
    ...mapGetters(['user']),
    ...mapState(['socket']),
    friendStatus(){
        return this.$store.getters.getFriendsInfo(this.$route.params.userId)
    },
  },
  mounted: function () {
    let param = {userId: this.$route.params.userId};
    this.api_searchUser(param).then((res) => {
        this.friend = res.data;
    });
  },
  methods: {
    sendMsg:function () {
      this.addDialog=false;
      let msg = {
        type:2,
        fromUser:this.user.data.userId,
        toUser:this.friend.userId,
        msg:this.messageText,
        sentTime:new Date().getTime()
      };
      this.socket.emit('socket/message',msg);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  header{position: fixed; top: 0; left: 0; width: 100%; z-index: 2; color:#fff; background-color: #38383d; height: $size44; line-height: $size44; font-size: $size18; text-align: center;
    i{ position: absolute; left: $size10; top: 0; font-size: $size18;}
  }
  .material{ min-height: 100vh; background-color: $colorBg; overflow-y: scroll;
    .userInfo{ background-color: #fff; border-bottom: $borderGray solid 1px; border-top: $borderGray solid 1px; height: $size66; padding: $size10; position: relative; margin:$size60 0 $size20 0;
      span{ display: block;}
      .avatarImg{ height: $size66; width: $size66; position: absolute; top: $size10; left: $size10; border-radius: $size4}
      .contacts{ padding-left: $size76;
        h1{ font-size: $size15;}
        p{ font-size: $size12; color: $colorGray2; margin-top: $size8;}
      }
      .rightArrow{ right: $size10; font-size: $size24; color: $colorGray3}
    }

    .label{ padding: $size10; background-color: #fff; border-bottom: $borderGray solid 1px; border-top: $borderGray solid 1px; font-size: $size14;
      .labelName{
        i{ margin-right: $size15; color: $colorGreen}
      }
      .rightArrow{ text-align: right; color: $colorGray3}
    }

    .activity{background-color: #fff; border-bottom: $borderGray solid 1px; border-top: $borderGray solid 1px; margin: $size15 0 $size25 0; padding-left: $size10; font-size: $size14;
      .address{ border-bottom: $borderGray solid 1px; padding: $size10 0;}
      .photo{ border-bottom: $borderGray solid 1px; padding: $size10 $size10 $size10 0;
        .caption{ line-height: $size54;}
        .activityImg{
          i{ margin-right: $size6; height: $size54; width: $size54; display: block; float: left}
          &:after{ display: block; content: ''; clear: both;}
        }
        .rightArrow{ text-align: right; color: $colorGray3; line-height: $size54;}
      }
      .more{ padding: $size10 $size10 $size10 0;
        .rightArrow{ text-align: right; color: $colorGray3;}
      }
    }

    .sendMsg{ display: block; background-color: $colorGreen; color:#fff; width: 90%; margin: 0 auto; height: $size50; border: none; border: none; border-radius: $size4; font-size: $size18}
    .addUser{ display: block; background-color: $colorGreen; color:#fff; width: 90%; margin: 0 auto; height: $size50; border: none; border: none; border-radius: $size4; font-size: $size18}
  }
</style>

