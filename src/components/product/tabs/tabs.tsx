import { useState } from 'react';
import { GuitarCard } from '../../../types/guitar';
import CharacteristicsTab from './characteristics-tab';
import DescriptionTab from './description-tab';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';


type TabsProps = {
    guitar: GuitarCard,
  }

type ShopTab = {
    id: number,
    title: string
    address: string,
  }

const SHOP_TABS: ShopTab[] = [
  {
    id: 1,
    title: 'Характеристики',
    address: 'characteristics',
  },
  {
    id: 2,
    title: 'Описание',
    address: 'description',
  },
];

function Tabs({ guitar }: TabsProps): JSX.Element {

  const [isActive, setIsActive] = useState<number>(1);
  const handleActiveTabClick = (id: number) => {
    setIsActive(id);
  };

  return (
    <div className="tabs">
      {SHOP_TABS.map((item)=>(
        <Link key={item.title} className={`button ${item.id === isActive ? '' : 'button--black-border'} button--medium tabs__button" href="#characteristics"`} onClick={() => {handleActiveTabClick(item.id);}} to={`${AppRoute.Guitar.replace(':id', guitar.id.toString())}/${  item.address}`} >{item.title}</Link>
      ))}
      {isActive === SHOP_TABS[0].id && <CharacteristicsTab guitar={guitar}/>}
      {isActive === SHOP_TABS[1].id && <DescriptionTab guitar={guitar} />}
    </div>
  );
}

export default Tabs;
