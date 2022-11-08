
// создаем класс на нативном JavaScript (поэтому не нужно импортировать компонент из реакта и на него завязывать наследование, это просто джаваскрипт)
class MarvelService {
    // для удобства части ссылки заворачиваем в переменные. Такой формат написания (с лодоша) переменных для понимания, что данные переменные нельзя изменять
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=a37a7031ad14e3d953e039b3e362f5c7';

    // Используем метод getResource для получения данных с сервера в формате json
    getResource = async (url) => {
        let res = await fetch(url); // используем метод fetch
    
        if (!res.ok) { // если при получении информации возникнет ошибка, он нам её выдаст
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    // создаем метод получения информации о всех персонажах(лимит апишки 20)
    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    // создаем метод получения конкретного персонажа (нужен айди)
    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;

