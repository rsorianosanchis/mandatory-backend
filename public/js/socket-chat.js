let socket = io();
/*************************************************************/
//man tar namn från url, till exempe
//http://localhost:3000/chat.html?name=Lola
//
let params = new URLSearchParams(window.location.search);
//
if (!params.has('name')) {
    window.location = 'index.html';
    throw new Error('Namn är et krav')
}
//
let user = {
        name: params.get('name')
    }
    /************************************************************/

socket.on('connect', function() {
    console.log('Ansluted till Server');
    socket.emit('loginChat', user, function(resp) {
        console.log('Online Users', resp);

    })
});

// koppla av
socket.on('disconnect', function() {

    console.log('Man har förlorat servers anslutning');

});


// Skicka info
// socket.emit('createMsg', {
//     user: 'Ricardo',
//     msg: 'Hola Mundo'
// }, function(resp) {
//     console.log('response från server: ', resp);
// });

// Höra info
socket.on('createMsg', function(msg) {

    console.log('server:', msg);

});

//Höra users ändringar när user går in || går ut, från chaten

socket.on('allOnlineUsersList', function(users) {

    console.log(users);

});