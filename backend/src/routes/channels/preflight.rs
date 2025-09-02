use rocket::{http::Status, response::status, serde::json::Json};
use chrono::{DateTime, Utc};

#[rocket::options("/<channel_id>")]
pub async fn controller(channel_id: u32) -> rocket::response::status::Custom<()> {
    return status::Custom(Status::Ok, ());
}
