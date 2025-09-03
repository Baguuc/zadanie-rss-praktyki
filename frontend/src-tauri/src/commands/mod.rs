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
    // the structure is modeled in a way in which if the deserialization fail, it means the feed is not compliant
    // missing a required field, providing wrong value for a field or in a wrong format overall
    let channel: XmlChannel = match serde_xml_rs::from_str(&channel_string) {
        Ok(channel) => channel,
        Err(_) => return false
    };

    if let Some(image) = channel.image {
        if let Some(width) = image.width {
            if width > 144 { return false; }
        }

        if let Some(height) = image.height {
            if height > 400 { return false; }
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
    pub language: Option<ChannelLanguage>,
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
#[serde(rename_all = "lowercase")]
pub enum ChannelLanguage {
    Af,
    Sq,
    Eu,
    Be,
    Bg,
    Ca,
    #[serde(rename = "zh-cn")]
    ZhCn,
    #[serde(rename = "zh-tw")]
    ZhTw,
    Hr,
    Cs,
    Da,
    Nl,
    #[serde(rename = "nl-be")]
    NlBe,
    #[serde(rename = "nl-nl")]
    NlNl,
    En,
    #[serde(rename = "en-au")]
    EnAu,
    #[serde(rename = "en-bz")]
    EnBz,
    #[serde(rename = "en-ca")]
    EnCa,
    #[serde(rename = "en-ie")]
    EnIe,
    #[serde(rename = "en-jm")]
    EnJm,
    #[serde(rename = "en-nz")]
    EnNz,
    #[serde(rename = "en-ph")]
    EnPh,
    #[serde(rename = "en-za")]
    EnZa,
    #[serde(rename = "en-tt")]
    EnTt,
    #[serde(rename = "en-gb")]
    EnGb,
    #[serde(rename = "en-us")]
    EnUs,
    #[serde(rename = "en-zw")]
    EnZw,
    Et,
    Fo,
    Fi,
    Fr,
    #[serde(rename = "fr-be")]
    FrBe,
    #[serde(rename = "fr-ca")]
    FrCa,
    #[serde(rename = "fr-fr")]
    FrFr,
    #[serde(rename = "fr-lu")]
    FrLu,
    #[serde(rename = "fr-mc")]
    FrMc,
    #[serde(rename = "fr-ch")]
    FrCh,
    Gl,
    Gd,
    De,
    #[serde(rename = "de-at")]
    DeAt,
    #[serde(rename = "de-de")]
    DeDe,
    #[serde(rename = "de-li")]
    DeLi,
    #[serde(rename = "de-lu")]
    DeLu,
    #[serde(rename = "de-ch")]
    DeCh,
    El,
    Ha,
    Hu,
    Is,
    In,
    Ga,
    It,
    #[serde(rename = "it-it")]
    ItIt,
    #[serde(rename = "it-ch")]
    ItCh,
    Ja,
    Ko,
    Mk,
    No,
    Pl,
    Pt,
    #[serde(rename = "pt-br")]
    PtBr,
    #[serde(rename = "pt-pt")]
    PtPt,
    Ro,
    #[serde(rename = "ro-mo")]
    RoMo,
    #[serde(rename = "ro-ro")]
    RoRo,
    Ru,
    #[serde(rename = "ru-mo")]
    RuMo,
    #[serde(rename = "ru-ru")]
    RuRu,
    Sr,
    Sk,
    Sl,
    Es,
    #[serde(rename = "es-ar")]
    EsAr,
    #[serde(rename = "es-bo")]
    EsBo,
    #[serde(rename = "es-cl")]
    EsCl,
    #[serde(rename = "es-co")]
    EsCo,
    #[serde(rename = "es-cr")]
    EsCr,
    #[serde(rename = "es-do")]
    EsDo,
    #[serde(rename = "es-ec")]
    EsEc,
    #[serde(rename = "es-sv")]
    EsSv,
    #[serde(rename = "es-gt")]
    EsGt,
    #[serde(rename = "es-hn")]
    EsHn,
    #[serde(rename = "es-mx")]
    EsMx,
    #[serde(rename = "es-ni")]
    EsNi,
    #[serde(rename = "es-pa")]
    EsPa,
    #[serde(rename = "es-py")]
    EsPy,
    #[serde(rename = "es-pe")]
    EsPe,
    #[serde(rename = "es-pr")]
    EsPr,
    #[serde(rename = "es-es")]
    EsEs,
    #[serde(rename = "es-uy")]
    EsUy,
    #[serde(rename = "es-ve")]
    EsVe,
    Sv,
    #[serde(rename = "sv-fi")]
    SvFi,
    #[serde(rename = "sv-se")]
    SvSe,
    Tr,
    Uk,
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