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