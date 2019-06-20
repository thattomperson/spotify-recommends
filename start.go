package main

import (
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/joho/godotenv"

	"ttp.sh/go-genre/handler"
)

func proxy(address string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		res, err := http.Get(fmt.Sprintf("http://%s/%s", address, r.URL.Path))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		io.Copy(w, res.Body)
		res.Body.Close()
	}
}

func main() {
	godotenv.Load()

	http.HandleFunc("/_/", handler.Handler)
	http.HandleFunc("/", proxy("localhost:8080"))
	log.Println("Listening on http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
