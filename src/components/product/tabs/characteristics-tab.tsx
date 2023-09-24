import { useAppSelector } from '../../../hooks/hooks-index';
import { GuitarCard } from '../../../types/guitar';
import { guitarStyle } from '../../../utils/utils';


type CharacteristicsTabProps = {
    guitar: GuitarCard,
  }

function CharacteristicsTab({ guitar }: CharacteristicsTabProps): JSX.Element {

  const language = useAppSelector(({DATA}) => DATA.language);

  const { stringCount, description, vendorCode, type } = guitar;


  return (
    <div className="tabs__content" id="characteristics">
      <table className="tabs__table">
        <tbody>
          <tr className="tabs__table-row">
            <td className="tabs__title">{language === 'russian' ?  'Артикул:' : 'Art.'}</td>
            <td className="tabs__value">{vendorCode}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">{language === 'russian' ?  'Тип:' : 'Type:'}</td>
            <td className="tabs__value">{language === 'russian' ?  guitarStyle(type) : type.charAt(0).toUpperCase()+type.slice(1)}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">{language === 'russian' ?  'Количество струн:' : 'String count:'}</td>
            <td className="tabs__value">{stringCount} {language === 'russian' ?  'струнная' : 'strings'}</td>
          </tr>
        </tbody>
      </table>
      <p className="tabs__product-description hidden">{description}</p>
    </div>
  );
}

export default CharacteristicsTab;

