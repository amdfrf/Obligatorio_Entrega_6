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
                <h2> ${product.name} </h2>
                <hr>
                <p><strong> Precio </strong><br>
                ${product.currency} ${product.cost}</p>
                <br>
                <p><strong> Descripción </strong>  <br>
                ${product.description}</p>
                <br>
                <p> <strong>Categoría </strong><br>
                ${catName}</p>
                <br>
                <p> <strong>Cantidad de vendidos</strong> <br>
                ${product.soldCount}</p
                <br>
                <p><strong> Imagenes Ilustrativas </strong><br></p>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                        <div class="col" id='imgs'> 
                        </div>
                    </div>
                </div>
            <div>
            `
            document.getElementById("prod_info-list-container").innerHTML = htmlContentToAppend;
            product.images.forEach(element => {
                document.getElementById("imgs").innerHTML += `<img class="img-thumbnail" src="${element}"></img>
                `
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
        <div class="row">
        <div onclick="redirect_toProd(${relProd.id})" class="col-3"> <img class="img-thumbnail" src="${relProd.image}"></img><br>
                            <h4> ${relProd.name} </h4>
        </div>
    </div>
    
    `

    document.getElementById("related_products").innerHTML = htmlContentToAppend;
} 
    
}



function redirect_toProd(id){
    document.getElementById("comments").innerHTML = "";
    document.getElementById("comment-post").innerHTML = "";
    document.getElementById("comments").innerHTML = "<h3> Comentarios </h3><hr>";

         getJSONData(PRODUCT_INFO_URL+id+EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
                product = resultObj.data
                
                
                getJSONData(PRODUCT_INFO_COMMENTS_URL+id+EXT_TYPE).then(function(resultObj){
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


document.addEventListener("DOMContentLoaded",function(){
    getJSONData(PRODUCT_INFO_URL+prodID+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data
            
            
            getJSONData(PRODUCT_INFO_COMMENTS_URL+prodID+EXT_TYPE).then(function(resultObj){
                if(resultObj.status === "ok"){
                    deployable();
                    comments = resultObj.data
                    showProductInfo();
                    showComments();
                    newComments();
                    showRelatedProducts();
                }
            })
            


        }
    });


})