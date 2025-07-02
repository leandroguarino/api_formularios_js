const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json()) //ensina o back a ler json

let pedidos = [] //banco de dados fake de pedidos

let produtos = [
    { id: 1, nome: 'Produto 1', preco: 10.00, descricao: 'Descrição do Produto 1' },
    { id: 2, nome: 'Produto 2', preco: 20.00, descricao: 'Descrição do Produto 2' },
    { id: 3, nome: 'Produto 3', preco: 30.00, descricao: 'Descrição do Produto 3' }
]

function getProximoId() {
  if (pedidos.length > 0){
    //pega o último produto do vetor
    let ultimoPedido = pedidos[pedidos.length - 1]
    //pega o id do último produto do vetor
    let maxId = ultimoPedido.id
    return maxId+1
  }else{
    return 1 //quando não há nenhum produto, retorna 1, o primeiro ID
  }
}

function buscarProduto(idProduto){
  for(let contador=0; contador < produtos.length; contador++){
    let produto = produtos[contador]
    if (produto.id == idProduto){
      return produto //retorna o objeto encontrado no banco de dados fake
    }
  }
  return null //se não encontrar o ID, retorna null
}

app.post('/pedidos', (req, res) => {
  let novoPedido = req.body
  novoPedido.id = getProximoId()
  novoPedido.dataHora = new Date()

  //passa pelos itens do pedido "transformando" o ID do produto em Objeto
  for(let contador = 0; contador < novoPedido.itens.length; contador++){
    let item = novoPedido.itens[contador]
    let idProduto = item.produto
    let objetoProduto = buscarProduto(idProduto) //"transforma" o ID em Objeto
    //altera a propriedade produto do item para o objeto
    novoPedido.itens[contador].produto = objetoProduto
  }
  
  pedidos.push(novoPedido)
  res.json({
    success: true
  })
})

app.get("/pedidos", (req, res) => {
  res.json(pedidos)
})

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

//:id é um parâmetro da URL
app.delete("/produtos/:id", (req, res) => {
  let id = req.params.id
  //busca o produto no vetor para excluir
  for(let contador = 0; contador <= produtos.length - 1; contador++){
    let produto = produtos[contador]
    if (produto.id == id){ //se encontrou o produto buscado
      produtos.splice(contador, 1) //remove o elemento do vetor
      break
    }
  }
  res.json({
    success: true
  })
})

app.put('/produtos/:id', (req, res) => {
  let idAlterado = req.params.id
  let nome = req.body.nome
  let preco = req.body.preco
  let descricao = req.body.descricao
  //procura o produto no vetor e altera-o
  for(let contador = 0; contador <= produtos.length - 1; contador++){
    let produto = produtos[contador]
    if (produto.id == idAlterado){
      produto.nome = nome
      produto.preco = preco
      produto.descricao = descricao
      break //depois de alterar o produto, nao precisa buscar
    }
  }
  res.json({
    success: true
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
