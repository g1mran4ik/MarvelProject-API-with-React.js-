import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // альтернативный оператор который возвращает только состояние ошибки
    // static getDerivedStateFromError(error) {
    //     return {error: true};
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

/* Предохранители НЕ ЛОВЯТ:
1. Ошибки в обработчиках событий (потому что он не знает когда её ловить)
2. Асинхронный код (аналогично, он не знает когда он сработает)
3. В самом предохранителе (внутри себя)*/