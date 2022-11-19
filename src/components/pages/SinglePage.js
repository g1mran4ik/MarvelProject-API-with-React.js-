// импортируем хук и линк
import { useParams, /*Link - компонент переехал в отдельный файл для комиксов */} from 'react-router-dom';

// импортируем хуки состояния и эффекта
import { useState, useEffect } from 'react';

// импортируем спиннер и ошибку (компоненты)
import Spinner from '../spinnner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
// импортируем баннер который будет висеть над информацией о персонаже или комиксе
import AppBanner from '../appBanner/AppBanner';
// импортируем наш сервис (кастомный хук)
import useMarvelService from '../../services/MarvelService';

// import './singleComicPage.scss';
// стандартная картинка теперь не нужна
// import xMen from '../../resources/img/x-men.png';

const SinglePage = ({Component, dataType}) => {

    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id]) // eslint-disable-line

    const updateData = () => {
        clearError();

        // добавляем свитч-кейс, в котором в ЗАВИСИМОСТИ от типа данных будет прогружаться или инфо персонажа или инфо комикса
        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    // 
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinnner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinnner}
            {content}
        </>
    )
}

export default SinglePage;


// Данный фрагмент отредактирован с учетом того, что теперь у нас может быть два варианта отображения инфы - первый это персонаж, второй - комикс
// const SingleComicPage = () => {

//     const {comicId} = useParams();
//     const [comic, setComic] = useState(null);


//     const {loading, error, getComic, clearError} = useMarvelService();


//     // ниже используем все по аналогии с CharList, правильно заменяя названия переменных
//     useEffect(() => {
//         updateComic()
//     }, [comicId]) // eslint-disable-line

//     const updateComic = () => {
//         clearError();
//         getComic(comicId)
//             .then(onComicLoaded)
//     }

//     const onComicLoaded = (comic) => {
//         setComic(comic);
//     }

//     // 
//     const errorMessage = error ? <ErrorMessage/> : null;
//     const spinnner = loading ? <Spinner/> : null;
//     const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

//     return (
//         <>
//             {errorMessage}
//             {spinnner}
//             {content}
//         </>
//     )
// }

// Данный фрагмент переехал в отдельный файл SingleComicLayout
// const View = ({comic}) => {

//     const {title, description, pageCount, thumbnail, language, price} = comic;

//     return (
//         <div className="single-comic">
//             <img src={thumbnail} alt={title} className="single-comic__img"/>
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount}</p>
//                 <p className="single-comic__descr">Language: {language}</p>
//                 <div className="single-comic__price">{price}</div>
//             </div>
//             {/* Даем ссылку для кнопки возврата */}
//             <Link to="/comics" className="single-comic__back">Back to all</Link>
//         </div>
//     )
// }

// export default SingleComicPage;