const fs = require('fs');
const qrcode = require('qrcode-terminal');
const path = require('path');
const qrimg = require('qrcode');
const express = require('express')
const app = express();
const { Client, LocalAuth } = require('./ano');
const client = new Client({
	puppeteer: { headless: true, args: ['--no-sandbox'] },
	authStrategy: new LocalAuth({
		clientId: "client-887913"
	})
}); 

client.on('qr', (qr) => {
	app.get('/qr/', (req, res) => {
	qrimg.toFile(path.resolve(__dirname, './', 'ano.png'), qr);
	//qrimg.toFile(path.resolve(__dirname, './public', 'ano.png'), qr);
	res.set("Content-Type", "text/html");
	//OR
	res.setHeader("Content-Type", "text/html");
  
	res.send(`
	<head>
		
		<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/sweetalert2@7.12.15/dist/sweetalert2.min.css'>
		<style>
			body {
			margin: 20px auto;
			font-family: 'Lato';
			font-weight: 300;
			width: 600px;
			text-align: center;
			}
  
			button {
			background: cornflowerblue;
			color: white;
			border: none;
			padding: 10px;
			border-radius: 8px;
			font-family: 'Lato';
			margin: 5px;
			text-transform: uppercase;
			cursor: pointer;
			outline: none;
			}
  
			button:hover {
			background: orange;
			}
		</style>
	</head>
	<body>
	<button style="font-family: Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif;font-weight:900;background-color:#ed5c75;color:#000;" class="btn btn-lg btn-block" type="button" disabled>
	  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
	  Loading qr...
	</button>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.12.15/dist/sweetalert2.all.min.js"></script>
		<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
		<script>
					//setTimeout(function() {
					setTimeout(function swals(){
					$(".loader").hide();
					swal({title: 'scan qr ini dalam waktu 1 menit',imageUrl: '/qrimg'}).then(function() {window.location = "/";});
				},5000);
				//}
		</script>
		<body onload="swals()"></body>
	</body>
	`);
  	});
	  app.get('/qrimg/', (req, res) => {
		res.sendFile(__dirname + '/ano.png');
		});
		
		app.get('/', (req, res) => {
		res.sendFile(__dirname + '/log.txt');
		});
    console.log('QR RECEIVED', qr);
	});
client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});

client.on('auth_failure', msg => {
    console.log('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.initialize();
client.on('message', async msg => {
	const fs = require('fs');
	const chat = await msg.getChat();
	const contact = await msg.getContact();
	fs.appendFile('log.txt', `${contact.number?.slice(5)} ${contact?.pushname,msg.body}\n`, function (err) {
		if (err) throw err;
		//console.log('Saved!');
	  });
	console.log("["+contact.number?.slice(5),contact?.pushname,msg.body+"]\n");
	if (msg.body === '1') {
		const chat = await msg.getChat();
		const contact = await msg.getContact();
		if (`${contact.number}` === '6282246901096'){
			chat.sendStateTyping();
			chat.sendMessage(`Hallo gosujin sama @${contact.number} ^_^`, {
				mentions: [contact]
			});
		}
		else {
			chat.sendStateTyping();
			chat.sendMessage(`Hi @${contact.number}!`, {
				mentions: [contact]
			});
		}
    }
	else if (msg.body === '2') {
		const chat = await msg.getChat();
		const contact = await msg.getContact();
		console.log(contact);
    }
	
    
    else {
  	
    }
	
	

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
const port = process.env.PORT || 3111
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})


