const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json()) //ensina o back a ler json

let produtos = [
    { id: 1, nome: 'Produto 1', preco: 10.00, descricao: 'Descrição do Produto 1' },
    { id: 2, nome: 'Produto 2', preco: 20.00, descricao: 'Descrição do Produto 2' },
    { id: 3, nome: 'Produto 3', preco: 30.00, descricao: 'Descrição do Produto 3' }
]

app.post('/produtos', (req, res) => {
  let novoProduto = req.body
  produtos.push(novoProduto)
  res.json({
    success: true
  })
})

app.get('/produtos', (req, res) => {
    res.json(produtos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
