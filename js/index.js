// Video modal
function wsVideoModalInit(opnions){
	const id = options[0].src
	let widthVideo = null
	let heightVideo = null

	// Рендер модального окна
	function _renderModal(idVideo, widthVideo, heightVideo){
		const $body = document.querySelector('body')
		$body.classList.add('hiden')
		videoBlock = ` 
			<div class="ws-modal__overlay">
            <span class="ws-modal__close">&#10006;</span>
            <iframe class="ws-modal__block" style="width: ${widthVideo || '870px'}; height: ${heightVideo || '500px'};" src="https://www.youtube.com/embed/${id || ''}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
		`
		let div = document.createElement('div')
  	div.className = "ws-modal__video"
  	div.innerHTML = `${videoBlock}`
  	document.body.prepend(div)
  	const overlay = document.querySelector('.ws-modal__overlay')

  	function _close(event){
   		const modalVideo = document.querySelector('.ws-modal__video')
  		$body.classList.remove('hiden')
  		modalVideo.remove()
  		overlay.removeEventListener('click', _close)
  	}
  	overlay.addEventListener('click', _close)
	}

	// Функция рендера превью
	function _renderBlock(container, src='', alt=''){
		let videoImgBlock = `
			<div class="ws-modal__wrap">
          <div class="ws-video__icon">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" class="svg-inline--fa fa-youtube fa-w-18" role="img" viewBox="0 0 576 512">
                  <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>
              <img src="http://img.youtube.com/vi/${id || ''}/hqdefault.jpg" alt="${alt || ''}" class="ws-video__img">
          </div>
      </div>
	  `

	  let div = document.createElement('div')
  	div.className = "ws-modal__wrap"
  	div.innerHTML = `${videoImgBlock}`
  	container.prepend(div)
	}

	// Функция рендера модального окна

	// Проверяем не пуст ли массив и запускаем рендер
	if(options.langth !== 0){
		// const container = document.querySelector(options.container);
		for (var i = 0; i < options.length; i++) {
			const container = document.querySelector(opnions[i].container)
			if(!container){
				return ''
			}
			widthVideo = opnions[i].widthVideo
			heightVideo = opnions[i].widthVideo
			_renderBlock(container, opnions[i].src, opnions[i].alt)
		}
		// Навешиваем события клика на превью
		function _eventClick(){
			const blockEvent = document.querySelectorAll('.ws-video__icon')
			blockEvent.forEach(function(item) {
				item.addEventListener('click', ()=>{
					// console.log()
					_renderModal()
				})
			})
		}
		_eventClick()
	}
}
wsVideoModalInit(options = [
	 {
		container:'.slide-video',
		src: 'efwL2aV54sY',
		alt: 'video alt',
		widthVideo: '870px',
		heightVideo: '500px',
		title: 'Title',
		decription: 'Text Text Text Text Text Text Text Text Text Text Text Text',
	},
])

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
