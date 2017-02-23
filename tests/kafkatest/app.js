let APPDEF="{'name':'My cool App','showLocation':true,'fields':[{'name':'f1','pivot':false,'type':'String'},{'name':'f2','pivot':false,'type':'Integer'},{'name':'f3','pivot':true,'type':'Double'},{'name':'f4','pivot':false,'type':'Boolean'},{'name':'id','type':'Long','pivot':'false'},{'name':'location','type':'Location','pivot':'false'},{'name':'event_timestamp','type':'Date/time','pivot':'false'}],'transformer':'%09%0A%09%2F%2F%20Raw%20message%20available%20as%3A%20rawtext%3B%0A%09%2F%2F%20save%20result%20in%20variable%3A%20result%0A%09%2F%2F%20result%20is%20of%20type%20String%0A%09%0A%09%2F%2F%20get%20json%20object%3A%20JSON.parse(rawtext)%3B%0A%09%2F%2F%20also%20available%20fields%5B%5D%20and%20types%5B%5D%3A%0A%09%2F%2F%20e.g.%20fields%5B0%5D%3D%3D%20%22id%22%2C%20%20types%5B0%5D%3D%3D%22Long%22%0A%0A%09console.log(%22In%20%3A%20%22%2Brawtext)%3B%0A%09let%20json%3D%20JSON.parse(rawtext)%3B%0A%09%2F%2Fjson.f1%3D%20%22WORLD%22%3B%0A%09result%3D%20JSON.stringify(json)%3B%0A%09console.log(%22After%20transformation%3A%20%22%2Bresult)%3B%0A%09%09%09%09%09','topic':'bar2','table':'foo2','keyspace':'keys2','path':'appzweidrei','creator':'http://esiemes-8-publicsl-6wi1vh15zvpe-1608036474.eu-central-1.elb.amazonaws.com'}";

let kafka_dns= process.argv[2];
console.log("Connecting to Kafka: "+process.argv[2]);

let json= new String(APPDEF);
json= json.replace(/\'/g, '\"');

let appdef= JSON.parse(json);

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Producer= kafka.Producer;


//kafka_dns= "master.mesos:2181/dcos-service-kafka";
var kafka_client = new kafka.Client(kafka_dns);
console.log("Kafka client: "+JSON.stringify(kafka_client));
let topic= appdef.topic;

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

