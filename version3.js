const http = require('http')
const url = require('url')

const hostname = '127.0.0.1'
const port = 3000

const router = {
    '/': getAll,
    '/get': get,
    '/add': add,
    '/update': update,
    '/remove': remove
}

const todos = [] 

const server = http.createServer((req, res) => {
    const urlObject = url.parse(req.url, true)
    const route = urlObject.pathname
    const routeMatch = router[route]
    const queryParameters = urlObject.query

    if (!routeMatch) {
        res.writeHead(404)
        return res.end()
    }

    const result = routeMatch(queryParameters)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application / json')
    res.end(JSON.stringify(result))
})

function add({ description, done = false }) {
    const todo = { description, done }  
    const newLength = todos.push(todo)
    const index = newLength - 1
    return { index, ...todo }
}

function getAll() {}

function get() {}

function update() {}

function remove() {}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})