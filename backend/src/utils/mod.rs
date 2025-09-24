use std::fmt::Display;

use rocket::{http::Status, request::{FromRequest, Outcome}, Request};

pub struct SavePassword<'r>(&'r str);

#[derive(Debug)]
pub enum SavePasswordError {
    Missing
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for SavePassword<'r> {
    type Error = SavePasswordError;

    async fn from_request(req: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        match req.headers().get_one("authorization") {
            None => Outcome::Error((Status::BadRequest, SavePasswordError::Missing)),
            Some(password) => Outcome::Success(SavePassword(password))
        }
    }
}

impl<'r> Display for SavePassword<'r> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(self.0)
    }
}