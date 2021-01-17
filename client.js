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

// to receive data and print it out to the screen
conn.on('data', (data) => {
  // printed out client side, with whatever data was sent from server
  console.log(data);
});

// on input from the terminal
stdin.on('data', (input) => {
  conn.write(`${input}`)
})