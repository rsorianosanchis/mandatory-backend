'use strict';
//let params = new URLSearchParams(window.location.search);
//
let vOnlineUsersList = document.getElementById('onlineUsersList');
let vFormSendMsg = document.getElementById('formSendMsg');
let vTxtMsg = document.getElementById('txtMsg');
let vChatBox = document.getElementById('chatBox');


// funktioner för renderar users och få id igenom click
function renderUsersOnline(members) { //[]
    //vOnlineUsersList.innerHTML = '';
    console.log(members);
    let html = '';
    html += `<li>
            <span><strong> Rummet: ${(params.get('rummet')!==''
            ?params.get('rummet')
            :'Generellt')}</strong> </span>
        </li>`;
    //
    for (let i = 0; i < members.length; i++) {

        html += `<li>
            <a data-id="${ members[i].id }"
            ><span>${members[i].name}</span ></a>
        </li>`;
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

function renderMsg(msgData, jag) {
    let msgHtml = '';
    let date = new Date(msgData.date);
    let clock = `${date.getHours()}:${date.getMinutes()<=9?0:''}${date.getMinutes()} -- ${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}`;



    // if (jag) {

    msgHtml = `<!--chat msg -->
                    <li>
                        <div class="${jag
                            ?'jagClass'
                            :msgData.name=== 'admin'
                                ?'adminClass'
                                :'andraClass'
                                }">
                            <h5>${msgData.name}</h5>
                            <div><p>${msgData.msg}</p></div>
                            <div class="">${clock}</div>
                        </div>
                     </li>`;
    // } else {

    //     msgHtml = `<!--chat msg -->
    //             <li>
    //                 <div class="andra">
    //                     <h5>${msgData.name}</h5>
    //                     <div><p>${msgData.msg}</p></div>
    //                     <div class="">${clock}</div>
    //                 </div>
    //              </li>`;
    // }

    vChatBox.innerHTML += msgHtml;
    /*********ladda up i DB *************/
};

//Listeners
vFormSendMsg.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(vTxtMsg.value);
    let msg = vTxtMsg.value;
    // man undvika skicka tom medelande
    if (msg.trim().length === 0) {
        return;
    }
    //Skicka medelande
    socket.emit('createMsg', {
        user: `${params.get('name')}`,
        msg: msg,
    }, function(resp) {
        console.log('response från server: ', resp);
        //cleaning text area
        vTxtMsg.value = '';
        vTxtMsg.autofocus = true; // går inte ???;
        renderMsg(resp, true)
    });



});