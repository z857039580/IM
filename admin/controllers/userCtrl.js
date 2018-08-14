/**
 * Created by Administrator on 2018/4/17.
 */
var config = require('../config');

var cryptoSha256 = config.cryptoSha256;
var successMsg = config.successMsg;/*(msg)*/
var successResult = config.successResult;/*(data)*/
var failureResult = config.failureResult;/*(code,msg)*/
var errorResult = config.errorResult;/*(failData)*/

var User = require('../model/userModel');

exports.register = function(req, res, next) {
    let user = {
        userId: req.body.userId,
        password: cryptoSha256(req.body.password)
    };
    const promiseResult = new Promise(function (resolve, reject) {
        User.userFindOne(user).then(function(result){
            resolve(result)
        },function(err){
            reject(err)
        });
    })
    promiseResult.then(function (result) {
        if(result==null){
            User.userCreate(user).then(function(result){
                res.send(successResult(result));
            },function(err){
                res.send(errorResult(err));
            });
        }else{
            res.send(failureResult(-3,'帐号已被占用'))
        }
    }).catch(function (err) {
        res.send(errorResult(err));
    });

}
exports.login = function(req, res, next) {
    let user = {
        userId: req.body.userId,
        password: cryptoSha256(req.body.password)
    };
    User.userFindOne(user).then(function(result){
        if(result==null) return res.send(failureResult(-1,'用户未注册'))
        if(user.password!=result.password) return res.send(failureResult(-2,'帐号密码不匹配'))
        if(user.password==result.password) {
            res.send({
                code:0,
                data:result,
                token:config.tokenSign(req.body.userId),
                msg:'登录成功',
            })
        }
    },function(err){
        res.send(errorResult(err));
    });
}
exports.searchUser = function(req, res, next) {
    let user = {
        userId: req.query.userId,
    };
    User.userFindOne(user).then(function(result){
        res.send(successResult(result))
    },function(err){
        res.send(errorResult(err));
    });
}





