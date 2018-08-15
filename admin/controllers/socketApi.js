var _ = require('underscore');
var config = require('../config');
var successInfo = config.successInfo;/*(code,data,msg)*/


const Friends = require('../model/friendsModel');
const Msg = require('../model/msgModel');

/*推送好友列表*/
function friendsList(socket,userId) {
    Friends.friendsfindAll({ userId: userId}).then(function(result){
        socket.emit('socket/message',successInfo(1, result,'好友列表'));
    },function(err){
        console.log(err);
    });
};

/*推送消息*/
function socketHandle(toSocket,fromSocket,msgData) {
    let msgContent = msgData;
    if(toSocket==undefined) msgContent.isRead = false;

    const msgSave = new Promise((resolve,reject)=>{
        Msg.msgCreate(msgData).then(function(result){
            resolve(result);
        },function(err){
            reject(err);
        });
    });
    msgSave.then(function (result) {
        if(msgContent.isRead == false){/*对方离线*/
            fromSocket.socket.emit('socket/message',successInfo(2, msgContent,'消息'));
        }else{/*对方在线*/
            toSocket.socket.emit('socket/message',successInfo(2, msgContent,'消息'));
            fromSocket.socket.emit('socket/message',successInfo(2, msgContent,'消息'));
        }
    }).catch(function (err) {
        console.log("---------------保存信息失败");
        console.log(err);
    })
}

/*推送未读消息*/
function unreadMsg(socket,userId) {
    let userIsread = { toUser:userId,isRead:false};
    Msg.msgFindAllIsread(userIsread).then(function(result){
        socket.emit('socket/message',successInfo(3, result,'未读消息'));
    },function(err){
        console.log(err);
    });
};




module.exports = function (server) {
    var io = require('socket.io')(server);
/*
    /!*  socket拦截  *!/
    io.origins((origin, callback) => {
        // if (origin !== 'https://foo.example.com') {
        //     return callback('origin not allowed', false);
        // }
        callback(null, true);
    });
*/

    let sockeIdList = [];
    io.on('connection', function(socket){

        socket.on('socket/setUserId',function (data) {
            let user = { userId:data.userId, socket:socket };
            let disconnectSocket = _.findWhere(sockeIdList,{userId:user.userId});
            sockeIdList = _.without(sockeIdList, disconnectSocket);
            sockeIdList.push(user);

            friendsList(socket,data.userId);
            unreadMsg(socket,data.userId);
        });

        socket.on('socket/message',function (msgData) {
            var toSocket = _.findWhere(sockeIdList,{userId:msgData.toUser});
            var fromSocket = _.findWhere(sockeIdList,{userId:msgData.fromUser});
            socketHandle(toSocket,fromSocket,msgData);
        });

        socket.on('disconnect', function(){
            console.log("断开连接");
        });

    });

}