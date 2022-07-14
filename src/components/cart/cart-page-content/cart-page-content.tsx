import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks-index';
import { setCoupon } from '../../../store/slices/data-slice';
import BreadcrumbsContent from '../../breadcrumbs/breadcrumbs';
import CardItemsList from '../cart-items-list/cart-items-list';
import { CouponCodes } from '../../../const';
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
      if(couponInputRef.current.value === CouponCodes.light || couponInputRef.current.value === CouponCodes.medium || couponInputRef.current.value === CouponCodes.height){
        setIsSubmit(true);
        return  validateAndDispatch(couponInputRef.current.value);
      }
      setIsSubmit(true);
      dispatch(setCoupon(''));
    }
  };

  useEffect(()=>{
    validate();
  });

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <BreadcrumbsContent />
        <div className="cart">
          <CardItemsList />
          <div className="cart__footer">
            <div className="cart__coupon coupon">
              <h2 className="title title--little coupon__title">Промокод на скидку</h2>
              <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
              <form className="coupon__form" id="coupon-form" method="post" action="/">
                <div className="form-input coupon__input">
                  <label className="visually-hidden">Промокод</label>
                  {isSubmit ? '' : <input onChange={(e) => couponValue.onChange(e)} value={couponValue.value} ref={couponInputRef} type="text" placeholder="Введите промокод" id="couponWithoutText" name="coupon"></input>}
                  {coupon && isFormValid ?
                    <>
                      <input onChange={(e) => couponValue.onChange(e)} value={couponValue.value} ref={couponInputRef} type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
                      <p className="form-input__message form-input__message--success">Промокод принят</p>
                    </>
                    :
                    ''}
                  {!coupon && isSubmit  ?
                    <>
                      <input onChange={(e) => couponValue.onChange(e)} value={couponValue.value} ref={couponInputRef} type="text" placeholder="Введите промокод" id="couponError" name="coupon"/>
                      <p className="form-input__message form-input__message--error">Неверный промокод</p>
                    </>
                    :
                    ''}
                </div>
                <button onClick={handleCouponAdd} className="button button--big coupon__button" type={isValid ? 'submit' : 'button'}>Применить</button>
              </form>
            </div>
            <div className="cart__total-info">
              <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalPrice} ₽</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={`cart__total-value ${coupon ? 'cart__total-value--bonus': ''}`}>{coupon? discount: 0} ₽</span></p>
              <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{totalPrice - discount} ₽</span></p>
              <button className="button button--red button--big cart__order-button">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPageContent;
