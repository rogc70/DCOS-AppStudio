export KAFKA_SERVICE="10.0.1.3:2181"
export APPDEF="{'name':'My cool App','showLocation':true,'fields':[{'name':'f1','pivot':false,'type':'String'},{'name':'f2','pivot':false,'type':'Integer'},{'name':'f3','pivot':true,'type':'Double'},{'name':'f4','pivot':false,'type':'Boolean'},{'name':'id','type':'Long','pivot':'false'},{'name':'location','type':'Location','pivot':'false'},{'name':'event_timestamp','type':'Date/time','pivot':'false'}],'transformer':'%09%0A%09%2F%2F%20Raw%20message%20available%20as%3A%20rawtext%3B%0A%09%2F%2F%20save%20result%20in%20variable%3A%20result%0A%09%2F%2F%20result%20is%20of%20type%20String%0A%09%0A%09%2F%2F%20get%20json%20object%3A%20JSON.parse(rawtext)%3B%0A%09%2F%2F%20also%20available%20fields%5B%5D%20and%20types%5B%5D%3A%0A%09%2F%2F%20e.g.%20fields%5B0%5D%3D%3D%20%22id%22%2C%20%20types%5B0%5D%3D%3D%22Long%22%0A%0A%09console.log(%22In%20%3A%20%22%2Brawtext)%3B%0A%09let%20json%3D%20JSON.parse(rawtext)%3B%0A%09%2F%2Fjson.f1%3D%20%22WORLD%22%3B%0A%09result%3D%20JSON.stringify(json)%3B%0A%09console.log(%22After%20transformation%3A%20%22%2Bresult)%3B%0A%09%09%09%09%09','topic':'bar2','table':'foo2','keyspace':'keys2','path':'appzweidrei','creator':'http://esiemes-8-publicsl-6wi1vh15zvpe-1608036474.eu-central-1.elb.amazonaws.com'}"
export APPDEF="{'name':'The Mesonauts Gym','showLocation':true,'fields':[{'name':'heartrate','pivot':true,'type':'Integer'},{'name':'user','pivot':false,'type':'String'},{'name':'deviceid','pivot':false,'type':'String'},{'name':'color','pivot':false,'type':'String'},{'name':'id','type':'Long','pivot':'false'},{'name':'location','type':'Location','pivot':'false'},{'name':'event_timestamp','type':'Date/time','pivot':'false'}],'transformer':'%09%0A%09%09%0A%09%2F%2F%20Raw%20message%20available%20as%3A%20rawtext%3B%0A%09%2F%2F%20save%20result%20in%20variable%3A%20result%0A%09%2F%2F%20result%20is%20of%20type%20String%0A%09%0A%09%2F%2F%20get%20json%20object%3A%20JSON.parse(rawtext)%3B%0A%09%2F%2F%20also%20available%20fields%5B%5D%20and%20types%5B%5D%3A%0A%09%2F%2F%20e.g.%20fields%5B0%5D%3D%3D%20%22id%22%2C%20%20types%5B0%5D%3D%3D%22Long%22%0A%0A%09%2F%2F%20Transform%20incoming%20xml%20to%20json%3A%20%20json%3D%20parseXML(rawtext)%3B%20result%3D%20JSON.stringify(json)%3B%0A%09%2F%2F%20uses%20npm%20xml2js%0A%09%2F%2F%20Transform%20incoming%20yaml%20to%20json%3A%20let%20json%3DyamlParser.parse(rawtext)%3B%20console.log(%22JSON%3A%20%22%2BJSON.stringify(json))%3B%20result%3D%20JSON.stringify(json)%3B%20%0A%09%2F%2F%20uses%20npm%20yamljs%0A%09%2F%2F%20Rename%20field%3A%20let%20json%3D%20JSON.parse(rawtext)%3B%20json.newname%3D%20json.oldname%3B%20delete%20json.oldname%3B%0A%0A%09console.log(%22In%20%3A%20%22%2Brawtext)%3B%0A%2F*%0A%09let%20json%3D%20JSON.parse(rawtext)%3B%0A%20%20%20%20%20%20%20%20for%20(var%20key%20in%20json)%20%7B%0A%20%20%09%09%09if%20(json.hasOwnProperty(key))%20%7B%0A%09%09%09%09%20%20if(typesByName%5Bkey%5D%3D%3D%3D%20%22String%22)%0A%09%09%09%09%20%20%09json%5Bkey%5D%3D%20%22Great!%22%3B%0A%09%09%09%7D%0A%09%09%7D%0A*%2F%0A%09result%3D%20JSON.stringify(json)%3B%0A%09console.log(%22After%20transformation%3A%20%22%2Bresult)%3B%0A%09%09%09%09%09%0A%09%09%09%09%09','topic':'hr','table':'hr','keyspace':'mesonautsgym','path':'mesonautsgym','creator':'http://localhost:3000'}"
nodemon npm start


