/**
 * Created by Administrator on 2018/4/17.
 */
var config = require('../config');

var successMsg = config.successMsg;/*(msg)*/
var successResult = config.successResult;/*(data)*/
var failureResult = config.failureResult;/*(code,msg)*/
var errorResult = config.errorResult;/*(failData)*/

var Friends = require('../model/friendsModel');

exports.listOfFriends = function(req, res, next) {
    let user = {
        userId: req.query.userId,
    };
    Friends.friendsfindAll(user).then(function(result){
        res.send(successResult(result));
    },function(err){
        res.send(errorResult(err));
    });

}





