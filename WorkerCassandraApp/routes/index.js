var express = require('express');
var router = express.Router();
var app = express();

var cassandra = require('cassandra-driver');
let cas_contact= process.env.CASSANDRA_SERVICE;
//let cas_contact= "node-0.cassandra.mesos:9042,node-1.cassandra.mesos:9042,node-2.cassandra.mesos:9042";

var cas_client = new cassandra.Client({contactPoints: [cas_contact]});
var async = require('async');

let json= new String(process.env.APPDEF);
json= json.replace(/\'/g, '\"');

let appdef= JSON.parse(json);
let fields= new Array(); 
let types= new Array();

for(var i= 0; i< appdef.fields.length; i++) {
  fields[i] = appdef.fields[i].name;
  types[i] = appdef.fields[i].type;
}
console.log(JSON.stringify(fields));

function cassandraTypeForMyType(t) {
  console.log("type: "+t);
  if(t === "String") 
    return "text";
  if(t === "Integer") 
    return "int";
  if(t === "Long") 
    return "bigint";
  if(t === "Double") 
    return "double";
  if(t === "Boolean") 
    return "boolean";
  if(t === "Date/Time" || t === "Date/time") 
    return "text";
  if(t === "Location") 
    return "text";
};

console.log("Cassandra Client: "+cassandra);
async.series([
function (callback) {
cas_client.connect(function(e) {
  var query;
  query = "CREATE KEYSPACE IF NOT EXISTS "+appdef.keyspace+" WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }";
  return cas_client.execute(query, function(e, res) {
    console.log("Cassandra execute: "+e+" "+res);
    // Run next function in series
    callback(null, null);
});
})},
function (callback) {
cas_client.connect(function(e) {
  let createtable="CREATE TABLE "+appdef.keyspace+"."+appdef.table+" (";
  for(var i= 0; i< fields.length; i++) {
    createtable= createtable+fields[i]+" "+cassandraTypeForMyType(types[i]);
    if(fields[i]=== "id")
      createtable+= " PRIMARY KEY";
    if(i< fields.length-1) {
      createtable+= ", "
    }
  }
  createtable+=")";

  console.log("Create Cassandra table: "+createtable);

return cas_client.execute(createtable, function(e, res) {
  console.log(e+" "+res);
 callback(null, null); 
 });
});
}]);

function typeForFields(f) {
  for(let i= 0; i< fields.length; i++) {
    if(fields[i]=== f)
      return types[i];
  }
};

router.post('/data', function(req, res, next) {
  let insertquery= "INSERT INTO "+appdef.keyspace+"."+appdef.table;
console.log(JSON.stringify(req.body));

let jsonmsg= req.body;

let vals= "";
let keys= "";

let n= 0;
for (var property in jsonmsg) {
      keys+= " "+property;
      let quotes="";
      let t= typeForFields(property);
      if(t=== "String" || t=== "Date/time" || t=== "Location")
        quotes="'";
      vals+= quotes+jsonmsg[property]+quotes;
      if(n< fields.length-1) {
        keys+=", ";
        vals+=", ";
     }
     n++;
}

insertquery+= " ( "+keys+" ) VALUES ("+vals+" ) USING TIMESTAMP";
console.log(insertquery);
  
  cas_client.execute(insertquery , function (err, result) {
    if(err== null) {
          console.log("Data successfully inserted.");
    }
    else {
          console.log("Error inserting data: "+err);
    }
            
});

res.statusCode= 200;
res.end();
});

/*
function (callback) {

cas_client.execute("INSERT INTO "+appdef.keyspace+""+appdef.table+

  (id, hr, dosave, device, user, location) Values (339, 120, true, 'mywatch', 'Me', 'home') USING TIMESTAMP" , function (err, result) {
           console.log("Cassandra INSERT "+err);
            callback(err, null);
});
},
*/
/*
function (callback) {
 cas_client.execute("SELECT id, hr, dosave, device, user, location FROM mesonautsgym.hrs", function (err, result) {
           if (!err){
               if ( result.rows.length > 0 ) {
                   var res = result.rows[0];
                   console.log("Cassandra data: id = %d, user = %s, hr = %d, device = %s", res.id, res.user, res.hr, res.device);
               } else {
                   console.log("Cassandra data: No results");
               }
           }
            callback(err, null);
 });
}]);
*/  


module.exports = router;
