var user = require('./controllers/userCtrl');
var friends = require('./controllers/friendsCtrl');
var uploadCtrl = require('./controllers/uploadCtrl');


module.exports = function (app) {
    app.post('/v1/register', user.register);
    app.post('/v1/login', user.login);
    app.get('/v1/searchUser', user.searchUser);
    app.get('/v1/listOfFriends', friends.listOfFriends);
    app.post('/v1/avatar', uploadCtrl.Upload.single('file'), uploadCtrl.Avatar);
    app.post('/v1/updateUserInfo', user.UpdateUserInfo);
};

