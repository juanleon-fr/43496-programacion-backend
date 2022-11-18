const socket = io();

socket.on('connect', () => {
	console.log('Connected');
});

socket.emit('msg', { email: 'asfjasp', time: 'agasfa', message: 'aghkjasg' });

const sendProduct = () => {
	const title = document.getElementById('titleInput').value;
	const price = document.getElementById('priceInput').value;
	const thumbnail = document.getElementById('thumbnailInput').value;
	socket.emit('product', { title: title, price: price, thumbnail: thumbnail });
	console.log(title);
	document.querySelector('.input').value = '';
	return false;
};

socket.on('msg-list', (data) => {
	let html = '';
	data.forEach((element) => {
		html += `
        <div class="msj-container" >
        <p class="p-email">${element.timestamp} ${element.email} dice: <br> <span> ${element.mensaje}</span> </p>
        </div> 
        `;
	});
	document.getElementById('msgs-list-container').innerHTML = html;
});

const postProducto = () => {
	const producto = document.getElementById('producto').value;
	const price = document.getElementById('price').value;
	const imagen = document.getElementById('imagen').value;
	socket.emit('product', { name: producto, price: price, thumbnail: imagen });
	console.log(producto);
	return false;
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
		  <br>
		  <br>
		</div>
	  </div>
        `;
	});
	document.getElementById('products-container').innerHTML = html;
});
