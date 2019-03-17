package main

import (
	"encoding/base64"
	"encoding/json"
	"net/http"

	"golang.org/x/oauth2"

	"github.com/zmb3/spotify"
)

var redirectURL = "https://go-genre.now.sh/callback"
var auth = spotify.NewAuthenticator(redirectURL, spotify.ScopeUserReadPrivate, spotify.ScopeUserReadEmail, spotify.ScopeUserReadCurrentlyPlaying, spotify.ScopeUserReadRecentlyPlayed)
var state = "testing"

var CookieName = "token"

func Handler(w http.ResponseWriter, r *http.Request) {
	mux := http.NewServeMux()

	mux.HandleFunc("/_/songs", songsHandler)
	mux.HandleFunc("/_/auth", authHandler)
	mux.HandleFunc("/_/callback", callbackHandler)

	mux.ServeHTTP(w, r)
}

func authHandler(w http.ResponseWriter, r *http.Request) {
	// the redirect URL must be an exact match of a URL you've registered for your application
	// scopes determine which permissions the user is prompted to authorize

	// get the user to this URL - how you do that is up to you
	// you should specify a unique state string to identify the session
	url := auth.AuthURL(state)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func getClient(r *http.Request) (*spotify.Client, error) {
	c, err := r.Cookie(CookieName)
	if err != nil {
		return nil, err
	}

	b, err := base64.URLEncoding.DecodeString(c.Value)
	if err != nil {
		return nil, err
	}

	token := &oauth2.Token{}
	json.Unmarshal(b, token)

	client := auth.NewClient(token)
	return &client, nil
}

type Song struct {
	Info spotify.SimpleTrack `json:"info"`
}

type Response struct {
	Songs []Song `json:"songs"`
}

func songsHandler(w http.ResponseWriter, r *http.Request) {
	client, err := getClient(r)
	if err != nil {
		http.Redirect(w, r, "/_/auth", http.StatusTemporaryRedirect)
		return
	}

	res := Response{}

	c, _ := client.PlayerCurrentlyPlaying()
	res.Songs = append(res.Songs, Song{
		Info: c.Item.SimpleTrack,
	})

	rs, _ := client.PlayerRecentlyPlayed()
	for _, r := range rs {
		res.Songs = append(res.Songs, Song{
			Info: r.Track,
		})
	}

	json.NewEncoder(w).Encode(res)
}

// the user will eventually be redirected back to your redirect URL
// typically you'll have a handler set up like the following:
func callbackHandler(w http.ResponseWriter, r *http.Request) {
	tok, err := auth.Token(state, r)
	if err != nil {
		http.Error(w, "Couldn't get token", http.StatusForbidden)
		return
	}
	if st := r.FormValue("state"); st != state {
		http.NotFound(w, r)
		return
	}

	b, err := json.Marshal(tok)
	if err != nil {
		http.Error(w, "Couldn't marshal token", http.StatusInsufficientStorage)
		return
	}

	v := base64.URLEncoding.EncodeToString(b)

	// create a client using the specified token
	cookie := &http.Cookie{
		Name:  CookieName,
		Value: v,
	}
	http.SetCookie(w, cookie)
	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}
