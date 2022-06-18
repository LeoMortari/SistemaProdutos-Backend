//Imports
const res = require('express');
import connection from "../../database/connection";

//Constantes
const ERROR_DATABASE = { error: "Falha na comunicação com o Banco de Dados" };

//Funções externas
const error = (res) => res.status(400).send(ERROR_DATABASE);

class Vendas{

    init(){
        this.CriarTabelaVenda();
    }

    //Criaç]ao da tabela venda caso não tenha
    CriarTabelaVenda(){
        let sql = 'CREATE TABLE IF NOT EXISTS venda'+
        '(id_venda_pk INT NOT NULL AUTO_INCREMENT,'+
        'id_usuario_fk INT,'+
        'id_pedido_fk INT,'+
        'PRIMARY KEY (id_venda_pk), '+
        'FOREIGN KEY (id_usuario_fk) REFERENCES usuario(id_usuario_pk),'+
        'FOREIGN KEY (id_pedido_fk) REFERENCES pedido(id_pk))';
        connection.query(sql);
    }

    //Métodos de classe

    CadastrarVenda(res,venda){
        let values = Object.values(venda);
        let sql = `INSERT INTO venda(id_usuario_fk,id_pedido_fk) VALUES (${values.join(
            ','
        )})`
        connection.query(sql,(err, result) =>{
            if(err){
                error(res);
            }else{
            res.status(200).send();
            }
        })
    }

    ConsultaGeralVendas(res){
        let sql = 'SELECT v.id_venda_pk, u.nome as "vendedor", p.* ' +
        'FROM venda v ' +
        'INNER JOIN (pedido p, usuario u) '+
        'ON v.id_pedido_fk = p.id_pk '+
        'AND u.id_usuario_pk = v.id_usuario_fk';
        connection.query(sql,(err,result) =>{
            if(err){
                error(res);
            }
            res.status(200).send(result);
        })
    }

    BuscaVendaPorId(res,id){
        let sql = 'SELECT v.id_venda_pk, u.nome as "vendedor", p.* ' +
        'FROM venda v ' +
        'INNER JOIN (pedido p, usuario u) '+
        'ON v.id_pedido_fk = p.id_pk '+
        'AND u.id_usuario_pk = v.id_usuario_fk '+
        `WHERE id_venda_pk = ${id}`;
        connection.query(sql,(err, result) =>{
            if(err){
                error(res);
            }
            res.status(200).send(result);
        })
    }

    ValorTotalVendas(res){
        let sql = 'SELECT SUM(p.valor) as "valorTotal" FROM venda v '+  
        'JOIN pedido p '+
        'ON v.id_pedido_fk = p.id_pk';
        connection.query(sql,(err, result) =>{
            if(err){
                error(res);
            }
            res.status(200).send(result);
        })
    }

    EditarVenda(id, venda, res){
        let sql = 'UPDATE venda SET ?' + 
        `WHERE id_venda_pk = ${id}`;
        connection.query(sql, venda, (err, result) => {
            if(err){
                error(res);
            }
            res.status(200).send(result);
          });
    }
}

export default new Vendas();