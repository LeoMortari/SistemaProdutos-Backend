
import connection from "../../database/connection";


class financeiro {
  adiciona(financeiro) {
    let sql = "INSERT INTO financeiro SET ?";
    query(sql, financeiro, (erro, resultado) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log(resultado);
      }
    });
  }

  adicionaNovoFinanceiro(req, res) {
    let sql = `INSERT INTO financeiro (id_venda_fk, ValorVenda, ValorPedido, ValorLucro) 
    VALUES ('${req.body.id_venda_fk}', ${parseInt(req.body.ValorVenda)}, ${parseInt(req.body.ValorPedido)}, ${req.body.ValorLucro})`;

    connection.query(sql, (err) => {

      if (err) {
        res.send('erro')
      }

      res.status(200).send();
    });
  }


  SelectFinsnceiro(res) {
    let sql = "SELECT * FROM financeiro order by id_financeiro_pk desc";


    connection.query(sql, (err, result) => {
      if (err) {
        res.send('erro')
      }
      res.status(200).send(result)
    });
  }


  selectProdutos(res) {
    let sql = "SELECT * FROM estoque"

    connection.query(sql, (err, result) => {
      if (err) {
        res.send('erro')
      }
      res.status(200).send(result)
    });

  }

selectLista(res,id){
  let sql = "select p.valor, p.produtos from venda v "+ 
  "INNER JOIN pedido p "+ 
  "ON v.id_pedido_fk = p.id_pk "+ 
  ` WHERE id_venda_pk = ${id};`

  connection.query(sql, (err, result) => {
    if (err) {
      res.send('erro')
    }
    console.log('Result: ', result)
    res.status(200).send(result)
  });
}


SelectFinsnceiroID(res,id){
  
let sql = `SELECT * FROM financeiro where id_financeiro_pk = ${id}`


connection.query(sql, (err, result) => {
  if (err) {
    res.send('erro')
  }
  res.status(200).send(result)
});
}



  editarFinanceiro(id, financeiro, res){
    let sql = 'UPDATE financeiro SET ?' + 
    `WHERE id_financeiro_pk = ${id}`;
    connection.query(sql,financeiro, (err, result) => {
        if(err){
          res.send(err)
        }
        res.status(200).send(result);
      });
}

}
export default new financeiro();
