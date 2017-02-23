fs = require('fs')
let json= null;
fs.readFile(process.argv[2], 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  //let d= data.replace(/\'/g, '\"');
  //console.log(d);
  let json= JSON.parse(data);
  console.log(JSON.stringify(json.groups[0].apps[0].env.APPDEF));

  //let appdef= JSON.parse(json);
});
