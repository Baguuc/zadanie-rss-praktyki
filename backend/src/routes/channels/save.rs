use rocket::{http::Status, response::status, serde::json::Json};
use chrono::{DateTime, Utc};

#[rocket::post("/<channel_id>", data = "<content>")]
pub async fn controller(
    channel_id: u32,
    content: Json<RequestBody>,
    config: &rocket::State<crate::config::Config>
) -> rocket::response::status::Custom<String> {
    let to_serialize: SerializeTo = content.0.into();
    let serialized = match serde_xml_rs::to_string(&to_serialize) {
        Ok(s) => s,
        Err(_) => return status::Custom(Status::BadRequest, String::from("Cannot serialize"))
    };
    let path_to_write = format!("{}/channel-{}.xml", config.data_path.trim_end_matches("/"), channel_id);
    let _ = std::fs::write(&path_to_write, serialized);

    return status::Custom(Status::Ok, String::new());
}

#[derive(serde::Deserialize)]
pub struct PathData {
    pub channel_id: u32
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct RequestBody {
    pub title: String,
    pub link: String,
    pub description: String,
    pub language: Option<String>,
    pub copyright: Option<String>,
    #[serde(rename = "managingEditor")]
    pub managing_editor: Option<String>,
    #[serde(rename = "webMaster")]
    pub web_master: Option<String>,
    pub category: Option<Vec<String>>,
    pub articles: Vec<BodyArticle>,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct BodyArticle {
    pub title: String,
    pub link: String,
    pub description: String,
    // casing only for purpose of JS compatibility
    pub pubDate: DateTime<Utc>,
    pub author: Option<String>,
    pub category: Option<Vec<String>>,
    pub comments: Option<String>
}


#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename = "rss")]
pub struct SerializeTo {
    pub title: String,
    pub link: String,
    pub description: String,
    pub language: Option<String>,
    pub copyright: Option<String>,
    #[serde(rename = "managingEditor")]
    pub managing_editor: Option<String>,
    #[serde(rename = "webMaster")]
    pub web_master: Option<String>,
    pub category: Option<Vec<String>>,
    #[serde(rename = "item")]
    pub articles: Vec<SerializeToArticle>,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct SerializeToArticle {
    pub title: String,
    pub link: String,
    pub description: String,
    // casing only for purpose of JS compatibility
    pub pubDate: DateTime<Utc>,
    pub author: Option<String>,
    pub category: Option<Vec<String>>,
    pub comments: Option<String>
}

impl Into<SerializeTo> for RequestBody {
    fn into(self) -> SerializeTo {
        return SerializeTo {
            title: self.title,
            link: self.link,
            description: self.description,
            language: self.language,
            copyright: self.copyright,
            managing_editor: self.managing_editor,
            web_master: self.web_master,
            category: self.category,
            articles: self.articles.iter().map(|row| row.clone().into()).collect::<Vec<SerializeToArticle>>()
        };
    }
}

impl Into<SerializeToArticle> for BodyArticle {
    fn into(self) -> SerializeToArticle {
        return SerializeToArticle { 
            title: self.title,
            link: self.link,
            description: self.description,
            pubDate: self.pubDate,
            author: self.author,
            category: self.category,
            comments: self.comments
        };
    }
}