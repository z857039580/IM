<template>
  <div class="talking">
    <header>
      <b @click="$router.back(-1)"><font-awesome-icon class="leftArrow" :icon="['fas', 'angle-left']" />返回</b>
      <h1>{{friendsDetails.userId}}</h1>
    </header>

    <div class="talkingContent">
      <ul>
        <li v-for="msgInfo in $store.state.socketMsg[friendsDetails.userId]">

          <div class="myselfMsg contactsInfo" v-if="msgInfo.fromUser == $store.state.user.data.userId">
            <span class="contacts">
              <img class="talkingContentIcon" src="static/images/talkingContentIcon5.png" alt="">
              <div class="msgContent">
                <p>{{msgInfo.msg}}</p>
              </div>
            </span>
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
          </div>

          <div class="otherMsg contactsInfo" v-else>
            <span class="bgImg avatarImg" :style="avatarImgStyle"></span>
            <span class="contacts">
              <img class="talkingContentIcon" src="static/images/talkingContentIcon4.png" alt="">
              <p>{{msgInfo.msg}}</p>
            </span>
          </div>

        </li>
      </ul>
    </div>

    <div class="sendMessage">
      <div class="messageContent">
        <input type="text" class="msgInput" v-model="messageText">
        <button @click="sendMessage">发送</button>
      </div>
    </div>

  </div>
</template>

<script>
  import store from '../store';
export default {
  name: 'chat',
  data () {
    return {
      friendsDetails:{},
      messageText:'',
      avatarImgStyle: {
        'background-image': "url('static/images/header.jpg')"
      }
    }
  },
  mounted: function () {/*渲染前执行*/
    let param = {userId: this.$route.params.userId};
    this.api_searchUser(param).then((res) => {
      this.friendsDetails = res.data;
      console.log(this.friendsDetails);
    });

  },
  methods: {
      sendMessage(){
        let msg = {
          type:1,
          fromUser:store.state.user.data.userId,
          toUser:this.friendsDetails.userId,
          msg:this.messageText,
          sentTime:new Date().getTime()
        };
        store.state.socket.emit('socket/message',msg);
      }
  }
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
  .talking{ background-color: $colorBg2; min-height: 100vh; overflow-y: scroll;
    .talkingContent{ padding: $size50 0;
      ul{
        li{ padding:0 $size10;
          .contactsInfo.otherMsg{ position: relative; margin-bottom: $size14;
            span{ display: block;}
            .avatarImg{ height: $size38; width: $size38; position: absolute; top: 0; left: 0; border-radius: $size2}
            .contacts{ padding-left: $size48; position: relative;
              .talkingContentIcon{ width: $size8; position: absolute; top: $size6; margin-left: -$size6;}
              p{ font-size: $size15; word-break: break-all; line-height: 1.2; background-color: #fff; display: inline-block; max-width: 66.6%; padding: 0.5em; border-radius: $size4; border: 1px solid $borderGray;}
            }
          }
          .contactsInfo.myselfMsg{ position: relative; margin-bottom: $size14;
            span{ display: block;}
            .contacts{ padding-right: $size48; position: relative;
              .talkingContentIcon{ width: $size8; position: absolute; top: $size6; right: $size48; margin-right: -$size6;transform:rotate(180deg);}
              .msgContent{
                p{ border: 1px solid #92d553; display: inline-block; color: $colorBlack; float: right; word-break: break-all; font-size: $size15; line-height: 1.2; background-color: $colorGreen2; max-width: 66.6%; padding: 0.5em; border-radius: $size4;}
                &:after{ display: block; content: ''; clear: both;}
              }
            }
            .avatarImg{ height: $size38; width: $size38; position: absolute; top: 0; right: 0; border-radius: $size2}
          }
        }
      }
    }
    .sendMessage{position: fixed; bottom: 0; left: 0; width: 100%; color:$colorBlack; background-color: #fff; font-size: $size14; border-top: 1px solid $borderGray;
      .messageContent{ padding:$size8 $size10; height: $size38; position: relative;
        .msgInput{ height: 100%; width: 100%; border-radius: $size4; border: solid 1px $borderGray; word-break: break-all;}
        button{ padding: $size4 $size10; border: none; background-color: $colorGreen2; position: absolute; right: $size4; top: $size12;}
      }
    }
  }
</style>
