import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/hooks-index';
import { changeLoadingStatus } from '../../../../store/slices/data-slice';
import { GuitarCards } from '../../../../types/guitar';
import CartModalWindowWrapper from '../../../cart/cart-modal-window/cart-modal-window-wrapper';

type SingleCatalogueCardProps = {
    card: GuitarCards,
}

function ProductPageButton( {card}: SingleCatalogueCardProps): JSX.Element {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const language = useAppSelector(({DATA}) => DATA.language);

  const dispatch = useDispatch();


  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
    dispatch(changeLoadingStatus(false));
  };


  return (
    <>
      <CartModalWindowWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal} card={card} />
      <Link onClick={toggleModal} className="button button--red button--big product-container__button" to=".">{language === 'russian' ?  'Добавить в корзину' : 'Add to cart'}</Link>
    </>
  );
}

export default ProductPageButton;
