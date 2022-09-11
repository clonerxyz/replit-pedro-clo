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
const isAuthenticated = require('./middleware/auth');
const printInfo = require('./utils/info');
require('dotenv').config();

const client = new Client({
	puppeteer: { executablePath: '/usr/bin/chromium',headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] },
	authStrategy: new LocalAuth({
		clientId: "client-887913"
	})
}); 

client.on('qr', (qr) => {
	io.sockets.emit('newqr');
	client.ready = false;
	app.get('/qr/', (req, res) => {
		qrimg.toFile(path.resolve(__dirname, './img', 'qr.png'), qr);
		//qrimg.toFile(path.resolve(__dirname, './public', 'ano.png'), qr);
		res.set("Content-Type", "text/html");
		//OR
		res.setHeader("Content-Type", "text/html");
		res.render('qr');
  });
	
	app.get('/qrimg/', (req, res) => {
			res.sendFile(__dirname + '/img/qr.png');
	});
});

client.on('ready', async () => {
	client.ready = true;

	handleSocket(io);

	app.get('/chatlog', (req, res) => {
		res.render('chatlog');
	});

	await printInfo(client);
})

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});

client.on('auth_failure', msg => {
    console.log('AUTHENTICATION FAILURE', msg);
});


client.on('message_create', async msg => {

	const chat = await msg.getChat();
	const contact = await msg.getContact();

	if (chat.isGroup) {
		await storeChatLog(msg, io);
	}

	// Prefix
	if (msg.body.startsWith(process.env.PREFIX | '!')) {
		const command = msg.body.substring(1).split(' ')[0];
		const params = msg.body.split(' ').filter((param) => !param.startsWith('/'));
		
		if (command === 'ping') {
			await chat.sendMessage(`Pong ${contact.number}!`, {
				mentions: [contact]
			});
		} else if(command === 'echo'){
			const message = params[0]; // Example: !echo Hello!
			await chat.sendMessage(message);
		}
		// Create your own command here

	};
	
});

client.on('message', async (msg) => {
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

app.get('/', isAuthenticated(client), (req, res) => {
	const context = {
		chatCount: 0,
		contactCount: 0,
		status: 'Offline',
	}
	res.render('home', context);
});

const port = process.env.PORT || 3111;

(async () => {
	client.initialize();
	socket.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	});
})();





