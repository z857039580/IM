var Seq = require('../db');
var Sequelize = Seq.Sequelize;
var dbSeq = Seq.dbSeq;

//定义表的模型(/*  user为添加，friend为被添加*/)
var messageModel = dbSeq.define('message',
    {
        'type': {
            'type': Sequelize.INTEGER,
            'allowNull': false
        },
        'fromUser': {
            'type': Sequelize.STRING(20),
            'allowNull': false
        },
        'toUser': {
            'type': Sequelize.STRING(20),
            'allowNull': false
        },
        'msg': {
            'type': Sequelize.STRING
        },
        'sentTime': {
            'type': Sequelize.BIGINT
        },
        'isRead': {
            'type': Sequelize.BOOLEAN
        }
    },
    {
        // 不要添加时间戳属性 (updatedAt, createdAt)
        timestamps: false,
        //如果freezeTableName为true，则sequelize不会尝试更改模型名称以获取表名。 否则，型号名称将被复数化
        freezeTableName: true
    }
    );

//查询未读
messageModel.msgFindAllIsread = (param) => { return messageModel.findAll({ where: {toUser: param.toUser, isRead: param.isRead} });};
//新建
messageModel.msgCreate = (param) => { return messageModel.create(param);};

// messageModel.drop();
// messageModel.sync();
module.exports = messageModel;

