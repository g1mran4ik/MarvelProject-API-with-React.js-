// импортируем компонент из реакта
import { Component } from 'react';
// импортируем спиннер для отображения загрузки
import Spinner from '../spinnner/Spinner';
// импортируем компонент сообщения об ошибке 
import ErrorMessage from '../errorMessage/ErrorMessage';
// импортируем сервис загрузки данных (урок 2)
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
// import thor from '../../resources/img/thor.jpeg'; - не нужно, т.к. мы убрали ссылку на тора
import mjolnir from '../../resources/img/mjolnir.png';

// используем класс реакта, т.к. функциональный метод пока не освоили
class RandomChar extends Component {
    // добавляем конструктор, чтобы вызвать написанный метод.
    // ВАЖНО! При таком варианте браузер ругается, т.к. наш базовый стейт сформирован позже
    // на данном этапе оставляем так, но такой вариант написания использовать не рекомендуется
    // UPD. Конструктор теперь НЕ НУЖЕН, т.к. мы использовали ХУКИ ЖИЗНЕННОГО ЦИКЛА
    // constructor(props) {
    //     super(props);
        // this.updateChar();
    // }

    // задаем базовые состояния. Все будут нулевыми
    state = {
        // name: null,
        // description: null,
        // thumbnail/*картинка-превьюшка*/: null,
        // homepage: null,
        // wiki: null

        // упрощаем запись, создавая ТОЛЬКО пустой объект char
        char: {},
        // добавляем состояние загрузки
        loading: true,
        // добавляем поле ОШИБКИ (изначально её нет)
        error: false
    }

    marvelService = new MarvelService(); // данный метод забираем из index.js и немного преобразовываем
    

// ХУКИ ЖИЗНЕННОГО ЦИКЛА
    /* перемещаем updateChar в конце цикла монтирования componentDidMount,
    чтобы наш метод не срабатывал дважды (правильное решение)*/
    componentDidMount() {
        this.updateChar();
        // добавляем интрвал обновления случайных персонажей
        // this.timerId = setInterval(this.updateChar, 3000);
    }

    /* останавливаем интервал, когда жизненный цикл приложения ПОЛНОСТЬЮ ЗАВЕРШАЕТСЯ(компонент удаляется)*/
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
// 

    onCharLoaded = (char) => {
        this.setState({char, 
            // теперь, как только у нас будут загружены данные, загрузка переключится в false, и это уберет спиннер
            loading: false
        })
    }
    
    // добавляем метод фиксации ошибки
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    // создаем метод получения персонажа (с помощью стрелочной функции)
    updateChar = () => {
        // пока устанавливаем конкретный id (хардкод, офк никакого рандома)
        // const id = 1011005;

        // создаем переменную id, которая теперь формируется РАНДОМНО!
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        // применяем к экземпляру marvelService метод получения персонажа
        this.marvelService
            /* Проверяем метод getAllCharacters, выводя объекты
            в консоль. Результатом будет вывод объектов в нужном нам формате
            НО - он выведется ДВАЖДЫ, всё из-за ввода метода в конструктор*/
            // .getAllCharacters()
            // .then(res => console.log(res))

            .getCharacter(id)
            // then используется, т.к. это промис
            // .then(res => {
                // перерисовываем базовые параметры используя получаемые данные
                
                // upd. выносим this.setState чтобы было красивее
                // this.setState(res) // т.к. мы улучшили код, здесь используем просто res вместо кода ниже
                    // name: res.data.results[0].name,
                    // description: res.data.results[0].description,
                    // thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
                    // homepage: res.data.results[0].urls[0].url,
                    // wiki: res.data.results[0].urls[1].url
            // })
            .then(this.onCharLoaded) // итоговая версия с использованием char
            // метод, который будет вызывать метод onError в случае ошибки
            .catch(this.onError)
    }

    render() {
        // достаём переменные из объекта с помощью деструктуризации. НЕ ЗАБЫВАТЬ ПРО this.!
        // const {name, description, thumbnail, homepage, wiki} = this.state;
        
        // адаптируем деструктуризацию под наличие char
        const {char, 
            /*добавляем состояние загрузки*/loading,
            /*добавляем состояние ошибки*/ error} = this.state;
        
        // добавляем переменные в которых будут компоненты ошибки и спиннера
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinnner = loading ? <Spinner/> : null;

        // добавление переменной контента, который отображается тогда, когда НЕТ ошибок и НЕТ загрузки
        const content = !(loading || error) ? <View char={char}/> : null;

        // вставляем условие, при котором в состоянии загрузки будет отображаться спиннер
        // UPD. Теперь это условие не нужно, т.к. мы используем условный рендеринг
        // if (loading) {
        //     return <Spinner/>
        // }

        return (
            <div className="randomchar">
                {/* Здесь теперь мы рендерим либо спиннер, либо компонент - УСЛОВНЫЙ РЕНДЕРИНГ
                {loading ? <Spinner/> : <View char={char}/>} */}
                {/* Вставляем добавленные переменные */}
                {errorMessage}
                {spinnner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

// создадим компонент, который будет отображать кусочек нашей верстки
const View = ({char}) => {
    /* теперь аргументы перемещены в простой рендерящий компонент,
    в нём нет никакой логики, он просто получает объект с данными и отображает фрагмент верстки*/
    const {name, description, thumbnail, homepage, wiki} = char;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;