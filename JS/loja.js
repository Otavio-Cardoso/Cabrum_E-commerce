let produtos = [
	{id:1, image:"<img src=\"../images/fone_bluetooth.png\" width=\"100\"/>", produto:"Fone TWS Denovo", descricao:"Fone Bluetooth TWS, com certificação IPX8", preco:159.90, qtde:10, botao:"<input id=\"c_fone\" type=\"button\" value=\"Comprar\"/>"}, 
	{id:2, image:"<img src=\"../images/carregador_portatil.webp\" width=\"100\"/>", produto:"PowerBank tuVerde", descricao:"Power Bank de 12.000mAh, com entrada USB-C e 2 entradas USB-A", preco:99.90, qtde:15, botao:"<input id=\"c_powerbank\" type=\"button\" value=\"Comprar\"/>"}
];
let corpo_tabela = document.getElementById("corpo_tabela");

for (let i = 0; i < produtos.length; i++) {
	// comando para criar linha
	let linha = document.createElement("tr");
    linha.id= "produto"+i;

    // comando para criar um coluna
	let coluna1 = document.createElement("td");
    let coluna2 = document.createElement("td");
    let coluna3 = document.createElement("td");
    let coluna4 = document.createElement("td");
    let coluna5 = document.createElement("td");

    // comando para colocar uma informação na coluna
    coluna1.innerHTML = produtos[i].image;
    coluna2.innerHTML = produtos[i].produto;
	coluna3.innerHTML = produtos[i].descricao;
	coluna4.innerHTML = "R$" + produtos[i].preco;
	coluna5.innerHTML = produtos[i].botao;

    // comando para colocar as colunas na linha.
    linha.appendChild(coluna1);
    linha.appendChild(coluna2);
	linha.appendChild(coluna3);
	linha.appendChild(coluna4);
	linha.appendChild(coluna5);

    //comando para colocar a linha no corpo da tabela
    corpo_tabela.appendChild(linha);
}