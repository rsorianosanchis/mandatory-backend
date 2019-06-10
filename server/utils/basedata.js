const fs = require('fs');

let msgList = [];

const saveDataBase = (newItem) => {
    let dataJson = JSON.stringify(newItem);
    console.log(dataJson);

    // fs.writeFile('./basedata/test.json', dataJson, (err) => {
    //     if (err) {
    //         throw new Error('det kunde inte spara i persistent minnet', err)
    //     }
    // })

}

const createNewItem = (dataIn) => {
    msgList.push(dataIn);
    console.log(msgList);

    // man gör ett return för att ha ett potentialla respons 


    return msgList;
}

module.exports = { createNewItem, saveDataBase };