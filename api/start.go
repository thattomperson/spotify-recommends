package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", Handler)
	log.Println("Listening on localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
