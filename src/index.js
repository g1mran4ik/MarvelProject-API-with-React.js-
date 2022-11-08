import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelService from './services/MarvelService'; // импортируем созданный класс
import './style/style.scss';


const marvelService = new MarvelService(); // создаем экземпляр нашего класса

marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name))); // формируем вывод в консоль имён персонажей, которые мы получили от сервера
// т.к. res.data.results - это массив, используем для его перебора метод forEach

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

