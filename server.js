const express  = require('express')
const cors = require('cors')
const { default: axios } = require('axios')

const server = express()

server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.send('server is running')
})

server.post('/', async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.body.url)
        const {data} = await axios.post(req.body.url, {
            email: req.body.email,
            password: req.body.password
        })
        res.send(data)    
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
    }
    
})

server.listen(8000, () => console.log(`Server is running on 8000`))