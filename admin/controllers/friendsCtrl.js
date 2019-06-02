/**
 * Created by Administrator on 2018/4/17.
 */
const config = require('../config');
const successMsg = config.successMsg;/*(msg)*/
const successResult = config.successResult;/*(data)*/
const failureResult = config.failureResult;/*(code,msg)*/
const errorResult = config.errorResult;/*(failData)*/

const Friends = require('../model/friendsModel');

exports.listOfFriends = function(req, res, next) {
    let user = {
        userId: req.query.userId,
    };
    Friends.friendsfindAll(user).then(function(result){
        res.send(successResult(result));
    },function(err){
        res.send(errorResult(err));
    });

};





