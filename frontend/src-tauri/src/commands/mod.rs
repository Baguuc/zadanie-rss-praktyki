#[tauri::command]
pub fn create_channel(channel: crate::data::channel::Channel, app: tauri::AppHandle) {
    let result = channel.save(&app);
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
pub fn add_article(id: i32, article: crate::data::channel::Article, app: tauri::AppHandle) -> Result<(), AddArticleChannelError> {
    let mut channel = crate::data::channel::Channel::read(id, &app)?;
    channel.add_article(article, &app)?;

    return Ok(());
}

#[derive(thiserror::Error, Debug)]
pub enum AddArticleChannelError {
    #[error("Read: {0}")]
    Read(#[from] crate::utils::json::ReadJsonError),
    #[error("Save: {0}")]
    Save(#[from] crate::utils::json::SaveJsonError)
}

impl serde::Serialize for AddArticleChannelError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::Serializer {
        serializer.serialize_str("ADD_ARTICLE_CHANNEL_ERROR")
    }
}