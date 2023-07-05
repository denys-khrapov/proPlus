jQuery(document).ready(function ($) {
	testWebPFunction();
	initAccordion();
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



function initAccordion() {
	let acc = document.getElementsByClassName("accordion__btn");
	let i;
	
	
	for (i = 0; i < acc.length; i++) {
	  acc[i].addEventListener("click", function() {
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