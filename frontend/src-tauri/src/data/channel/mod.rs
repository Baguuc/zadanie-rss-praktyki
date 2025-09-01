#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]

pub struct Channel {
    pub id: i32,
    pub title: String,
    pub link: String,
    pub description: String,
    pub language: Option<String>,
    pub copyright: Option<String>,
    // casing only for purpose of JS compatibility
    pub managingEditor: Option<String>,
    pub webMaster: Option<String>,
    // casing only for purpose of JS compatibility
    pub pubDate: Option<String>,
    pub category: Option<Vec<String>>,
    pub articles: Vec<Article>,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ChannelMetadata {
    pub title: String,
    pub link: String,
    pub description: String,
    pub language: Option<String>,
    pub copyright: Option<String>,
    // casing only for purpose of JS compatibility
    pub managingEditor: Option<String>,
    pub webMaster: Option<String>,
    // casing only for purpose of JS compatibility
    pub pubDate: Option<String>,
    pub category: Option<Vec<String>>,
}

// type Article = {
//   title: string; // title of the article
//   link: string; // link to the article
//   description: string; // brief description of the article
//   author: string | null; // author of the article
//   category: string[] | null; // Specify one or more categories that the channel belongs to.
//   comments: string; // link to the comments page
//   pubDate: string; // date of publication
// };

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Article {
    pub title: String,
    pub link: String,
    pub description: String,
    pub author: Option<String>,
    pub category: Option<Vec<String>>,
    pub comments: Option<String>,
    // casing only for purpose of JS compatibility
    pub pubDate: Option<String>
}

impl Channel {
    pub fn read_all(app: &tauri::AppHandle) -> Vec<Self> {
        return crate::utils::json::list_json(String::new(), app).unwrap_or(vec![]);
    }

    pub fn read(id: i32, app: &tauri::AppHandle) -> Result<Self, crate::utils::json::ReadJsonError> {
        return crate::utils::json::read_json(format!("channel-{}.json", id), app);
    }

    pub fn save(self: &Self, app: &tauri::AppHandle) -> Result<(), crate::utils::json::SaveJsonError> {
        return crate::utils::json::save_json(self, format!("channel-{}.json", self.id), app);
    }

    pub fn update(self: &mut Self, new_metadata: ChannelMetadata, app: &tauri::AppHandle) -> Result<(), crate::utils::json::SaveJsonError> {
        self.title = new_metadata.title;
        self.link = new_metadata.link;
        self.description = new_metadata.description;
        self.language = new_metadata.language;
        self.copyright = new_metadata.copyright;
        self.managingEditor = new_metadata.managingEditor;
        self.pubDate = new_metadata.pubDate;
        self.category = new_metadata.category;

        return self.save(app);
    }

    pub fn add_article(self: &mut Self, article: Article, app: &tauri::AppHandle) -> Result<(), crate::utils::json::SaveJsonError> {
        self.articles.push(article);

        return self.save(app);
    }
}