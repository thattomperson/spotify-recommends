package handler // import recommend.ttp.sh/handler

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"golang.org/x/oauth2"

	"github.com/zmb3/spotify"
)

func getAuth(r *http.Request) spotify.Authenticator {
	redirectURL := fmt.Sprintf("https://%s/_/callback", r.Host)
	if r.Host == "localhost:8000" {
		redirectURL = "http://localhost:8000/_/callback"
	}

	return spotify.NewAuthenticator(redirectURL, spotify.ScopeUserReadPrivate, spotify.ScopeUserReadEmail, spotify.ScopeUserReadCurrentlyPlaying, spotify.ScopeUserReadRecentlyPlayed, spotify.ScopePlaylistModifyPrivate, spotify.ScopePlaylistModifyPublic, spotify.ScopeUserReadPlaybackState)
}

var state = "testing"

var CookieName = "token"

func Handler(w http.ResponseWriter, r *http.Request) {
	mux := http.NewServeMux()

	w.Header().Add("Access-Control-Allow-Origin", "*")

	mux.HandleFunc("/_/add", addHandler)
	mux.HandleFunc("/_/tracks", tracksHandler)
	mux.HandleFunc("/_/recommendations", recommendationsHandler)
	mux.HandleFunc("/_/auth", authHandler)
	mux.HandleFunc("/_/callback", callbackHandler)

	mux.ServeHTTP(w, r)
}

func addHandler(w http.ResponseWriter, r *http.Request) {
	client, err := getClient(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id := spotify.ID(r.URL.Query().Get("id"))

	state, err := client.PlayerState()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if state.PlaybackContext.Type != "playlist" {
		http.Error(w, "No Current playlist", http.StatusBadRequest)
		return
	}

	uri := state.PlaybackContext.URI
	parts := strings.Split(string(uri), ":")
	plid := spotify.ID(parts[len(parts)-1])

	plts, err := client.GetPlaylistTracks(plid)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for _, t := range plts.Tracks {
		if t.Track.ID == id {
			w.WriteHeader(http.StatusOK)
			return
		}
	}

	_, err = client.AddTracksToPlaylist(plid, spotify.ID(id))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

type RecommendationsResponse struct {
	Recommendations []*spotify.FullTrack `json:"recommendations"`
}

func recommendationsHandler(w http.ResponseWriter, r *http.Request) {
	client, err := getClient(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	country := "from_token"

	id := spotify.ID(r.URL.Query().Get("id"))
	req := spotify.Seeds{Tracks: []spotify.ID{id}}
	if id == "" {
		req = spotify.Seeds{Genres: []string{r.URL.Query().Get("genre")}}
	}

	rec, err := client.GetRecommendations(req, nil, &spotify.Options{Country: &country})
	var ids []spotify.ID
	for _, t := range rec.Tracks {
		ids = append(ids, t.ID)
	}

	res, err := transformTracks(client, ids)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(res)
}

func authHandler(w http.ResponseWriter, r *http.Request) {
	// the redirect URL must be an exact match of a URL you've registered for your application
	// scopes determine which permissions the user is prompted to authorize

	// get the user to this URL - how you do that is up to you
	// you should specify a unique state string to identify the session
	url := getAuth(r).AuthURL(state)
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

	client := getAuth(r).NewClient(token)
	return &client, nil
}

type Track struct {
	Track   *spotify.FullTrack    `json:"track"`
	Album   *spotify.FullAlbum    `json:"album"`
	Artists []*spotify.FullArtist `json:"artists"`
}

type TracksResponse struct {
	Tracks []Track `json:"tracks"`
}

func tracksHandler(w http.ResponseWriter, r *http.Request) {

	client, err := getClient(r)
	if err != nil {
		http.Error(w, "Couldn't get client", http.StatusUnauthorized)
		return
	}

	c, _ := client.PlayerCurrentlyPlaying()
	rs, _ := client.PlayerRecentlyPlayed()

	artistsIds := []spotify.ID{}

	tracks := []*spotify.FullTrack{}
	if c != nil && c.Item != nil {
		for _, a := range c.Item.Artists {
			artistsIds = append(artistsIds, a.ID)
		}
		a := c.Item
		tracks = append(tracks, a)
	}

	trackIDs := []spotify.ID{}
	for _, r := range rs {
		trackIDs = append(trackIDs, r.Track.ID)
		for _, a := range r.Track.Artists {
			artistsIds = append(artistsIds, a.ID)
		}
	}
	ss, _ := client.GetTracks(trackIDs...)
	for _, s := range ss {
		a := s
		tracks = append(tracks, a)
	}

	artists := getArtists(client, tracks)
	albums := getAlbums(client, tracks)

	res := makeTracksResponse(tracks, artists, albums)
	json.NewEncoder(w).Encode(res)
}

func transformTracks(client *spotify.Client, ids []spotify.ID) (res TracksResponse, err error) {
	tracks, err := client.GetTracks(ids...)
	if err != nil {
		return
	}

	artists := getArtists(client, tracks)
	albums := getAlbums(client, tracks)

	return makeTracksResponse(tracks, artists, albums), nil
}

func makeTracksResponse(tracks []*spotify.FullTrack, artists map[spotify.ID]*spotify.FullArtist, albums map[spotify.ID]*spotify.FullAlbum) TracksResponse {
	res := TracksResponse{}

	for _, s := range tracks {
		art := []*spotify.FullArtist{}
		alb := albums[s.Album.ID]

		for _, a := range s.Artists {
			art = append(art, artists[a.ID])
		}

		res.Tracks = append(res.Tracks, Track{
			Track:   s,
			Album:   alb,
			Artists: art,
		})
	}

	return res
}

func getAlbums(client *spotify.Client, tracks []*spotify.FullTrack) map[spotify.ID]*spotify.FullAlbum {
	albums := make(map[spotify.ID]*spotify.FullAlbum)
	albumsIds := []spotify.ID{}
	for _, t := range tracks {
		albumsIds = append(albumsIds, t.Album.ID)
	}

	as, _ := client.GetAlbums(albumsIds...)
	for _, a := range as {
		b := a
		albums[b.ID] = b
	}

	return albums
}

func getArtists(client *spotify.Client, tracks []*spotify.FullTrack) map[spotify.ID]*spotify.FullArtist {
	artists := make(map[spotify.ID]*spotify.FullArtist)
	artistsIds := []spotify.ID{}
	for _, t := range tracks {
		for _, a := range t.Artists {
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
	tok, err := getAuth(r).Token(state, r)
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
