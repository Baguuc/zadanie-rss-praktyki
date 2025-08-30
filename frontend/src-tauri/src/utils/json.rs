pub fn save_json<J: serde::Serialize>(json: J, file_path: String, app: &tauri::AppHandle) -> Result<(), SaveJsonError> {
    let serialized = serde_json::to_string(&json)?;

    crate::utils::fs::save_to_app_data(serialized, file_path, app)?;

    return Ok(());
}

#[derive(thiserror::Error, Debug)]
pub enum SaveJsonError {
    #[error("Serialization: {0}")]
    Serialization(#[from] serde_json::Error),
    #[error("IO: {0}")]
    IO(#[from] crate::utils::fs::SaveToAppDataError)
}

pub fn read_json<J: serde::de::DeserializeOwned>(file_path: String, app: &tauri::AppHandle) -> Result<J, ReadJsonError> {
    let content = crate::utils::fs::read_from_app_data(file_path, app)?;
    let deserialized: J = serde_json::from_str(&content)?;

    return Ok(deserialized);
}

#[derive(thiserror::Error, Debug)]
pub enum ReadJsonError {
    #[error("Serialization: {0}")]
    Serialization(#[from] serde_json::Error),
    #[error("IO: {0}")]
    IO(#[from] crate::utils::fs::ReadFromAppDataError)
}

pub fn list_json<J: serde::de::DeserializeOwned>(file_path: String, app: &tauri::AppHandle) -> Result<Vec<J>, ListJsonError> {
    let listed = crate::utils::fs::list_from_app_data(file_path, app)?
        .into_iter()
        .filter_map(|entry| {
            let entry = entry.ok()?;
            let string = std::fs::read_to_string(entry.path()).ok()?;

            serde_json::from_str(&string).ok()?
        })
        .collect::<Vec<J>>();

    return Ok(listed);
}

#[derive(thiserror::Error, Debug)]
pub enum ListJsonError {
    #[error("Serialization: {0}")]
    Serialization(#[from] serde_json::Error),
    #[error("IO: {0}")]
    IO(#[from] std::io::Error),
    #[error("IO: {0}")]
    AppDataIO(#[from] crate::utils::fs::ListFromAppDataError)
}