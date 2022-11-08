import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    // задаем базовое состояние для выбранного персонажа
    state = {
        selectedChar : null
    }

    // устанавливаем изменение состояния для выбранного персонажа
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        {/* Используем поднятие состояния, для этого задаем свойство CharList и CharInfo */}
                        <CharList onCharSelected={this.onCharSelected}/>
                        <CharInfo charId={this.state.selectedChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
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