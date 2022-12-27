import MemContainer from '../../classes/MemContainer.js';

class CarritosDaoMem extends MemContainer {
	constructor() {
		super('../db/carritos.json');
	}
}

export default CarritosDaoMem;
