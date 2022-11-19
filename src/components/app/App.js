// этот импорт переехал в файл главной странички
// import { /*Component - теперь НЕ НУЖЕН*/ useState/*добавляем хук*/ } from "react";

// импортируем метод ленивой загрузки из реакта (для оптимизации приложения)
import { lazy, Suspense } from 'react';

// добавляем в приложение маршрутизатор
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// чтобы не указывать конкретный файл в папке, можно использовать такой импорт(для этого создавался файл index.js внутри папки pages)
// при использовании ленивой подгрузки данные импорты обернуты в соответствующий метод lazy ниже!
// import { MainPage, ComicsPage, SingleComicPage } from '../pages';


import AppHeader from "../appHeader/AppHeader";

import Spinner from '../spinnner/Spinner';

// все импорты переехали в файлы страничек (главной и комиксов по принадлежности)
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import CharInfo from "../charInfo/CharInfo";

// 
// import ComicsList from "../comicsList/ComicsList";
// import AppBanner from "../appBanner/AppBanner";


// импортируем предохранитель
// import ErrorBoundary from '../errorBoundary/ErrorBoundary';

// import decoration from '../../resources/img/vision.png';

// class App extends Component {
//     // задаем базовое состояние для выбранного персонажа
//     state = {
//         selectedChar : null
//     }

//     // устанавливаем изменение состояния для выбранного персонажа
//     onCharSelected = (id) => {
//         this.setState({
//             selectedChar: id
//         })
//     }

//     render() {
//         return (
//             <div className="app">
//                 <AppHeader/>
//                 <main>
//                     {/* Оборачиваем в предохранитель все наши компоненты */}
//                     <ErrorBoundary>
//                         <RandomChar/>
//                     </ErrorBoundary>
//                     <div className="char__content">
//                         <ErrorBoundary>
//                             {/* Используем поднятие состояния, для этого задаем свойство CharList и CharInfo */}
//                             <CharList onCharSelected={this.onCharSelected}/>
//                         </ErrorBoundary>
//                         {/* Добавляем предохранитель для проблемного компонента */}
//                         <ErrorBoundary>
//                             <CharInfo charId={this.state.selectedChar}/>
//                         </ErrorBoundary>
                        
//                     </div>
//                     <img className="bg-decoration" src={decoration} alt="vision"/>
//                 </main>
//             </div>
//         )
//     }
// }

// реализуем компонент через функцию вместо классов

// для использования ленивой подгрузки (подгрузка компонента только при необходимости) достаем страницу ошибки в отдельный импорт(указываем файл)
const Page404 = lazy(() => import('../pages/404'));
// переносим статические импорты страничек в динамические с помощью lazy
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
// импорты дополнены вновь созданными страницами отдельного комикса или отдельного персонажа
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
// ВСЕ ДИНАМИЧЕСКИЕ ИМПОРТЫ ДОЛЖНЫ ПОМЕЩАТСЬЯ ПОСЛЕ СТАТИЧЕСКИХ!!! (ВНИЗУ)

const App = () => {

    return (
        // оборачиваем нашу верстку в компонент <Router>
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        {/* Изменяем switch на routes (изменения в версии react-router-dom) */}
                        <Routes>   
                            <Route /*синтаксис exact при использовании routes уже не требуется*/ 
                            path="/"  
                            /*теперь необходимый элемент вставляется иначе*/ element={<MainPage/>}/>                   
                            <Route path="/comics" element={<ComicsPage/>} />
                            {/* добавляем маршрут отдельной страницей с выводом или страницы комикса или персонажа (зависит компонента и типа даты) */}
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic'/>} />
                            {/* ранее использовали для маршрута страницы отдельного комикса, но т.к. теперь у нас две похожих страницы
                            (с персонажем и с комиксом, вытащили страницу SinglePage коротая подстраивается под тип данных (комикс или персонаж)) */}
                            {/* <Route path="/comics/:comicId" element={<SingleComicPage/>} /> */}
                            {/* добавляем маршрут отдельной страницей с выводом или страницы комикса или персонажа (зависит компонента и типа даты)  */}
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>} />
                            {/* маршрут отображения 404 ошибки в случае неверного адреса или некорректной загрузки данных */}
                            <Route path="*" element={<Page404/>} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;
