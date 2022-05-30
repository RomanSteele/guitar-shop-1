import { GuitarCard } from '../../../types/guitar';
import CharacteristicsTab from './characteristics-tab';
import DescriptionTab from './description-tab';
import { Link, Route, Routes, useLocation } from 'react-router-dom';


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

  const location = useLocation();

  return (
    <div className="tabs">
      {SHOP_TABS.map((item)=>(
        <Link key={item.title} className={`button ${location.pathname.includes(item.address) ? '' : 'button--black-border'} button--medium tabs__button" `} to={`${item.address}`}>{item.title}</Link>
      ))}
      <Routes>
        <Route path="characteristics" element={<CharacteristicsTab guitar={guitar}/>}/>
        <Route path="description" element={<DescriptionTab guitar={guitar}/>}/>
      </Routes>

    </div>
  );
}

export default Tabs;
