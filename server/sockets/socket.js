const { io } = require('../server');
const { Users } = require('../classes/users.js');
const { createMsg } = require('../utils/utils.js');
const { createNewItem } = require('../utils/basedata.js');





const users = new Users();
//io.on('connection', är default connection rum
io.on('connection', (client) => {
    //
    console.log('User is connected');
    //ny user loggin
    client.on('loginChat', (data, cb) => {
        console.log(data);
        console.log(cb);
        let hist = require('../minnet/minnet.json');


        if (!data.name) { //|| !data.rummet
            return cb({
                error: true,
                msg: 'the name is required'
            });
        }
        console.log('connection *******************************************');
        /************************* */
        /********rummet connection */
        client.join(data.rummet);
        /************************** */
        // om det finns ett ny namn returnerar i cb alla members (i rummet)
        let members = users.addUser(client.id, data.name, data.rummet);
        console.log(members);


        //
        cb(users.getUsersByRum(data.rummet));
        //
        //list av alla personer broadcast (som är i rummet)
        // client.broadcast.emit('allOnlineUsersList', users.getUsers());
        client.broadcast.to(data.rummet).emit('allOnlineUsersList', users.getUsersByRum(data.rummet));
        client.broadcast.to(data.rummet).emit('createMsg', createMsg('admin', `<strong>${data.name}</strong> gick in i rummet`));
        //

        client.broadcast.to(data.rummet).emit('historic', { nyClient: client.id, historic: hist });

    });
    //listnar user medellande och redirect till destinationen
    client.on('createMsg', (data, cb) => {
        let user = users.getUser(client.id);
        let msg = createMsg(user.name, data.msg);
        //man kan få rummet igenom users sender data
        client.broadcast.to(user.rummet).emit('createMsg', msg);
        //

        // response med samman data to sender för avisering allt gick bra
        cb(msg)
        console.log(msg);
        console.log(data);


        /************************** */
        //här ska vi förbereda att skapa json file
        /************************** */
        let newItem = {
            name: data.user,
            rummet: data.rummet,
            msg: data.msg,
            date: msg.date,
            id: user.id
        };
        //
        console.log(newItem);
        //
        createNewItem(newItem);



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