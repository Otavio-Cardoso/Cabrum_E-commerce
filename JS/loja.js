let produtos = [
  {id: 0, image: "../images/fone_bluetooth.png", produto: "Fone TWS Denovo", descricao: "Fone Bluetooth TWS, com certificação IPX8", preco: 159.90, qtde: 10 },
  {id: 1, image: "../images/carregador_portatil.webp", produto: "PowerBank tuVerde", descricao: "Power Bank de 12.000mAh, com entrada USB-C e 2 entradas USB-A", preco: 99.90, qtde: 15 },
  {id: 2, image: "../images/caixa_som.png", produto: "Caixa de Som Bluetooth", descricao: "Caixa de som portátil com conectividade Bluetooth", preco: 199.90, qtde: 5 },
  {id: 3, image: "../images/camera_ip.png", produto: "Câmera IP", descricao: "Câmera de segurança IP com resolução HD", preco: 129.90, qtde: 8 }
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

        // Criar a div para envolver o conteúdo do item de carrinho
        let itemContentDiv = document.createElement("div");
        itemContentDiv.classList.add("item-carrinho"); // Adiciona a classe "item-carrinho" à div

        // Adicionar o conteúdo do item de carrinho dentro da div
        itemContentDiv.innerHTML = `${item.produto} - R$${item.preco_unit.toFixed(2)} x ${item.quantidade} = R$${(item.preco_unit * item.quantidade).toFixed(2)}`;

        // Botão de remover item
        let removerButton = document.createElement("button");
        removerButton.textContent = "-";
        removerButton.classList.add("remover-button"); // Adiciona a classe "remover-button" ao botão
        removerButton.addEventListener("click", function () {
          removerCarrinho(item.id);
        });
        itemContentDiv.appendChild(removerButton);

        // Botão de adicionar item
        let adicionarButton = document.createElement("button");
        adicionarButton.textContent = "+";
        adicionarButton.classList.add("adicionar-button"); // Adiciona a classe "adicionar-button" ao botão
        adicionarButton.addEventListener("click", function () {
          adicionarCarrinho(item.id);
        });
        itemContentDiv.appendChild(adicionarButton);

        // Adicionar a div como filho do item de carrinho
        itemElement.appendChild(itemContentDiv);

        carrinhoElement.appendChild(itemElement);

        total += item.preco_unit * item.quantidade;
      }
    }
  }

  if (totalElement) {
    totalElement.innerHTML = `Total: R$${total.toFixed(2)}`;
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
