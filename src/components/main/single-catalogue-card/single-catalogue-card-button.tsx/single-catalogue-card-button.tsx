import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { useAppSelector } from '../../../../hooks/hooks-index';
import { changeLoadingStatus } from '../../../../store/slices/data-slice';
import { GuitarCards } from '../../../../types/guitar';
import CartModalWindowWrapper from '../../../cart/cart-modal-window/cart-modal-window-wrapper';

type SingleCatalogueCardProps = {
    card: GuitarCards,
}

function SingleCatalogueCardButton( {card}: SingleCatalogueCardProps): JSX.Element {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const items = useAppSelector(({DATA}) => DATA.cartGuitars);
  const language = useAppSelector(({DATA}) => DATA.language);

  const dispatch = useDispatch();

  const itemsVendorCodes = items.map((item) => item.vendorCode);

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
    dispatch(changeLoadingStatus(false));
  };

  return (
    <>
      <CartModalWindowWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal} card={card} />
      {itemsVendorCodes.includes(card.vendorCode) ?
        <Link className="button button--red-border button--mini button--in-cart" to={AppRoute.CartPage}>{language === 'russian' ?  'В Корзине' : 'In cart'}</Link>
        :
        <Link className="button button--red button--mini button--add-to-cart" to="#" onClick={toggleModal} >{language === 'russian' ?  'Купить' : 'Purchase'}</Link>}
    </>
  );
}

export default SingleCatalogueCardButton;
