const fs = require('fs');

let msgList = [];

const saveDataBase = () => {

    let data = JSON.stringify(msgList);
    console.log(data);
    fs.writeFile('server/minnet/minnet.json', data, (err) => {
        if (err) {
            console.error(err);
            throw new Error('det kunde inte spara i persistent minnet', err);
        }
    });
}

const loadDataBase = () => {
    try {
        msgList = require('../minnet/minnet.json');
        console.log(msgList);
    } catch (error) {
        msgList = [];
    }
}

// const getHistoric = (data) => {
//     try {
//         msgList = require('../minnet/minnet.json');
//         let temp = JSON.parse(msgList);
//         console.log('***parse***');
//         console.log(temp);
//         return temp;
//     } catch (error) {
//         return msgList = [];
//     }

// };


const createNewItem = (dataIn) => {
    loadDataBase();
    msgList.push(dataIn);
    console.log(msgList);
    saveDataBase();
    // // man gör ett return för att ha ett potentialla respons 
    // return msgList;
}

module.exports = { createNewItem, saveDataBase };