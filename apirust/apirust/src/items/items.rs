use actix_web::{Result,HttpResponse, web, HttpRequest, Error};
use serde::{Serialize, Deserialize};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use actix_web_httpauth::extractors::basic::BasicAuth;
use actix_web_httpauth::middleware::HttpAuthentication;
use actix_web::dev::ServiceRequest;
use actix_web::error::DispatchError::H2;
use actix_web::middleware::errhandlers::ErrorHandlerResponse::Future;
use std::future::Future;


#[derive(Serialize, Deserialize, Debug)]
struct Question {
    name: String,
    question: String,
    answer: String,
}

impl Question {
    fn new(name: String, question: String, answer: String) -> Question {
        return Question {
            name,
            question,
            answer
        }
    }
}


#[derive(Serialize, Deserialize, Debug)]
struct Quiz {
    name: String,
    quiz_questions: Vec<Question>,
}

impl Quiz {
    fn new(quiz_name: String) -> Quiz {
        return Quiz {
            name: quiz_name,
            quiz_questions: vec![]
        }
    }
    // add a question to the list
    fn push(&mut self, question: Question) {
        self.quiz_questions.push(question);
    }
}


#[derive(Serialize, Deserialize, Debug)]
struct QuizList {
    name: String,
    quiz_list: Vec<Quiz>,
}

impl QuizList {
    fn new(quiz_name: String) -> QuizList {
        return QuizList {
            name: quiz_name,
            quiz_list: vec![],
        }
    }

    fn push(&mut self, new_quiz: Quiz) {
        self.quiz_list.push(new_quiz)
    }
}


#[derive(Serialize, Deserialize, Debug)]
struct Item {
    item_id: String,
    name: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct ItemList {
    item_name: String,
    item_list: Vec<Item>,
}


// authentication validation
async fn validator(
        req: ServiceRequest,
        credentials: BearerAuth
        ) -> Result<ServiceRequest, Error> {
    println!("claro que work");
    Ok(req)
}


pub async fn get_list(request: HttpRequest) -> Result<HttpResponse> {
    let request_headers = request.headers();
    // this is only mockup data so far
    let first_question: Question = Question::new(
        "one".to_string(),
        "what is your favourite color".to_string(),
        "blue".to_string(),
    );
    let second_question: Question = Question::new(
        "two".to_string(),
        "who are you".to_string(),
        "who knows".to_string(),
    );
    let mut first_quiz: Quiz = Quiz::new("first_quiz".to_string());
    first_quiz.push(first_question);
    first_quiz.push(second_question);
    let second_quiz: Quiz = Quiz::new("second_quiz".to_string());
    let mut quiz_list: QuizList = QuizList::new("all quizzes".to_string());
    quiz_list.push(first_quiz);
    quiz_list.push(second_quiz);

    //let item_list: ItemList = ItemList{ item_name: "itemList".to_string(), item_list: list_items };

    Ok(HttpResponse::Ok().json(quiz_list))
}

pub async fn get_quiz(web::Path(item_id): web::Path<String>) -> Result<HttpResponse> {
    println!("{}", item_id);
    let first_question: Question = Question::new(
        "one".to_string(),
        "what is your favourite color".to_string(),
        "blue".to_string(),
    );
    let second_question: Question = Question::new(
        "two".to_string(),
        "who are you".to_string(),
        "who knows what".to_string(),
    );
    let mut first_quiz: Quiz = Quiz::new("first_quiz".to_string());
    first_quiz.push(first_question);
    first_quiz.push(second_question);
    Ok(HttpResponse::Ok().json(first_quiz))
}


pub fn config(cfg: &mut web::ServiceConfig) {
    let auth = HttpAuthentication::bearer(validator);
    let auth_item = HttpAuthentication::bearer(validator);
    cfg.service(web::resource("/quizzes")
        .route(web::get().to(get_list)).wrap(auth)
    ).service(web::resource("/quizzes/{item_id}")
        .route(web::get().to(get_quiz)).wrap(auth_item)
    );
}



// tests

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{http, test, body::Body, App};
    use serde_json::json;

    #[actix_rt::test]
    async fn test_get_list_ok() {
        let response = get_list().await;
        assert_eq!(response.unwrap().status(), http::StatusCode::OK);
    }
}