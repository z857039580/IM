<template>
  <div id="loginAfter" class="loginAfter">
    <router-view/>
  </div>
</template>

<script>
  import store from '../store';
export default {
  name: 'loginAfter',
  mounted: function () {
      if(this.getUser()!=null){
        /* 连接socket  接收socket信息*/
        let socketUser = {userId: this.getUser().data.userId};
        let socket = this.socketApi(socketUser);
        store.commit('connectSocket',socket);
        socket.on('socket/message',function (res) {
          console.log("---------------------------------socket/message");
          console.log(res);
          switch(res.code)
          {
            case 1:/*好友列表*/
              store.commit('setListOfFriends',res.data);
              break;
            case 2:/*聊天消息*/
              store.commit('receiveMsg',res.data);
              break;
            case 3:/*未读消息*/
              res.data.forEach((val,i)=>{
                store.commit('receiveMsg', val);
              });
              break;
            default:
              console.log("msg.code未定义");
              break;
          }

        });
      }
  },
}
</script>


<style lang="scss" scoped>
  /*@media screen and (min-width:768px){
    .app{ width: 80%; height: 88vh; margin: 6vh auto 6vh auto; overflow-y: scroll;}
  }
  @media screen and (min-height:992px){
    .app{ width: 70%; height: 88vh; margin: 6vh auto 6vh auto; overflow: scroll;}
  }
  @media screen and (min-height:1200px){
    .app{ width: 700px; height: 88vh; margin: 6vh auto 6vh auto; overflow: scroll;}
  }*/
</style>



<!--超小屏幕 手机 (<768px)	小屏幕 平板 (≥768px)	中等屏幕 桌面显示器 (≥992px)	大屏幕 大桌面显示器 (≥1200px)-->
