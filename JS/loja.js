let fone = document.getElementById("comprar_fone");
let bateria = document.getElementById("comprar_bateria");

fone.addEventListener("click", compra);
bateria.addEventListener("click", compra);

function compra() {
    alert("Compra realizada com sucesso!");
}