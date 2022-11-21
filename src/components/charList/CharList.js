// импортируем компонент реакта (для класса), а также компоненты загрузки, ошибки и загрузки персонажей
import {
  /*Component - теперь не понадобится*/ useState,
  useEffect,
  useRef,
  useMemo
} from "react";

// импортируем компонент PropTypes
import PropTypes from "prop-types";

// 
import Spinner from "../spinnner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
//
import useMarvelService from "../../services/MarvelService";

// импортируем созданную в отдельном файле функцию setContent
// UPD. т.к. мы внутри данного файла прописали вручную такую функцию, её импорт не нужен
// import setContent from "../../utils/setContent";

// импортируем компоненты анимирования для CSS и реакта из react-transition-group
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import "./charList.scss";

// import abyss from '../../resources/img/abyss.jpg'; - теперь не нужно, картинки будут из списка персонажей

// class CharList extends Component {

//     state = {
//         // делаем массив charList изначально пустым
//         charList: [],
//         loading: true,
//         error: false,
//         newItemLoading: false,
//         // добавляем сюда тоже базовый отступ
//         offset: 210,
//         // создадим свойство окончания списка персонажей
//         charEnded: false
//     }

//     marvelService = new MarvelService();

//     componentDidMount() {
//         // // !!! специально вносим ошибку в код для использования предохранителя
//         // this.foo.bar = 0;

//         // заменяем метод на созданный ниже, вызываем его когда компонент впервые отрендерился
//         this.onRequest();

//         // this.marvelService.getAllCharacters()
//         //     .then(this.onCharListLoaded)
//         //     .catch(this.onError)
//     }

//     // добавляем метод для загрузки нового списка персонажей
//     onRequest = (offset) => {
//         // вносим метод изменения загрузки
//         this.onCharListLoading();
//         // копируем методы из хука выше
//         this.marvelService.getAllCharacters(offset)
//             .then(this.onCharListLoaded)
//             .catch(this.onError)
//     }

//     // добавляем метод изменения состояния загрузки новых персонажей
//     onCharListLoading = () => {
//         this.setState({
//             newItemLoading: true
//         })
//     }

//     /* данный метод получает новые данные, со следующей логикой:
//     1. Из новых данный  формируется новое состояние, когда впервые запускается, пустой массив ни во что не разворачивается
//     2. Далее, когда данные будут вызываться повторно, они будут разворачиваться с предыдущими*/
//     onCharListLoaded = (newCharList) => {

//         // добавляем переменную, которая в случае выполнения условия будет менять значение
//         let ended = false;
//         if (newCharList.length < 9) {
//             ended = true;
//         }

//         this.setState(({offset, charList}) => ({
//             charList: [...charList, ...newCharList],
//             loading: false,
//             // переключаем загрузку персонажей в false когда список загрузился
//             newItemLoading: false,
//             // теперь, когда новый список персонажей загрузится, отступ нужно увеличить на 9
//             offset: offset + 9,
//             // меняем состояние окончания списка персонажей за счёт изменения переменной
//             charEnded: ended
//         }))
//     }

//     onError = () => {
//         this.setState({
//             error: true,
//             loading: false
//         })
//     }

//     // Добавление фокуса на выбранном элементе и возможность переключения без мыши

//     itemRefs = [];

//     setRef = (ref) => {
//         this.itemRefs.push(ref);
//     }

//     focusOnItem = (id) => {

//         /* Реализован вариант чуть сложнее, и с классом и с фокусом
//         Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
//         На самом деле, решение с css-классом можно сделать, вынеся персонажа
//         в отдельный компонент. Но кода будет больше, появится новое состояние
//         и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов */

//         // По возможности, не злоупотребляйте рефами, только в крайних случаях
//         this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
//         this.itemRefs[id].classList.add('char__item_selected');
//         this.itemRefs[id].focus();
//     }

//     // конец куска вставки связанного с фокусом

//     /* Этот метод создан для оптимизации,
//     чтобы не помещать такую конструкцию в метод render*/
//     renderItems(arr) {
//         // в метод map добавляем аргумент i
//         const items = arr.map((item, i) => {
//             let imgStyle = {'objectFit' : 'cover'};
//             if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
//                 imgStyle = {'objectFit' : 'unset'};
//         }

//         return (
//             <li className="char__item"
//                 // сюда также добавляются строки кода для подсветки выбранного персонажа и возможности переключения персонажей с клавиатуры
//                 tabIndex={0}
//                 ref={this.setRef}
//                 //
//                 key={item.id}
//                 onClick={() => {
//                     this.props.onCharSelected(item.id);
// // добавляем метод фокуса на выбранном элементе
//                     this.focusOnItem(i)
//                 }}
// // добавляем функцию обработки события для фокуса на элементе
//                 onKeyPress={(e) => {
//                     if (e.key === ' ' || e.key === 'Enter') {
//                         this.props.onCharSelected(item.id);
//                         this.focusOnItem(i);
//                     }
// // конец обновления с фокусом и выбором без мыши
//                 }}>
//                 <img src={item.thumbnail} alt={item.name}
//                 style={imgStyle}/>
//                 <div className="char__name">{item.name}</div>
//             </li>
//         )
//     });

//     // А эта конструкция вынесена для центровки спиннера/ошибки
//         return (
//             <ul className="char__grid">
//                 {items}
//             </ul>
//         )
//     }

//     render() {
//         const {charList, loading, error, /*достаем также новые свойства*/offset, newItemLoading, charEnded} = this.state;

//         const items = this.renderItems(charList);

//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinnner = loading ? <Spinner/> : null;
//         const content = !(loading || error) ? items : null;

//         return (
//             <div className="char__list">
//                 {errorMessage}
//                 {spinnner}
//                 {content}
//                 <button
//                     className="button button__main button__long"
//                     // дополняем кнопку новыми методами
//                     disabled={newItemLoading}
//                     onClick={() => this.onRequest(offset)}
//                     // добавляем стиль отображения кнопки в случае если персонажи кончились
//                     style={{'display' : charEnded ? 'none' : 'block'}}>
//                     <div className="inner">load more</div>
//                 </button>
//              </div>
//         )
//     }
// }

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

const CharList = (props) => {
  // устанавливаем состояния через хук useState
  const [charList, setCharList] = useState([]);
  //
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  // старая форма для классов не нужна
  // state = {
  //     charList: [],
  //     loading: true,
  //     error: false,
  //     newItemLoading: false,
  //     offset: 210,
  //     charEnded: false
  // }

  // задаем экземпляр marvelService через переменную (используя const)
  // const marvelService = new MarvelService();
  // после создания кастомного хука заменяем new ... на useMarvelService
  const { /*loading, error,*/ getAllCharacters, process, setProcess } = useMarvelService();


  // добавляем хук useEffect
  useEffect(() => {
    // дополняем onRequest аргументами(добавление кастомного хука)
    onRequest(offset, true);
  }, []); // eslint-disable-line
  
  // p.s. не смотря на то, что хук прописан раньше объявленной стрелочной функции, он запускается только ПОСЛЕ рендеринга

  // теперь не нужно, использовали вместо этого useEffect
  // componentDidMount() {
  //     this.onRequest();
  // }

  // дополняем функцию объявлением const
  //
  const onRequest = (
    offset,
    /* дополняем аргументом для правильной работы приложения с кастомным хуком*/ initial
  ) => {
    // после введения кастомного хука меняем логику отображения спиннера, используя тернарное выражение
    // добавление такого аргумента позволит нам менять положение статуса загрузки в зависимости от ситуации
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    // вытаскиваем смену состояния из удаленной функции onCharListLoading
    // setNewItemLoading(true);
    // onCharListLoading после создания кастомного хука НЕ НУЖЕН
    // this. убираем
    // onCharListLoading();

    // аналогично убираем this.
    // marvelService.getAllCharacters(offset)
    //     .then(onCharListLoaded)
    //     .catch(onError)
    // UPD. правки после введения кастомного хука
    // !!! Преобразуем прежний код из-за новой версии реакта (стрикт мод дважды рендерит стартовый список персонажей)
    getAllCharacters(offset).then((data) => onCharListLoaded(data, initial))
    // Строка ниже будет работать в режиме продакшена, но в дев режиме стрикт мод такой запрос будет выводить при первом рендере дважды одинаковый массив (прикол реакта - дабл рендеринг)
    // getAllCharacters(offset).then(onCharListLoaded);
    // 
    .then(() => setProcess('confirmed'));
  };

  // добавляем const
  // onCharListLoading НЕ НУЖНО после введения кастомного хука
  // const onCharListLoading = () => {

  //     // для изменения состояния используем хук
  //     setNewItemLoading(true);

  //     // прежняя версия уже не нужна
  //     // this.setState({
  //     //     newItemLoading: true
  //     // })
  // }

  // добавляем const
  const onCharListLoaded = (newCharList, /* добавляем второй аргумент в связи с тем, 
  что в новой версии реакта в начале выполняется дабл рендер (устраняем проблему, 
    при которой список персонажей дважды отображается на странице (одинаковый)) */
    initial) => {

    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    // устанавливаем состояния за счет хуков
    // UPD!!! доб
    setCharList((charList) => initial ? newCharList : [...charList, ...newCharList]);
    // setLoading(loading => false); - убираем из-за кастомного хука
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);

    // прежняя версия не нужна
    // this.setState(({offset, charList}) => ({
    //     charList: [...charList, ...newCharList],
    //     loading: false,
    //     newItemLoading: false,
    //     offset: offset + 9,
    //     charEnded: ended
    // }))
  };

  // ТЕПЕРЬ НЕ НУЖНО, т.к. это все есть в кастомном хуке
  // const onError = () => {

  //     // задаем новое состояние хуком
  //     setError(true);
  //     setLoading(loading => false);

  //     // не нужно теперь
  //     // this.setState({
  //     //     error: true,
  //     //     loading: false
  //     // })
  // }

  // добавляем хук useRef
  const itemRefs = useRef([]);
  // прежнюю версию убираем
  // itemRefs = [];

  // убираем, т.к. теперь не нужно
  // setRef = (ref) => {
  //     this.itemRefs.push(ref);
  // }

  // снова const
  const focusOnItem = (id) => {
    // исключаем this. и добавляем везде .current - это ОБЯЗАТЕЛЬНО для хука useRef
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    // перемещаем массив в свойство current
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  // делаем функцию
  const renderItems = arr => {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ||
        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        // сюда вставляем строку для использования анимации
        <CSSTransition key={item.id} timeout={500} classNames="char__item">
          <li
            className="char__item"
            tabIndex={0}
            // задаем свойства ссылки по новой
            ref={(el) => (itemRefs.current[i] = el)}
            // убираем прежний
            // ref={this.setRef}
            key={item.id}
            onClick={() => {
              //
              props.onCharSelected(item.id);
              focusOnItem(i);
            }}
            onKeyPress={(e) => {
              if (e.key === " " || e.key === "Enter") {
                //
                props.onCharSelected(item.id);
                focusOnItem(i);
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });

    // А эта конструкция вынесена для центровки спиннера/ошибки
    return (
      <ul className="char__grid">
      {/* оборачиваем наших персонажей в TransitionGroup для анимирования */}
        <TransitionGroup component={null}>
          {items}
        </TransitionGroup>
      </ul>
    )
  }
  // строка ниже теперь не нужна, теперь эти переменные существуют внутри функции
  // const {charList, loading, error, /*достаем также новые свойства*/offset, newItemLoading, charEnded} = this.state;

  //
  // 
  // const items = renderItems(charList);

  // 
  // const errorMessage = error ? <ErrorMessage /> : null;
  // дополняем спиннер условием !newItemLoading(добавление кастомного хука)
  // 
  // const spinner = loading && !newItemLoading ? <Spinner /> : null;
  // const spinnner = loading ? <Spinner/> : null; - после добавления кастомного хука не актуально
  // const content = !(loading || error) ? items : null;

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(charList),
     newItemLoading);
    // eslint-disable-next-line
  }, [process]); 

  return (
    <div className="char__list">
      {/*  */}
      {/* {setContent(process, () => renderItems(charList), newItemLoading)} */}
      {/*  */}
      {elements}
      {/*  */}
      {/* {errorMessage}
      {spinner} */}
      {/*  */}
      {/* {items} */}
      {/* {content} */}
      <button
        className="button button__main button__long"
        // дополняем кнопку новыми методами
        disabled={newItemLoading}
        //
        onClick={() => onRequest(offset)}
        // добавляем стиль отображения кнопки в случае если персонажи кончились
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  // устанавливаем проверку, что onCharSelected обязательно функция
  onCharSelected: PropTypes.func.isRequired,
};

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
