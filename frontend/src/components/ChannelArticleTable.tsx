import { Article } from "../data/channels";
import Button from "./Button";
import createModal from "./Modal";

type ChannelArticleTableProps = {
    article: Article
};

type Props = ChannelArticleTableProps;

function ChannelArticleTable({ article }: Props) {
    const { element: modal, toggle: toggleModal } = createModal({ children: article.content });

    return <div className="article-table-root">
        <table className="article-table">
            <thead>
                <tr>
                    <th>tytuł</th>
                    <th>link</th>
                    <th>opis</th>
                    <th>autor</th>
                    <th>kategoria</th>
                    <th>link do komentarzy</th>
                    <th>guid</th>
                    <th>data publikacji</th>
                    <th>źródło</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{article.title}</td>
                    <td>{article.link}</td>
                    <td>{article.description}</td>
                    <td>{article.author}</td>
                    <td>{article.category}</td>
                    <td>{article.commentsLink}</td>
                    <td>{article.guid}</td>
                    <td>{article.publishedDate}</td>
                    <td>{article.source}</td>
                </tr>
            </tbody>
        </table>
        <Button style={{ width: "fit-content" }} onClick={toggleModal}>Zobacz treść</Button>
        {modal}
    </div>
}

export default ChannelArticleTable;
