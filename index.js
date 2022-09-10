const fs = require('fs');
const qrcode = require('qrcode-terminal');
const path = require('path');
const qrimg = require('qrcode');
const express = require('express')
const http = require('http');
const app = express(); 
const socket = http.createServer(app);
const { Client, LocalAuth } = require('./ano');
const { Server } = require('socket.io');
const io = new Server(socket);
const { handleSocket } = require('./socket');
const { storeChatLog } = require('./db');

const client = new Client({
	puppeteer: { executablePath: '/usr/bin/chromium',headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] },
	authStrategy: new LocalAuth({
		clientId: "client-887913"
	})
}); 

client.on('qr', (qr) => {
	app.get('/', (req, res) => {
		res.render('home', { status: 'Offline' });
	});

	app.get('/qr/', (req, res) => {
		qrimg.toFile(path.resolve(__dirname, './', 'ano.png'), qr);
		//qrimg.toFile(path.resolve(__dirname, './public', 'ano.png'), qr);
		res.set("Content-Type", "text/html");
		//OR
		res.setHeader("Content-Type", "text/html");
		res.render('qr');
  });
	
	app.get('/qrimg/', (req, res) => {
			res.sendFile(__dirname + '/ano.png');
	});

  console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
	handleSocket(io);
	
	app.get('/chatlog', (req, res) => {
		res.render('chatlog');
	});

	app.get('/', async (req, res) => {
		const context = {
			chatCount: (await client.getChats()).length,
			contactCount: (await client.getContacts()).length,
			status: 'Online',
		}
		res.render('home', context);
	})
})

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});

client.on('auth_failure', msg => {
    console.log('AUTHENTICATION FAILURE', msg);
});


client.on('message', async msg => {

	const chat = await msg.getChat();
	const contact = await msg.getContact();
	const command = msg.body.substring(1).split(' ')[0];
  const params = msg.body.split(' ').filter((param) => !param.startsWith('/'));

	if (chat.isGroup) {
		await storeChatLog(msg, io);
	}

	if (command === 'ping') {
		await chat.sendMessage(`Pong ${contact.number}!`, {
			mentions: [contact]
		})
	} 
	// Create your own command here
});

client.on('message_create', async (msg) => {
//console.log('MESSAGE RECEIVED', msg);
    // Fired on all message creations, including your own
      if (msg.fromMe) {
        //console.log('{"status": "#####FROM ME#######"},')
    }
  
});

client.on('message_ack', (msg, ack) => {
    /*
        == ACK VALUES ==
        ACK_ERROR: -1
        ACK_PENDING: 0
        ACK_SERVER: 1
        ACK_DEVICE: 2
        ACK_READ: 3
        ACK_PLAYED: 4
    */

    if(ack == 3) {
        //console.log ('{"status terbaca": "######readed#########"},')
    }
	
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
const port = process.env.PORT || 3111;

(async () => {
	await client.initialize();
	socket.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	});
})();





