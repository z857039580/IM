const Seq = require('../db');
const Sequelize = Seq.Sequelize;
const sequelizeDB = Seq.sequelizeDB;

//定义表的模型
const userModel = sequelizeDB.define('user',
    {
        'userId': {
            'type': Sequelize.STRING(20),
            'primaryKey': true,
            'unique':true,
            'allowNull': false
        },
        'password': {
            'type': Sequelize.STRING,
            'allowNull': false
        },
        'nickname': {
            'type': Sequelize.STRING(20)
        },
        'avatar': {/*头像*/
            'type': Sequelize.STRING(100)
        },
        'age': {
            'type': Sequelize.INTEGER(3)
        },
        'tel': {
            'type': Sequelize.INTEGER(11)
        },
        'signature': {/*个性签名*/
            'type': Sequelize.STRING(50)
        },
        'nationality': {/*国籍*/
            'type': Sequelize.STRING(30)
        },
        'groupingList': {/*我的好友分组标签名*/
            'type': Sequelize.STRING
        },
        'creatAt': {/*创建时间*/
            'type': Sequelize.INTEGER
        },
    },
    {
        // 不要添加时间戳属性 (updatedAt, createdAt)
        timestamps: false,
        //如果freezeTableName为true，则sequelize不会尝试更改模型名称以获取表名。 否则，型号名称将被复数化
        freezeTableName: true
    }
    );

//查找新建
userModel.userFindCreateFind = function (param) {
    return userModel.findCreateFind({
        where: {userId: param.userId},
        defaults:param
    })
};
//登錄
userModel.userFindOne = function (param) {
    return userModel.findOne({
        where: {userId: param.userId},
    });
};
//查询用戶信息
userModel.serchUserinfo = function (param) {
    return userModel.findOne({
        where: {userId: param.userId},
        attributes: { exclude: ['password'] }
    });
};
//更新
userModel.userUpdate = function (param) {
    return userModel.update(param, {where: {'userId': param.userId}});
};
//新建
userModel.userCreate = function (param) {
    return userModel.create(param);
};


// userModel.drop();
// userModel.sync();
module.exports = userModel;

