var express = require('express');
var router = express.Router();


let json= new String(process.env.APPDEF);
json= json.replace(/\'/g, '\"');

let appdef= JSON.parse(json);

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Producer= kafka.Producer;

let kafka_dns= process.env.KAFKA_SERVICE;
//kafka_dns= "master.mesos:2181/dcos-service-kafka";
var kafka_client = new kafka.Client(kafka_dns);
console.log("Kafka client: "+JSON.stringify(kafka_client));
let topic= appdef.topic;

var producer = new Producer(kafka_client);
producer.on('error', function (err) {
  console.log("Kafka producer on error()");
  console.log(err);
})
producer.on('ready', function () {
  console.log("Producer ready.");
      producer.createTopics([topic], false, function (err, data) {
        console.log("Topic: "+topic+" created or existed already");
      });
});
var app = express();
app.set("producer", producer);
  

/*
setTimeout(function() {
var consumer = new Consumer(
    kafka_client,
    [
      { topic: topic, offset: 0}
    ],
    {
      fromOffset: true
    }
  );

consumer.on('message', function (message) {
  console.log("Kafka, received message: ", message);
});
}, 6000);
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Kafka Worker", client: kafka_client.json, topic: producer.topic, appdef: JSON.stringify(appdef)
    });
});

router.post('/data', function(req, res, next) {
 
  payloads= [ { topic: topic, messages: JSON.stringify(req.body), partition: 0 } ];
 
  //console.log("About to send Kafka payload: "+JSON.stringify(req.body));
  //console.log("Producer: "+JSON.stringify(producer));
  console.log("Payload: "+JSON.stringify(payloads));
   
  producer.send(payloads, function (err, data) {      
        console.log("Kafka payload sent: "+JSON.stringify(data));
        if(err== null) {
           res.statusCode= 200;
        }
        else {
           res.status= 503;
        }
        res.end();
    }); 
});

module.exports = router;
