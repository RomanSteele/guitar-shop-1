import { GuitarCard } from '../../../types/guitar';
import { guitarStyle } from '../../../utils/utils';


type CharacteristicsTabProps = {
    guitar: GuitarCard,
  }

function CharacteristicsTab({ guitar }: CharacteristicsTabProps): JSX.Element {

  const { stringCount, description, vendorCode, type } = guitar;


  return (
    <div className="tabs__content" id="characteristics">
      <table className="tabs__table">
        <tbody>
          <tr className="tabs__table-row">
            <td className="tabs__title">Артикул:</td>
            <td className="tabs__value">{vendorCode}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Тип:</td>
            <td className="tabs__value">{guitarStyle(type)}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Количество струн:</td>
            <td className="tabs__value">{stringCount} струнная</td>
          </tr>
        </tbody>
      </table>
      <p className="tabs__product-description hidden">{description}</p>
    </div>
  );
}

export default CharacteristicsTab;

