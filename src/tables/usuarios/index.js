//Imports
import connection from "../../database/connection";

const ERROR_DATABASE = { error: "Falha na comunicação com o Banco de Dados" };

//Funções externas
const error = (res) => res.status(400).send(ERROR_DATABASE);

class Usuarios {
  //Inicialização da Classe
  init() {
    this.CriarUsuario();
  }

  //Criação da tabela, caso não tenha
  CriarUsuario() {
    let sql =
    "CREATE TABLE IF NOT EXISTS usuario" + 
    "(id_usuario_pk INT NOT NULL AUTO_INCREMENT PRIMARY KEY," + 
    "nome VARCHAR(100) NOT NULL," +
    "cpf VARCHAR(11) NOT NULL," + 
    "email VARCHAR(100) NOT NULL," +
    "senha VARCHAR(8) NOT NULL," +
    "telefone VARCHAR(15) NOT NULL," +
    "cep int(100) NOT NULL," +
    "logradouro VARCHAR(100) NOT NULL," +
    "bairro VARCHAR(100) NOT NULL," +
    "numero int(100) NOT NULL," +
    "uf VARCHAR(2) NOT NULL," +
    "cidade VARCHAR(100) NOT NULL," +
    "ibge VARCHAR(200) NOT NULL)";
    connection.query(sql, error => {
      if(error){
          console.log(error)
      }else{
          console.log('Tabela USUÁRIO criada com sucesso!')
      }

  })
  }

  
  CadastrarUsuario(res, usuario){
  let sql = `INSERT INTO usuario SET?`;
  connection.query(sql, usuario,(error, result)=>{
     if(error){
         console.log(error)
     }else{
         res.send(result)
     }
  })
  }

  
  ListarUsuario(res){
    let sql = 'SELECT * FROM usuario'
    connection.query(sql, (error, result)=>{
     if(error){
         res.status(400).json(error)
     }else{
         res.status(200).json(result)
     }
    })
  }

  EditarUsuarios(id, usuario, res){
      let sql = 'UPDATE usuario SET ?' + 
      `WHERE id_usuario_pk = ${id}`;
      connection.query(sql, usuario, (error) => {
          if(error){
              error(res);
          }
          res.status(200).send();
        });
  }

  buscarUsuarioPorId(id_usuario_pk, res){
  let sql = 'SELECT * FROM usuario' + 
  ` WHERE id_usuario_pk = ${id_usuario_pk}`;
    connection.query(sql, id_usuario_pk, (error, result)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(result)
        }
    
  })
  }

    VerificaLogin( email, senha, res){
      let sql = 'SELECT * FROM usuario ' + `WHERE email = '${email}' AND senha = '${senha}'`;
      console.log(sql);
      connection.query(sql, (error, result) =>{
      if (error)
        return console.log("erro no login " + error);
        result.length  == 0 ? res.status(400).send("0") : res.status(200).send(String(result.length))
      })
      }

}
export default new Usuarios();