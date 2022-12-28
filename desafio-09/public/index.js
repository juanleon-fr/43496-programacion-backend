const socket = io();

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
	console.log({ data });
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
	let html = '';
	data.forEach((element) => {
		html += `
        <div>
		<div>
		<img src="" alt="nada" style="width: 50px;></div>
        <p>${element.email} <span>(at ${element.timestamp}): <span>${element.msg}</span></span></p>
        </div> 
        `;
	});
	document.getElementById('msg-list-container').innerHTML = html;
});
