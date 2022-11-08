// импортируем компонент реакта (для класса), а также компоненты загрузки, ошибки и загрузки персонажей
import { Component } from 'react';

// импортируем компонент PropTypes
import PropTypes from 'prop-types';

import Spinner from '../spinnner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

// import abyss from '../../resources/img/abyss.jpg'; - теперь не нужно, картинки будут из списка персонажей


class CharList extends Component {

    state = {
        // делаем массив charList изначально пустым
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        // добавляем сюда тоже базовый отступ
        offset: 210,
        // создадим свойство окончания списка персонажей
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        // // !!! специально вносим ошибку в код для использования предохранителя
        // this.foo.bar = 0;
        
        // заменяем метод на созданный ниже, вызываем его когда компонент впервые отрендерился
        this.onRequest();

        // this.marvelService.getAllCharacters()
        //     .then(this.onCharListLoaded)
        //     .catch(this.onError)
    }

    // добавляем метод для загрузки нового списка персонажей
    onRequest = (offset) => {
        // вносим метод изменения загрузки
        this.onCharListLoading();
        // копируем методы из хука выше
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    // добавляем метод изменения состояния загрузки новых персонажей
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    /* данный метод получает новые данные, со следующей логикой:
    1. Из новых данный  формируется новое состояние, когда впервые запускается, пустой массив ни во что не разворачивается
    2. Далее, когда данные будут вызываться повторно, они будут разворачиваться с предыдущими*/
    onCharListLoaded = (newCharList) => {

        // добавляем переменную, которая в случае выполнения условия будет менять значение
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            // переключаем загрузку персонажей в false когда список загрузился
            newItemLoading: false,
            // теперь, когда новый список персонажей загрузится, отступ нужно увеличить на 9
            offset: offset + 9,
            // меняем состояние окончания списка персонажей за счёт изменения переменной
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    /* Этот метод создан для оптимизации,
    чтобы не помещать такую конструкцию в метод render*/
    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                imgStyle = {'objectFit' : 'unset'};
        }

        return (
            <li className="char__item"
                key={item.id}
                onClick={() => this.props.onCharSelected(item.id)}>
                <img src={item.thumbnail} alt={item.name}
                style={imgStyle}/>
                <div className="char__name">{item.name}</div>
            </li>
        )
    });

    // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, /*достаем также новые свойства*/offset, newItemLoading, charEnded} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinnner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinnner}
                {content}
                <button 
                    className="button button__main button__long"
                    // дополняем кнопку новыми методами
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    // добавляем стиль отображения кнопки в случае если персонажи кончились
                    style={{'display' : charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
             </div>
        )
    }
}

CharList.propTypes = {
    // устанавливаем проверку, что onCharSelected обязательно функция
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;

// Изначальные данные уже не нужны
// const CharList = () => {
//     return (
//         <div className="char__list">
//             <ul className="char__grid">
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item char__item_selected">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//                 <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

// export default CharList;