//Functions to manipulate class info
function hasClass(ele,cls) {
      return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
      if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
      if (hasClass(ele,cls)) {
              var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
                  ele.className=ele.className.replace(reg,' ');
                    }
}

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

class_list = ["recent-active", "projects-active","blog-active","readroll-active"];

recent.onclick  = function(){
    for (var item in class_list)
        removeClass(mainSectionContainer, class_list[item]);
    addClass(mainSectionContainer, class_list[0]);   //Our tab focus
	addClass(sectionContainer, "main-sect-active");  //Our opening sweep
};
projects.onclick= function(){
    for (var item in class_list)
        removeClass(mainSectionContainer, class_list[item]);
    addClass(mainSectionContainer, class_list[1]);   //Our tab focus
	addClass(sectionContainer, "main-sect-active");  //Our opening sweep
};
blog.onclick    = function(){
    for (var item in class_list)
        removeClass(mainSectionContainer, class_list[item]);
    addClass(mainSectionContainer, class_list[2]);   //Our tab focus
	addClass(sectionContainer, "main-sect-active");  //Our opening sweep
};
readroll.onclick= function(){
    for (var item in class_list)
        removeClass(mainSectionContainer, class_list[item]);
    addClass(mainSectionContainer, class_list[3]);   //Our tab focus
	addClass(sectionContainer, "main-sect-active");  //Our opening sweep
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
