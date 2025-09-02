use rocket::{http::Status, response::status};

#[rocket::get("/<channel_id>")]
pub async fn controller(
    channel_id: u32,
    config: &rocket::State<crate::config::Config>
) -> rocket::response::status::Custom<String> {
    let path_to_read = format!("{}/channel-{}.xml", config.data_path.trim_end_matches("/"), channel_id);
    let content = match std::fs::read_to_string(&path_to_read) {
        Ok(content) => content,
        Err(_) => {
            let body = format!("cannot read this channel from {}", path_to_read);

            return status::Custom(Status::NotFound, body);
        }
    };

    return status::Custom(Status::Ok, content);
}

#[derive(serde::Deserialize)]
pub struct PathData {
    pub channel_id: u32
}