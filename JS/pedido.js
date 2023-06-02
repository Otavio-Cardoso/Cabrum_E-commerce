let cpf = document.getElementById("cpf");

cpf = addEventListener("change", function () {auto_completar();});

window.addEventListener("DOMContentLoaded", function () {
  exibirPedidos();
});

// Função para completar os oustro inputs text caso tenha um cpf no local storage
function auto_completar() {
  if (cpf.value === cpf_localStorage) {
     
  }
}

// Função para exibir os pedidos na página de pedidos
function exibirPedidos() {
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  let listaPedidos = document.getElementById("lista-pedidos");

  if (pedidos.length === 0) {
    listaPedidos.innerHTML = "<li>Nenhum pedido realizado.</li>";
  } else {
    listaPedidos.innerHTML = "";
    for (let i = 0; i < pedidos.length; i++) {
      let pedido = pedidos[i];

      let itemPedido = document.createElement("li");
      itemPedido.textContent = `Pedido #${pedido.id}: Total R$${pedido.total.toFixed(2)}`;
      listaPedidos.appendChild(itemPedido);
    }
  }
}

function zerarPedidos() {
  localStorage.removeItem("pedidos");
  exibirPedidos();
}

function finalizarCompra() {
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

    // Armazenar o pedido no localStorage
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // Limpar o carrinho
    localStorage.removeItem("carrinho");

    // Redirecionar para a página de pedidos
    window.location.href = "pedidos.html";
  }
}
let clientes = [cliente1: {
                  infos: {
                    cpf:,
                    nome:,
                    email:}
                  pedidos: {
                    p_id: {
                      itens:[],  
                      total: 
                    }
                  }
                }, 
                cliente2: 
]
