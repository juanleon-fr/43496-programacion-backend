CRUD para probar GraphQL

mutation crear{
createProducto(datos:{nombre: "Remera", price :4000}) {
id
}
}

query todos {
getProductos {
id
nombre
price
}
}

query getUno {
getProducto(id: "db7c80dbd8d7e462584e") {
id
nombre
price
}
}

mutation updateUno {
updateProducto(id: "db7c80dbd8d7e462584e", datos: {nombre: "Pantalon", price: 20000}) {
id
nombre
price
}
}

mutation eliminarUno {
deleteProducto(id: "db7c80dbd8d7e462584e") {
id
nombre
price
}
}
