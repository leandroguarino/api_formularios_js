const express = require('express')
const app = express()
const port = 3000

let produtos = [
    { id: 1, nome: 'Produto 1', preco: 10.00, descricao: 'Descrição do Produto 1' },
    { id: 2, nome: 'Produto 2', preco: 20.00, descricao: 'Descrição do Produto 2' },
    { id: 3, nome: 'Produto 3', preco: 30.00, descricao: 'Descrição do Produto 3' }
]

app.post('/clientes', (req, res) => {

})

app.get('/clientes', (req, res) => {
    res.json(produtos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
