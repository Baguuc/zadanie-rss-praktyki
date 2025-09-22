use rocket::{http::Status, response::status};

#[rocket::options("/<channel_id>")]
pub async fn controller(channel_id: u32) -> rocket::response::status::Custom<()> {
    let _ = channel_id;
    return status::Custom(Status::Ok, ());
}
