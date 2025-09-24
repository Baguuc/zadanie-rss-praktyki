#[derive(serde::Serialize, serde::Deserialize)]
pub struct Config {
    pub data_path: String,
    pub save_password: String,
    pub port: u16
}

impl Config {
    pub fn read() -> Result<Self, ConfigReadError> {
        let content = std::fs::read_to_string("./config.json")?;
        let parsed = serde_json::from_str(&content)?;

        return Ok(parsed)
    }
}

#[derive(thiserror::Error, Debug)]
pub enum ConfigReadError {
    #[error("NOT_FOUND:{0}")]
    NotFound(#[from] std::io::Error),
    #[error("WRONG_FORMAT:{0}")]
    WrongFormat(#[from] serde_json::Error)
}
