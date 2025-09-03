use tauri::Manager;
use tauri_plugin_fs::FsExt;

pub mod utils;
pub mod data;
pub mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            let scope = app.fs_scope();
            let _ = scope.allow_directory(app.path().app_data_dir().unwrap(), false);
            let _ = std::fs::create_dir(app.path().app_data_dir().unwrap());

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::create_channel,
            commands::list_channels,
            commands::update_channel,
            commands::update_articles,
            commands::check_compliance
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
