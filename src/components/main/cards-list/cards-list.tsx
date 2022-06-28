import { useAppSelector } from '../../../hooks/hooks-index';
import { GuitarCards } from '../../../types/guitar';
import SingleCatalogueCard from '../single-catalogue-card/single-catalogue-card';
import SkeletonList from '../skeleton-list/skeleton-list';

type CardsListProps = {
  cards: GuitarCards[];
};

function CardsList({ cards }: CardsListProps) {

  const isLoading = useAppSelector(({DATA}) => DATA.isLoading);

  const skeletonKey = ['key0','key1','key2','key3','key4','key5','key6','key7','key8'];

  return (
    <div className="cards catalog__cards">
      {isLoading ?
        [...new Array(9)].map((_,i) =><SkeletonList key={skeletonKey[i]}/>)
        :
        cards.map((item) => <SingleCatalogueCard card={item} key={item.id}/>)}
    </div>
  );
}
export default CardsList;
