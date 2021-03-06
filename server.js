const net = require('net');

const stdin = process.stdin;
stdin.setEncoding('utf8');

const fs = require('fs');

const server = net.createServer();

// detects a new client connection
// sends a greeting upon connection
server.on('connection', (client) => {
  client.setEncoding('utf8');

  const joinMsgObj = {join: 'You have joined the file server. To request a file, type file filename.extension'}
  const joinMsg = JSON.stringify(joinMsgObj);
  client.write(joinMsg);

  client.on('data', (data) => {
    console.log(data);
    let inputArr = data.split("")
    let param = "";
    for (let i = 0; i < 4; i++) {
      param += inputArr[i];
    }

    let fileName = "";
    for (let j = 5; j < inputArr.length - 1; j++) {
      fileName += inputArr[j];
    }
  
    const filePath = "./" + fileName;

    // if requesting a file
    if (param === "file") {
      fs.readFile(`${filePath}`, 'utf8', (error, data) => {
        if (error) {
          const errorObj = {error: 'File does not exist'};
          const errorMsg = JSON.stringify(errorObj);
          client.write(errorMsg);
        }
        let textFileObj = { body: data };
        let textFile = JSON.stringify(textFileObj);
        client.write(textFile);
      })
    }
  })
});

server.listen(6009);