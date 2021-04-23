import axios from 'axios';
import Swiper, {Autoplay, Pagination, EffectFade} from "swiper";
Swiper.use([Pagination, Autoplay, EffectFade]);

const users = [{"id":1,"create_at":"1980-07-31 04:45:46","body":"Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.","username":"jbilney8","fullname":"Jacynth Bilney","avatar":"https://robohash.org/sapientesedest.png?size=50x50\u0026set=set1","user_id":9,"background_color":"#a59b9a"},{"id":2,"create_at":"1988-05-12 20:21:47","body":"Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.","username":"kgoodburn1","fullname":"Kelila Goodburn","avatar":"https://robohash.org/ullamvoluptatibussed.png?size=50x50\u0026set=set1","user_id":2,"background_color":"#c56a84"},{"id":3,"create_at":"2001-11-28 23:55:41","body":"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.","username":"ldenk2","fullname":"Lorry Denk","avatar":"https://robohash.org/nonvoluptatemest.png?size=50x50\u0026set=set1","user_id":3,"background_color":"#03dc6a"},{"id":4,"create_at":"2013-05-10 09:17:07","body":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.","username":"mhughill7","fullname":"Mollie Hughill","avatar":"https://robohash.org/debitisatneque.png?size=50x50\u0026set=set1","user_id":8,"background_color":"#df3f26"}]

async function createTestimonials(){
  try {
    /* const numberOfPosts = 4;
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
    console.log(posts.data) 
  } catch (error) {
    console.error(error)
  }
}


async function createContent () {
  const testimonialsContainer = document.getElementById('testimonials-content');
  let items = '';
  users.forEach((item) => {
    const {id, body, fullname} = item;
    items += createItem({id, body, fullname})
  })
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
    },
  });
}

const createItem = (props) => {
  const {id, body, fullname} = props;
  const imagen = require(`../img/person_${id}.jpg`)
  const item = `
    <div class="swiper-slide testimonial text-center"> 
      <img src="${imagen}" alt="imagen de persona ${fullname}" class="img-shadow mb-4"/>
      <blockquote>"${body}"</blockquote>
      <p class="testimonial-name">${fullname}</p>
    </div>
  `;
  return item;
}
createContent()