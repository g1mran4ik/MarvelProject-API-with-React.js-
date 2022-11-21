// ипортируем компоненты, относящиеся к странице комиксов
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

// 
import { Helmet } from "react-helmet";

// создаем переменную и заносим туда всё, что связано с отображением компонента комиксов
const ComicsPage = () => {
    return (
        // не забываем включать <> </> (правило JSX)
        <>
            <Helmet>
                <meta
                name="description"
                content="Page with list of our comics"
                />
                <title>Marvel's comics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;