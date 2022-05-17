import { GuitarCard } from '../../../types/guitar';


type DescriptionTabProps = {
    guitar: GuitarCard,
  }

function DescriptionTab({ guitar }: DescriptionTabProps): JSX.Element {

  const { description } = guitar;

  return (
    <div className="tabs__content" id="description">
      <p className="tabs__product-description">{description}</p>
    </div>
  );
}

export default DescriptionTab;

