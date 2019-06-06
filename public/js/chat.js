'use strict';
//let params = new URLSearchParams(window.location.search);
//
let vOnlineUsersList = document.getElementById('onlineUsersList');



// funktioner för renderar users och få id igenom click
function renderUsersOnline(members) { //[]
    //vOnlineUsersList.innerHTML = '';
    console.log(members);
    let html = '';
    html += '<li>';
    html += `<span><strong> Rummet: ${(params.get('rummet')!==''
        ?params.get('rummet')
        :'Generellt')}</strong> </span>`;
    html += '</li>';
    //
    for (let i = 0; i < members.length; i++) {
        html += `<li>`;
        html += `<a data-id="${ members[i].id }"
        ><span>${members[i].name}</span ></a>`;
        html += `</li>`;
    }
    vOnlineUsersList.innerHTML = html;
    //
    let vUsersLinks = document.querySelectorAll('#onlineUsersList a');
    console.log(vUsersLinks.length);

    for (let i = 0; i < vUsersLinks.length; i++) {
        vUsersLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            let socketId = vUsersLinks[i].getAttribute('data-id');
            console.log(socketId);
            e.stopPropagation()
        })
    }
}

//Listeners