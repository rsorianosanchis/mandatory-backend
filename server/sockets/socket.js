const { io } = require('../server');
const { Users } = require('../classes/users.js');

const users = new Users();


io.on('connection', (client) => {

    console.log('User is connected');

    client.on('loginChat', (data, cb) => {
        if (!data.name) {
            return cb({ error: true, msg: 'the name is required' });
        }
        let members = users.addUser(client.id, data.name);
        cb(members)
    })


});