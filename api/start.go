package main

import "net/http"

func main() {
	http.HandleFunc("/", Handler)
	http.ListenAndServe(":8080", nil)
}
