pub mod routes;
pub mod config;

use actix_web::{App, HttpServer};

#[actix_web::main]
async fn main() {
    let _ = HttpServer::new(|| {
        let channels_scope= actix_web::Scope::new("/channels")
            .service(routes::channels::get_channel::controller);
        
        App::new()
            .service(channels_scope)
            .app_data(actix_web::web::Data::new(crate::config::Config {
                data_path: String::from("./test")
            }))
    })
    .bind(("0.0.0.0", 3004))
    .expect("cannot bind address 0.0.0.0:3004.")
    .run()
    .await;
}
