const URL_Cart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const agregarCart = document.getElementById("agregarArt");
let carrito = localStorage.getItem("cartCompras");
let compra = JSON.parse(carrito)
costo = ""

document.addEventListener("DOMContentLoaded", function () {
    fetch(URL_Cart)
        .then(res => res.json())
        .then(data => {
            datos = data.articles[0]
            addCart()
            total()
            mostrarTotal()
            mostrarCostoEnvio()
            mostrarTotalFinal ()
        })
        .catch(err => {
            console.log(err)
            alert("Algo salio mal")
        })

    function addCart() {                                            //dibuja los articulos del carro en pantalla
        addProd = ""
        if (compra) {
            for (let prod of compra) {
                addProd += `
            <tr  id="${prod.id}" class="test">
                <th  scope="row"><img style="width: 10rem ;" src="${prod.image}" alt="imagen del producto"></th>
                    <td>${prod.name}</td>
                    <td>${prod.currency} ${prod.unitCost}</th>
                    <td><input id="${prod.id}" type="number" style="width: 5rem ;" class="form-control" value = 1 min = 1></td>
                    <td id="b${prod.id}"><strong>${prod.currency} ${prod.unitCost}</strong></td>
             </tr>
             `
            }
        }

        agregarCart.innerHTML = addProd
    }

    agregarCart.addEventListener("click", function (e) {   
        subtotal(e)
        total()
        mostrarTotal()
        mostrarCostoEnvio()
        mostrarTotalFinal ()
        
    })

    function subtotal(e) {                                              // calcula el subtotal para cada articulo
        if (e.target.id) {
            document.getElementById(e.target.id).addEventListener("input", function () {
                compra.filter(item => {
                    if (item.id == e.target.id) {
                        if (e.target.value > 0) {

                            costo = parseInt(compra[compra.indexOf(item)].unitCost) * parseInt(e.target.value)
                            document.getElementById("b" + e.target.id).innerHTML = `<strong> ${compra[compra.indexOf(item)].currency} ${costo}`
                            item.count = e.target.value

                        }
                    }
                })

            })
        }
    }

    function total() {                                                             //calcula el subtotal antes de costos de envio
        contador = 0
        if(compra){
        for (let precio of compra) {
            if (precio.currency == "UYU") {
                contador += parseInt(precio.unitCost / 42) * precio.count  // precio del dolar : 42 pesos por dolar
            } else {
                contador += precio.unitCost * precio.count
            }
        }

        return contador
     }
    }

    function costoEnvio() {                         //calcula el costo de envio segun cual este seleccionado
       if(document.getElementById("15%").checked){
            quince = total() * 0.15
            return quince
       }
       if(document.getElementById("7%").checked){
            siete = total() * 0.07
            return siete
       }
       if(document.getElementById("5%").checked){
         cinco = total() * 0.05
         return cinco
       }
    }

    



    document.getElementById("envio").addEventListener("click",  () => {                      //evento de escucha a los inputs radio
        costoEnvio()
        totaFinal ()
        mostrarCostoEnvio()
        mostrarTotalFinal ()
    })



    function totaFinal () {                     //calcula el total final, costo  de envio mas subtotal
        Final = total() + costoEnvio()
        return Final
    }

    function mostrarTotalFinal () {                                 //muestra el total final 
        document.getElementById("total").innerHTML = `<p>Total($)</p> <span> <strong>USD ${totaFinal()}</strong></span>`
    }


    function mostrarCostoEnvio() {                                  //muestra el costo de envio en pantalla
        document.getElementById("costoEnvio").innerHTML = `<p>Costo de env??o</p> <span>USD ${costoEnvio()}</span>`
    }

    function mostrarTotal() {                               // muestra el subtotal en pantalla
        document.getElementById("subtotal").innerHTML = `<p>Subtotal</p> <span>USD ${total()}</span>`
    }


    //VALIDACIONES//

let submit = document.getElementById("BtnSubmit");
let tarjeta  = document.getElementById("tarjeta");
let segCod = document.getElementById("codigoSeg");
let vencimiento = document.getElementById("vencimiento");
let credito = document.getElementById("credito");
let transferencia = document.getElementById("transfer");
let nrocuenta = document.getElementById("bancaria");
let tipoDePago = document.getElementById("tipoDePago");

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          if(form.checkValidity()){
            showAlertSuccess()
          }
          checkInputsChecked ()

          form.classList.add('was-validated')
        }, false)
        
      })
  })()




  function checkInputsChecked () {
    if (!tarjeta.checked && !transferencia.checked){
        document.getElementById("terminos2").classList.add("is-invalid")
    }
  }

     

    tipoDePago.addEventListener("click", () => {
   
        if(credito.checked){
            tarjeta.disabled = false
            vencimiento.disabled = false
            segCod.disabled = false
            nrocuenta.disabled = true
            document.getElementById("terminos2").classList.remove("is-invalid")
            document.getElementById("selectPayment").innerHTML = `<span>Tarjeta de credito</span>`
            
        }
        if(transferencia.checked){
            nrocuenta.disabled = false
            tarjeta.disabled = true
            vencimiento.disabled = true
            segCod.disabled = true
            document.getElementById("terminos2").classList.remove("is-invalid")
            document.getElementById("selectPayment").innerHTML = `<span>Transferencia bancaria</span>`
        }
    })

    function showAlertSuccess(){
        document.getElementById("alert-success").classList.add("show")
        }

})



