const { io } = require('../server');


io.on('connection', (client) => {

    console.log('User is connected');
    client.on('loginChat', (user) => {
        console.log(user);
    })

    // client.emit('sendMessage', {
    //     user: 'Admin',
    //     msg: 'Välkomen till chat'
    // });



    // client.on('disconnect', () => {
    //     console.log('User disconnected');
    // });

    // // Höra klienten
    // client.on('sendMessage', (data, callback) => {

    //     console.log(data);

    //     client.broadcast.emit('sendMessage', data);


    //     // if (mensaje.usuario) {
    //     //     callback({
    //     //         resp: 'TODO SALIO BIEN!'
    //     //     });

    //     // } else {
    //     //     callback({
    //     //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     //     });
    //     // }



    // });

});