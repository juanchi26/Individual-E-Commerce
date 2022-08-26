ID = localStorage.getItem("catID")
let url = `https://japceibal.github.io/emercado-api/cats_products/${ID}.json`

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            datos = resultObj.data
            ListaAutos();
        }

    })
})


function ListaAutos() {
    let contenido = "";
    for (let articulo of datos.products) {

        contenido += `
                <div onclick="setCatID(${datos.catID})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${articulo.image}" alt="${articulo.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${articulo.name} - ${articulo.currency} ${articulo.cost}</h4>
                                <small class="text-muted">${articulo.soldCount} Vendidos</small>
                            </div>
                            <p class="mb-1">${articulo.description}</p>
                        </div>
                    </div>
                </div>
                `
    }

    document.getElementsByClassName("container")[2].innerHTML = contenido;
}

// recorre un array y los dibuja con los parametros seleccionados