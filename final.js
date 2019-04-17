const http = require('http')
const url = require('url')

const hostname = '127.0.0.1'
const port = 3000

const todos = []

const router = {    
    '/': getAll,
    '/get': get,
    '/add': add,
    '/update': update,
    '/remove': remove
}

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
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result))
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

function getAll() {
    return todos
}

function get({id}) {
    return todos[id]
}

function add({description, done = false}) {
    const index = todos.length
    const todo = {index, description, done}
    todos.push(todo)
    return todo
}   

function update({id, description, done}) {
    let todo = todos[id]
    if (description) {
        todo.description = description
    }
    if (done != todo.done) {
        todo.done = done
    }
    todos[id] = todo
    return todo
}

function remove({id}) {
    todos[id] = null
}