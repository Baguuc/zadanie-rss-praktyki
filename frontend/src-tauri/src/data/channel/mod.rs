#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Channel {
    pub id: i32,
    pub title: String,
    pub link: String,
    pub description: String,
    pub language: String,
    pub copyright: String,
    // casing only for purpose of JS compatibility
    pub channelManager: String,
    // casing only for purpose of JS compatibility
    pub publishedDate: String,
    pub category: String,
    pub articles: Vec<Article>,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ChannelMetadata {
    pub title: String,
    pub link: String,
    pub description: String,
    pub language: String,
    pub copyright: String,
    // casing only for purpose of JS compatibility
    pub channelManager: String,
    // casing only for purpose of JS compatibility
    pub publishedDate: String,
    pub category: String,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Article {
    pub title: String,
    pub link: String,
    pub description: String,
    pub author: String,
    pub category: String,
    // casing only for purpose of JS compatibility
    pub commentsLink: String,
    pub guid: String,
    // casing only for purpose of JS compatibility
    pub publishedDate: String,
    pub source: String,
    pub content: String,
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
        self.channelManager = new_metadata.channelManager;
        self.publishedDate = new_metadata.publishedDate;
        self.category = new_metadata.category;

        return self.save(app);
    }

    pub fn add_article(self: &mut Self, article: Article, app: &tauri::AppHandle) -> Result<(), crate::utils::json::SaveJsonError> {
        self.articles.push(article);

        return self.save(app);
    }
}