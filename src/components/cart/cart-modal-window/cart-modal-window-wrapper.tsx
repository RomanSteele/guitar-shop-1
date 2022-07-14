import { GuitarCards } from '../../../types/guitar';
import CartModalWindow from '../cart-modal-window/cart-modal-window';
import CartModalDelete from './cart-modal-delete';


type ModalWindowWrapperProps = {
    isModalVisible: boolean,
    onBackdropClick: () => void,
    card: GuitarCards,

}


function CartModalWindowWrapper ({onBackdropClick, isModalVisible, card}:ModalWindowWrapperProps):  JSX.Element {

  if (!isModalVisible){
    return(
      <>
      </>
    );
  }
  if(window.location.pathname.includes('cart')){
    return(
      <CartModalDelete isModalVisible={isModalVisible} onBackdropClick={onBackdropClick} card={card} />
    );
  }
  return(
    <CartModalWindow onBackdropClick={onBackdropClick} isModalVisible={isModalVisible} card={card} />
  );
}

export default CartModalWindowWrapper;
