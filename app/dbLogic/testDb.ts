import getJsonDB from "./jsonDBClass";


function testAddToCart() {
    const userID = "1923823"
    let client = getJsonDB()
    client.queryDocument("tracks", "dsadsa").then(track => {
        console.log(track);

    })
}

function testUpdateTable() {
    let client = getJsonDB()
    client.createRecord("users", '{"id": "dsadsagg","name": "Despacito","album": "grrr","artist": "Luis Fonsi","price": 24}')
}

function testDB() {
    let client = getJsonDB()
    client.findAll("users").then((userList) => {
        console.log(userList);
    })

    client.queryDocument("users", "1").then((jsonData) => {
        console.log('Content of the JSON file:', jsonData);
        console.log(typeof (jsonData));

        // Code for creating a new document in the "users" table
        // TODO Update test code
        // const stringifiedData = JSON.stringify(jsonData)
        // client.create("users", stringifiedData)

    }).catch((error) => {
        console.error('Error reading or parsing the JSON file:', error);
    });
}

testUpdateTable()