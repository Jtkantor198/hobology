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

/*--------Write dynamic css to transitions to section titles upon click--------*/
/*After click, apply scrolling handler*/
recentSection = document.getElementById("main-recent");
mainSectionList = document.getElementsByClassName("main-section-list")[0];
sectionContainer = document.getElementsByClassName("section-container")[0];

//Getting the elements to assign handlers to
recent      = document.getElementById("main-recent");
projects    = document.getElementById("main-projects");
blog        = document.getElementById("main-blog");
readroll    = document.getElementById("main-readroll");

//The active classes we switch between
class_list = ["recent-active", "projects-active","blog-active","readroll-active"];
tab_ele_list   = [recent, projects, blog, readroll];

//assigning handlers to add classes with psuedoselectors to initiate transtions
var clicked = false;

recent.onclick  = function(){
    if (clicked == false){
      startScrolling();
      cliked = true;
    }
    for (var item in class_list)
        removeClass(mainSectionList, class_list[item]);
    addClass(mainSectionList, class_list[0]);   //Our tab focus
	addClass(sectionContainer, "main-sect-active");  //Our opening sweep
};
projects.onclick= function(){
    if (clicked == false){
      startScrolling();
      cliked = true;
    }
    for (var item in class_list)
        removeClass(mainSectionList, class_list[item]);
    addClass(mainSectionList, class_list[1]);   //Our tab focus
	addClass(sectionContainer, "main-sect-active");  //Our opening sweep
};
blog.onclick    = function(){
    if (clicked == false){
      startScrolling();
      cliked = true;
    }
    for (var item in class_list)
        removeClass(mainSectionList, class_list[item]);
    addClass(mainSectionList, class_list[2]);   //Our tab focus
	addClass(sectionContainer, "main-sect-active");  //Our opening sweep
};
readroll.onclick= function(){
    if (clicked == false){
      startScrolling();
      cliked = true;
    }
    for (var item in class_list)
        removeClass(mainSectionList, class_list[item]);
    addClass(mainSectionList, class_list[3]);   //Our tab focus
	addClass(sectionContainer, "main-sect-active");  //Our opening sweep
};


function tabHandler(value){
    return function(){
        if (clicked == false){
          startScrolling();
          clicked = true;
        }
        for (var i=0; i<class_list.length; i++) {
            removeClass(mainSectionContainer, class_list[i]);
            addClass(tab_ele_list[i],"tab-passive");
        }
        removeClass(tab_ele_list[value],"tab-passive");
        addClass(mainSectionContainer, class_list[value]);   //Our tab focus
	    addClass(sectionContainer, "main-sect-active");  //Our opening sweep
    };
}

for (var i=0; i<tab_ele_list.length; i++){
    tab_ele_list[i].onclick=tabHandler(i);
}

/*--------Assigning hadlers to build about and contact pages, and switch between them--------*/
var mainTopRight = document.getElementsByClassName("main-top-right")[0];
document.getElementById("main-about").onclick = aboutHandler;

function aboutHandler(){
    var aboutPage = document.createElement("div");
    aboutPage.className = "about-contact-page";
    aboutPage.id = "active-about-page";
    document.body.appendChild(aboutPage);
    var aboutPage = document.getElementById("active-about-page");
    var aboutMainTopRight = mainTopRight.cloneNode(true);
    aboutMainTopRight.id = "main-top-right";
    aboutMainTopRight.children.namedItem("main-about").onclick = function(){
      document.body.removeChild(document.getElementById("active-about-page"));
    }
    aboutMainTopRight.children.namedItem("main-contact").onclick = function(){
      document.body.removeChild(document.getElementById("active-about-page"));
      contactHandler();
    }
    aboutPage.appendChild(aboutMainTopRight);
    aboutPage.children.namedItem("main-top-right").children.namedItem("main-about").className += "main-selected-about-contact";
}

document.getElementById("main-contact").onclick = contactHandler;

function contactHandler(){
    var contactPage = document.createElement("div");
    contactPage.className = "about-contact-page";
    contactPage.id = "active-contact-page";
    document.body.appendChild(contactPage);
    var contactPage = document.getElementById("active-contact-page");
    var contactMainTopRight = mainTopRight.cloneNode(true);
    contactMainTopRight.id = "main-top-right";
    contactMainTopRight.children.namedItem("main-contact").onclick = function(){
      document.body.removeChild(document.getElementById("active-contact-page"));
    }
    contactMainTopRight.children.namedItem("main-about").onclick = function(){
      document.body.removeChild(document.getElementById("active-contact-page"));
      aboutHandler();
    }
    contactPage.appendChild(contactMainTopRight);
    contactPage.children.namedItem("main-top-right").children.namedItem("main-contact").className += "main-selected-about-contact";
}

/*--------Scroll Handler--------*/
function startScrolling(){
  document.addEventListener("wheel" , function(wheel){
    var lengthOfPage = sectionContainer.offsetTop + sectionContainer.offsetHeight - document.getElementsByClassName("main-top-right")[0].offsetTop;
    var bottomOfPage = sectionContainer.offsetTop + sectionContainer.offsetHeight;
    var marginTop = Number(document.getElementsByClassName("main-top-right")[0].style.marginTop.substring(0,document.getElementsByClassName("main-top-right")[0].style.marginTop.length-2));
    if ((marginTop - wheel.deltaY) > 0){
      document.getElementsByClassName("main-top-right")[0].style.marginTop = "0px"
    }
    else if (bottomOfPage - wheel.deltaY < window.innerHeight){
      document.getElementsByClassName("main-top-right")[0].style.marginTop = String(window.innerHeight - lengthOfPage);
      console.log(String(window.innerHeight - bottomOfPage) + "what!");
    }
    else {
      document.getElementsByClassName("main-top-right")[0].style.marginTop = String(marginTop - wheel.deltaY) ;
    }
  })
}
