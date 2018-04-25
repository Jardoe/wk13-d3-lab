const express = require('express');
const server = express();
const parser = require('body-parser');

server.use(parser.json());
server.use(express.static(`${ __dirname }/client/public`));

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db('bucket_list');
    console.log('Connected to DB');
    const countriesCollection = db.collection('countries');

  // CREATE
  server.post('/', function (req, res) {
    const newCountry = req.body;
    countriesCollection.save(newCountry, function(err, result){
      if(err){
        console.error(err);
        res.status(500);
        res.send();
      }
      console.log("SAVED!");
      res.status(201);
      res.json(result.ops[0]);
    });
  })


  server.get('/', (req, res) => {
    countriesCollection.find().toArray(function(err, allCountries){
      if(err){
        console.error(err);
        res.status(500);
        res.send();
      }
      res.send(allCountries);
    })
  });

  server.listen(3000, function () {
    console.log(`Example app listening on port ${ this.address().port }`);
  });

});
