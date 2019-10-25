const Seq = require('../db');
const Sequelize = Seq.Sequelize;
const sequelizeDB = Seq.sequelizeDB;

//定义表的模型(/*  user为添加，friend为被添加*/)
const friendsModel = sequelizeDB.define('friends',
    {
        'userId': {
            'type': Sequelize.STRING(20),
            'allowNull': false
        },
        'friendUserId': {
            'type': Sequelize.STRING(20),
            'allowNull': false
        },
        'status': {/*好友状态    1:好友  2：删除  3：拉黑  4：添加未通过*/
            'type': Sequelize.INTEGER,
            'allowNull': false
        },
        'remarks': {/*备注好友名字*/
            'type': Sequelize.STRING(20)
        },
        'groupName': {/*好友的分组，标签*/
            'type': Sequelize.STRING
        },
        'addTime': {/*添加好友时间*/
            'type': Sequelize.BIGINT
        },
        'verifyTime': {/*通过添加好友请求时间*/
            'type': Sequelize.BIGINT
        },
        'delTime': {/*删除好友时间*/
            'type': Sequelize.BIGINT
        },
        'blacklisted': {/*拉黑好友时间*/
            'type': Sequelize.BIGINT
        },
        'authority': {/*给好友的朋友圈权限*/
            'type': Sequelize.BOOLEAN
        },
    },
    {
        // 不要添加时间戳属性 (updatedAt, createdAt)
        timestamps: false,
        //如果freezeTableName为true，则sequelize不会尝试更改模型名称以获取表名。 否则，型号名称将被复数化
        freezeTableName: true
    }
    );

//查询
friendsModel.friendsfindAll = function (param) { return friendsModel.findAll({ where: {userId: param.userId} });};


friendsModel.drop();
// friendsModel.sync();
module.exports = friendsModel;

