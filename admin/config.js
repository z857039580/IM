/**
 * Created by Administrator on 2018/4/17.
 */
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

exports.requestURL = 'http://192.168.26.136:3333';

exports.cryptoSha256 = function (str) {
    return crypto.createHash('sha256').update(str).digest('hex');
};

exports.successInfo = function (code,data,msg) {
    return {
        code:code,
        data:data,
        msg:msg
    }
};
exports.successMsg = function (msg) {
    return {
        code:0,
        data:'',
        msg:msg
    }
};
exports.successResult = function (data) {
    return {
        code:0,
        data:data,
        msg:'success'
    }
};
exports.failureResult = function (code,msg) {
    return {
        code:code,
        data:'',
        msg:msg
    }
};
exports.errorResult = function (failData) {
    return {
        code:-9999,
        data:failData,
        msg:'error'
    }
};


const secretOrPrivateKey = "I am a webSocket app!"; // 这是加密的key（密钥）
exports.tokenSign = function (userId) {
    let content = {// 要生成token的主题信息
        userId: userId,
        loginAt: new Date(),
    };
    let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 360*24,  // 24小时过期
    });
    return token;
};
exports.tokenVerify = function (token) {
    let result;
    jwt.verify(token, secretOrPrivateKey, function (err, decode) {
        if (err) {  //  时间失效的时候/ 伪造的token
            result = false;
        } else {
            result = true;
        }
    });
    return result;
};


