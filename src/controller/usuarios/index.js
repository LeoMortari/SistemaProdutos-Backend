import Usuarios from "../../tables/usuarios/index";


module.exports = app => {

  app.post("/usuarios", (req, res) => {
    //Retira os valores da request
    let {
      body: { nome, cpf, email, senha, telefone, cep, logradouro, bairro, numero, uf, cidade, ibge },
    } = req;

    try {
      //Valida os dados
      if (!nome || !cpf || !email || !senha || !telefone || !cep || !logradouro || !bairro || !numero || !uf || !cidade || !ibge) {
        throw new Error("Todos os campos devem ser preenchidos");
      }
    } catch (e) {
      return res.status(400).send(e.message);
    }
        let val = {
        nome,
        cpf,
        email,
        senha,
        telefone,
        cep,
        logradouro,
        bairro,
        numero,
        uf,
        cidade,
        ibge,
      };
  
      Usuarios.CadastrarUsuario(res, val);
    })

    app.get('/usuarios',(req, res) =>{
    Usuarios.ListarUsuario(res)
    })

    
     app.patch('/usuarios/:id',(req, res) =>{      
        let id = parseInt(req.params.id)
        let dados = req.body
        Usuarios.EditarUsuarios(id, dados, res)
    })

    app.get('/usuarios/:id',(req, res) => {
      let id = parseInt(req.params.id)
      Usuarios.buscarUsuarioPorId(id, res)
   })


   
    app.post("/usuarios/listar", (req, res) => {
      let email = req.body.email
      let senha = req.body.senha
      Usuarios.VerificaLogin(email, senha, res)
  
      })
    
   

  };


