jQuery(document).ready(function ($) {
	testWebPFunction();
	initAccordion();
	initReadMore();
	initSwiper();
	initClickCard();
});

function testWebPFunction() {
	//Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	})
}

function initSwiper() {
	let swiperBenefits = new Swiper('.benefits-slider', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 'auto',
				spaceBetween: 24,
				loop: false,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 24,
				loop: false,
			}
		}
	});

	let swiperReviews = new Swiper('.reviews-slider', {
		slidesPerView: 'auto',
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		breakpoints: {
			320: {
				spaceBetween: 24,
				loop: false,
			},
			1200: {
				spaceBetween: 24,
				loop: false,
			}
		}
	});

	swiperBenefits.on('slideChange', function () {
		// Закрыть открытые отзывы
		closeOpenReviews();
	});

	swiperReviews.on('slideChange', function () {
		// Закрыть открытые отзывы
		closeOpenReviews();
	});
}

// function initReadMore() {
// 	const more = $(".read-more");

// 	if (more) {
// 	  more.click(function (e) {
// 		 var currentMoreBtn = jQuery(this);
// 		 var contentHolder = currentMoreBtn.closest(".reviews-slide__inner");
// 		 var content = contentHolder.find(".content-inner");
// 		 var contentFull = contentHolder.find(".content-full");
// 		 var open = currentMoreBtn.hasClass('show');

// 		 if (open) {
// 			content.removeAttr("style");
// 			currentMoreBtn.removeClass('show');
// 		 } else {
// 			content.css("max-height", contentFull.height());
// 			currentMoreBtn.addClass('show');
// 		 }
// 	  });
// 	}
// }

// function initReadMore() {
// 	const more = $(".read-more");

// 	if (more) {
// 		more.each(function () {
// 			var currentMoreBtn = $(this);
// 			var contentHolder = currentMoreBtn.closest(".reviews-slide__inner");
// 			var content = contentHolder.find(".content-inner");
// 			var contentFull = contentHolder.find(".content-full");
// 			var open = currentMoreBtn.hasClass('show');
// 			var minHeight = 110; // Минимальная высота, при которой read-more должен быть скрыт

// 			if (contentFull.height() < minHeight) {
// 				currentMoreBtn.hide();
// 			} else {
// 				currentMoreBtn.show();
// 			}

// 			currentMoreBtn.click(function (e) {
// 				open = !open;

// 				if (open) {
// 					content.removeAttr("style");
// 					currentMoreBtn.removeClass('show');
// 				} else {
// 					content.css("max-height", contentFull.height());
// 					currentMoreBtn.addClass('show');
// 				}
// 			});
// 		});
// 	}
// }

function initReadMore() {
	const more = $(".read-more");


	if (more) {
		more.each(function () {
			var currentMoreBtn = $(this);
			var contentHolder = currentMoreBtn.closest(".benefits-slide__inner, .reviews-slide__inner");
			var content = contentHolder.find(".content-inner");
			var contentFull = contentHolder.find(".content-full");
			var minHeight = 111; // Минимальная высота, при которой read-more должен быть скрыт
			var minHeightBenefits = 126;

			currentMoreBtn.click(function (e) {
				var open = currentMoreBtn.hasClass('show');

				if (open) {
					content.removeAttr("style");
					currentMoreBtn.removeClass('show');
				} else {
					content.css("max-height", contentFull.height());
					currentMoreBtn.addClass('show');
				}
			});

			// Проверка высоты .content-full после загрузки контента
			contentFull.on("load", function () {
				if (contentFull.height() < minHeight || contentFull.height() < minHeightBenefits) {
					currentMoreBtn.hide();
				} else {
					currentMoreBtn.show();
				}
			});

			// Проверка высоты .content-full при загрузке страницы
			if (contentFull.height() < minHeight || contentFull.height() < minHeightBenefits) {
				currentMoreBtn.hide();
			} else {
				currentMoreBtn.show();
			}
		});
	}
}

function closeOpenReviews() {
	const openReviews = $(".read-more.show");
	openReviews.each(function () {
		var currentMoreBtn = $(this);
		var contentHolder = currentMoreBtn.closest(".benefits-slide__inner, .reviews-slide__inner");
		var content = contentHolder.find(".content-inner");

		content.removeAttr("style");
		currentMoreBtn.removeClass('show');
	});
}

function initAccordion() {
	let acc = document.getElementsByClassName("accordion__btn");
	let i;


	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			let isActive = this.classList.contains("active");

			for (let j = 0; j < acc.length; j++) {
				acc[j].classList.remove("active");
				let panel = acc[j].nextElementSibling;
				panel.style.maxHeight = null;
			}

			if (!isActive) {
				this.classList.add("active");
				let panel = this.nextElementSibling;
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}
}

function initClickCard() {
	var cards = $('.advantages-card');

	cards.each(function () {
		var card = $(this);
		card.click(function () {
			if (card.hasClass('active')) {
				card.removeClass('active');
			} else {
				card.addClass('active');
			}
		});
	});
}





AOS.init();



