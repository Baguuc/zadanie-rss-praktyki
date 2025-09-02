pub mod routes;
pub mod config;

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
        .manage(config)
        .mount("/channels", rocket::routes![
            routes::channels::get_channel::controller,
            routes::channels::save::controller
        ])
}