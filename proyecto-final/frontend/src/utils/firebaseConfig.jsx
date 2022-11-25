// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

let api;
const onlineMode = false;
onlineMode ? (api = 'http://localhost:8080/') : (api = 'http://localhost:8080/api/');

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDnC6nSiv5jbMjTArFvJURnTOlp2eR1vyQ',
	authDomain: 'entropy-unbounded-react.firebaseapp.com',
	projectId: 'entropy-unbounded-react',
	storageBucket: 'entropy-unbounded-react.appspot.com',
	messagingSenderId: '225532053066',
	appId: '1:225532053066:web:d79c3437cac4d6144c48b3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// export const fsFetchDocs = async () => {
// 	const querySnapshot = await getDocs(collection(db, 'products'));
// 	const fsData = querySnapshot.docs.map((doc) => ({
// 		id: doc.id,
// 		...doc.data(),
// 	}));
// 	return fsData;
// };

export async function fsFetchDocs() {
	let products = await fetch(`${api}productos`).then((res) => res.json());
	return products;
}

// export const fsFetchDocById = async (id) => {
// 	const docRef = doc(db, 'products', id);
// 	const docSnap = await getDoc(docRef);
// 	if (docSnap.exists()) {
// 		const item = docSnap.data();
// 		item.id = id;
// 		return item;
// 	} else {
// 		// doc.data() will be undefined in this case
// 		console.log('No such document!');
// 	}
// };

export const fsFetchDocById = async (id) => {
	let product = await fetch(`${api}productos/${id}`).then((res) => res.json());
	return product;
	// const docRef = doc(db, 'products', id);
	// const docSnap = await getDoc(docRef);
	// if (docSnap.exists()) {
	// 	const item = docSnap.data();
	// 	item.id = id;
	// 	return item;
	// } else {
	// 	// doc.data() will be undefined in this case
	// 	console.log('No such document!');
	// }
};

// export const fsSetDocOrder = async (order) => {
// 	const newOrderRef = doc(collection(db, 'orders'));
// 	await setDoc(newOrderRef, order);
// 	return newOrderRef;
// };

export const fsSetDocOrder = async (order) => {
	const newOrderRef = doc(collection(db, 'orders'));
	await setDoc(newOrderRef, order);
	return newOrderRef;
};

// export const fsUpdateDoc = async (id, substractStock) => {
// 	const itemRef = doc(db, 'products', id);
// 	await updateDoc(itemRef, {
// 		stock: increment(-substractStock),
// 	});
// };

export const fsUpdateDoc = async (id, substractStock) => {
	const itemRef = doc(db, 'products', id);
	await updateDoc(itemRef, {
		stock: increment(-substractStock),
	});
};
