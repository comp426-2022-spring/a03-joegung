import * as coinModule from "./modules/coin.mjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");

const app = express();

const args = require("minimist")(process.argv.slice(2));
args["port"];

const port = args.port || 5000;


const server = app.listen(port, () => { 
    console.log('App listening on port %PORT%'.replace('%PORT%', port));
});



app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain'});
    res.end(res.statusCode + ' ' + res.statusMessage);
});

app.get('/app/flip/', (req, res) => {
    res.json({"flip": coinModule.coinFlip()});
});

app.get('/app/flips/:number', (req, res) => {
    var array = coinModule.coinFlips(req.params.number);
    res.json({"raw": array, "summary": coinModule.countFlips(array)});
});

app.get('/app/flip/call/heads', (req, res) => {
    res.json(coinModule.flipACoin("heads"));
})

app.get('/app/flip/call/tails', (req, res) => {
    res.json(coinModule.flipACoin("tails"));
})

app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND');
});