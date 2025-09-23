#[tauri::command]
pub fn create_channel(channel: crate::data::channel::Channel, app: tauri::AppHandle) {
    let _ = channel.save(&app);
}



#[tauri::command]
pub fn list_channels(app: tauri::AppHandle) -> Vec<crate::data::channel::Channel> {
    crate::data::channel::Channel::read_all(&app)
}



#[tauri::command]
pub fn update_channel(id: i32, new_metadata: crate::data::channel::ChannelMetadata, app: tauri::AppHandle) -> Result<(), UpdateChannelError> {
    let mut channel = crate::data::channel::Channel::read(id, &app)?;
    channel.update(new_metadata, &app)?;

    return Ok(());
}

#[derive(thiserror::Error, Debug)]
pub enum UpdateChannelError {
    #[error("Read: {0}")]
    Read(#[from] crate::utils::json::ReadJsonError),
    #[error("Save: {0}")]
    Save(#[from] crate::utils::json::SaveJsonError)
}

impl serde::Serialize for UpdateChannelError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::Serializer {
        serializer.serialize_str("UPDATE_CHANNEL_ERROR")
    }
}



#[tauri::command]
pub fn update_articles(id: i32, new_articles: Vec<crate::data::channel::Article>, app: tauri::AppHandle) -> Result<(), UpdateArticleChannelError> {
    let mut channel = crate::data::channel::Channel::read(id, &app)?;
    channel.update_articles(new_articles, &app)?;

    return Ok(());
}

#[derive(thiserror::Error, Debug)]
pub enum UpdateArticleChannelError {
    #[error("Read: {0}")]
    Read(#[from] crate::utils::json::ReadJsonError),
    #[error("Save: {0}")]
    Save(#[from] crate::utils::json::SaveJsonError)
}

impl serde::Serialize for UpdateArticleChannelError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::Serializer {
        serializer.serialize_str("UPDATE_ARTICLE_CHANNEL_ERROR")
    }
}


#[tauri::command]
pub fn check_compliance(channel_string: String) -> bool {
    let langs = vec!["af", "sq", "eu", "be", "bg", "ca", "zh-cn", "zh-tw", "hr", "cs", "da", "nl", "nl-be", "nl-nl", "en", "en-au", "en-bz", "en-ca", "en-ie", "en-jm", "en-nz", "en-ph", "en-za", "en-tt", "en-gb", "en-us", "en-zw", "et", "fo", "fi", "fr", "fr-be", "fr-ca", "fr-fr", "fr-lu", "fr-mc", "fr-ch", "gl", "gd", "de", "de-at", "de-de", "de-li", "de-lu", "de-ch", "el", "ha", "hu", "is", "in", "ga", "it", "it-it", "it-ch", "ja", "ko", "mk", "no", "pl", "pt", "pt-br", "pt-pt", "ro", "ro-mo", "ro-ro", "ru", "ru-mo", "ru-ru", "sr", "sk", "sl", "es", "es-ar", "es-bo", "es-cl", "es-co", "es-cr", "es-do", "es-ec", "es-sv", "es-gt", "es-hn", "es-mx", "es-ni", "es-pa", "es-py", "es-pe", "es-pr", "es-es", "es-uy", "es-ve", "sv", "sv-fi", "sv-se", "tr", "uk"];

    let channel: XmlChannel = match serde_xml_rs::from_str(&channel_string) {
        Ok(channel) => channel,
        Err(err) => {
            println!("{}", err);
            return false;
        }
    };

    if let Some(language) = channel.language {
        if !langs.contains(&language.as_str()) {
            return false;
        }
    }

    if let Some(image) = channel.image {
        if let Some(width) = image.width {
            if width > 144 { println!("wrong image width"); return false; }
        }

        if let Some(height) = image.height {
            if height > 400 { println!("wrong image height"); return false; }
        }
    }

    return true;
}


#[derive(Debug, Clone, serde::Deserialize)]
#[serde(rename = "rss")]
pub struct XmlChannel {
    #[serde(rename = "@version")]
    pub version: String,
    pub title: String,
    pub link: String,
    pub description: String,
    pub language: Option<String>,
    pub copyright: Option<String>,
    #[serde(rename = "managingEditor")]
    pub managing_editor: Option<String>,
    #[serde(rename = "webMaster")]
    pub web_master: Option<String>,
    #[serde(rename = "pubDate")]
    pub pub_date: Option<chrono::DateTime<chrono::Utc>>,
    #[serde(rename = "lastBuiltDate")]
    pub last_built_date: Option<chrono::DateTime<chrono::Utc>>,
    pub category: Option<String>,
    pub generator: Option<String>,
    pub docs: Option<String>,
    pub cloud: Option<String>,
    pub ttl: Option<u32>,
    pub image: Option<ChannelImage>,
    pub rating: Option<String>,
    #[serde(rename = "textInput")]
    pub text_input: Option<ChannelTextInput>,
    #[serde(rename = "skipHours")]
    pub skip_hours: Option<u32>,
    #[serde(rename = "skip_days")]
    pub skip_days: Option<u32>,
    #[serde(rename = "item")]
    pub articles: Vec<Article>,
}


#[derive(Debug, Clone, serde::Deserialize)]
pub struct ChannelImage {
    pub title: String,
    pub link: String,
    pub url: String,
    pub width: Option<u8>,
    pub height: Option<u16>
}

#[derive(Debug, Clone, serde::Deserialize)]
pub struct ChannelTextInput {
    pub title: String,
    pub description: String,
    pub name: String,
    pub link: String
}

#[derive(Debug, Clone, serde::Deserialize)]
pub struct Article {
    pub title: Option<String>,
    pub link: Option<String>,
    pub description: Option<String>,
    pub author: Option<String>,
    pub category: Option<Vec<ArticleCategory>>,
    pub comments: Option<String>,
    pub enclosure: Option<ArticleEnclosure>,
    pub guid: Option<String>,
    #[serde(rename = "pubDate")]
    pub pub_date: Option<chrono::DateTime<chrono::Utc>>,
    pub source: Option<ArticleSource>
}

#[derive(Debug, Clone, serde::Deserialize)]
pub struct ArticleCategory {
    #[serde(rename = "#text")]
    pub text: String,
    #[serde(rename = "@domain")]
    pub domain: Option<String>,
}

#[derive(Debug, Clone, serde::Deserialize)]
pub struct ArticleEnclosure {
    #[serde(rename = "#text")]
    pub text: (),
    #[serde(rename = "@url")]
    pub url: String,
    #[serde(rename = "@length")]
    pub length: u32,
    #[serde(rename = "@type")]
    pub _type: String
}

#[derive(Debug, Clone, serde::Deserialize)]
pub struct ArticleSource {
    #[serde(rename = "#text")]
    pub text: String,
    #[serde(rename = "@url")]
    pub url: String,
}