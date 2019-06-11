let socket = io();
/*************************************************************/
//man tar namn från url, till exempe
//http://localhost:3000/chat.html?name=Lola
//
let params = new URLSearchParams(window.location.search);
let tempId = '';
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
        console.log(user);
        console.log('Online Users', resp);
        console.log(resp);
        renderUsersOnline(resp);
        //
        //
        tempId = resp[resp.length - 1].id;
        console.log(tempId);


    })

    //renderHistoric();
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
    renderMsg(msg, false);

});

//Höra users ändringar när user går in || går ut, från chaten

socket.on('allOnlineUsersList', function(users) {

    console.log(users);
    renderUsersOnline(users);

});
socket.on('historic', function(historic) {
    console.log(historic.nyClient);
    console.log(tempId);

    console.log(historic.historic);
    let hist = historic.historic;
    let rummet = params.get('rummet');
    console.log(hist);
    console.log(rummet);
    if (historic.nyClient === tempId) {
        let filtRum = hist.filter(item => {
            if (item.rummet === rummet) {
                return item
            }
        })
        console.log(filtRum);
    }
    //let newArr = historic.
})

// klienten höra private msg