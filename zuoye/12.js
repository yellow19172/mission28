var http = require('http')//创建服务器
var path = require('path')//自动识别url
var fs = require('fs')//读写文件
var url = require('url')//自动解析url

var server = http.createServer(function(req,res){

   var pathObj = url.parse(req.url,true)

   switch (pathObj.pathname) {
       case'/loadMore' :
           var curIdx = pathObj.query.idx
           var len = pathObj.query.len
           var data = []

           for (i = 0; i < len; i++) {
               data.push('新闻' + (parseInt(curIdx) + i))
           }
           res.write(JSON.stringify(data))
           res.end()
           break
       default:
           fs.readFile(path.join(__dirname, 'abc', pathObj.pathname), function (err, data) {
               if (err) {
                   res.statusCode = 404
                   res.write('not found')
                   res.end()
               }
               else {
                   res.write(data)
                   res.end()
               }
           })
   }
})

server.listen(9000)

