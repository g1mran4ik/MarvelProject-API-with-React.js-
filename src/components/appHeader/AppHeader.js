// импортируем свойства из маршрутизатора для переключения по ссылкам
import {Link, NavLink} from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    {/* тут используем NavLink для точного совпадения указанного адреса(если оставить линк, 
                        то и на главной, и на странице комиксов есть слэш, а это значит будет выводиться сразу 
                        два компонента) */}
                    <li><NavLink exact activeStyle={{'color': '#9f0013'}} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink exact activeStyle={{'color': '#9f0013'}} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;