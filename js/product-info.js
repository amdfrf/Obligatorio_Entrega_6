let product;
let catID = localStorage.getItem('catID');
let catName = localStorage.getItem('catName');
let prodID = localStorage.getItem('prodID');
let comments;
let score;
let usercomments;
let a;
let now;
let c = 0;
let add_to_cart_button;

function starRating(score,a){
    let b = 0;
    console.log(b);
    /*if (rating == 5){*/
        for (i = 0; i < score; i++){
    document.getElementById(a+"rating").innerHTML += `
        <span class="fa fa-star checked"></span>
        `
        if(b < 5 && i == score){
            document.getElementById(a+"rating").innerHTML +=`
            <span class="fa fa-star"></span>
            `
        }
        b++
        }
    //} 
    
}

function showProductInfo(){
    let htmlContentToAppend = "";

            htmlContentToAppend += `
            <div>   
                    <div class="row mt-5">
                        <div class="col-6">
                            <h2> ${product.name} </h2>
                        </div>
                        <div class="col"> 
                        </div>
                        <div class="col">
                        <button id="buy" type="button" class="btn btn-success">Comprar</button>
                        </div>
                    </div>
                    <div class="mt-5">
                        <hr>
                        <p><strong> Precio </strong><br>
                            ${product.currency} ${product.cost}</p>
                        <p><strong> Descripción </strong>  <br>
                            ${product.description}</p>
                    
                        <p> <strong>Categoría </strong><br>
                            ${catName}</p>
                        <p> <strong>Cantidad de vendidos</strong> <br>
                            ${product.soldCount}</p
                    </div>
                    <div class="text-start mt-5">
                        <p><strong> Imagenes Ilustrativas </strong><br></p>
                    </div>
                    <div class="row">
                        <div id="car" class="col-4">
                            
                            </div>
                        </div>
                    </div>
            <div>
            `
            document.getElementById("prod_info-list-container").innerHTML = htmlContentToAppend;
            document.getElementById("car").innerHTML = `
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div id="carousel" class="carousel-inner">
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
            `
            product.images.forEach(element => {
                if (element == product.images[0]){
                document.getElementById("carousel").innerHTML += `
                <div class="carousel-item active">
                        <img src="${element}" class="img-thumbnail d-block w-100">  </img>
                </div>
                `
                } else {
                    document.getElementById("carousel").innerHTML += `
                <div class="carousel-item">
                    <img src="${element}" class="img-thumbnail d-block w-100"> </img>
                </div>
                `
                }
            });
            
       
    }

function showComments(){
        let htmlContentToAppend = "";
        a = 0;
        for(let i = 0; i < comments.length; i++){
            usercomments = comments[i];
            score = usercomments.score;

            htmlContentToAppend += `
            
                <div> <strong>${usercomments.user}</strong> - ${usercomments.dateTime} - <span id="${a}rating">
                 </span>
                    <div>
                        ${usercomments.description}
                    </div>
                </div>
                <hr>
            `
            
            document.getElementById('comments').innerHTML += htmlContentToAppend;
            starRating(score,a);
            a++;
            htmlContentToAppend = "";
            
        }   
    }

function newComments(){

    let htmlContentToAppend = "";
        

        htmlContentToAppend += `
        <div class="container">
            <h3> Comentar </h3><br>
            <div>
                <h4> Tu opinión: </h4><br>
                <textarea id="opinion">  </textarea><br>
            </div>
            <div>
                <h4> Tu puntuación: </h4><br>
                <input  type="number" id="star_score" <input><br>
                <input onclick="postComments()" type="button" value="Enviar">
            </div>
        </div>
        `
        document.getElementById("comment-post").innerHTML += htmlContentToAppend;
        
        

}

function postComments(){
    a = a;
    
    let puntuacion = document.getElementById("star_score").value;
    let opinion = document.getElementById("opinion").value;
    score = puntuacion
    
    let htmlContentToAppend = "";
    htmlContentToAppend += `
            
                <div> <strong>${localStorage.getItem('usuario')}-</strong><span id="${c}date"> </span><span id="${a}rating">
                 </span>
                    <div>
                        ${opinion}
                    </div>
                </div>
                <hr>
            
            `

    document.getElementById("comments").innerHTML += htmlContentToAppend;
    starRating(score,a);
    time(c);
    a++;
    c++;
    console.log(c);
}

function time(contador){
    now = new Date();

    let dateTime = `${now.getFullYear()}-${now.getMonth() +1}-${now.getDate()}`;
    dateTime += ` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    document.getElementById(contador+"date").innerHTML = dateTime;
}

function showRelatedProducts(){
    relatedProds = product.relatedProducts;

    let htmlContentToAppend = "";
    for (i = 0; i < relatedProds.length; i++){
        relProd = relatedProds[i];

        htmlContentToAppend += `
        
            <div onclick="redirect_toProd(${relProd.id})" class="col-3"> 
                        <img class="img-thumbnail" src="${relProd.image}"></img><br>
                            <h4> ${relProd.name} </h4>
            </div>
        
    
    `
    

    document.getElementById("related_products").innerHTML = `
    <div class="row">
        ${htmlContentToAppend} 
        <div class="col-3"> 
        </div> 
    </div> `;
} 
    
}

function redirect_toProd(id){
    document.getElementById("comments").innerHTML = "";
    document.getElementById("comment-post").innerHTML = "";
    document.getElementById("comments").innerHTML = "<h3> Comentarios </h3>";

         getJSONData('https://japceibal.github.io/emercado-api/products/'+id+'.json').then(function(resultObj){
            if (resultObj.status === "ok"){
                product = resultObj.data
                
                
                getJSONData('https://japceibal.github.io/emercado-api/products_comments/'+id+'.json').then(function(resultObj){
                    if(resultObj.status === "ok"){
                        comments = resultObj.data
                        showProductInfo();
                        showComments();
                        newComments();
                        showRelatedProducts();
                    }
                })
                
    
    
            }
        });

}

function add_to_cart(){
    let add_to_cart_button = document.getElementById("buy");

    add_to_cart_button.addEventListener("click",function(e){
    localStorage.setItem("product", JSON.stringify(product));
    window.location = "cart.html"

    })
}

document.addEventListener("DOMContentLoaded",function(){
    getJSONData('https://japceibal.github.io/emercado-api/products/'+prodID+'.json').then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data
            
            
            getJSONData('https://japceibal.github.io/emercado-api/products_comments/'+prodID+'.json').then(function(resultObj){
                if(resultObj.status === "ok"){
                    deployable();
                    comments = resultObj.data
                    showProductInfo();
                    showComments();
                    newComments();
                    showRelatedProducts();
                    add_to_cart();
                }
            })
            


        }
    });


})