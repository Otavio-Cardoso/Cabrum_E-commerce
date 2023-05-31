let produtos = [
  {id:1, image:"<img src=\"../images/fone_bluetooth.png\" width=\"100\"/>", produto:"Fone TWS Denovo", descricao:"Fone Bluetooth TWS, com certificação IPX8", preco:159.90, qtde:10},
  {id:2, image:"<img src=\"../images/carregador_portatil.webp\" width=\"100\"/>", produto:"PowerBank tuVerde", descricao:"Power Bank de 12.000mAh, com entrada USB-C e 2 entradas USB-A", preco:99.90, qtde:15}
];
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

if (localStorage.getItem('mercadorias') != null) {
  produtos = [];
  produtos = JSON.parse(localStorage.getItem('mercadorias'));
} else {
  localStorage.setItem("mercadorias", JSON.stringify(produtos));
}

let corpo_tabela = document.getElementById("corpo_tabela");

for (let i = 0; i < produtos.length; i++) {
  //comando para criar linha
	let linha = document.createElement("tr");
  linha.id = "produto" + (i + 1);

  //comando para criar um coluna
  //comando para colocar uma informação na coluna
  //comando para colocar as colunas na linha.
	let imagem = document.createElement("td");
  imagem.innerHTML = produtos[i].image;
  linha.appendChild(imagem);
 
  let nome_prod = document.createElement("td");
  nome_prod.innerHTML = produtos[i].produto;
  linha.appendChild(nome_prod);

  let descricao_produto = document.createElement("td");
	descricao_produto.innerHTML = produtos[i].descricao;
	linha.appendChild(descricao_produto);

  let preco_produto = document.createElement("td");
	preco_produto.innerHTML = "R$" + produtos[i].preco;
	linha.appendChild(preco_produto);

  let coluna_botao = document.createElement("td");
	let botao = document.createElement("input");

  botao.id = "bt" + i;
  botao.type = "button";
  botao.value = "Comprar";

  coluna_botao.appendChild(botao);
  linha.appendChild(coluna_botao);

  botao = addEventListener("click", function() {adicionar_carrinho(botao.id)}); 
 
  //comando para colocar a linha no corpo da tabela
  corpo_tabela.appendChild(linha);
}

function adicionar_carrinho(id_bt) {
  let id_prod = id_bt.substring(2, id_bt.length);
  id_prod = parseInt(id_prod);
  let prod_carrinho = {
                  id:produtos[id_prod].id,
                  nome:produtos[id_prod].produto,
                  preco_unit:produtos[id_prod].preco,
                  quantidade: qtde, 
                  preco_tot: prod_carrinho.preco * prod_carrinho.qtde
  };

  carrinho.push(prod_carrinho);
}
