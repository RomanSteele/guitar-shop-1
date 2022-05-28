import { GuitarCard } from '../../../types/guitar';
import SingleCatalogueCard from '../single-catalogue-card/single-catalogue-card';


type CardsListProps = {
  cards: GuitarCard[];
};


function CardsList({ cards }: CardsListProps) {

  return (
    <div className="cards catalog__cards">
      {cards.map((item) => (
        <SingleCatalogueCard card={item} key={item.id}/>
      ))}
    </div>
  );
}
export default CardsList;
