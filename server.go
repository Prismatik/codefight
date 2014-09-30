package main

import (
  "net/http"
  "log"
  "os"
  "io/ioutil"
  "encoding/json"
)

func handleErr(target string, result []byte, cb chan<- string) {
  type Social struct {
    Name, Username string
    Picture, Status, Tweet string
  }
  var socials []Social
  err := json.Unmarshal(result, &socials)
  if err != nil{
    cb <- "\""+target+"\": \"error\""
  }
}

func fetch(target string, cb chan<- string) {
  resp, err := http.Get("http://codefight.davidbanham.com/"+target)
  if err != nil { cb <- "\""+target+"\": \"error\"" }

  result, err := ioutil.ReadAll(resp.Body)
  if err != nil { cb <- "\""+target+"\": \"error\"" }

  handleErr(target, result, cb)
  cb <- "\""+target+"\": " + string(result)
}

func main() {

  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    services := []string{"twitter", "facebook", "instagram"}
    target := len(services)

    var counter = 0
    for i := range services {
      result := make(chan string)
      go fetch(services[i], result)

      msg := <-result

      counter++

      switch {
        case counter >= target:
          w.Write([]byte(msg + "}\n"))
        case counter == 1:
          w.Write([]byte("{" + msg + ",\n"))
        default:
          w.Write([]byte(msg+",\n"))

        w.(http.Flusher).Flush()

      }
    }
  })

  log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), nil))
}
