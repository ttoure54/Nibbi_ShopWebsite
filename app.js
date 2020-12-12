//app.js


const product_disp = document.getElementById("product-center");
const men_products= document.getElementById("men-products");
const product_disp_details=document.getElementById("prod-details-disp");
let id_update;

//const quantity_disp = document.getElementById("quantity-page");



//Local Storage 
class Items_Id{
    
    #items_id = 0;
    #current_items_infos= {};


    test_id(value){
        this.#items_id=value;
        localStorage.setItem("id",value);
        return this.#items_id;
    }

    reset_items_id(){
        this.#items_id=0;
        return this.#items_id;
    }

    save_item_infos(tab_infos){
        
        //console.log(tab_infos[0]);
        this.#current_items_infos["title"] = tab_infos[1];
        this.#current_items_infos["price"] = tab_infos[2];
        this.#current_items_infos["img"] = tab_infos[4];
        this.#current_items_infos["id"]= tab_infos[0];
        //console.log(this.#current_items_infos);
        localStorage.setItem("items-infos",JSON.stringify(this.#current_items_infos));
        console.log(localStorage.getItem("items-infos",this.#current_items_infos));
    }

    clear_items_infos(){
        localStorage.clear("items-infos");
    }

    men_items_id(){
        this.#items_id=111;
        return this.#items_id;
    }

    update_items_id(increment){
        this.#items_id=increment;
        return this.#items_id;
    }

    disp_items_id(){
        return this.#items_id;
    }

}


class CartItems{ 


    #cart_list={};

    init_cart(){
        localStorage.setItem("cart-items");
    }
    
    add_item_to_cartlist(cart_items_infos){

        var cart_items = localStorage.getItem("cart-items");
        var id_item = cart_items_infos["id"];
        console.log("typeof cart items DEBUG");
        console.log(cart_items);
        if (cart_items === "null"){
            var quantity =1;
            cart_items={};
            //cart_items={id_item :{"title":cart_items_infos["title"], "price":cart_items_infos["price"],"size":"M", "quantity":quantity}};
            cart_items[id_item]={"idjson":id_item, "title":cart_items_infos["title"], "img":cart_items_infos["img"] ,"price":cart_items_infos["price"],"size":"M", "quantity":1}; 
        }else{
            cart_items = JSON.parse(cart_items);
            if (typeof(cart_items[id_item]) === "undefined"){
                cart_items[id_item]={"idjson":id_item, "title":cart_items_infos["title"], "img":cart_items_infos["img"] ,"price":cart_items_infos["price"],"size":"M", "quantity":1};
                //cart_items={id_item:{"title":cart_items_infos["title"], "price":cart_items_infos["price"],"size":"M", "quantity":quantity}};
            }else{
                var quantity = cart_items[id_item]["quantity"]+1;
                cart_items[id_item]={"idjson":id_item, "title":cart_items_infos["title"], "img":cart_items_infos["img"], "price":cart_items_infos["price"],"size":"M", "quantity":quantity};
                /*
                if(typeof(cart_items[id_item]["quantity"]) !== "undefined"){
                    var quantity = cart_items[id_item]["quantity"] +1;
    
                }else{ 
                    var quantity = 1;
                    //this.#cart_list[id_item]={"title":cart_items_infos["title"], "price":cart_items_infos["price"],"size":"M", "quantity":quantity};
                }*/
            }
        }


        localStorage.removeItem("cart-items");
        this.#cart_list[id_item]={"title":cart_items_infos["title"], "price":cart_items_infos["price"],"size":"M", "quantity":quantity};
        //cart_items[id_item]={"title":cart_items_infos["title"], "price":cart_items_infos["price"],"size":"M", "quantity":quantity};
        localStorage.setItem("cart-items",JSON.stringify(cart_items));
        console.log(cart_items);

        //DEBUG TEST DISPLAY CART 
        let test = localStorage.getItem("cart-items");
        console.log("--------- Test JSON cart -----");
        console.log(test);
    }


    add_item_to_cartdisp(){


        let cart_storage = localStorage.getItem("cart-items");
        cart_storage=JSON.parse(cart_storage);
        //let cart_map= cart_storage.json();
        //cart_storage=JSON.parse(cart_storage);
        console.log(cart_storage);
        //const id_item = cart_storage.idjson;
        //const item_quantity = cart_storage[cart_items_infos["id"]].quantity;
        //console.log(item_quantity);

        const cart_content = document.getElementById("cart-content");
        cart_content.innerHTML="";
        let added_item;
        var cart_content_child = document.createElement("div");


        Object.keys(cart_storage).forEach(key_item => {

            const item_quantity = cart_storage[key_item].quantity;
            console.log(item_quantity);

            var str_cart_item ="cart-items-";
            str_cart_item =  str_cart_item.concat(key_item);
            console.log(key_item);

            var quantity_id = "item-amount-"+key_item;
            console.log(quantity_id);


            //if (item_quantity==1){


                var cart_item = document.createElement("div");
                var quantity_class = document.createElement(quantity_id);
                var quantity_div = document.createElement("div");
                quantity_class.className = quantity_id;
                quantity_class.id = quantity_id;
                quantity_class.innerHTML=item_quantity;
                quantity_div.appendChild(quantity_class);
                //quantity_class.innerHTML='<p id='+quantity_id+'class='+quantity_id+'>'+item_quantity+'</p>';
                //cart_item.type ='div';
                cart_item.id=str_cart_item;
                cart_item.className="cart-item";
                //cart_item.innerHTML="";
        
            
                added_item =
                        //'<div>'+
                        '<img src="'+cart_storage[key_item].img +'" alt="">'+
                        '<div>'+
                            '<h4>'+cart_storage[key_item].title+'</h4>'+
                            '<h5>'+cart_storage[key_item].price+'€</h5>'+
                            '<span id="111" class="remove-item">Annuler</span>'+
                        '</div>'+quantity_div.innerHTML;
                        //'<div>'+ quantity_class.innerHTML+
                            //'<p id='+quantity_id+'class='+quantity_id+'>'+item_quantity+'</p>'+
                        //'</div>';
                        //'</div>';
        
                //let text_node = document.createTextNode(added_item);
                cart_item.innerHTML = added_item;
        
               // }else{
                    //document.getElementById(quantity_id).innerHTML = item_quantity;
                    //cart_item= document.getElementById(str_cart_item);
        
                //}
            
                cart_content_child.appendChild(cart_item);


        })
        console.log(cart_content_child);
        cart_content.appendChild(cart_content_child);
        console.log(cart_content);
     


    }


    remove_item_cart(id_rm){

        console.log("."+id_rm);

        const remove_item = document.getElementById(id_rm);
        remove_item.remove();
        return this;
    }

    send_cart(){


    }


    disp_cart(){

        const cart_show = document.querySelector(".cart");
        const cart_trans = document.querySelector(".cart-overlay");
        const close_btn =  document.getElementById("close-cart");
        const cart_item_rm = document.querySelector(".remove-item");

        cart_show.classList.add("show-cart");
        cart_trans.classList.add("transparentBCG");
    
        close_btn.addEventListener('click',function(){
            cart_show.classList.remove("show-cart");
            cart_trans.classList.remove("transparentBCG");
            
        })

        if(cart_item_rm !== null){

        cart_item_rm.addEventListener('click',()=>{

            var id_rm = cart_item_rm.parentElement.parentElement.parentElement.id;
            console.log(cart_item_rm.id);
            console.log(cart_item_rm.parentElement.parentElement.parentElement.id);
            this.remove_item_cart(id_rm);
                
        })
        }


        return this;

    }

    clear_cart(){
        localStorage.removeItem("cart-items");
        localStorage.setItem("cart-items",null);
    }
    
}



class GetProduct{

    async getproduct(){
       
        try{
            let result = await fetch("Prod1.json");
            let data = await result.json();
            let products = data.products_field;
            products = products.map(item => {
                const {title} = item.title;
                const {quantity} = item.quantity;
                const {price} = item.price;
                const {source_mainimg} = item.source_mainimg;
                //console.log(title, quantity, price, mainimg);
                return {title, quantity, price, source_mainimg};
            });
            console.log("Json Loaded");
            //console.log(products);
            return products; 
        }catch(error){
            console.log("error");
        }
    }
    
}

//
class GetProducts_details{

    async getproduct(id_products){
        try{
            let result = await fetch("Prod-details.json");
            let data = await result.json();
            //let products = data;
            console.log("Json Loaded");
            let title= data.products_details[id_products].title;
            let price= data.products_details[id_products].price;
            let quantity = data.products_details[id_products].quantity;
            let source_mainimg = data.products_details[id_products].source_mainimg;
            let size_quantity = data.products_details[id_products].size_quantity;
            console.log(title, price);
            return [id_products,title,price,quantity,source_mainimg,JSON.stringify(size_quantity)]; 
        }catch(error){
            console.log("error");
        }
    }
}

class Display{

    display_page(products) {
        let result ='';

        console.log(products);
        
        let id_products= 111;
        id_update=111;
        products.forEach(product => {

            /*

            var article = document.createElement('article');
            article.className='product';
            article.type='article';

            var imgcontainer = document.createElement('image-container')
            imgcontainer.type='div';
            imgcontainer.className='image-container';
            imgcontainer.innerHTML='<a href="product_detailtemplate.html"></a>';

            var prodimage = document.createElement('img');
            prodimage.className = "product-image";
            prodimage.src =  product.source_mainimg;
            
            var dynproduct = document.createElement('dyn-product');
            dynproduct.type='button';
            dynproduct.addEventListener('click',function(){
                products_load_details(id_products);
            });
            dynproduct.appendChild(prodimage);
            imgcontainer.appendChild(dynproduct);
            article.appendChild(imgcontainer);
            */
            
            result += 
            '<article class="product">'+
                '<div class= "image-container">'+
                    //'<a href="product_detailtemplate.html">'+
                        //'<button onclick=product_detail_display(\''+id_products+'\')>'+
                        '<button onclick=men_disp_test(\''+id_products+'\')>'+
                            '<a href="product_detailtemplate.html">'+
                                '<img src='+ product.source_mainimg +' alt="product" class="product-image">'+
                            '</a>'+
                        '</button>'+        
                        '<button class="basket-btn" data-id="1">Add to Basket</button>'+
                    //'</a>'+
                '</div>'+
                '<h3>'+product.title+'</h3>'+
                '<h4>'+product.price+'</h4>'+
            '</article>';


            //product_disp.appendChild(document.getarticle);
            id_products++;
        });
        console.log(result);
        product_disp.innerHTML = result ;
    }


}

class Display_details{

    display_page(prod_js) {
        let images_disp ='';
        let result='';
        let description ='';

        console.log('class Loaded');



        //Size quantity element Definition 

        var size_quantity_json = JSON.parse(prod_js[5]);
        console.log(size_quantity_json);

        var parent_elid_size_quantity = document.createElement('div')

        var elid_size_quantity = document.createElement("select");
        elid_size_quantity.id= 'idel-size-'+prod_js[0];
        //elid_size_quantity.type = "select"
        /*elid_size_quantity.innerHTML =
                                        '<option>S</option>'+
                                        '<option>M</option>'+
                                        '<option>L</option>'+
                                        '<option>XL</option>'; */
                                    

        var opt_size;
        var i = 0;
    
        for (opt_size in size_quantity_json){
            console.log(opt_size);
            var opt = document.createElement("option");
            opt.value=opt_size;
            opt.text = opt_size;
            elid_size_quantity.appendChild(opt);
            //var qt = elid_size_quantity.options[i];
            if(size_quantity_json.opt_size == 0 ){
                elid_size_quantity.options[3].disabled=true;
            }
            i++
        }

        parent_elid_size_quantity.appendChild(elid_size_quantity)


        images_disp = 
        '<div class="row">'+
        '<div class="col-2">'+
            '<img src="'+prod_js[4]+'" width="100%" id="product-img">'+
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
                    '</div>'+
                '</div>'+
            '</div>';
            
            description = 
            '<div class="col-2">'+
            '<p>Home/Homme/Tshirt</p>'+
            '<h1>'+prod_js[1]+'</h1>'+
            '<h4>'+prod_js[2]+'€</h4>'+ parent_elid_size_quantity.innerHTML+
            /*'<select id="idel-size-'+prod_js[0]+'">'+
                '<option>S</option>'+
                '<option>M</option>'+
                '<option>L</option>'+
                '+<option>XL</option>'+
                '<option>XLL</option>'+
            '</select>'+ */
            '<br>'+
            '<input type="number" value=1>'+
            '<br>'+
            '<br>'+
            '<h3>Products Details</h3>'+
            '<br>'+
            '<p>T shirts fait main pour homme imprimé avec Nibbi Logo, 100% coton, manche en Wax, différents coloris et motifs disponibles'+ 
            '</p>'+
            '<br>'+
            '<button onclick="add_to_cart()" class="send-button">Ajouter au panier</button>'+
        '</div>'+
        '</div>';


        result= images_disp+description;
        console.log(result);
        product_disp_details.innerHTML = result;
    }
    
}













function items_id_load(){
   console.log(items_id.reset_items_id());

}

function products_men_load(){


    //console.log("Men prods click OK");
    const getproduct = new GetProduct();
    const display = new Display();

    items_id.men_items_id();
    //console.log(id_update);

    getproduct.getproduct().then(product=>{display.display_page(product)});
}

function products_load_details(){

    //console.log("Prod Details loaded");


    //localStorage.setItem("id",111);
    let men_test = localStorage.getItem("id");
    
    const getproduct_details = new GetProducts_details();
    const display = new Display_details();


    //console.log("ID Items:");
    //console.log(men_test);


    getproduct_details.getproduct(men_test).then(product=>{
        display.display_page(product);
        items_id.save_item_infos(product);
        //console.log(product[0]);
    });

    //localStorage.clear();

    var ProductImg = document.getElementById("ProductImg");
    var SmallImg = document.getElementsByClassName("small-img-col");

    SmallImg[0].onclick = function() 
    {
        ProductImg.src = SmallImg[0].src;
    }

    SmallImg[1].onclick= function() 
    {
        ProductImg.src = SmallImg[1].src;
    }

    SmallImg[2].onclick= function() 
    {
        ProductImg.src = SmallImg[2].src;
    }

    SmallImg[3].onclick= function() 
    {
        ProductImg.src = SmallImg[3].src;
    }


}

function add_to_cart(){

    //console.log("add to cart");

    const items_infos_loc = localStorage.getItem("items-infos");
    //console.log(items_infos_loc);
    //cart.add_item_to_cart(["Tshirt1","Price"]);
    cart.add_item_to_cartlist(JSON.parse(items_infos_loc));
    cart.add_item_to_cartdisp(JSON.parse(items_infos_loc));
    cart.disp_cart();




    /*
    const cart_item_rm = document.querySelector(".remove-item");   
    const cart_show = document.querySelector(".cart");
    const cart_trans = document.querySelector(".cart-overlay");
    const close_btn =  document.getElementById("close-cart");
    cart_show.classList.add("show-cart");
    cart_trans.classList.add("transparentBCG");

    close_btn.addEventListener('click',function(){
        cart_show.classList.remove("show-cart");
        cart_trans.classList.remove("transparentBCG");
        
    })

    cart_item_rm.addEventListener('click',function(){

        console.log(cart_item_rm.id);
        console.log(event.target.classList.contains("remove-item"));
        console.log(cart_item_rm.parentElement.parentElement.parentElement.id);
        cart.remove_item_cart();
        
    })
    */


}
function disp_cart_btn(){
    cart.disp_cart();
}

function clear_all_cart(){
    cart.clear_cart();
    cart.disp_cart();
}

// *******Currently used and efficient *********
function men_disp_test(value){
    items_id.test_id(value);
    //localStorage.setItem("id",value);
    console.log(value);
}

const items_id = new Items_Id();
const cart = new CartItems(); 











 



