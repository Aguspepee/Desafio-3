const express = require('express')
const productManager = require('./productManager.js')
const app = express()
const port = 3000

const products = new productManager('./products1.json')

app.get('/', (req, res) => {
  res.send('Products API!')
})

app.get('/products', (req, res) => {
  try {
    let data = products.getProducts()
    let limit = req.query.limit
    data = limit ? data.slice(0, limit) : data
    res.send(data)
  } catch (e) {
    console.log(e)
    res.send(e)
  }

})

app.get('/products/:pid', (req, res) => {
  let pid = req.params.pid
  try {
    let product = products.getProductById(Number(pid))
    res.send(product)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})