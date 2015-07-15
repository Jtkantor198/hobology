/*Write dynamic css to transition to box upon click*/
/*After click, apply scrolling handler*/
recentSection = document.getElementById("main-recent");
mainSectionContainer = document.getElementById("main-section-container");
sectionContainer = document.getElementById("section-container");
recentSection.onclick = function(){
	/*mainSectionContainer.className += " main-section-container-after-click";
	sectionContainer.className += " section-container-after-click";*/
	mainSectionContainer.style.margin = "1vh auto 0 calc(50vw - 2em);";
	sectionContainer.style = "margin: 0vh 0 0 0;";
}