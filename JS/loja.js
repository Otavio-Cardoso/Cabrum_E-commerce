let produtos = [
  { id: 0, image: "<img src=\"../images/fone_bluetooth.png\" width=\"100\"/>", produto: "Fone TWS Denovo", descricao: "Fone Bluetooth TWS, com certificação IPX8", preco: 159.90, qtde: 10 },
  { id: 1, image: "<img src=\"../images/carregador_portatil.webp\" width=\"100\"/>", produto: "PowerBank tuVerde", descricao: "Power Bank de 12.000mAh, com entrada USB-C e 2 entradas USB-A", preco: 99.90, qtde: 15 }
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function renderizarCarrinho() {
  let carrinhoElement = document.getElementById("itens-carrinho");
  let totalElement = document.getElementById("total");
  let total = 0;

  if (!carrinhoElement) {
    console.error("Elemento 'itens-carrinho' não encontrado.");
    return;
  }

  carrinhoElement.innerHTML = "";

  if (carrinho.length === 0) {
    carrinhoElement.innerHTML = "<li>Nenhum item no carrinho.</li>";
  } else {
    for (let i = 0; i < carrinho.length; i++) {
      let item = carrinho[i];

      let itemElement = document.createElement("li");
      itemElement.innerHTML = `${item.produto} - R$${item.preco_unit.toFixed(2)} x ${item.quantidade}`;
      carrinhoElement.appendChild(itemElement);

      total += item.preco_unit * item.quantidade;
    }
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
