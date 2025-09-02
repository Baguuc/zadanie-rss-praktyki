use rocket::{http::Status, response::status};

#[rocket::post("/<channel_id>", data = "<content>")]
pub async fn controller(
    channel_id: u32,
    content: String,
    config: &rocket::State<crate::config::Config>
) -> rocket::response::status::Custom<String> {
    let path_to_write = format!("{}/channel-{}.xml", config.data_path.trim_end_matches("/"), channel_id);
    let _ = std::fs::write(&path_to_write, content);

    return status::Custom(Status::Ok, String::new());
}

#[derive(serde::Deserialize)]
pub struct PathData {
    pub channel_id: u32
}