use actix_web::{web, HttpResponse, Result, Error};
use actix_web::dev::ServiceRequest;
use actix_web_httpauth::extractors::bearer::BearerAuth;
use actix_web_httpauth::middleware::HttpAuthentication;
use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize, Debug)]
pub struct Login {
    username: String,
    password: String,
}

// validator
async fn login_auth(
    req: ServiceRequest,
    credentials: BearerAuth
) -> Result<ServiceRequest, Error> {
    println!("received");
    println!("{}", credentials.token());
    Ok(req)
}






pub async fn login(form: web::Form<Login>) -> Result<HttpResponse> {
    println!("login from rust");
    println!("{}", form.username);
    //println!("{}", login.password);
    Ok(HttpResponse::Ok().json("{onehundres: two}"))
}




pub fn config(cfg: &mut web::ServiceConfig) {
    //let auth = HttpAuthentication::bearer(login_auth);
    cfg.service(web::scope("/user")
        .service(web::resource("/login")
        .route(web::post().to(login)))
    );
}