use actix_web::{Result,HttpResponse, web};
use serde::{Serialize, Deserialize};


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


pub async fn get_list() -> Result<HttpResponse> {
    let main_page: Item = Item { item_id: "1".to_string(), name: "pato".to_string()};
    let second_element: Item = Item { item_id: "2".to_string(), name: "bengalas".to_string()};
    let mut list_items: Vec<Item> = Vec::new();
    list_items.push(main_page);
    list_items.push(second_element);
    let item_list: ItemList = ItemList{ item_name: "itemList".to_string(), item_list: list_items };
    println!("ho");

    Ok(HttpResponse::Ok().json(item_list))
}


pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/items")
        .route(web::get().to(get_list))
    );
}