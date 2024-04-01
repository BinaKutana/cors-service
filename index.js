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
server.post("/getCode",async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.body.url)
        const {data} = await axios.post(req.body.url, {
            origin: req.body.origin,
            destination: req.body.destination,
            payment_type: req.body.payment_type,
            order_amount: req.body.order_amount,
            weight: req.body.weight,
            length: req.body.length,
            breadth: req.body.breadth,
            height: req.body.height
        },{
            headers: {
                Authorization: `Bearer ${req.body.token}`
            }
        })
        res.send(data)    
    } catch (error) {
        console.log(error)
    }
})

server.post("/proxy",async(req,res)=>{
    try {
        const headers = req.headers
        const body = req.body
        const {data} = await axios.[req.body.method](req.body.url, {...body}, {headers})
        res.status(200).json(data)    
    } catch (error) {
        res.status(500).json(error)
    }
})

server.listen(8000, () => console.log(`Server is running on 8000`))
