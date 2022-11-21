// перемещаем сюда импорты из app.js, т.к. мы разделили компоненты на страницы
import { useState } from "react";

// 
import { Helmet } from 'react-helmet';

// перемещаем импорты для главной страницы
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
// 
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

// также перемещаем картинку декорацию с главной страницы из app.js
import decoration from '../../resources/img/vision.png';

// создаем переменную и переносим туда всё, что относится к главной странице из app.js
const MainPage = () => {

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

    return (
        <>
            <Helmet>
                <meta
                name="description"
                content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    {/* убираем this. */}
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        {/* убираем this.state. */}
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;