use actix_web::HttpResponse;

#[actix_web::get("/{channel_id}")]
pub async fn controller(
    config: actix_web::web::Data<crate::config::Config>,
    path_data: actix_web::web::Path<PathData>
) -> impl actix_web::Responder {
    let path_to_read = format!("{}/channel-{}.xml", config.data_path.trim_end_matches("/"), path_data.channel_id);
    let content = match std::fs::read_to_string(&path_to_read) {
        Ok(content) => content,
        Err(_) => return HttpResponse::NotFound().body(format!("cannot read this channel from {}", path_to_read))
    };

    return HttpResponse::Ok().body(content);
}

#[derive(serde::Deserialize)]
pub struct PathData {
    pub channel_id: u32
}