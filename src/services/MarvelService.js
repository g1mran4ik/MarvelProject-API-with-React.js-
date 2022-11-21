import { useHttp } from '../hooks/http.hook';


// преобразуем наш сервис за счёт использования созданного нами хука
const useMarvelService = () => {

    // достаем сущности из созданного хука
    const {/*loading,*/ request, /*error,*/ clearError, process, setProcess} = useHttp();
    
        const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
        const _apiKey = 'apikey=a37a7031ad14e3d953e039b3e362f5c7';
        const _baseOffset = 210;
    
    
    
    // т.к. мы создали кастомный хук, getResource теперь не нужен
        // getResource = async (url) => {
        //     let res = await fetch(url); // используем метод fetch
        
        //     if (!res.ok) { // если при получении информации возникнет ошибка, он нам её выдаст
        //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        //     }
        
        //     return await res.json();
        // }
    

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        // console.log(res.data.results);
        return res.data.results.map(_transformCharacter);
    }
    
    // ПОИСК ПЕРСОНАЖА (ФОРМА ПОИСКА)
    
    // Вариант модификации готового метода для поиска по имени. 
    // Вызывать его можно вот так: getAllCharacters(null, name)

    // const getAllCharacters = async (offset = _baseOffset, name = '') => {
    //     const res = await request(`${_apiBase}characters?limit=9&offset=${offset}${name ? `&name=${name}` : '' }&${_apiKey}`);
    //     return res.data.results.map(_transformCharacter);
    // }

    // Или можно создать отдельный метод для поиска по имени

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    // 

    const getCharacter = async(id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    // создаем функцию получения списка комиксов
    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    // создаем функцию получения конкретного комикса
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0,210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    // создаем функцию, которая возвращает объект для списка комисков
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not avaible'
        }
    }

    return {
        // 
        // loading, 
        // error, 
        clearError, 
        getAllCharacters, 
        getCharacterByName, 
        getCharacter, 
        getAllComics, 
        getComic,
        // 
        process,
        setProcess
    };
}


// создаем класс на нативном JavaScript (поэтому не нужно импортировать компонент из реакта и на него завязывать наследование, это просто джаваскрипт)
// class MarvelService {
// // для удобства части ссылки заворачиваем в переменные. Такой формат написания (с лодоша) переменных для понимания, что данные переменные нельзя изменять
//     _apiBase = 'https://gateway.marvel.com:443/v1/public/';
//     _apiKey = 'apikey=a37a7031ad14e3d953e039b3e362f5c7';
//     // оборачиваем изначальный отступ количества персонажей offset в переменную
//     _baseOffset = 210;



// // Используем метод getResource для получения данных с сервера в формате json
//     getResource = async (url) => {
//         let res = await fetch(url); // используем метод fetch
    
//         if (!res.ok) { // если при получении информации возникнет ошибка, он нам её выдаст
//             throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//         }
    
//         return await res.json();
//     }

// // создаем метод получения информации о всех персонажах(лимит апишки 20)
//     // переносим в аргумент стандартное значение отступа для отображения персонажей offset)
//     getAllCharacters = async (offset = this._baseOffset) => {
//         // return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        
//         /* применяем аналогичные изменения кода для этого метода*/
//         const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
//         return res.data.results.map(this._transformCharacter);
//     }

// // создаем метод получения конкретного персонажа (нужен айди)
// /*т.к. getResource асинхронная функция, необходимо дождаться её ответа*/
//     getCharacter = async(id) => {
//         // return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        
//         // теперь мы не возвращаем персонажа, а сохраняем в промежуточный результат
//         const res = await/*парный оператор с async*/ this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
//         return this._transformCharacter(res.data.results[0]);
//         /* т.к. у нас res.data.results[0] повторялось, можно его использовать как аргумент, тогда 
//         в методе можно использовать аргумент char, это значительно упростит код*/
//     }

// // создаем метод трансформирования объекта, полученного с сервера, в том формате, который нас интересует
//     _transformCharacter = (char) => {
//         return {
//             // добавляем id персонажа
//             id: char.id,
//             //
//             name: char.name,
//             // Домашнее задание - если описания нет, вывести текст, а если описание слишком больше, обрезать его и дополнить троеточием
//             description: char.description ? `${char.description.slice(0,210)}...` : 'There is no description for this character',
//             // конец ДЗ
//             thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
//             homepage: char.urls[0].url,
//             wiki: char.urls[1].url,
//             // добавляем comics
//             comics: char.comics.items
//         }
//     }
// }

export default useMarvelService;

