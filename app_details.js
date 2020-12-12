//app.detail.js
import product_id from './app';

const product_disp = document.querySelector(".disp-productdetails");
//const quantity_disp = document.getElementById("quantity-page");





class GetProduct{

    async getproduct(id_products){
       
        try{
            let result = await fetch("Prod-details.json");
            let data = await result.json();
            let products = data;
            console.log("Json Loaded");
            let title= data.products_details[1].title;
            console.log(title);
            return products; 
        }catch(error){
            console.log("error");
        }
    }
}

class Display{

    display_page(products) {
        let images_disp ='';
        let result='';
        let description ='';

        images_disp = 
            '<div class="col-2">'+
            '<img src="images/Tshirt_lots.jpg" width="100%" id="product-img">'+
            '<div class="small-img-row">'+
                    '<div class="small-img-col">'+
                        '<img src="images/Tshirt_lots.jpg" width="100%">'+
                    '</div>'+
                    '<div class="small-img-col">'+
                        '<img src="images/Tshirt_lots.jpg" width="100%">'+
                    '</div>'+
                    '<div class="small-img-col">'+
                        '<img src="images/Tshirt_lots.jpg" width="100%">'+
                    '</div>'+
                    '<div class="small-img-col">'+
                    '<img src="images/Tshirt_lots.jpg" width="100%">'+
                    '</div>';

            description = 

            '<div class="col-2">'+
            '<p>Home/Tshirt</p>'+
            '<h1>T shirts Nibbi hommes</h1>'+
            '<h4>25.00€</h4>'+
            '<select>'+
                '<option>S</option>'+
                '<option>M</option>'+
                '<option>L</option>'+
                '+<option>XL</option>'+
                '<option>XLL</option>'+
            '</select>'+
            '<br>'+
            '<input type="number" value=1>'+
            '<br>'+
            '<br>'+
            '<h3>Products Details</h3>'+
            '<br>'+
            '<p>T shirts fait main pour homme imprimé avec Nibbi Logo, 100% coton, manche en Wax, différents coloris et motifs disponibles'+ 
            '</p>';

            result= images_disp+description;
    
        console.log(products);
        product_disp.innerHTML = result;
    }
}

document.addEventListener("DOMContentLoaded",()=> {
    const display = new Display();
    const getproduct = new GetProduct();

    getproduct.getproduct().then(()=>{display.display_page(product_id)});
})