/*Write dynamic css to transition to box upon click*/
/*After click, apply scrolling handler*/
recentSection = document.getElementById("main-recent");
mainSectionContainer = document.getElementsByClassName("main-section-container")[0];
sectionContainer = document.getElementsByClassName("section-container")[0];

//Getting the elements to assign handlers to
recent      = document.getElementById("main-recent");
projects    = document.getElementById("main-projects");
blog        = document.getElementById("main-blog");
readroll    = document.getElementById("main-readroll");

recent.onclick  = function(){
	mainSectionContainer.className += " recent-active";
	sectionContainer.className += " main-sect-active";
};
projects.onclick= function(){
	mainSectionContainer.className += " projects-active";
	sectionContainer.className += " main-sect-active";
};
blog.onclick    = function(){
	mainSectionContainer.className += " blog-active";
	sectionContainer.className += " main-sect-active";
};
readroll.onclick= function(){
	mainSectionContainer.className += " readroll-active";
	sectionContainer.className += " main-sect-active";
};


/*
recentSection.onclick = function(){
    mainSectionContainer.addEventListener("transitionend", function() {alert("transition ended!");});
	mainSectionContainer.className += " sect-active";
    sectionContainer.addEventListener("transitionend", function() {alert("transition ended!");});
	sectionContainer.className += " main-sect-active";
}

function transition(element, property, value, length){
	//currently only limited support

	setInterval(function(){
		element.style[property] = value;
	})
}

function scrollingHandler(){
	
}
*/
