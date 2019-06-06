let socket = io();
/*************************************************************/
//man tar namn från url, till exempe
//http://localhost:3000/chat.html?name=Lola
//
let params = new URLSearchParams(window.location.search);
//
if (!params.has('name') || (!params.has('rummet'))) {
    window.location = 'index.html';
    throw new Error('Namn och rummet är et krav')
}
//
//man spara namn i variabel och nu rummet
let user = {
        name: params.get('name'),
        rummet: params.get('rummet')
    }
    /************************************************************/
    //man informerar till server vem och var är den ny användare
socket.on('connect', function() {
    console.log('Ansluted till Server');
    // om server accepteras det sker function callbak
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
//     msg: 'Hola Mundo',
//     idDestination: 'xxxxxxxxxxxxxxxxxxxx' 
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

// klienten höra private msg
socket.on('privateMsg', function(msg) {
    console.log('Private message:', msg);

})