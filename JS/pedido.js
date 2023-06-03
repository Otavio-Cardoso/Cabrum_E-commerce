let txt_cpf = document.getElementById("cpf");
txt_cpf.addEventListener("change", function () {auto_completar();});

let txt_nome = document.getElementById("nome");
let txt_email = document.getElementById("email");
let txt_cep = document.getElementById("cep");
let txt_logradouro = document.getElementById("logradouro");
let txt_numero = document.getElementById("numero");
let txt_bairro = document.getElementById("bairro");
let txt_cidade = document.getElementById("cidade");
let txt_estado = document.getElementById("estado");

let bt_finalizar = document.getElementById("btn_finalizar");

bt_finalizar.addEventListener("click", function() {finalizarCompra();});

// Função para completar os oustro inputs text caso tenha um cpf no local storage
function auto_completar() {
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].pessoa.cpf == txt_cpf.value) {
      txt_nome.value = clientes[i].pessoa.nome; 
      txt_email.value = clientes[i].pessoa.email;
      txt_cep.value = clientes[i].pessoa.cep;
      txt_logradouro.value = clientes[i].pessoa.logradouro;
      txt_numero.value = clientes[i].pessoa.numero;
      txt_bairro.value = clientes[i].pessoa.bairro;
      txt_cidade.value = clientes[i].pessoa.cidade;
      txt_estado.value = clientes[i].pessoa.estado;
    }
  }
}

function finalizarCompra() {
  let infos_pessoas = {
    cpf: txt_cpf.value, nome: txt_nome.value, email: txt_email.value,
    cep: txt_cep.value, logradouro: txt_logradouro.value, numero: txt_numero.value,
    bairro: txt_bairro.value, cidade: txt_cidade.value, estado: txt_estado.value
  };

  if ((infos_pessoas.cpf === "") || (infos_pessoas.nome === "") || (infos_pessoas.email === "") || (infos_pessoas.cep === "") || (infos_pessoas.logradouro === "") 
    || (infos_pessoas.numero === "") || (infos_pessoas.bairro === "") || (infos_pessoas.cidade === "") || (infos_pessoas.estado === "")) {
    alert("Dados não preenchidos completamente");
  } else {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let total = 0;

    // Calcular o total da compra
    for (let i = 0; i < carrinho.length; i++) {
      let item = carrinho[i];
      total += item.preco_unit * item.quantidade;
    } 
  
    if (total == 0) {
      alert("Impossível finalizar o pedido com o carrinho vazio.");
    } else {
      // Gerar um ID único para o pedido
      let pedidoId = new Date().getTime();

      // Criar o objeto do pedido
      let pedido = {
        id: pedidoId,
        total: total,
        itens: carrinho
      };
    
      let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
      
      clientes.push({pessoa: infos_pessoas, compra: pedido});
      
      localStorage.setItem("clientes", JSON.stringify(clientes));

      // Limpar o carrinho
      localStorage.removeItem("carrinho");

      // Redirecionar para a página de pedidos
      window.location.href = "../HTML/pag_inicial.html";
    }
  }
}
