var express = require('express');
var router = express.Router();
var app = express();
var url= require('url');
var request = require('request');
var http = require("http");

let listener= process.env.LISTENER;

let json= new String(process.env.APPDEF);
json= json.replace(/\'/g, '\"');
console.log(json);
let appdef= JSON.parse(json);
let fields= new Array(); 
let types= new Array();

for(var i= 0; i< appdef.fields.length; i++) {
  console.log(JSON.stringify(appdef.fields));
  fields[i] = appdef.fields[i].name;
  types[i] = appdef.fields[i].type;
}
console.log(JSON.stringify(fields));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Loader", nmsg: n});
});

let n= 0;

const fs = require('fs');
let warandpeace;
let length;
console.log("Reading: "+process.env.APPDIR+"/warandpeace.txt");
fs.readFile(process.env.APPDIR+"/warandpeace.txt", 'utf8', function(err, data) {
  if (err) throw err;
  warandpeace= new String(data);
  length= warandpeace.length;
});

console.log(process.env.APPDIR+"/airports.txt");
fs.readFile(process.env.APPDIR+"/airports.txt", 'utf8', function(err, data) {
  if (err) throw err;
  airports= new String(data).split("\n");
  console.log(airports[0]);
  console.log(airports[1]);
  
  console.log(airports[6976]);
  console.log(airports[6977]);
  
});

function getRandomLocation() {
  let a= airports[Math.floor(Math.random() * 6977)];
  let splits= a.split(",");
  return splits[6].trim()+","+splits[7].trim();
};

function getRandomInt() {
  return Math.floor(Math.random() * 101);
};

function getRandomLong() {
  return Math.floor(Math.random() * 10001);
};

function getRandomFloat() {
  return (Math.random() * 1000001);
};

function getRandomBoolean() {
  if(Math.random()> 0.5)
    return true;
  return false;
};

function getRandomDateTime() {
  let now= new Date().getTime();
  let d= new Date(now - Math.floor(Math.random()*1000*100000*14));
  let day= d.getUTCDate();
			let daystring= ""+day;
			
  			if(day< 10)
    				daystring="0"+daystring;
  			let month= d.getUTCMonth()+1;
  			let monthstring= ""+month;
  			if(month< 10)
    				monthstring="0"+monthstring;
            		
		        let hour= d.getUTCHours();
			let hourstring= ""+hour;
  			if(hour< 10)
    				hourstring="0"+hourstring;
            		
			let minute= d.getUTCMinutes();
			let minutestring= ""+minute;
  			if(minute< 10)
    				minutestring="0"+minutestring;
            		    
			let second= d.getUTCMilliseconds()/1000.0;
			let secondstring= ""+second;
  			if(second< 10)
    				secondstring="0"+secondstring
			    

  return d.getFullYear()+"-"+monthstring+"-"+daystring+"T"+hourstring+":"+minutestring+":"+secondstring+"Z";
};

function getRandomString() {
  let start= Math.floor(Math.random() * (length- 128* Math.random()));
  let words= Math.floor((Math.random() * 10) + 1);

  while(warandpeace.charAt(start)!= ' ' && warandpeace.charAt(start)!= ".") {
    start++;
  }
  start++;
  let end= start+1;
  for(var i= 0; i< words; i++) {
    while(warandpeace.charAt(end)!= ' ' && warandpeace.charAt(start)!= ".") {
      end++;
    }
    end++;
  }
  let ret= warandpeace.substring(start, end);
  ret= ret.replace(/\n/g, '');
  ret= ret.replace(/,/g, ' ');
  ret= ret.replace(/:/g, ' ');
  ret= ret.replace(/"/g, ' ');
  ret= ret.replace(/'/g, ' ');
  ret= ret.replace(/!/g, ' ');
  ret= ret.replace(/\(/g, ' ');
  ret= ret.replace(/\)/g, ' ');
  ret= ret.replace(/\?/g, ' ');
  ret= ret.replace(/\./g, ' ');
  return ret;
};

function getRandomForType(t) {
  if(t === "String") 
    return getRandomString();
  if(t === "Integer") 
    return getRandomInt();
  if(t === "Long") 
    return getRandomLong();
  if(t === "Double") 
    return getRandomFloat();
  if(t === "Boolean") 
    return (Math.random()>0.5)?true:false;
  if(t === "Date/Time" || t === "Date/time") 
    return getRandomDateTime();
  if(t === "Location") 
    return getRandomLocation();
};

setTimeout(load, 1000);

function load() {
  let obj= new Object();
  for(let i= 0; i< fields.length; i++) {
    if(fields[i]== "id") {
      let now= new Date().getTime();
      obj["id"]= now;
    }
    else {
       obj[fields[i]]= getRandomForType(types[i]);
    }
  }
  let loadstr= JSON.stringify(obj);
  console.log("Load: "+ loadstr);
  request.post(listener, {form:loadstr}, function(err, response, body) {
    if(err!=null) {
      console.log(err);
   }
});
  setTimeout(load, 1000);
  
}
module.exports = router;


