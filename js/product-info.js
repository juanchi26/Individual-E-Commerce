ID = localStorage.getItem("idProd")

url = `https://japceibal.github.io/emercado-api/products/${ID}.json`



document.addEventListener(`DOMContentLoaded`, function () {                                 
    let datos = {}
    getJSONData(url).then(function (resultObj) {                                               //peticion al servidor
        if (resultObj.status === "ok") {
            datos = resultObj.data
            mostrardatos();
            mostrarImagenes()
            console.log(ID)
        }

    })
        .catch(error => console.log(error))


    function mostrardatos() {                                                       //muestra todos los datos en pantalla
                                                                            
        document.getElementById("contenedor").innerHTML = `
        <div>
            <h1><strong>${datos.name}</strong></h1>
            <br>
            <hr>
            <p><strong>Precio</strong></p>
                 <p>${datos.currency} ${datos.cost} </p>
            <p><strong>Descripción</strong></p>
                 <p>${datos.description}</p>
            <p><strong>Categoría</strong></p>
                 <p>${datos.category} </p>
            <p><strong>Cantidad de vendidos</strong></p>
                 <p>${datos.soldCount} </p>
            <p><strong>Imágenes ilustrativas</strong></p>
        </div>
        <div class="row" id="imagenes"></div>`

    }


    function mostrarImagenes() {                                        //recorre el array de las imagenes y las muestra
        img = ``
        for (i = 0; i < datos.images.length; i++) {

            img += `
            <img class="card col " id="prodImag" src="${datos.images[i]}"> 
              
            `
        }
        document.getElementById("imagenes").innerHTML = img
    }

})
