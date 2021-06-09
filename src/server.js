const express = require("express"); 
const server = express();
const routes = require("./routes")
const path = require("path")

//usando template engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta "views" do padrão para "/src/views"
server.set('views', path.join(__dirname, 'views'))

// habilitar arquivos estáticos
server.use(express.static("public"))

// usar o req.body
server.use(express.urlencoded({ extended: true }))

// rotas
server.use(routes)

server.listen(process.env.PORT || 3000)