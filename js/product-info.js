ID = localStorage.getItem("prodID")

urlprod = `https://japceibal.github.io/emercado-api/products/${ID}.json`

urlcomment = `https://japceibal.github.io/emercado-api/products_comments/${ID}.json`

document.addEventListener(`DOMContentLoaded`, function () {

    getJSONData(urlprod).then(function (resultObj) {                                               //peticion al servidor
        if (resultObj.status === "ok") {
            datos1 = resultObj.data
            mostrardatos();
            mostrarImagenes()
        }
        fetch(urlcomment)                                                                       //peticion comentarios
            .then(res => res.json())
            .then(data => {
                datos2 = data
                comentarios();
                controlesComentario()
            })

    })
        .catch(error => console.log(error))                                                  // captura el error y lo muestra en la consola

    



    function mostrardatos() {                                                       //muestra todos los datos en pantalla

        document.getElementById("contenedor").innerHTML = `
        <div>
            <h1 id="nombreProd"><strong>${datos1.name}</strong></h1>
            <br>
            <hr>
            <p><strong>Precio</strong></p>
                 <p>${datos1.currency} ${datos1.cost} </p>
            <p><strong>Descripción</strong></p>
                 <p>${datos1.description}</p>
            <p><strong>Categoría</strong></p>
                 <p>${datos1.category} </p>
            <p><strong>Cantidad de vendidos</strong></p>
                 <p>${datos1.soldCount} </p>
            <p><strong>Imágenes ilustrativas</strong></p>
        </div>
        <div class="gallery">
            <div class="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-5" id="imagenes"></div>
        </div>`
        
    }




    function mostrarImagenes() {                                        //recorre el array de las imagenes y las muestra
        img = ``
        for (i = 0; i < datos1.images.length; i++) {

            img += `
            <img class="card col img-thumbnail gallery-item" id="prodImag" src="${datos1.images[i]}"> 
              
            `
        }
        document.getElementById("imagenes").innerHTML = img
    }



    function comentarios() {                                                                                        //recorre el array de comentarios y los muestra
        comment = ``

        for (i = 0; i < datos2.length; i++) {
            comment += `
        
        <a class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <div>
              <h6 class="mb-0"><strong>${datos2[i].user}</strong></h6>
              <div>${score(datos2[i].score)}</div>
              <p class="mb-0 opacity-75">${datos2[i].description}.</p>
              <small class="opacity-50 text-nowrap">${datos2[i].dateTime}</small>
              
            </div>
            
            
        `
        }

        document.getElementById("comentarios").innerHTML = comment

    }




    function controlesComentario() {                    //controles para comentar SOLO si esta logeado  // parte del desafio

        if(localStorage.getItem("email")) {                                             // muestra los controles si previamente inicio sesion


        document.getElementById("addComment").innerHTML =
            `
            <h3>Comentar</h3>
            <div class="form-group d-flex gap-3 py-3">
                <label for="agregarcomment">Tu opinión:</label>
                <textarea class="form-control" id="agregarcomment" rows="3"></textarea>
            </div>
            <label for="form-select">Tu puntuación.</label>
            <select class="form-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
            </select>
            <button id="enviarFormulario" type="submit" class="btn btn-primary mb-2">Enviar</button>

        `
        
        document.getElementById("enviarFormulario").addEventListener("click", function(){                                           // cuando hace click agrega un comentario

                let comentario = document.getElementById("agregarcomment").value
                let user = localStorage.getItem("email")
                let puntuacion = document.getElementsByClassName("form-select")[0].value

                let today = new Date()
                let fecha = today.getDate() + '-' + ( today.getMonth() + 1 ) + '-' + today.getFullYear();
                let hora = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                let fechaYHora = fecha + ' ' + hora;
                
                if(!comentario ==``) {                                                                                      // si el comentario no esta vacio lo agrega

                document.getElementById("comentarios").innerHTML +=

                `
                     <a class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <div>
                        <h6 class="mb-0"><strong>${user}</strong></h6>
                         <div>${score(puntuacion)}</div>
                        <p class="mb-0 opacity-75">${comentario}.</p>
                        <small class="opacity-50 text-nowrap">${fechaYHora}</small>
            
                    </div> 
        `     
        }else{                                                                                                          // si el comentario esta vacio salta una alerta
            alert(`debes escribir un comentario`)
        } 
        


        })

    }else{                                                              // si no  inicio sesion no podra comentar y le saldra un aviso
        document.getElementById("addComment").innerHTML = `                                 
        <div class="alert-danger">
        <strong>Debes iniciar sesion para comentar</strong>.
         </div>`
    }
        

    }



    function score(estrellas) {                                          //agrega las estrellas
        paraAgregar = ``

        for (iter = 1; iter < 6; iter++) {
            if (iter <= estrellas) {
                paraAgregar += `
                    <span class="fa fa-star checked"></span>`
            }
            else {
                paraAgregar += `<span class="fa fa-star"></span>`
            }

        }
        return paraAgregar


    }

    document.addEventListener("click", function(e){                         // modal de imagen
        if(e.target.classList.contains("gallery-item")){
            const src = e.target.getAttribute("src");
            document.querySelector(".modal-img").src = src;
            const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'))
            myModal.show();
        }
    })



})


