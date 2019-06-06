const { io } = require('../server');
const { Users } = require('../classes/users.js');
const { createMsg } = require('../utils/utils.js')

const users = new Users();

// måste fixa och undvika koppla flrra gånger när user updatera sidan
//io.on('connection', är default connection rum
io.on('connection', (client) => {
    //
    console.log('User is connected');
    //ny user loggin
    client.on('loginChat', (data, cb) => {
        console.log(data);
        console.log(cb);


        if (!data.name) { //|| !data.rummet
            return cb({
                error: true,
                msg: 'the name/rummet is required'
            });
        }
        /************************* */
        /********rummet connection */
        client.join(data.rummet);
        /************************** */
        // om det finns ett ny namn returnerar i cb alla members (i rummet)
        let members = users.addUser(client.id, data.name, data.rummet);
        //
        cb(users.getUsersByRum(data.rummet));
        //
        //list av alla personer broadcast (som är i rummet)
        // client.broadcast.emit('allOnlineUsersList', users.getUsers());
        client.broadcast.to(data.rummet).emit('allOnlineUsersList', users.getUsersByRum(data.rummet));

    });
    //msg till alla
    client.on('createMsg', (data) => {
        let user = users.getUser(client.id);
        let msg = createMsg(user.name, data.msg);
        //man kan få rummet igenom users sender data
        client.broadcast.to(user.rummet).emit('createMsg', msg);
    });
    // user disconnect och list updatering
    client.on('disconnect', () => {
        // vi spara user som gick ut för at kunna informera vem gick ut
        let deletedUser = users.deleteUser(client.id);
        //admin informera till alla
        client.broadcast.to(deletedUser.rummet).emit('createMsg', createMsg('admin', `${deletedUser.name} gick ut från chatten`));
        //updatering onlinelista list av alla personer broadcast
        // client.broadcast.to(deletedUser.rummet).emit('allOnlineUsersList', users.getUsers());
        //updatering onlinelista list av rummet personer broadcast
        client.broadcast.to(deletedUser.rummet).emit('allOnlineUsersList', users.getUsersByRum(deletedUser.rummet));
    });
    //private msg mellan klienter.Redirect msg till idDestination
    client.on('privateMsg', data => {
        //sender som skickar msg
        let sender = users.getUser(client.id);
        //
        client.broadcast.to(data.idDestination).emit('privateMsg', createMsg(sender.name, data.msg));
    });


});