var app = require("./app")

var port = process.env.EXPRESS_PORT || 8080
var ip = "0.0.0.0"

console.info("正在启动 server")

app.listen(port, ip, function(err) {
  if (err) {
    console.error(err);
    return
  }
  console.info("==> 🌎 启动完毕, 地址为: http://0.0.0.0:%s/", port)
})
