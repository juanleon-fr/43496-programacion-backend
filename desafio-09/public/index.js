const socket = io();

// const { denormalize, schema } = require('normalizr');

const sendProduct = () => {
	const title = document.getElementById('titleInput').value;
	const price = document.getElementById('priceInput').value;
	const thumbnail = document.getElementById('thumbnailInput').value;
	if (title !== '' && !isNaN(price) && thumbnail !== '') {
		socket.emit('new-product', { title: title, price: Number(price), thumbnail: thumbnail });
		document.querySelector('#titleInput').value = '';
		document.querySelector('#priceInput').value = '';
		document.querySelector('#thumbnailInput').value = '';
		return;
	}
	return alert('Ingrese correctamente los datos');
};

const sendMessage = () => {
	const email = document.getElementById('emailInput').value;
	const msg = document.getElementById('msgInput').value;
	if (email !== '' && msg !== '') {
		socket.emit('new-msg', { email: email, msg: msg });
		document.querySelector('#msgInput').value = '';
		return;
	}
	return alert('Ingrese correctamente el email o escriba un mensaje válido');
};

socket.on('product-list', (data) => {
	let html = '';
	data.forEach((element) => {
		html += `
		<div>
			<div>
				<img src="${element.thumbnail}" alt="${element.title}" style="width: 200px;">
				  <p>${element.price}</p>
			</div>
			<div>
				<h3>${element.title}</h3>
				<h4>-----</h4>
				<br><br>
			</div>
		  </div>
		`;
	});
	document.getElementById('product-list').innerHTML = html;
});

socket.on('msg-list', (data) => {
	// denormalizar data
	// const dataraw = {
	// 	entities: {
	// 		authors: {
	// 			'rickydarin@gmail.com': {
	// 				id: 'rickydarin@gmail.com',
	// 				nombre: 'Ricardo',
	// 				apellido: 'Darín',
	// 				edad: 10,
	// 				alias: 'rickymaster',
	// 				avatar: 'https://i.pinimg.com/originals/ab/6c/69/ab6c69b36287628b0eba043827c1c74a.jpg',
	// 			},
	// 			'francellita77@gmail.com': {
	// 				id: 'francellita77@gmail.com',
	// 				nombre: 'Guillermo',
	// 				apellido: 'Francella',
	// 				edad: 12,
	// 				alias: 'pepeargento',
	// 				avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgTNYnoXrvO_WRCQe9aWhgLhnaMLRc82J3Q&usqp=CAU',
	// 			},
	// 		},
	// 	},
	// 	result: [
	// 		{
	// 			author: 'rickydarin@gmail.com',
	// 			text: 'hola',
	// 		},
	// 		{
	// 			author: 'francellita77@gmail.com',
	// 			text: 'buen dia... hermosa mañana verdad?',
	// 		},
	// 		{
	// 			author: 'rickydarin@gmail.com',
	// 			text: 'sabes que si papa',
	// 		},
	// 		{
	// 			author: 'francellita77@gmail.com',
	// 			text: 'bueno te dejo que me tengo que ir al super a comprar vinagre',
	// 		},
	// 		{
	// 			author: 'rickydarin@gmail.com',
	// 			text: 'chau master',
	// 		},
	// 	],
	// };
	const entities = data.entities;
	const authorSchema = new schema.Entity('authors');
	const msgSchema = {
		author: authorSchema,
	};
	const msgListSchema = [msgSchema];
	const agorasim = denormalize(data, msgListSchema, entities);
	console.log(agorasim);
	let html = '';
	// data.forEach((element) => {
	// 	html += `
	//     <div>
	// 	<div>
	// 	<img src=${element.author.avatar} alt="nada" style="width: 50px;></div>
	//     <p>${element.author.nombre} ${element.author.apellido}<span>(${element.author.id}): <span>${element.text}</span></span></p>
	//     </div>
	//     `;
	// });
	// document.getElementById('msg-list-container').innerHTML = html;
});
