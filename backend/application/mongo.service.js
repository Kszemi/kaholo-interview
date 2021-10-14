const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://mongodb:27017');

module.exports.saveOutputToMongo = saveOutputToMongoDB;
module.exports.getOutputsFromMongo = getOutputsFromMongoDB;
module.exports.connectToDB = connectToDB;

async function connectToDB() {
    await client.connect()
}

async function saveOutputToMongoDB(output) {
        const database = client.db("shellDB");
        const outputs = database.collection("outputs");

       await outputs.insertOne(
           {
                output: output
            })
            .catch(error => console.log(error));
}

async function getOutputsFromMongoDB() {

        const database = client.db("shellDB");
        const outputsCollection = database.collection("outputs");

        const cursor = await outputsCollection
            .find({})
            .project({ _id: 0, output: 1 });
        return await cursor.toArray();

}