import { useRef, useState } from 'react';
import { QuantityChangeType } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks-index';
import {  addToCart, changeLoadingStatus, deleteFromCart } from '../../../store/slices/data-slice';
import { GuitarCards } from '../../../types/guitar';
import { guitarStyle } from '../../../utils/utils';
import CartModalWindowWrapper from '../cart-modal-window/cart-modal-window-wrapper';


type SingleCartItemProps = {
    item: GuitarCards,
}

function SingleCartItem( {item}: SingleCartItemProps): JSX.Element {

  const { name, previewImg, price, vendorCode, stringCount, type} = item;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const items = useAppSelector(({DATA})=> DATA.cartGuitars);

  const getQuantity = (): number => items.slice().filter(({id}) => id === item.id).length;

  const [itemQuantity, setItemQuantity] = useState(getQuantity());


  const quantityRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const quantityHandler = (way:string) => {
    if (itemQuantity <= 99) {
      if(way === QuantityChangeType.Plus&& itemQuantity < 99) {
        dispatch(addToCart(item));
        return setItemQuantity(itemQuantity + 1);
      }
      if(way === QuantityChangeType.Minus && itemQuantity === 1){
        return toggleModal();
      }
      if(way === QuantityChangeType.Minus && itemQuantity<= 99 && itemQuantity !== 1){
        dispatch(deleteFromCart(item));
        setItemQuantity(itemQuantity - 1);
      }
    }
  };

  const handlePriceChange = (): void => {
    if(quantityRef.current && Number(quantityRef.current.value) <= 99){
      quantityRef.current && setItemQuantity(Number(quantityRef.current.value));
      if(quantityRef.current && getQuantity() < Number(quantityRef.current.value)){
        const difference = Number(quantityRef.current.value)- getQuantity();
        for(let i=0; i<difference; i++){
          dispatch(addToCart(item));
        }
        return;
      }
      if(quantityRef.current && getQuantity() > Number(quantityRef.current.value)){
        const difference = getQuantity() -Number(quantityRef.current.value);
        for(let i=0; i<difference; i++){
          dispatch(deleteFromCart(item));
        }
      }
    }
  };

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
    dispatch(changeLoadingStatus(false));
  };

  return(
    <div className="cart-item">
      <button onClick={toggleModal} className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image"><img src={`/${previewImg}`} srcSet={`/${previewImg?.slice(0, -4)}@2x.jpg 2x`} width="55" height="130" alt={name}/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitarStyle(type)} {name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{guitarStyle(type)}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button onClick={()=>quantityHandler(QuantityChangeType.Minus)} className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input onChange={handlePriceChange} ref={quantityRef} value={itemQuantity} className="quantity__input" type="number" placeholder="1" id="4-count" name="4-count" max="99"/>
        <button onClick={()=>quantityHandler(QuantityChangeType.Plus)} className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{price * itemQuantity} ₽</div>
      <CartModalWindowWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal} card={item} />
    </div>);
}
export default SingleCartItem;


