package StructConfig

// import(
// 	jwt "github.com/dgrijalva/jwt-go"
//
//   //"time"
//   //"gopkg.in/mgo.v2/bson"
// )

type ArgumentList struct {
	Function string `json:"function" bson:"function"`
	Arguments string `json:"arguments" bson:"arguments"`
}

type SingleResponse struct {
	Response string `json:"response"`
	ErrInResponse string `json:"errInResponse"`
}
type Inquiry struct {
	Id string `json:"_id" bson:"_id"`
	Name string `json:"name" bson:"name"`
	Email string `json:"email" bson:"email"`
	Comments string `json:"comments" bson:"comments"`
}
