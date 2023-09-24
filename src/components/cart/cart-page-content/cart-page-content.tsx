import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks-index';
import { setCoupon } from '../../../store/slices/data-slice';
import BreadcrumbsContent from '../../breadcrumbs/breadcrumbs';
import CardItemsList from '../cart-items-list/cart-items-list';
import { postCoupon } from '../../../store/api-actions';
import { useInput } from '../../../hooks/use-validation';


function CartPageContent(): JSX.Element {

  const couponInputRef = useRef<HTMLInputElement | null>(null);

  const [isValid, setIsValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const regexp = /^\S*$/;

  const dispatch = useAppDispatch();
  const items  = useAppSelector(({ DATA }) => DATA.cartGuitars);
  const coupon = useAppSelector(({ DATA }) => DATA.coupon);
  const language = useAppSelector(({DATA}) => DATA.language);

  const totalPrice = items.reduce((previousValue, guitar) => previousValue + guitar.price, 0);

  const discount = totalPrice * Number(coupon)/100;

  const couponValue = useInput('',{isEmpty: true, minLength: 1});

  const validate = () => {
    if(!couponValue.isEmpty && !couponValue.minLengthError && regexp.test(couponValue.value)){
      setIsValid(true);}
    else {
      setIsValid(false);
    }
  };

  const validateAndDispatch = (item:string) =>{
    setIsFormValid(true);
    return dispatch(postCoupon(item));
  };

  const handleCouponAdd = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (couponInputRef.current && couponInputRef.current.value !== '') {
      setIsSubmit(true);
      return  validateAndDispatch(couponInputRef.current.value);
    }
    setIsSubmit(true);
    dispatch(setCoupon(''));
  };

  useEffect(()=>{
    validate();
  });

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">{language === 'russian' ?  'Корзина' : 'Cart'}</h1>
        <BreadcrumbsContent />
        <div className="cart">
          <CardItemsList />
          <div className="cart__footer">
            <div className="cart__coupon coupon">
              <h2 className="title title--little coupon__title">{language === 'russian' ?  'Промокод на скидку' : 'Promocode'}</h2>
              <p className="coupon__info">{language === 'russian' ?  'Введите свой промокод, если он у вас есть.' : 'Enter your promo code if you have one.'}</p>
              <form className="coupon__form" id="coupon-form" method="post" action="/">
                <div className="form-input coupon__input">
                  <label className="visually-hidden">{language === 'russian' ?  'Промокод' : 'Promocode'}</label>
                  {isSubmit ? '' : <input onChange={(e) => couponValue.onChange(e)} value={couponValue.value.replace(/\s/g, '')} ref={couponInputRef} type="text" placeholder={language === 'russian' ?  'Введите промокод' : 'Enter promocode'} id="couponWithoutText" name="coupon"></input>}
                  {coupon && isFormValid ?
                    <>
                      <input onChange={(e) => couponValue.onChange(e)} value={couponValue.value.replace(/\s/g, '')} ref={couponInputRef} type="text" placeholder={language === 'russian' ?  'Введите промокод' : 'Enter promocode'} id="coupon" name="coupon"/>
                      <p className="form-input__message form-input__message--success">{language === 'russian' ?  'Промокод принят' : 'Promocode accepted'}</p>
                    </>
                    :
                    ''}
                  {!coupon && isSubmit  ?
                    <>
                      <input onChange={(e) => couponValue.onChange(e)} value={couponValue.value.replace(/\s/g, '')} ref={couponInputRef} type="text" placeholder={language === 'russian' ?  'Введите промокод' : 'Enter promocode'} id="couponError" name="coupon"/>
                      <p className="form-input__message form-input__message--error">{language === 'russian' ?  'Неверный промокод' : 'Invalid promocode'}Неверный промокод</p>
                    </>
                    :
                    ''}
                </div>
                <button onClick={handleCouponAdd} className="button button--big coupon__button" type={isValid ? 'submit' : 'button'}>{language === 'russian' ?  'Применить' : 'Apply'}</button>
              </form>
            </div>
            <div className="cart__total-info">
              <p className="cart__total-item"><span className="cart__total-value-name">{language === 'russian' ?  'Всего:' : 'Total:'}</span><span className="cart__total-value">{totalPrice.toLocaleString()} ₽</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">{language === 'russian' ?  'Скидка:' : 'Discount:'}</span><span className={`cart__total-value ${coupon ? 'cart__total-value--bonus': ''}`}>{coupon? discount.toLocaleString(): 0} ₽</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">{language === 'russian' ?  'К оплате:' : 'To pay:'}</span><span className="cart__total-value cart__total-value--payment">{(totalPrice - discount).toLocaleString()} ₽</span></p>
              <button className="button button--red button--big cart__order-button">{language === 'russian' ?  'Оформить заказ' : 'Checkout'}</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPageContent;
