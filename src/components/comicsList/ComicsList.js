// импортируем хуки стейт и эффект, а также созданный хук, компоненты спиннера и ошибки
import { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinnner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
// стиль нам нужен, так что его оставляем
import './comicsList.scss';

// 
const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
            // break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
            // break;
        case 'confirmed':
            return <Component/>;
            // break;
        case 'error':
            return <ErrorMessage/>;
            // break;
        default:
            throw new Error('Unexpected process state');
    }
  }

const ComicsList = () => {

    // задаем переменные состояний
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    // достаем нужные переменные из созданного хука
    const {/*loading, error,*/ getAllComics, process, setProcess} = useMarvelService();

    // используем хук useEffect с аргументами кастомного хука в функции onRequest
    useEffect(() => {
        onRequest(offset, true);
    }, []) // eslint-disable-line

    // задаем функцию onRequest 
    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
    }

    // задаем функцию onComicsListLoaded (по аналогии c CharList)
    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}> 
                    {/*создаем динамичную ссылку на конкретный комиск через идентификатор */}
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    // 
    // 
    // const items = renderItems(comicsList);

    //
    //  
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinnner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {/*  */}
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            {/* {errorMessage}
            {spinnner}
            {items} */}
            <button 
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;

// изначальная версия (уже не нужна)
// import './comicsList.scss';
// import uw from '../../resources/img/UW.png';
// import xMen from '../../resources/img/x-men.png';

// const ComicsList = () => {
//     return (
//         <div className="comics__list">
//             <ul className="comics__grid">
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={uw} alt="ultimate war" className="comics__item-img"/>
//                         <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
//                         <div className="comics__item-price">9.99$</div>
//                     </a>
//                 </li>
//                 <li className="comics__item">
//                     <a href="#">
//                         <img src={xMen} alt="x-men" className="comics__item-img"/>
//                         <div className="comics__item-name">X-Men: Days of Future Past</div>
//                         <div className="comics__item-price">NOT AVAILABLE</div>
//                     </a>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }