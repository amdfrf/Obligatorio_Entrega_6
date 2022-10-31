let cart;
let cart_info;
let count;
let subtotal;
let new_cart_product = JSON.parse(localStorage.getItem("product"));
let prod_table;
let i = 1;
let new_prod;


function new_cart_item(objeto){
    new_prod = {id: objeto.id, name: objeto.name, count : 1, unitCost : objeto.cost, currency : objeto.currency};
    cart_info.articles.push(new_prod);
    localStorage.setItem("cart", JSON.stringify(cart_info));
    console.log(cart_info);
}
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
          <div class="col text-start">
          <h4> Articulos a Comprar </h4>
          </div>
          <div class="col-6">
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
        <tbody id="products_table">
                <tr>
                    <th scope="row" class="w-25">
                        <img class="img-thumbnail w-25 border-0" src="img/prod${cart.id}_1.jpg">
                    </th>
                    <td>${cart.name} </td>
                    <td>${cart.currency}${cart.unitCost}</td>
                    <td class="col-3"><input class="form-control mx-auto w-25" id="count" type="number"></td>
                    <td class="col-3"><strong name="subtotal" id="subtotal">${cart.currency + cart.count * cart.unitCost}<strong></td>
                </tr>
        </tbody>
        </table>
        <hr>
    </div>
        
            `
            document.getElementById('cart').innerHTML = htmlContentToAppend;
            console.log(cart.count);
            count = document.getElementById("count");
            count.value = 1;
            prod_table = document.getElementById("products_table");
            
}

function delivery_info(){

    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div class="container">
        <div class="row">
          <div class="col text-start">
                <h4>Tipo de Envio </h4>
          </div>
          <div class="col">
          </div>
          <div class="col">
          </div>
        </div>
        <div class="row">
          <div class="col mt-2">
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
            <div class="col mt-3">
                <h4>Dirección de envio </h4> 
            </div>
        </div>
        <div class="row mt-3">
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
            <div class="col mt-3">
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

/*function add_to_cart(product){
    if(new_product(product)){
        let product_count = 1;

        let htmlContentToAppend = "";

            htmlContentToAppend = `
                <tr>
                    <th scope="row" class="w-25">
                        <img class="img-thumbnail w-25 border-0" src="img/prod${product.id}_1.jpg">
                    </th>
                    <td>${product.name} </td>
                    <td>${product.currency}${product.cost}</td>
                    <td class="col-3"><input class="form-control mx-auto w-25" id="count${i}" type="number"></td>
                    <td class="col-3"><strong name="subtotal" id="subtotal">${product.currency + product_count * product.cost}<strong></td>
                </tr>
                `
                prod_table.innerHTML += htmlContentToAppend;
                console.log(i);
                document.getElementById("count"+i).value = product_count;
                count2 = document.getElementById("count"+i);
                i++;
    }   
        
}
*/
function user_input_count(){
        count.addEventListener("input", function(){
        document.getElementById("subtotal").innerHTML = (cart.currency + (count.value * cart.unitCost));

    })
}

/*
function new_product(product){
 return(product);
}
*/


document.addEventListener("DOMContentLoaded", function(){
        getJSONData(CART_INFO_URL +'25801'+EXT_TYPE ).then(function(resultObj){
            if (resultObj.status = "ok"){
                
                cart_info = resultObj.data;
                cart = cart_info.articles[0];
                
            } 
            deployable();
            show_user_cart();
            delivery_info();
            user_input_count();
            arraydeobjeto(new_cart_product);
            
            
        })


    




})