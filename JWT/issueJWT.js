const base64url = require('base64url')
const crypto = require('crypto');
const signatureFunction = crypto.createSign('SHA256');
const fs = require('fs')

const headerObj = {
	alg:'RS256',
	typ:'JWT'
};

const payloadObj={
	sub:'1234567890',
	name:'John Doe',
	admin:true,
	iat:1516239022
};

// convert from JS to JWT
const headerObjString = JSON.stringify(headerObj)
const payloadObjString = JSON.stringify(payloadObj)

// pass through base64 url
const base64urlHeader = base64url(headerObjString);
const base64urlPayload = base64url(payloadObjString);

// create signature
signatureFunction.write(base64urlHeader + '.' + base64urlPayload);
signatureFunction.end();


// Private key to sign in
const PRI_KEY = fs.readFileSync('priv_key.pem', 'utf8');
const signatureBase64 = signatureFunction.sign(PRI_KEY,'base64')

// convert  signature from base64 to base64Url
const signatureBase64Url = base64Url.fromBase64(signatureBase64);

console.log(signatureBase64Url)


// const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ'; 

// const jwtparts = JWT.split('.');

// const headerInBaseurlFormat = jwtparts[0];
// const payloadInBaseurlFormat = jwtparts[1];
// const signatureInBaseurlFormat = jwtparts[2];

// // decoding
// const decodeHeader = base64url.decode(headerInBaseurlFormat);
// const decodePayload = base64url.decode(payloadInBaseurlFormat);
// const decodeSignature = base64url.decode(signatureInBaseurlFormat);

// console.log(decodeHeader)
// console.log(decodePayload)
// console.log(decodeSignature)

