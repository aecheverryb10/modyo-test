const btnMenu = document.getElementById('mobile-nav-button');
const mainNav = document.getElementById('main-nav');
let isShowMenu = false;
btnMenu.addEventListener('click', ()=>{
  if(isShowMenu){
    mainNav.classList.remove('show-menu');
    isShowMenu = false;
  }else{
    mainNav.classList.add('show-menu');
    isShowMenu = true;
  }
})