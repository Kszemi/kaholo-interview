const express = require('express')
const cors = require('cors');
const { executeShellCommand } = require("./application/shell.service");
const { saveOutputToMongo, getOutputsFromMongo, connectToDB} = require("./application/mongo.service");
const app = express()
const port = 3000




app.use(cors());
app.listen(port, () => {
    connectToDB();
    console.log(`Server listening at port ${port}`)
})

app.get('/', (req, res) => {
    executeShellCommand('ls')
        .then(output => res.send(output));


})

app.get('/execute', function(req, res) {
    executeShellCommand(req.query.command)
        .then(output => {
            console.log(output);
            res.send(output);
            saveOutputToMongo(output).catch(console.dir);
        })
        .catch(err => {
            saveOutputToMongo(err).catch(console.dir);
            console.log(err)
        });
});

app.get('/outputs', function(req, res) {
    getOutputsFromMongo()
        .then(outputs => {
            res.send(outputs);
        })
        .catch(err => console.log(err));
})







