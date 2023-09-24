import { GuitarCard } from '../../../types/guitar';
import CharacteristicsTab from './characteristics-tab';
import DescriptionTab from './description-tab';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks-index';


type TabsProps = {
    guitar: GuitarCard,
  }

type ShopTab = {
    id: number,
    title: string
    address: string,
  }


function Tabs({ guitar }: TabsProps): JSX.Element {

  const language = useAppSelector(({DATA}) => DATA.language);

  const SHOP_TABS: ShopTab[] = [
    {
      id: 1,
      title: language === 'russian' ?  'Характеристики' : 'Charachteristics',
      address: 'characteristics',
    },
    {
      id: 2,
      title: language === 'russian' ?  'Описание' : 'Description',
      address: 'description',
    },
  ];

  const [isActive, setIsActive] = useState<number>(1);

  const handleActiveTabClick = (id: number) => {
    setIsActive(id);
  };

  const location = useLocation();

  return (
    <div className="tabs">
      {SHOP_TABS.map((item)=>(
        <Link onClick={() => {handleActiveTabClick(item.id);}} key={item.title} className={`button ${location.pathname.includes(item.address) ? '' : 'button--black-border'} button--medium tabs__button `} to={`${item.address}`}>{item.title}</Link>
      ))}
      {isActive === SHOP_TABS[0].id && <CharacteristicsTab guitar={guitar}/>}
      {isActive === SHOP_TABS[1].id && <DescriptionTab guitar={guitar} />}
    </div>
  );
}

export default Tabs;

