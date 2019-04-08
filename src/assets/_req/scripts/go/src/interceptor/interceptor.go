package main

import (
	"encoding/json"
	"fmt"
	//"os"
	"net/http"
	"packages/Mongoose"
	"packages/StructConfig"
)

func setOrigin(w http.ResponseWriter, r *http.Request){

	if origin := r.Header.Get("Origin"); origin != "" {
		fmt.Println("Origin : ",origin)
		//fmt.Println("Auth : ",r.Header.Get("Authorization"))
		w.Header().Set("Access-Control-Allow-Origin", /*"http://localhost:7888"*/origin)
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers",/*"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"*/"Content-Type, Authorization")
		w.Header().Set("Content-Type", "application/json")

		//for file uploading
		r.ParseMultipartForm(32 << 20)
		r.ParseForm()
		argumentList := StructConfig.ArgumentList{Function:r.FormValue("function"),Arguments:r.FormValue("args")}
		Mongoose.Caller(argumentList,w,r)
		//fmt.Fprintln(w,Mongoose.Caller(r.FormValue("function")));
	}else{
		fmt.Println("Origin empty hai")
	}
}
func main() {
	fmt.Println("Environment set,now u can communicate with Load server !!!")
	http.HandleFunc("/",setOrigin)
	http.ListenAndServe(":4447",/*context.ClearHandler(http.DefaultServeMux*/nil)
}
