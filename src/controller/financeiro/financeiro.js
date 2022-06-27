
import  connection from '../../database/connection'

import financeiro from '../../tables/financeiro/financeiros'

module.exports = app => {
   

app.post('/financeiro/adcionar', (req,res)=>{
   
    financeiro.adicionaNovoFinanceiro(req,res)
})

app.get("/financeiros",(req,res)=>{
    
    financeiro.SelectFinsnceiro(res)
})

app.get("/estoque", (req,res)=>{
    financeiro.selectProdutos(res)
})


app.get("/vendas/:id",(req,res)=>{
let id = parseInt(req.params.id)
   financeiro.selectLista(res,id)
})


app.get("/BuscarId/:id", (req,res)=>{
    let id =parseInt(req.params.id)
    financeiro.SelectFinsnceiroID(res,id)
})

app.patch("/financeiro/editar/:id" , (req, res) =>{
    let valores = req.body;
    let id =parseInt(req.params.id)
    financeiro.editarFinanceiro(id,valores,res)
})


}
