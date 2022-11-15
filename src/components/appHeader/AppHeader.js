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
                    <li><NavLink 
                    // в версии react-router-dom v6 exact заменен на end, 
                    // а activeStyle удален. Теперь синтаксис выглядит так
                    end 
                    style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})}
                    to="/">Characters</NavLink></li>
                    /
                    <li><NavLink 
                    end 
                    style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})} 
                    to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;