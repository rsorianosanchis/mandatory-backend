const { io } = require('../server');
const { Users } = require('../classes/users.js');

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
        cb(members)
    })


});