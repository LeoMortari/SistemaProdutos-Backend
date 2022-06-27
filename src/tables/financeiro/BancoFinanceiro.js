
class BancoFinanceiro{
    // construtor de Tabela
    init(connection){
        this.connection = connection
        this.criarFinanceiro()
        
    }



    
    criarFinanceiro(){
        let sql = 'CREATE TABLE IF NOT EXISTS financeiro'+
        '(id_financeiro_pk INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'+
        'ValorVenda int,'+
        'ValorPedido int,'+
        'ValorLucro int)'
         
        //ADD para tabela vendas 'id_venda_fk INT'+
        //'FOREIGN KEY (id_venda_fk) REFERENCES LOGIN (id_venda_pk))'
        
        this.connection.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else{
                console.log('Tabela finaceiro criada com sucesso!')
            }

        })
    }
    

    

    
  }
    module.exports = new BancoFinanceiro