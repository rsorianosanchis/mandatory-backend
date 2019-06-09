const fs = require('fs');

let msgList = [];

const createNewItem = (dataIn) => {
    msgList.push(dataIn);
    // man gör ett return för att ha ett potentialla respons 
    console.log(msgList);

    return dataIn;
}

module.exports = { createNewItem };