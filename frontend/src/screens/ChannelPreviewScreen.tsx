import Button from "../components/Button";
import ChannelArticle from "../components/ChannelArticleTable";
import ChannelAvaibleIndicator from "../components/ChannelAvaibleIndicator";
import ChannelMetadata from "../components/ChannelMetadata";
import ChannelUpdatedIndicator from "../components/ChannelUpdatedIndicator";

type ChannelPreviewScreenProps = {
    channel: {
        no: number;
        title: string;
        link: string;
        description: string;
    }
};

const mockChannel = { 
  no: 1,
  title: "Kanał 1",
  link: "https://www.kanal1.org/",
  description: "Lorem ipsum dolor sit amet. Quo maiores facere",
  articles: [
    {
        title: "...",
        link: "...",
        description: "...",
        author: "...",
        category: "...",
        commentsLink: "...",
        guid: "...",
        pubDate: "...",
        source: "...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nunc ipsum, pellentesque vel pretium accumsan, porttitor eu tellus. Sed sagittis at eros vel egestas. Curabitur ut augue in ligula viverra varius et tristique eros. Phasellus nibh arcu, auctor a ligula eget, pellentesque faucibus neque. Donec id hendrerit dolor, eget bibendum leo. Sed ac dolor sagittis felis laoreet finibus. Curabitur eget libero sodales, malesuada nisl in, sodales nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent viverra blandit sodales. Nullam porta nec ante sit amet tincidunt. Mauris iaculis tellus quis elit efficitur, ac lacinia eros condimentum. Duis consequat leo vitae metus laoreet pharetra."
    },
    {
        title: "2",
        link: "...",
        description: "...",
        author: "...",
        category: "...",
        commentsLink: "...",
        guid: "...",
        pubDate: "...",
        source: "...",
        content: "22222222222222222222222222222222222222222222222222222222222222222222222222222222"
    }
  ]
};

type Props = ChannelPreviewScreenProps;

function ChannelPreviewScreen() {
  return <div className="channel-preview-screen">
    <div className="navbar">
        <Button style={{ height: "auto" }}>Wróć</Button>
        <ChannelMetadata no={mockChannel.no} title={mockChannel.title} description={mockChannel.description} link={mockChannel.link} />
        <Button style={{ height: "auto" }}>Edytuj</Button>
        <Button style={{ height: "auto" }}>Wyślij</Button>
        <div className="navbar-right">
            <div className="channel-indicators">
                <ChannelUpdatedIndicator updated={true} />
                <ChannelAvaibleIndicator updated={false} />
            </div>
        </div>
    </div>
    <main className="channel-articles">
        <h1>Artykuły kanału</h1>
        <ul className="channel-articles-list">
            <li><ChannelArticle article={mockChannel.articles[0]} /></li>
            <li><ChannelArticle article={mockChannel.articles[1]} /></li>
            <li><ChannelArticle article={mockChannel.articles[0]} /></li>
            <li><ChannelArticle article={mockChannel.articles[0]} /></li>
            <li><ChannelArticle article={mockChannel.articles[0]} /></li>
            <li><ChannelArticle article={mockChannel.articles[0]} /></li>
            <li><ChannelArticle article={mockChannel.articles[0]} /></li>
            <li><ChannelArticle article={mockChannel.articles[0]} /></li>
            <li><ChannelArticle article={mockChannel.articles[0]} /></li>
            <li><ChannelArticle article={mockChannel.articles[0]} /></li>
            <li><Button style={{ width: "calc(100% - 20px)", height: "100%", textAlign: "center" }}>+</Button></li>
        </ul>
    </main>
  </div>
}

export default ChannelPreviewScreen;
