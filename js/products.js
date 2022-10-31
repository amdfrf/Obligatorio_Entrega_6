const ORDER_ASC_BY_COST = "$asc.";
const ORDER_DESC_BY_COST = "$desc.";
const ORDER_BY_PROD_SOLD_COUNT = "Cant.";
let currentProductsArray;
let currentID = localStorage.getItem('catID');
let catnamecontainer = document.getElementById('catname').innerHTML;
let minCount = undefined;
let maxCount = undefined;
let currentSortCriteria = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_DESC_BY_COST)
    {
        result = array.sort(function(a, b)  {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
        
    }else if (criteria === ORDER_ASC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
            
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}


function showProductsList(){

        
        let htmlContentToAppend = "";
        for( let i = 0; i < currentProductsArray.length; i++ ){
            let products = currentProductsArray[i];
            if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){
            
                htmlContentToAppend += `
            <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost} </h4> 
                            <small class="text-muted">${products.soldCount} vendidos.</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
            document.getElementById('list-of-products').innerHTML = htmlContentToAppend;
        }
    }
}

//nombre para cada category de products
function setCatIdName(resultObj){
    let catName = resultObj.data.catName
    localStorage.setItem('catName', catName)
    document.getElementById("catname").innerHTML = "Verás aqui todo los productos de la categoría" +" " + catName +"." 
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData('https://japceibal.github.io/emercado-api/cats_products/'+currentID+'.json').then(function(resultObj){
        if (resultObj.status === "ok"){
            deployable();
            currentProductsArray = resultObj.data.products
            showProductsList();
            setCatIdName(resultObj);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });
    
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});

