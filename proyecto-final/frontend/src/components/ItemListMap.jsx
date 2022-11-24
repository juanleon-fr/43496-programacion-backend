import Item from './ItemRender';

const ItemListMap = ({ data }) => {
	return (
		<section className='itemsContainer productos__grid' id='productosContainer'>
			{data.map((item) => {
				if (item.stock >= 1) {
					return <Item key={item.id} id={item.id} title={item.title} price={item.price} color={item.color} thumbnail={item.thumbnail} />;
				} else return <></>;
			})}
		</section>
	);
};

export default ItemListMap;
