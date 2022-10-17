const URL_Cart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const agregarCart = document.getElementById("agregarArt");
let carrito = localStorage.getItem("cartCompras");
let compra = JSON.parse(carrito)


document.addEventListener("DOMContentLoaded", function () {
    fetch(URL_Cart)
        .then(res => res.json())
        .then(data => {
            datos = data.articles[0]
            addCart()

        })
        .catch(err => {
            console.log(err)
            alert("Algo salio mal")
        })

    function addCart() {                                            //agrega el producto del Fetch al array si es que existe y los dibuja
        addProd = ""
        if (compra) {
            compra.unshift(datos)
            addProd = ""
            for (let prod of compra) {
                addProd += `
            <tr  id="${prod.id}">
                <th  scope="row"><img style="width: 10rem ;" src="${prod.image}" alt="imagen del producto"></th>
                    <td>${prod.name}</td>
                    <td>${prod.currency} ${prod.unitCost}</th>
                    <td><input id="${prod.id}" type="number" style="width: 5rem ;" class="form-control" value = 1 min = 1></td>
                    <td id="cost"><strong>${prod.currency} ${prod.unitCost}</strong></td>
             </tr>
             `
            }

            agregarCart.innerHTML = addProd
        } else {                                                                  // si no existe muestra solo el producto del Fetch        
            addProd += `<tr  id="${datos.id}">
            <th  scope="row"><img style="width: 10rem ;" src="${datos.image}" alt="imagen del producto"></th>
                <td>${datos.name}</td>
                <td>${datos.currency} ${datos.unitCost}</th>
                <td><input id="${datos.id}" type="number" style="width: 5rem ;" class="form-control" value = 1 min = 1></td>
                <td id="cost"><strong>${datos.currency} ${datos.unitCost}</strong></td>
         </tr>
         `

        }
        agregarCart.innerHTML = addProd
    }

    agregarCart.addEventListener("click", function (e) {
        subtotal(e)

    })

    function subtotal(e) {
        document.getElementById(e.target.id).addEventListener("input", function () {                // aumenta solo el subtotal en el obligatorio no en el desafio
            if (e.target.id == datos.id) {
                if (e.target.value > 0) {
                    costo = (datos.unitCost * e.target.value)
                    document.getElementById("cost").innerHTML = `<td id="costo"><strong>${datos.currency} ${costo}</strong></td>`
                } else {
                    document.getElementById("cost").innerHTML = `<td id="costo"><strong>${datos.currency} ${datos.unitCost}</strong></td>`
                }
            }
        })

    }

})