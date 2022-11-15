// этот импорт переехал в файл главной странички
// import { /*Component - теперь НЕ НУЖЕН*/ useState/*добавляем хук*/ } from "react";

// добавляем в приложение маршрутизатор
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// чтобы не указывать конкретный файл в папке, можно использовать такой импорт(для этого создавался файл index.js внутри папки pages)
import { MainPage, ComicsPage } from '../pages';

import AppHeader from "../appHeader/AppHeader";

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

const App = () => {

    return (
        // оборачиваем нашу верстку в компонент <Router>
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    {/* Изменяем switch на routes (изменения в версии react-router-dom) */}
                    <Routes>   
                        <Route /*синтаксис exact при использовании routes уже не требуется*/ 
                        path="/"  
                        /*теперь необходимый элемент вставляется иначе*/ element={<MainPage/>}/>                   
                        <Route path="/comics" element={<ComicsPage/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
