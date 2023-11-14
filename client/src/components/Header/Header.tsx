import s from './Header.module.css';
import checkmark from '../../assets/images/checkmark-circle-gray.svg'

interface HeaderProps {
    propertyCount: number;
    scrappingIsReady: boolean;
}

const Header = ({ propertyCount, scrappingIsReady }: HeaderProps) => {

  return (
    <header className={s.header}>
      <h1>Properties</h1>
        <div className={s.counter}>
            {scrappingIsReady ? <img src={checkmark} width="25" height="25" alt={'checkmark'} /> : <span className={s.loader} />}
            {propertyCount} / 500
        </div>
    </header>
  );
}

export default Header;