/*Write dynamic css to transition to box upon click*/
/*After click, apply scrolling handler*/
recentSection = document.getElementById("main-recent");
mainSectionContainer = document.getElementsByClassName("main-section-container");
sectionContainer = document.getElementsByClassName("section-container");
recentSection.onclick = function(){
	/*mainSectionContainer.className += " main-section-container-after-click";
	sectionContainer.className += " section-container-after-click";*/
	mainSectionContainer[0].className += " sect-active";
	sectionContainer[0].className += " main-sect-active";
}

function transition(element, property, value, length){
	//currently only limited support

	setInterval(function(){
		element.style[property] = value;
	})
}

function scrollingHandler(){
	
}
