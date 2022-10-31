let cart;
let cart_info;
let count;
let subtotal;

function show_user_cart(){

    let htmlContentToAppend = "";
        htmlContentToAppend += `
    <div class="container text-center">
        <div class="row">
          <div class="col">
          </div>
          <div class="col-6">
          <h3> Carrito de Compras </h3>
          </div>
          <div class="col">
          </div>
        </div>
        <div class="row">
          <div class="col">
          <h4> Articulos a Comprar </h4>
          </div>
          <div class="col-5">
          </div>
          <div class="col">
          </div>
        </div>
        
        <table class="table">
        <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                </tr>
        </thead>
        <tbody>
                <tr>
                    <th scope="row" class="w-25">
                        <img class="img-thumbnail w-25 border-0" src="img/prod${cart.id}_1.jpg">
                    </th>
                    <td>${cart.name} </td>
                    <td>${cart.currency}${cart.unitCost}</td>
                    <td><input class="form-control mx-auto w-25" id="count" type="number"></td>
                    <td><strong id="subtotal">${cart.currency + cart.count * cart.unitCost}<strong></td>
                </tr>
        </tbody>
        </table>
    </div>
        
            `
            document.getElementById('cart').innerHTML = htmlContentToAppend;
            document.getElementById('count').value = cart.count;
            count = document.getElementById("count");
}

function delivery_info(){

    let htmlContentToAppend = "";
    htmlContentToAppend += `<hr>
    <div class="container">
        <div class="row">
          <div class="col">
                <h4>Tipo de Envio </h4>
          </div>
          <div class="col">
          </div>
          <div class="col">
          </div>
        </div>
        <div class="row">
          <div class="col">
                <input type="radio">Premium 2 a 5 días (15%)
          </div>
          <div class="col">
          </div>
          <div class="col">
          </div>
        </div>
        <div class="row">
            <div class="col">
                <input type="radio">Express 5 a 8 días (7%)
            </div>
            <div class="col">
            </div>
            <div class="col">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <input type="radio">Standard 12 a 15 días (5%)
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h4>Dirección de envio </h4> 
            </div>
        </div>
        <div class="row">
            <div class="col">
                    Calle
                    <input class="form-control">
            </div>
            <div class="col">
                    Número
                    <input class="form-control w-50">
            </div>
        </div>
        <div class="row">
            <div class="col">
                Esquina
                <input class="form-control">
            </div>
            <div class="col">
            </div>
        </div>
    </div>
    `   
    document.getElementById("delivery_info").innerHTML = htmlContentToAppend;
}

function user_input_count(){
    console.log(count);
    count.addEventListener("input", function(e){

        document.getElementById("subtotal").innerHTML = (cart.currency + (count.value * cart.unitCost))

    })
}

document.addEventListener("DOMContentLoaded", function(){
        getJSONData(CART_INFO_URL +'25801'+EXT_TYPE ).then(function(resultObj){
            if (resultObj.status = "ok"){
                cart_info = resultObj.data;
                cart = cart_info.articles[0];
                console.log(cart_info);
            }
            deployable();
            show_user_cart();
            delivery_info();
            user_input_count();
            
        })


    




})