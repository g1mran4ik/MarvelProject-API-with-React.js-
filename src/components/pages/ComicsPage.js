// ипортируем компоненты, относящиеся к странице комиксов
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

// создаем переменную и заносим туда всё, что связано с отображением компонента комиксов
const ComicsPage = () => {
    return (
        // не забываем включать <> </> (правило JSX)
        <>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;