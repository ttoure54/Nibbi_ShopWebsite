
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventlistener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
        print('open menu');
    } else { 
        menuBtn.classList.remove('open');
        menuOpen = false;
        print('close');
    }
});