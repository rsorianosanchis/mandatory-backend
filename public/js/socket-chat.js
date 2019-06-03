let socket = io();

let params = new URLSearchParams(window.location.search);
if (!params.has('name')) {
    window.location = 'index.html';
    throw new Error('Users name is necessary')

}
let user = {
    name: params.get('name')
}


socket.on('connect', function() {
    console.log('Ansluted till Server');
    socket.emit('loginChat', name)
});

// Höra
socket.on('disconnect', function() {

    console.log('Man har förlorat servers anslutning');

});


// Skicka info
socket.emit('sendMessage', {
    user: 'Ricardo',
    msg: 'Hola Mundo'
}, function(resp) {
    console.log('response från server: ', resp);
});

// Höra info
socket.on('sendMessage', function(msg) {

    console.log('server:', msg);

});