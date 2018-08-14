<template>
  <div class="material">
    <header>
      <b @click="$router.back(-1)"><font-awesome-icon class="leftArrow" :icon="['fas', 'angle-left']" />详细资料</b>
      <h1>详细资料</h1>
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

    <router-link :to="{ name: 'chat', params: { userId:userInfo.userId }}"><button class="sendMsg">发消息</button></router-link>
    <button class="addUser">添加到通讯录</button>

  </div>
</template>

<script>
export default {
  name: 'material',
  data () {
    return {
      avatarImgStyle: {
        'background-image': "url('static/images/header.jpg')"
      },
      userInfo: {}
    }
  },
  mounted: function () {
    let param = {userId: this.$route.params.userId};
    console.log(this.$route.params.userId)
    this.api_searchUser(param).then((res) => {
        this.userInfo = res.data;
    });
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  header{position: fixed; top: 0; left: 0; width: 100%; z-index: 2; color:#fff; background-color: #38383d; height: $size44; font-size: $size18;
    b{ position: absolute; left: $size10; top: 0; font-size: $size16; line-height: $size44;
      .leftArrow{ font-size: $size18; margin-right: $size4; position: relative; top: $size2;}
    }
    h1{ text-align: center; line-height: $size44;}
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
