
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
    getAllCharacters = async () => {
        // return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        
        /* применяем аналогичные изменения кода для этого метода*/
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

// создаем метод получения конкретного персонажа (нужен айди)
/*т.к. getResource асинхронная функция, необходимо дождаться её ответа*/
    getCharacter = async(id) => {
        // return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        
        // теперь мы не возвращаем персонажа, а сохраняем в промежуточный результат
        const res = await/*парный оператор с async*/ this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
        /* т.к. у нас res.data.results[0] повторялось, можно его использовать как аргумент, тогда 
        в методе можно использовать аргумент char, это значительно упростит код*/
    }

// создаем метод трансформирования объекта, полученного с сервера, в том формате, который нас интересует
    _transformCharacter = (char) => {
        return {
            // добавляем id персонажа
            id: char.id,
            //
            name: char.name,
            // Домашнее задание - если описания нет, вывести текст, а если описание слишком больше, обрезать его и дополнить троеточием
            description: char.description ? `${char.description.slice(0,210)}...` : 'There is no description for this character',
            // конец ДЗ
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;

