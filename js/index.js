
window.addEventListener('DOMContentLoaded', () => {
// Video modal
const modalVideoConstructor = function(options) {

  // const $container = document.querySelector('#ws-v');
  const $video = document.querySelectorAll('[data-ws-vblock]');
  const $body = document.querySelector('body');

  // }
  const renderBlock = function(el) {
      /**
       * Отрисовывает все привью на странице
       * id берется с дата атрибута ссылки
       */
      if($video){
          let lenghtId = el.dataset.wsVblock;
      let idV = lenghtId.split('/');
      let lengthObj = idV.length - 1;
      let id = idV[lengthObj];

      let alt = 'prevue'
      let videoImgBlock = `
              <div class="ws-video-modal__overlay">
                  <div class="ws-video-modal__content-icon">
                  <div class='ws-video-modal__icon-play'></div>
              </div>
              <img class="ws-video-modal__preview" src="http://img.youtube.com/vi/${id || ''}/hqdefault.jpg" alt="${options.alt || 'preview video'}">
      `
      let div = document.createElement('div')
      div.className = "ws-video-modal__content"
      div.innerHTML = `${videoImgBlock}`
      el.prepend(div)

      }
      
  }

  function eventClickVideoBlock(el){
      el.addEventListener('click', (event)=>{
          let lenghtId = event.path[3].dataset.wsVblock;
          let idV = lenghtId.split('/');
          let lengthObj = idV.length - 1;
          let id = idV[lengthObj];
          renderModal(id)
      })
  }

  function itemsValue() {
      if($video){
          $video.forEach(function(item) {
          renderBlock(item)
          eventClickVideoBlock(item)
          });
      }
      // Получаем наши блоки, куда надо рендерить превью.
      
  }

  function renderModal(id = '') {
      let alt = options.alt;
      let videoBlock = ` 
                  <div class="ws-modal__v-top-overlay">
                      <span class="ws-modal__close">&#10006;</span>
        <div class="ws-modal__video-wrap">
          <iframe class="ws-modal__iframe" src="https://www.youtube.com/embed/${id || ''}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
      `
      let div = document.createElement('div')
      div.className = "ws-modal__video"
      div.innerHTML = `${videoBlock}`
      document.body.prepend(div)

      $body.classList.add('scrol-none')
      const close = document.querySelector('.ws-modal__close')
      close.addEventListener('click', closeModal)
  }
  function closeModal(){
      $body.classList.remove('scrol-none');
      const close = document.querySelector('.ws-modal__close')
      close.removeEventListener( "click", closeModal);
      document.querySelector('.ws-modal__video').remove()
  }
  itemsValue(); //Выводит все картинки/превью
}


modalVideoConstructor({
  alt: 'preview video',
});


// Swiper
const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  slidesPerView: 1,
  // spaceBetween: 50,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
    navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  pagination: {
    el: '.slider-pagination',
    type: 'bullets',
  },
})

const footerBtn = document.querySelectorAll('.btn-effect');

function deleteBtnEffects(){
	footerBtn.forEach(function(item) {
	item.offsetParent.classList.remove('button-effect')
	// console.dir(item.offsetParent)
	});
}
footerBtn.forEach(function(item) {
	item.classList.remove('buttton-effect')
	item.addEventListener('click', (event)=>{
		console.log(event.target.offsetParent)
		event.target.offsetParent.classList.add('button-effect')
		setTimeout(deleteBtnEffects, 2000);
	})
});
})