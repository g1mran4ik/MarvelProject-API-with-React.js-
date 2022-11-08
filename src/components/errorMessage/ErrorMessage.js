import img from './error.gif';

const ErrorMessage = () => {
    return (
        // добавляем статичный файл из папки public
        // такой способ используется РЕДКО, лучше применять импорт
        // <img src={process.env.PUBLIC_URL + '/error.gif'}/>
        <img style={{ display: 'block', width: "250px", height: "250 px", objectFit: 
        'contain', margin: "0 auto"}} src={img} alt="Error"/>    
    )
}

export default ErrorMessage;