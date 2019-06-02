import Vue from "vue";
import Vuex from "vuex";
import service from "./service.js";
import socketIo from "socket.io-client";

Vue.use(service);
Vue.use(Vuex);

const state = {
  socket: null,
  socketMsg: [],
  listOfFriends:[],
};

const getters = {
  user: (state) => {
    return Vue.prototype.getUser();
  },
  getChatMsg: (state) => (userId) => {
    let list = state.socketMsg.filter(function (x) {
      return (x.toUser === userId || x.fromUser === userId) && x.type === 1;
    });
    return list;
  },
  getFriendsInfo: (state) => (userId) => {
    let list = state.listOfFriends.filter(function (x) {
      return x.friendUserId === userId;
    });
    if(list.length===0) return null;
    return list[0];
  },
  getAddMsg: (state) => {
    let list = state.socketMsg.filter(function (x) {
      return x.type === 2;
    });
    return list;
  },
};

const mutations = {
  uesrMutations(state,user) {
    Vue.prototype.setUser(user);
  },
  socketMutations(state,socket) {
    state.socket = socket;
  },
  receiveMsgMutations(state,msg) {
    /*/!*type： 1：私聊消息 2：添加好友 3：删除好友 4：拉黑好友*!/
    switch(msg.type)
    {
      case 1:
        state.socketMsg.push(msg);
        break;
    }*/
    state.socketMsg.push(msg);
  },
  listOfFriendsMutations(state,data) {
    state.listOfFriends = data;
  },
};

const actions = {
  connectSocket(context){
    let socket = socketIo.connect(Vue.prototype.api_Address,{
      query: {
        token: getters.user().token,
        userId: getters.user().data.userId
      }
    });
    context.commit("socketMutations", socket);

    socket.on('socket/message',function (res) {
      console.log('----------------------------------socket/message------');
      console.log(res);
      switch(res.code)/*code状态码    1：好友列表    2：消息     3：未读消息*/
      {
        case 1:
          context.commit("listOfFriendsMutations", res.data);
          break;
        case 2:
          context.commit("receiveMsgMutations", res.data);
          break;
        case 3:
          res.data.forEach(function (val) {
            context.commit("receiveMsgMutations", val);
          });
          break;
      }
    });

    socket.on('disconnect', function(){
      console.log("---断开连接");
    });
  }


};


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
