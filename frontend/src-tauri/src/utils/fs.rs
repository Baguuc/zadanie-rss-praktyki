pub fn save_to_app_data(content: String, file_path: String, app: &tauri::AppHandle) -> Result<(), SaveToAppDataError> {
    use tauri::Manager;

    let app_data_path = app
        .path()
        .app_data_dir()?;
    let full_path = app_data_path.join(file_path);

    std::fs::write(full_path, content)?;

    return Ok(());
}

#[derive(thiserror::Error, Debug)]
pub enum SaveToAppDataError {
    #[error("Tauri: {0}")]
    Tauri(#[from] tauri::Error),
    #[error("IO: {0}")]
    IO(#[from] std::io::Error)
}

pub fn read_from_app_data(file_path: String, app: &tauri::AppHandle) -> Result<String, ReadFromAppDataError> {
    use tauri::Manager;

    let app_data_path = app
        .path()
        .app_data_dir()?;
    let full_path = app_data_path.join(file_path);

    let result = std::fs::read_to_string(full_path)?;

    return Ok(result);
}

#[derive(thiserror::Error, Debug)]
pub enum ReadFromAppDataError {
    #[error("Tauri: {0}")]
    Tauri(#[from] tauri::Error),
    #[error("IO: {0}")]
    IO(#[from] std::io::Error)
}

pub fn list_from_app_data(file_path: String, app: &tauri::AppHandle) -> Result<std::fs::ReadDir, ListFromAppDataError> {
    use tauri::Manager;

    let app_data_path = app
        .path()
        .app_data_dir()?;
    let full_path = app_data_path.join(file_path);

    let result = std::fs::read_dir(full_path)?;

    return Ok(result);
}

#[derive(thiserror::Error, Debug)]
pub enum ListFromAppDataError {
    #[error("Tauri: {0}")]
    Tauri(#[from] tauri::Error),
    #[error("IO: {0}")]
    IO(#[from] std::io::Error)
}

pub fn delete_from_app_data(file_path: String, app: &tauri::AppHandle) -> Result<(), DeleteFromAppDataError> {
    use tauri::Manager;

    let app_data_path = app
        .path()
        .app_data_dir()?;
    let full_path = app_data_path.join(file_path);

    let _ = std::fs::remove_file(full_path)?;

    return Ok(());
}

#[derive(thiserror::Error, Debug)]
pub enum DeleteFromAppDataError {
    #[error("Tauri: {0}")]
    Tauri(#[from] tauri::Error),
    #[error("IO: {0}")]
    IO(#[from] std::io::Error)
}