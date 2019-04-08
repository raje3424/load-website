package Mongoose

import(
  "fmt"
  "net/http"
  "time"
  "gopkg.in/mgo.v2"
  "encoding/json"
  "packages/StructConfig"
  "gopkg.in/mgo.v2/bson"
)

var sess *mgo.Session
var collection *mgo.Collection
var sessUValName string

var funcMap = map[string]interface{}{
	"Hello": Hello,
  "PutInqueryFun":PutInqueryFun,
}

func Caller(argumentList StructConfig.ArgumentList,w http.ResponseWriter, r *http.Request){
  fmt.Println("\n====================================================== "+argumentList.Function+" :- ",time.Now().Format("Jan _2 15:04:05"))
  funcMap[argumentList.Function].(func(http.ResponseWriter,*http.Request,string))(w,r,argumentList.Arguments)
}

func responder(w http.ResponseWriter,result interface{}){
  //fmt.Println("Response : ",result)
  w.WriteHeader(http.StatusOK)
  buff, _ := json.Marshal(result)
  w.Write(buff)
}

func setCollection(dbName string, collectionName string) *mgo.Collection {
	if sess == nil {
		fmt.Println("Not connected... Connecting to Mongo")
		sess = GetConnected()
	}
	collection = sess.DB(dbName).C(collectionName)
	return collection
}

func GetConnected() *mgo.Session {
	dialInfo, err := mgo.ParseURL("mongodb://localhost:27017")
	dialInfo.Direct = true
	dialInfo.FailFast = true
	dialInfo.Database = "load_db"
	dialInfo.Username = "root"
	dialInfo.Password = "tiger"
	sess, err := mgo.DialWithInfo(dialInfo)
	if err != nil {
		fmt.Println("Can't connect to mongo, go error %v\n", err)
		panic(err)
	} else {
		return sess
		defer sess.Close()
	}
	return sess
}


func Hello(w http.ResponseWriter, r *http.Request,interfaceName string){
  collection = setCollection("load_db", "inquiry_collection")
  fmt.Println(collection)
  fmt.Println("In hello")
  responder(w,[]StructConfig.SingleResponse{StructConfig.SingleResponse{Response:"true",ErrInResponse:""}})
}

func PutInqueryFun(w http.ResponseWriter, r *http.Request,interfaceName string) {
  collection = setCollection("load_db","inquiry_collection")
  inquiryStruct := &StructConfig.Inquiry{Id:bson.ObjectId(bson.NewObjectId()).Hex(),Name:"prashant",Email:"prashantingle412@gmail.com",Comments:"Hello"}
  insertErr := collection.Insert(inquiryStruct)
  if insertErr != nil {
    fmt.Println("Error while inserting Form Details : ",insertErr)
    responder(w,[]StructConfig.SingleResponse{StructConfig.SingleResponse{Response:"false",ErrInResponse:"Error while inserting Hotel"}})
  } else {
    fmt.Println("Inquiry submitted successfully !!!")
    responder(w,[]StructConfig.SingleResponse{StructConfig.SingleResponse{Response:"true",ErrInResponse:""}})
  }
}
