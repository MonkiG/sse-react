import express from 'express'
import cors from 'cors'

const app = express()

const adminClients = new Set()

app.use(cors({
    origin: [process.env.ALLOWED_ORIGIN]
}))
app.use(express.json())

app.get('/', (req, res) => {
    return res.send('<h1>Hola mundo</h1>')
})

app.get('/sells', (req, res) => {
    console.log(req.headers)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    console.info('User connected')
    adminClients.add(res)

    res.on('close', () => {
        console.log('Connection closed')
       adminClients.delete(res)
    })
})

app.post('/buy', (req, res) => {
  const product = req.body
  console.log(product)
  /*
  * Aqui se debe hacer la logica de la compra (supongo xD) 
  */
  adminClients.forEach(client => client.write(`data: ${JSON.stringify(product)}\n\n`))
  console.info('Enviado') 
  return res.status(204).send()
})

app.listen(3000, () => {
    console.log('Escuchando en puerto 3000')
})