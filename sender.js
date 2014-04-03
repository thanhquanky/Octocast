/***
Author: Thanh Ky Quan <thanhquanky@gatech.edu>

Project: Octocast

Version: 0.1.0
***/
var dgram = require('dgram'),
    client = dgram.createSocket("udp4"),
    fs = require('fs'),
    argv = require('optimist').argv;

var has_read = 0,
    chunk_size = 8,
    count = 0;

var PORT = argv.port || 5000,
    IP = argv.ip,
    INPUT_FILE = argv.input || 'test.txt';

console.log("Ip:Port = " + IP+":"+PORT);
console.log("Input = " + INPUT_FILE);
var readStream = fs.createReadStream(INPUT_FILE);
readStream
.on('readable', function() {
  var chunk = readStream.read(chunk_size);
  console.log(chunk);
  while (null !== chunk) {
    client.send(chunk, 0, chunk.length, PORT, IP, function(err, bytes) {
      if (err) {
        console.log('Error!');
        console.log(err);
      }
    });
    has_read += chunk_size;
    chunk = readStream.read(chunk_size);
  }
})
.on('end', function() {
  console.log("Done!!!");
});
