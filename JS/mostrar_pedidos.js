window.addEventListener("DOMContentLoaded", function () {
  exibirPedidos();
});

function exibirPedidos() {
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  let lista_clientes = document.getElementById("lista_clientes");
 
  if (clientes.length === 0) {
    lista_clientes.innerHTML = "<li>Nenhum pedido realizado.</li>";
  } else {
    lista_clientes.innerHTML = "";
    for (let i = 0; i < clientes.length; i++) {
      let cliente = clientes[i];

      let linha_pedido = document.createElement("li");
      linha_pedido.textContent = `Pedido #${cliente.compra.id}: Total R$${cliente.compra.total.toFixed(2)}`;
      lista_clientes.appendChild(linha_pedido);
         
      let info_comprador = document.createElement("li"); 
      info_comprador.textContent += `\nComprador: ${cliente.pessoa.nome}`;
      linha_pedido.appendChild(info_comprador);

      for (let j = 0; j < cliente.compra.itens.length; j++) {
        let info_compra = document.createElement("li");
        info_compra.textContent += `${cliente.compra.itens[j].produto}: ${cliente.compra.itens[j].quantidade} X R$${cliente.compra.itens[j].preco_unit.toFixed(2)}`;
        linha_pedido.appendChild(info_compra);
      }
      lista_clientes.appendChild(document.createElement("hr"));
    }
  }
}
