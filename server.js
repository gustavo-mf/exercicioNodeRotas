'use strict';

const fs = require('fs');

const express = require('express');
let app = express();
let port = 3000;

const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: true })); 

/*http://localhost:3000/ (GET)
http://localhost:3000/contato (GET)
http://localhost:3000/contato (POST)*/

app.get('/', (req, res) => {
	/*let msgs = getMsgs();
	console.log(msgs);
  res.send('mensagens :'+msgs);*/
  fs.readFile('msgs.json', 'utf8', (err, data) => {
		if (err) {
			console.log(err);
		} else {
			let obj = JSON.parse(data);
			let keys = Object.keys(obj);
			let str = '<div>';
			for (let i = 0; i < keys.length; i++) {
				str += '<div>'+obj[keys[i]]['email']+'</div>';
				str += '<div>'+obj[keys[i]]['mensagem']+'</div>';
			}
			str += '</div>'
			res.send('mensagens :'+str);
		}
	});
});

app.get('/contato', (req, res) => {
  res.send(`<h1>Contato</h1>
  <form action="/contato" method="POST">
    <label for="email">Email:</label>
    <input type="email" name="email" id="email">
    <label for="mensagem">Mensagem:</label>
    <textarea name="mensagem" id="mensagem"></textarea>
    <input type="submit" value="Enviar">
  </form>`);
});

app.post('/contato', jsonParser, (req, res) => {
	let email = req.body.email;
  let mensagem = req.body.mensagem;
  res.send('email: ' + email + ' mensagem: ' + mensagem);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
})

function getMsgs() {
	fs.readFile('msgs.json', 'utf8', (err, data) => {
		if (err) {
			console.log(err);
		} else {
			let obj = JSON.parse(data);
			let keys = Object.keys(obj);
			let str = '<div>';
			for (let i = 0; i < keys.length; i++) {
				str += '<div>'+obj[keys[i]]['email']+'</div>';
				str += '<div>'+obj[keys[i]]['mensagem']+'</div>';
			}
			str += '</div>'
			console.log(str);
			return str; 
		}
	});
}