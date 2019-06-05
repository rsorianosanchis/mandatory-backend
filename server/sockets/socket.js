const { io } = require('../server');
const { Users } = require('../classes/users.js');
const { createMsg } = require('../utils/utils.js')

const users = new Users();

// måste fixa och undvika koppla flrra gånger när user updatera sidan
io.on('connection', (client) => {
    //
    console.log('User is connected');
    //ny user loggin
    client.on('loginChat', (data, cb) => {
        if (!data.name) {
            return cb({ error: true, msg: 'the name is required' });
        }
        // om det finns ett ny namn returnerar i cb alla members
        let members = users.addUser(client.id, data.name);
        cb(members);
        //
        //list av alla personer broadcast
        client.broadcast.emit('allOnlineUsersList', users.getUsers());
    });
    //msg till alla
    client.on('createMsg', (data) => {
        let user = users.getUser(client.id);
        let msg = createMsg(user.name, data.msg);
        client.broadcast.emit('createMsg', msg);
    });
    // user disconnect och list updatering
    client.on('disconnect', () => {
        // vi spara user som gick ut för at kunna informera vem gick ut
        let deletedUser = users.deleteUser(client.id);
        //admin informera till alla
        client.broadcast.emit('createMsg', createMsg('admin', `${deletedUser.name} gick ut från chatten`));
        //updatering onlinelista list av alla personer broadcast
        client.broadcast.emit('allOnlineUsersList', users.getUsers());
    });
    //private msg mellan klienter.Redirect msg till idDestination
    client.on('privateMsg', data => {
        //sender som skickar msg
        let sender = users.getUser(client.id);
        //
        client.broadcast.to(data.idDestination).emit('privateMsg', createMsg(sender.name, data.msg));
    });


});