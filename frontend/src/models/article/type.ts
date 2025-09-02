type Article = {
  title: string; // title of the article
  link: string; // link to the article
  description: string; // brief description of the article
  pubDate: Date; // date of publication
  author: string | null; // author of the article
  category: string[] | null; // Specify one or more categories that the channel belongs to.
  comments: string | null; // link to the comments page
};

export default Article;