export VALIDATOR="http://localhost:3034/validate"
export TRANSFORMER="http://localhost:3032/transform"
export KAFKA_BACKEND="http://localhost:3031/data"
export CASSANDRA_BACKEND="http://localhost:3033/data"

export APPDEF="{'name':'e.g. My cool App','showLocation':true,'fields':[{'name':'f1','pivot':true,'type':'String'},{'name':'id','type':'Long','pivot':'false'},{'name':'location','type':'Location','pivot':'false'},{'name':'event_timestamp','type':'Date/time','pivot':'false'}],'transformer':'%09%2F%2F%20Raw%20message%20available%20as%3A%20rawtext%3B%0A%09%2F%2F%20save%20result%20in%20variable%3A%20result%0A%09%2F%2F%20result%20is%20of%20type%20String%0A%09%2F%2F%20e.g.%20input%20xml%20-%3E%20json%20output%0A%09%2F%2F%20result%3D%20JSON.stringify(parser.toJson(rawtext)%3B%0A%0A%09%2F%2F%20get%20json%20object%3A%20JSON.parse(rawtext)%3B%0A%09%2F%2F%20also%20available%20fields%5B%5D%2C%20e.g.%20fields%5B0%5D.name%3D%3D%20%22id%22%2C%20fields%5B2%5D.type%0A%09console.log(%22In%20%3A%20%22%2Brawtext)%3B%0A%09let%20json%3D%20JSON.parse(rawtext)%3B%0A%09json.f1%3D%20%22WORLD%22%3B%0A%09result%3D%20JSON.stringify(json)%3B%0A%09console.log(%22After%20transformation%3A%20%22%2Bresult)%3B%0A%09%09%09%09%09','topic':'e','table':'e','keyspace':'e','path':'e','creator':'http://localhost:3000'}"

nodemon npm start


