const { io } = require('../server');
const { Users } = require('../classes/users.js');
const { createMsg } = require('../utils/utils.js')

const users = new Users();

// måste fixa och undvika koppla flrra gånger när user updatera sidan
io.on('connection', (client) => {

    console.log('User is connected');

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
    client.on('createMsg', (data) => {
        let user = users.getUser(client.id);
        let msg = createMsg(user.name, data.msg)
        client.broadcast.emit('createMsg', msg)
    })
    client.on('disconnect', () => {
        let deletedUser = users.deleteUser(client.id);
        client.broadcast.emit('createMsg', createMsg('admin', `${deletedUser.name} gick ut från chatten`));
        //list av alla personer broadcast
        client.broadcast.emit('allOnlineUsersList', users.getUsers());
    });


});