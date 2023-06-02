window.addEventListener("DOMContentLoaded", function () {
  exibirPedidos();
});

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
