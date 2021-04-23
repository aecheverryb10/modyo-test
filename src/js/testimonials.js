import axios from 'axios';
import Swiper, {Autoplay, Pagination, EffectFade} from "swiper";
Swiper.use([Pagination, Autoplay, EffectFade]);
const numberOfTestimonials= 4;

async function createTestimonials(){
  try {
    /* 
    AE: ESTO ERA PARA JSONPLACEHOLDER, NO ESTOY SEGURO SI ES FUNCIONAL O NO, PERO NO FUE POSIBLE IMPLEMENTARLO
    
    const numberOfPosts = 4;
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
    let finalData = [];
    for(let i = 0; i < numberOfPosts; i++){
      let post = posts.data[i];
      const {body} = post;
      finalData[i] = {body: body}
      let user = await axios.get(`https://jsonplaceholder.typicode.com/users/${i+1}`);
      finalData[i].name = user.data.name;
    } */
    const posts = await axios.get(`https://my.api.mockaroo.com/tweets.json?key=2411fdc0`)
    return posts.data 
  } catch (error) {
    console.error(error)
  }
}


async function createContent () {
  const testimonialsContainer = document.getElementById('testimonials-content');
  const users = await createTestimonials();
  let items = '';

  for(let i = 0; i < numberOfTestimonials; i++){
    let item = users[i];
    const {id, body, fullname} = item;
    items += createItem({id, body, fullname})
  }

  testimonialsContainer.innerHTML = items;
  new Swiper(".testimonials ", {
    loop: true,
    preloadImages: true,
    updateOnImagesReady: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    centeredSlides: true,
    keyboard: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    speed: 500, 
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });
}

const createItem = (props) => {
  const {id, body, fullname} = props;
  const imagen = require(`../img/person_${id}.jpg`)
  const item = `
    <div class="swiper-slide testimonial text-center px-3 px-lg-0"> 
      <img src="${imagen}" alt="imagen de persona ${fullname}" class="img-shadow mb-4"/>
      <blockquote>"${body}"</blockquote>
      <p class="testimonial-name">${fullname}</p>
    </div>
  `;
  return item;
}
createContent()