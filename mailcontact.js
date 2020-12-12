
var modal_contact=document.getElementById("modal_contact");
modal_contact.classList.add("hide");


function open_contactform(){

    var contact_mail = document.getElementById("contact-mail");
    var contact_message=document.getElementById("contact-message");
    var name_sender=document.getElementById("");
    var surname_sender=document.getElementById("");

    modal_contact.classList.remove("hide");
    modal_contact.classList.add("show");

    var close=document.getElementById("close");

    close.addEventListener('click', () => {
        modal_contact.classList.remove("show");
        modal_contact.classList.add("hide");
    });

}


function send_contactmessage() {
    document.getElementById("send-contactmessage").innerHTML= "Thanks you, Message sent";
    document.getElementById("divcontact-mail").innerHTML= "conatct mail";
}


