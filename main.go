package main

import (
	"fmt"
	"html/template"
	"log"
	"lptmpl/logger"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/", index)
	router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir("./dist/"))))

	log.Println("start server :8080")
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}

type Data struct {
	Meta
}

type Meta struct {
	Title       string
	Desc        string
	Image       string
	Favicon     string
	URL         string
	TwitterName string
}

var siteMeta = Meta{
	Title:       os.Getenv("SITE_TITLE"),
	Desc:        os.Getenv("SITE_DESC"),
	URL:         os.Getenv("SITE_URL"),
	Favicon:     os.Getenv("SITE_FAVICON"),
	Image:       os.Getenv("SITE_IMAGE"),
	TwitterName: os.Getenv("SITE_TWITTER_NAME"),
}

func index(w http.ResponseWriter, r *http.Request) {
	tpl, err := template.ParseFiles(
		"tpls/index.html.tpl",
		"tpls/_main.html.tpl",
		"tpls/_header.html.tpl",
		"tpls/_footer.html.tpl",
	)
	if err != nil {
		logger.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "500 Internal Server Error")
		return
	}

	data := Data{Meta: siteMeta}

	if err := tpl.Execute(w, data); err != nil {
		logger.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "500 Internal Server Error")
		return
	}
}
