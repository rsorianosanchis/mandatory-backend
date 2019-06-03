let socket = io();

socket.on('connect', function() {
    console.log('Ansluted till Server');
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