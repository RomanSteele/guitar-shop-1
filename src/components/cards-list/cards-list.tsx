import { GuitarCard } from '../../types/guitar';
import SingleCatalogueCard from '../single-catalogue-card/single-catalogue-card';


type CardsListProps = {
  cards: GuitarCard[];
};


function CardsList({ cards }: CardsListProps) {

  return (
    <>
      {cards.map((item) => (
        <SingleCatalogueCard card={item} key={item.id}/>
      ))}
    </>
  );
}
export default CardsList;
