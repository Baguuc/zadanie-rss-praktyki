pub mod config;

use actix_web::{App, HttpServer};

#[actix_web::main]
async fn main() {
    let _ = HttpServer::new(|| {
        App::new()
            .app_data(crate::config::Config {
                data_path: String::from("./test")
            })
    })
    .bind(("0.0.0.0", 3004))
    .expect("cannot bind address 0.0.0.0:3004.")
    .run()
    .await;
}
