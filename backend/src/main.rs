mod dictionary;

use crate::dictionary::{Dictionary, create_dictionary, find_matching_words};
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{Html, IntoResponse, Response};
use axum::routing::get;
use axum::{Json, Router};
use serde_json::json;
use std::sync::Arc;
use std::sync::atomic::{AtomicU64, Ordering};
use tokio::signal;
use tower_http::cors::CorsLayer;

const WORDS: &str = include_str!("words.txt");

struct AppState {
    pub dict: Dictionary,
    pub request_count: AtomicU64,
}

#[tokio::main]
async fn main() {
    let state = Arc::new(AppState {
        dict: create_dictionary(WORDS.lines().collect()).expect("Words list must be valid"),
        request_count: AtomicU64::default(),
    });
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    println!(
        "Backend API listening on {}",
        listener.local_addr().unwrap()
    );

    let router = Router::new()
        .route("/", get(Json(json!({ "message": "Hello, world!" }))))
        .route(
            "/search/exact/{code}",
            get(
                |Path(code): Path<String>, State(state): State<Arc<AppState>>| async move {
                    search_handler(true, code, state).await
                },
            ),
        )
        .route(
            "/search/prefix/{code}",
            get(
                |Path(code): Path<String>, State(state): State<Arc<AppState>>| async move {
                    search_handler(false, code, state).await
                },
            ),
        )
        // frontend developer might need this...
        .layer(CorsLayer::permissive())
        .with_state(state);
    axum::serve(listener, router)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();
}

async fn search_handler(exact: bool, code: String, state: Arc<AppState>) -> Response {
    if !code.chars().all(char::is_numeric) || code.len() == 0 || code.len() > 50 {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({"error": "A code must be a string of digits between 1 and 50 characters long."})),
        ).into_response();
    }

    let request_count = state.request_count.fetch_add(1, Ordering::Relaxed);
    // some requests will take a bit longer to process, so we can see if the UI has some loading state
    tokio::time::sleep(tokio::time::Duration::from_millis(
        100 * (request_count % 10),
    ))
    .await;

    match get_behavior_by_request_count(request_count) {
        Behavior::Normal => (
            StatusCode::OK,
            Json(json!({"words": find_matching_words(code, exact, &state.dict)})),
        )
            .into_response(),
        Behavior::WellFormedError => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({"error": "This is a nicely formatted error. Please show me to the user!"})),
        )
            .into_response(),
        Behavior::UnexpectedError => (
            StatusCode::SERVICE_UNAVAILABLE,
            Html("sorry, but this is not even a json. I don't know if the user needs to see this"),
        )
            .into_response(),
        Behavior::ConnectionClose => {
            tokio::time::sleep(tokio::time::Duration::from_secs(2)).await;
            panic!("panic will cause a connection close, but the server will not crash")
        }
    }
}

// The API behavior changes based on the request count,
// intentionally introducing some errors to see how the frontend handles them.
enum Behavior {
    Normal,
    WellFormedError,
    UnexpectedError,
    ConnectionClose,
}

fn get_behavior_by_request_count(count: u64) -> Behavior {
    match count % 10 {
        3 => Behavior::WellFormedError,
        5 => Behavior::UnexpectedError,
        8 => Behavior::ConnectionClose,
        _ => Behavior::Normal,
    }
}

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}
