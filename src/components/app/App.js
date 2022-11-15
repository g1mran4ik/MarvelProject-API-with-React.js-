import { /*Component - теперь НЕ НУЖЕН*/ useState/*добавляем хук*/ } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

// импортируем предохранитель
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

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

    // включаем хук useState
    const [selectedChar, setChar] = useState(null);

    // state теперь нам не нужен, т.к. мы используем хук
    // state = {
    //     selectedChar : null
    // }

    const onCharSelected = (id) => {
        setChar(id);
    }
    // метод также изменяется 
    // onCharSelected = (id) => {
    //     this.setState({
    //         selectedChar: id
    //     })
    // }

    // метод render() теперь не нужен, он удален
    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary> */}
                {/* <div className="char__content">
                    <ErrorBoundary> */}
                        {/* убираем this. */}
                    {/* <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary> */}
                        {/* убираем this.state. */}
                        {/* <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <AppBanner/>
                <ComicsList/>
            </main>
        </div>
    )
}

export default App;


// const App = () => {
//     return (
//         <div className="app">
//             <AppHeader/>
//             <main>
//                 <RandomChar/>
//                 <div className="char__content">
//                     <CharList/>
//                     <CharInfo/>
//                 </div>
//                 <img className="bg-decoration" src={decoration} alt="vision"/>
//             </main>
//         </div>
//     )
// }

// export default App;