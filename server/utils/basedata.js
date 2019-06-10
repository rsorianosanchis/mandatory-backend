const fs = require('fs');
//const test = require('../basedata/basedata.json')

let msgList = [];

const saveDataBase = () => {
    let tillJson = JSON.stringify(msgList);
    console.log(tillJson);

    // fs.writeFile('../minnet/minnet.json', tillJson, (err) => {
    //     if (err) {
    //         throw new Error('det kunde inte spara i persistent minnet', err)
    //     }
    // })

}

const createNewItem = (dataIn) => {
    msgList.push(dataIn);
    console.log(msgList);
    saveDataBase();
    // man gör ett return för att ha ett potentialla respons 
    return msgList;
}

module.exports = { createNewItem, saveDataBase };