const http = require('http')
const url = require('url')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    const urlObject = url.parse(req.url, true)
    const route = urlObject.pathname
    const queryParameters = urlObject.query

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(route + ' ' + JSON.stringify(queryParameters))
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})