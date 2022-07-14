import { useAppSelector } from '../../../hooks/hooks-index';
import { GuitarCards } from '../../../types/guitar';
import SingleCartItem from '../single-cart-item/single-cart-item';


function CardItemsList() {

  const items = useAppSelector(({DATA}) => DATA.cartGuitars);

  const getUniqueCartGuitars = (): GuitarCards[] => [...new Map(items.map((item) => [item['id'], item])).values()];


  return (
    getUniqueCartGuitars().length !== 0 ?
      <>
        {getUniqueCartGuitars().map((item) => <SingleCartItem item={item} key={item.id}/>)}
      </>
      :
      <>
      </>
  );
}
export default CardItemsList;
