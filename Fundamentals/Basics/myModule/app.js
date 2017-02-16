'use strict';
//const enigma = require('./enigma');
const Enigma = require('./enigma');
const eng = new Enigma("S3CR3T");

let encodedStr = eng.encode("Navneet");
console.log("Encoded " , encodedStr);
console.log("Decoded " , eng.decode(encodedStr));

let qr = eng.qrgen("http://npmjs.com", "qr.png");
qr ? console.log("QR Code generated!") : console.log("QR Code not generated!") 