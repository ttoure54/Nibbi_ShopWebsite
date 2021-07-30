

console.log("Hello word")

var updateBtn = document.getElementsByClassName('update-cart')

for(i=0; i<updateBtn.length; i++){

    updateBtn[i].addEventListener('click',function(){
        var productId = this.dataset.product 
        var action = this.dataset.action
        console.log('productId :', productId, 'Action :', action)


        console.log('USER: ', user)
        if (user == 'AnonymousUser'){
            addCookieItem(productId, action)
        }else{
            console.log('User logged')
            updateUserOrder(productId, action)
        }

    })
}

function addCookieItem(productId, action){

    if (action == "add"){
        if (cookie_cart[productId]===undefined){
            cookie_cart[productId]={'quantity':1}
        }else{
            cookie_cart[productId]['quantity'] += 1
        }
    }

    if (action == "remove"){
        cookie_cart[productId]['quantity'] -= 1
        if(cookie_cart[productId]['quantity'] <= 0){
            console.log('delete ietm')
            delete(cookie_cart[productId]);
        }
    }

    console.log('Cookie cart:', cookie_cart)

    document.cookie = 'cart='+JSON.stringify(cookie_cart)+";domain=;path=/"

    console.log('User is not authenticated: adding cookie')

}


function updateUserOrder(productId, action){
    console.log('User is authenticated, sending data')

    var url = '/update_item/'

    /*Contruct request*/

    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken': csrftoken,      },
        body: JSON.stringify({'productId': productId, 'action':action })
    })
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log('data:', data)
    })

}


