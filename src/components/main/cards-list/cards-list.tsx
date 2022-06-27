import { useAppSelector } from '../../../hooks/hooks-index';
import { GuitarCards } from '../../../types/guitar';
import SingleCatalogueCard from '../single-catalogue-card/single-catalogue-card';
import SkeletonList from '../skeleton-list/skeleton-list';

type CardsListProps = {
  cards: GuitarCards[];
};

function CardsList({ cards }: CardsListProps) {

  const isLoading = useAppSelector(({DATA}) => DATA.isLoading);

  return (
    <div className="cards catalog__cards">
      {isLoading ?
        [...new Array(9)].map(() =><SkeletonList key={Math.floor(Math.random() * (10000 - 1 + 1) + 1)}/>)
        :
        cards.map((item) => <SingleCatalogueCard card={item} key={item.id}/>)}
    </div>
  );
}
export default CardsList;
