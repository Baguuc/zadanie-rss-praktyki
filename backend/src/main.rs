pub mod routes;
pub mod config;

use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

#[rocket::launch]
fn rocket() -> _ {
    let config = match crate::config::Config::read() {
        Ok(config) => config,
        Err(err) => {
            eprintln!("Error happened reading config: {}", err);
            std::process::exit(1);
        }
    };

    rocket::build()
        .configure(rocket::Config::figment().merge(("port", config.port)))
        .manage(config)
        .attach(CORS)
        .mount("/channels", rocket::routes![
            routes::channels::get_channel::controller,
            routes::channels::save::controller,
            routes::channels::preflight::controller
        ])
}

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "GET, POST"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
    }
}
