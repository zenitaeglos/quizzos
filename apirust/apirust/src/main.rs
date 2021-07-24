use actix_web::{App, HttpResponse, HttpServer, Result, web, middleware};
use actix_cors::Cors;
use serde::{Serialize, Deserialize};


mod items;
mod user;



#[derive(Serialize, Deserialize, Debug)]
struct MainPage {
    title: String,
}



async fn index() -> Result<HttpResponse> {
    let main_page: MainPage = MainPage{title: "Welcome with rust".to_string()};
    Ok(HttpResponse::Ok().json(main_page))
}


pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/")
        .service(web::resource("")
            .route(web::get().to(index)))
        .configure(items::items::config)
        .configure(user::user::config)
    );
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().wrap(Cors::new()
            .allowed_origin("http://localhost:8104").finish())
            .wrap(middleware::DefaultHeaders::new().header("X-Version", "0.1"))
            //.service(index)
            .configure(config)
    })
    .bind("0.0.0.0:8000")?
    .run()
    .await
}



#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{http, test, body::Body};
    use serde_json::json;

    #[actix_rt::test]
    async fn test_index_ok() {
        let mut app = test::init_service(App::new().route("/", web::get().to(index))).await;
        let request = test::TestRequest::with_header("content-type", "application/json").to_request();
        let response = test::call_service(&mut app, request).await;
        let status_code = response.status();
        assert_eq!(status_code, http::StatusCode::OK);
    }

    #[actix_rt::test]
    async fn test_index_json() {
        let mut app = test::init_service(App::new().route("/", web::get().to(index))).await;
        let request = test::TestRequest::with_header("content-type", "application/json").to_request();
        let mut response = test::call_service(&mut app, request).await;
        assert_eq!(response.take_body().as_ref().unwrap(), &Body::from(json!({ "title": "Welcome with rust" })));
    }
}