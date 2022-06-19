
import  connection from '../../database/connection'
import financeiro from '../../tables/financeiro/financeiros'

module.exports = app => {
   

app.post('/financeiro/adcionar', (req,res)=>{
   
    financeiro.adicionaNovoFinanceiro(req,res)
})




}
