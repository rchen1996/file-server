const net = require('net');

const stdin = process.stdin;
stdin.setEncoding('utf8');

const fs = require('fs');

// code to connect to the server
const conn = net.createConnection({
  host: 'localhost',
  port: 6009
});

conn.setEncoding('utf8'); // interpret data as text

// on input from the terminal
stdin.on('data', (input) => {
  conn.write(`${input}`)
})

// to receive data and print it out to the screen
conn.on('data', (data) => {
  // printed out client side, with whatever data was sent from server
  const received = JSON.parse(data);

  // if receiving a message or an error, just print to the console
  if (received.join) {
    console.log(received.join);
  } else if (received.error) {
    console.log(received.error);
  }

  // if receiving text file, save the file
  if (received.body) {
    console.log('What would you like to save the file as?');

    stdin.on('data', (input) => {
      let fileName = "";
      for (let j = 0; j < input.length - 1; j++) {
        fileName += input[j];
      }
      fs.writeFile(`./client-files/${fileName}`, received.body, (err) => {
        if (err) {
          throw new Error('There was an error saving the file.')
        }
        console.log('The file has been saved!');
        process.exit();
      })
    })
  }
});

