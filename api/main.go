package main

import (
	"encoding/base64"
	"encoding/json"
	"net/http"

	"golang.org/x/oauth2"

	"github.com/zmb3/spotify"
)

var redirectURL = "https://go-genre.now.sh/_/callback"
var auth = spotify.NewAuthenticator(redirectURL, spotify.ScopeUserReadPrivate, spotify.ScopeUserReadEmail, spotify.ScopeUserReadCurrentlyPlaying, spotify.ScopeUserReadRecentlyPlayed)
var state = "testing"

var CookieName = "token"

func Handler(w http.ResponseWriter, r *http.Request) {
	mux := http.NewServeMux()

	mux.HandleFunc("/_/songs", songsHandler)
	mux.HandleFunc("/_/recommendations", recommendationsHandler)
	mux.HandleFunc("/_/auth", authHandler)
	mux.HandleFunc("/_/callback", callbackHandler)

	mux.ServeHTTP(w, r)
}

type RecommendationsResponse struct {
	Recommendations []spotify.SimpleTrack `json:"recommendations"`
}

func recommendationsHandler(w http.ResponseWriter, r *http.Request) {
	client, err := getClient(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	id := spotify.ID(r.URL.Query().Get("id"))

	country := "from_token"
	rec, _ := client.GetRecommendations(spotify.Seeds{
		Tracks: []spotify.ID{id},
	}, nil, &spotify.Options{Country: &country})

	json.NewEncoder(w).Encode(RecommendationsResponse{
		Recommendations: rec.Tracks,
	})
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
	Track   spotify.FullTrack     `json:"track"`
	Album   *spotify.FullAlbum    `json:"album"`
	Artists []*spotify.FullArtist `json:"artists"`
}

type SongsResponse struct {
	Songs []Song `json:"songs"`
}

func songsHandler(w http.ResponseWriter, r *http.Request) {
	client, err := getClient(r)
	if err != nil {
		http.Error(w, "Couldn't get client", http.StatusUnauthorized)
		return
	}

	c, _ := client.PlayerCurrentlyPlaying()
	rs, _ := client.PlayerRecentlyPlayed()

	artistsIds := []spotify.ID{}

	songs := []spotify.FullTrack{}
	if c != nil && c.Item != nil {
		for _, a := range c.Item.Artists {
			artistsIds = append(artistsIds, a.ID)
		}

		songs = append(songs, *c.Item)
	}

	songIds := []spotify.ID{}
	for _, r := range rs {
		songIds = append(songIds, r.Track.ID)
		for _, a := range r.Track.Artists {
			artistsIds = append(artistsIds, a.ID)
		}
	}
	ss, _ := client.GetTracks(songIds...)
	for _, s := range ss {
		songs = append(songs, *s)
	}

	artists := getArtists(client, songs)
	albums := getAlbums(client, songs)

	res := makeSongsResponse(songs, artists, albums)
	json.NewEncoder(w).Encode(res)
}

func makeSongsResponse(songs []spotify.FullTrack, artists map[spotify.ID]*spotify.FullArtist, albums map[spotify.ID]*spotify.FullAlbum) SongsResponse {
	res := SongsResponse{}

	for _, s := range songs {
		art := []*spotify.FullArtist{}
		alb := albums[s.Album.ID]

		for _, a := range s.Artists {
			art = append(art, artists[a.ID])
		}

		res.Songs = append(res.Songs, Song{
			Track:   s,
			Album:   alb,
			Artists: art,
		})
	}

	return res
}

func getAlbums(client *spotify.Client, songs []spotify.FullTrack) map[spotify.ID]*spotify.FullAlbum {
	albums := make(map[spotify.ID]*spotify.FullAlbum)
	albumsIds := []spotify.ID{}
	for _, s := range songs {
		albumsIds = append(albumsIds, s.Album.ID)
	}

	as, _ := client.GetAlbums(albumsIds...)
	for _, a := range as {
		b := a
		albums[b.ID] = b
	}

	return albums
}

func getArtists(client *spotify.Client, songs []spotify.FullTrack) map[spotify.ID]*spotify.FullArtist {
	artists := make(map[spotify.ID]*spotify.FullArtist)
	artistsIds := []spotify.ID{}
	for _, s := range songs {
		for _, a := range s.Artists {
			artistsIds = append(artistsIds, a.ID)
		}
	}

	as, _ := client.GetArtists(artistsIds...)
	for _, a := range as {
		b := a
		artists[b.ID] = b
	}

	return artists
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
