'use strict';
let params = new URLSearchParams(window.location.search);
//
let vOnlineUsersList = document.getElementById('onlineUsersList');

// funktioner för renderar users
function renderUsersOnline(members) { //[]
    vOnlineUsersList.innerHTML = '';
    console.log(members);
    let html = '';
    html += '<li>';
    html += `<span> Rummet Juegos ${params.get('rummet')} </span>`;
    html += '</li>';
    //
    for (let i = 0; i < members.length; i++) {
        html += `<li>`;
        html += `<span>${members[i].name}</span >`;
        html += `</li>`;
    }
    vOnlineUsersList.innerHTML = html;
}