let produtos = [
  { id: 0, image: "<img src=\"../images/fone_bluetooth.png\" width=\"100\"/>", produto: "Fone TWS Denovo", descricao: "Fone Bluetooth TWS, com certificação IPX8", preco: 159.90, qtde: 10 },
  { id: 1, image: "<img src=\"../images/carregador_portatil.webp\" width=\"100\"/>", produto: "PowerBank tuVerde", descricao: "Power Bank de 12.000mAh, com entrada USB-C e 2 entradas USB-A", preco: 99.90, qtde: 15 },
  { id: 2, image: "../images/caixa_som.png", produto: "Caixa de Som Bluetooth", descricao: "Caixa de som portátil com conectividade Bluetooth", preco: 199.90, qtde: 5 },
  { id: 3, image: "../images/camera_ip.png", produto: "Câmera IP", descricao: "Câmera de segurança IP com resolução HD", preco: 129.90, qtde: 8 }
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderizarCarrinho() {
  let carrinhoElement = document.getElementById("itens-carrinho");
  let totalElement = document.getElementById("total");
  let total = 0;

  if (carrinhoElement) {
    carrinhoElement.innerHTML = "";

    if (carrinho.length === 0) {
      carrinhoElement.innerHTML = "<li>Nenhum item no carrinho.</li>";
    } else {
      for (let i = 0; i < carrinho.length; i++) {
        let item = carrinho[i];

        let itemElement = document.createElement("li");
        itemElement.innerHTML = `${item.produto} - R$${(item.preco_unit * item.quantidade).toFixed(2)} x ${item.quantidade}`;
        carrinhoElement.appendChild(itemElement);

        total += item.preco_unit * item.quantidade;
      }
    }
  } else {
    console.error("Elemento 'itens-carrinho' não encontrado.");
  }

  if (totalElement) {
    totalElement.innerHTML = `Total: R$${total.toFixed(2)}`;
  } else {
    console.error("Elemento 'total' não encontrado.");
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


function adicionarCarrinho(id) {
  let idProd = parseInt(id);
  let produto = produtos.find(p => p.id === idProd);

  if (produto) {
    let itemCarrinho = carrinho.find(item => item.id === idProd);

    if (itemCarrinho) {
      itemCarrinho.quantidade++;
      itemCarrinho.preco_tot = itemCarrinho.preco_unit * itemCarrinho.quantidade;
    } else {
      itemCarrinho = {
        id: produto.id,
        produto: produto.produto,
        preco_unit: produto.preco,
        quantidade: 1,
        preco_tot: produto.preco
      };
      carrinho.push(itemCarrinho);
    }

    renderizarCarrinho();
  }
}

function removerCarrinho(id) {
  let idProd = parseInt(id);
  let itemCarrinho = carrinho.find(item => item.id === idProd);

  if (itemCarrinho) {
    itemCarrinho.quantidade--;

    if (itemCarrinho.quantidade === 0) {
      carrinho = carrinho.filter(item => item.id !== idProd);
    }

    renderizarCarrinho();
  }
}

function limparCarrinho() {
  carrinho = [];
  renderizarCarrinho();
}

window.addEventListener("DOMContentLoaded", function () {
  renderizarCarrinho();
});

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

// Função para finalizar a compra e adicionar o pedido
function finalizarCompra() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = 0;

  // Calcular o total da compra
  for (let i = 0; i < carrinho.length; i++) {
    let item = carrinho[i];
    total += item.preco_unit * item.quantidade;
  }

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

// Outras funções do carrinho...

// Event Listener quando a página for carregada
window.addEventListener("DOMContentLoaded", function() {
  renderizarCarrinho();
  exibirPedidos();
});

function zerarPedidos() {
  localStorage.removeItem("pedidos");
  exibirPedidos();
}
