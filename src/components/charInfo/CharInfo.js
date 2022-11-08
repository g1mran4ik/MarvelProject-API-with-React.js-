// импортируем компонент реакта
import { Component } from 'react';

// импортируем компонент PropTypes из соответствующей библиотеки (урок 6)
import PropTypes from 'prop-types';

// импортируем необходимые для работы компоненты
import Spinner from '../spinnner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';

// опять работаем через классы
class CharInfo extends Component {

    // копируем состояния из RandomChar
    state = {
        char: null,
        // здесь загрузка изначально ставится в false, т.к. в отличие от списка, данный блок не загружается изначально
        loading: false,
        error: false
    }

    // также копируем создание экземпляра
    marvelService = new MarvelService();

    // используем хук жизненного компонента, который говорит, что наш компонент отрендерился
    componentDidMount() {
        this.updateChar();
    }

    // используем хук стадии обновления в жизненном цикле компонента 
    componentDidUpdate(prevProps/*ещё есть два аргумента: prevState и snapshot(используется редко)*/) {
        // this.updateChar(); - ТАК ДЕЛАТЬ НЕЛЬЗЯ! БУДЕТ ЗАМКНУТЫЙ КРУГ И ХУК БУДЕТ ВЫЗЫВАТЬСЯ СНОВА И СНОВА
        // !!! нужно использовать условие, при котором новый id не равен предыдущему
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    // используем хук componentDidCatch (принимает два аргумента)
    // componentDidCatch(err, info) {
    //     console.log(err, info);
    //     this.setState({error: true});
    // }
    // ИТОГ - он не сработал, приложение также падает (из-за имитации ошибки в updateChar)

    // создаем метод обновления инфо о персонаже
    updateChar = () => {
        // деструктурируем пропсы (в нашем случае это id)
        const {charId} = this.props;
        // условие, при котором, если id нет (такое возможно), метод будет остановлен
        if (!charId) {
            return;
        }
        
        // используем метод загрузки информации о персонаже
        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);

        // // !!! специально вносим ошибку в код для использования предохранителя
        // this.foo.bar = 0;
    }

// копируем методы из RandomChar
    onCharLoaded = (char) => {
        this.setState({
        char, 
        loading: false
        })
    }
    
    onCharLoading = () => {
        this.setState({
            loading : true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;
        
        // добавляем заглушку skeleton, пока у нас не выбран персонаж
        const skeleton = char || loading || error ? null : <Skeleton/>;
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinnner = loading ? <Spinner/> : null;
        
        // корректируем контент, добавляя условие "ИЛИ" для !char
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinnner}
                {content}
            </div>
        )
    }
}

// достаем фрагмент верстки 
const View = ({char}) => {
    // достаем переменные из объекта (деструктуризация)
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <>
        {/* Используем переменные в верстке */}
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">                                
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {/* Сообщение при отсутствии списка комисков */}
                    {comics.length > 0 ? null : 'There is no comics with this character'}
                    {
                        comics.map((item,i) => {
                            // ограничение количества комиксов на странице
                            if (i > 9) return;
                            // этот метод не самый надежный
                            return (
                                <li key={i} className="char__comics-item">
                                {item.name}
                                </li>
                            )
                        })
                    }
                    {/* Теперь многократное перечисление нам НЕ НУЖНО */}
                    {/* <li className="char__comics-item">
                        Alpha Flight (1983) #50
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #503
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #504
                    </li>
                    <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Vengeance (2011) #4
                    </li>
                    <li className="char__comics-item">
                        Avengers (1963) #1
                    </li>
                    <li className="char__comics-item">
                        Avengers (1996) #1
                    </li> */}
                </ul>
        </>
    )
}

CharInfo.propTypes = {
    // задаем проверку, при которой charId обязательно должен быть числом
    charId: PropTypes.number
    // если мы поставим, например, string, PropType выдаст нам ошибку, т.к. charId это число
}

export default CharInfo;

// const CharInfo = () => {
//     return (
//         <div className="char__info">
//             <div className="char__basics">
//                 <img src={thor} alt="abyss"/>
//                 <div>
//                     <div className="char__info-name">thor</div>
//                     <div className="char__btns">
//                         <a href="#" className="button button__main">
//                             <div className="inner">homepage</div>
//                         </a>
//                         <a href="#" className="button button__secondary">
//                             <div className="inner">Wiki</div>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             <div className="char__descr">
//                 In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
//             </div>
//             <div className="char__comics">Comics:</div>
//             <ul className="char__comics-list">
//                 <li className="char__comics-item">
//                     All-Winners Squad: Band of Heroes (2011) #3
//                 </li>
//                 <li className="char__comics-item">
//                     Alpha Flight (1983) #50
//                 </li>
//                 <li className="char__comics-item">
//                     Amazing Spider-Man (1999) #503
//                 </li>
//                 <li className="char__comics-item">
//                     Amazing Spider-Man (1999) #504
//                 </li>
//                 <li className="char__comics-item">
//                     AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
//                 </li>
//                 <li className="char__comics-item">
//                     Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
//                 </li>
//                 <li className="char__comics-item">
//                     Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
//                 </li>
//                 <li className="char__comics-item">
//                     Vengeance (2011) #4
//                 </li>
//                 <li className="char__comics-item">
//                     Avengers (1963) #1
//                 </li>
//                 <li className="char__comics-item">
//                     Avengers (1996) #1
//                 </li>
//             </ul>
//         </div>
//     )
// }

// export default CharInfo;