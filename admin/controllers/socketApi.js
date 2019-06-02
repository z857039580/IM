const _ = require('underscore');
const config = require('../config');
const successInfo = config.successInfo;/*(code,data,msg)*/


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

/*推送未读消息*/
function unreadMsg(socket,userId) {
    let userIsread = { toUser:userId,isRead:false};
    Msg.msgFindAllIsread(userIsread).then(function(result){
        socket.emit('socket/message',successInfo(3, result,'未读消息'));
    },function(err){
        console.log(err);
    });
};

/*推送消息*/
function socketHandle(toSocket,fromSocket,msgData) {
    if(toSocket==undefined) msgData.isRead = false;

    let msgSave = new Promise((resolve,reject)=>{
        Msg.msgCreate(msgData).then(function(result){
            resolve(result);
        },function(err){
            reject(err);
        });
    });
    msgSave.then(function (result) {
        fromSocket.socket.emit('socket/message',successInfo(2, msgData,'消息'));
        if(msgData.isRead !== false){/*对方在线*/
            toSocket.socket.emit('socket/message',successInfo(2, msgData,'消息'));
        }
    }).catch(function (err) {
        console.log(err);
    })
}

module.exports = function (server) {
    const io = require('socket.io')(server,{
        allowRequest: (req, callback) => {/*callback：true=允许链接，false不允许链接*/
            // console.log('-------------------------------socket  req');
            // console.log(req._query);
            // if (req._query && req._query.token === 'abc') {
            return callback(null, true);
            // };
            // callback(null, false);
        },
    });

    let sockeIdList = [];
    io.on('connection', function(socket){
        // console.log('----------------------------socket.handshake');
        // console.log(socket.handshake.query);
        let userId = socket.handshake.query.userId;
        let user = { userId:userId, socket:socket };

        /*如果存在相同的userId,先断开*/
        sockeIdList.push(user);

        friendsList(socket, userId);
        unreadMsg(socket, userId);

        socket.on('socket/message',function (msgData) {
            let toSocket = _.findWhere(sockeIdList,{userId:msgData.toUser});
            let fromSocket = _.findWhere(sockeIdList,{userId:msgData.fromUser});
            socketHandle(toSocket,fromSocket,msgData);
        });

        socket.on('disconnect', function(){
            console.log("断开连接");
            let disconnectSocket = _.findWhere(sockeIdList,{userId:userId});
            sockeIdList = _.without(sockeIdList, disconnectSocket);
        });

    });

};