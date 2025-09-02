use actix_web::{App, HttpServer};

fn main() {
    let _ = HttpServer::new(|| {
        App::new()
    })
    .bind(("0.0.0.0", 3004))
    .expect("cannot bind address 0.0.0.0:3004.")
    .run();
}
