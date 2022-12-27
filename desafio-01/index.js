class Usuario {
	constructor(nombre, apellido) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = [];
		this.mascotas = [];
	}

	getFullName() {
		return `${this.nombre} ${this.apellido}`;
	}

	addMascota(petName) {
		this.mascotas = [...this.mascotas, petName];
	}

	countMascotas() {
		return this.mascotas.length;
	}

	addBook(titulo, autor) {
		this.libros = [...this.libros, { titulo, autor }];
	}

	getBookNames() {
		return this.libros
			.map((libro) => libro.titulo)
			.toString()
			.replace(/,/g, ', ')
            .concat('.');
	}
}

const usuario = new Usuario('Carlitos', 'Tévez');

usuario.addMascota('boa constrictor');
usuario.addMascota('perro');
usuario.addMascota('gato');
usuario.addMascota('monito titi');
usuario.addBook('Le temo a las alturas', "Shaquille O'Neal");
usuario.addBook('El libro para niños que están aburridos', 'Johnson Sally');
usuario.addBook('1984', 'George Orwell');

console.log(`Nombre completo: ${usuario.getFullName()}`);
console.log(`Cantidad de mascotas: ${usuario.countMascotas()}`);
console.log(`Libros leídos: ${usuario.getBookNames()}`);


//ejercicio clase jueves

const fs = require('fs');

let dataRecuperadaDelArchivo;

try {

    const hora = new Date();

    console.log(hora)
    fs.writeFileSync('./data.txt', `${hora}`)
    dataRecuperadaDelArchivo = fs.readFileSync('./data.txt', 'utf-8');

} catch (e) {
    console.log(e);

}

console.log(dataRecuperadaDelArchivo)
