import FsContainer from '../../classes/FsContainer.js';

class CarritosDaoFs extends FsContainer {
	constructor() {
		super('src/db/carritos.json');
	}
}

export default CarritosDaoFs;
