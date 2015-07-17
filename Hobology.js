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
classList = ["recent-active", "projects-active","blog-active","readroll-active"];
tabs = [recent, projects, blog, readroll];
tabHandlers = [];

//creates handlers to add classes with psuedoselectors to sectio titles to initiate transtions
var clicked = false;

function tabHandler(value){
    return function(){
        if (clicked == false){
          addClass(document.getElementById("child-viewport"),"child-viewport");
          clicked = true;
        }
        for (var i=0; i<classList.length; i++) {
            removeClass(mainSectionList, classList[i]);
            addClass(tabs[i],"tab-passive");
        }
        removeClass(tabs[value],"tab-passive");
        addClass(mainSectionList, classList[value]);   //Our tab focus
        addClass(sectionContainer, "main-sect-active");  //Our opening sweep
    };
}

for (var i=0; i<tabs.length; i++){
    tabHandlers[i] = tabHandler(i);
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
  document.body.style["overflow-y"] = "scroll";
}
/*function startScrolling(){
  //----------Scroll Wheel Handler---------
  document.addEventListener("wheel" , function(wheel){
    var lengthOfPage = sectionContainer.offsetTop + sectionContainer.offsetHeight - document.getElementsByClassName("main-top-right")[0].offsetTop;
    var bottomOfPage = sectionContainer.offsetTop + sectionContainer.offsetHeight;
    var marginTop = Number(document.getElementsByClassName("main-top-right")[0].style.marginTop.substring(0,document.getElementsByClassName("main-top-right")[0].style.marginTop.length-2));
    if ((marginTop - wheel.deltaY) > 0){
      document.getElementsByClassName("main-top-right")[0].style.marginTop = "0px"
    }
    else if (bottomOfPage - wheel.deltaY < window.innerHeight){
      document.getElementsByClassName("main-top-right")[0].style.marginTop = String(window.innerHeight - lengthOfPage);
    }
    else {
      document.getElementsByClassName("main-top-right")[0].style.marginTop = String(marginTop - wheel.deltaY) ;
    }
  });

  //---------Arrow Key Handler-------
  document.addEventListener("keydown",function(keydown){
    if ((keydown.which == 38)||(keydown.which == 40)){
      if (keydown.which == 38){
        var amount = -10; 
      }
      else{
        var amount = 10;
      }
      var lengthOfPage = sectionContainer.offsetTop + sectionContainer.offsetHeight - document.getElementsByClassName("main-top-right")[0].offsetTop;
      var bottomOfPage = sectionContainer.offsetTop + sectionContainer.offsetHeight;
      var marginTop = Number(document.getElementsByClassName("main-top-right")[0].style.marginTop.substring(0,document.getElementsByClassName("main-top-right")[0].style.marginTop.length-2));
      if ((marginTop - amount) > 0){
        document.getElementsByClassName("main-top-right")[0].style.marginTop = "0px"
      }
      else if (bottomOfPage - amount < window.innerHeight){
        document.getElementsByClassName("main-top-right")[0].style.marginTop = String(window.innerHeight - lengthOfPage);
      }
      else {
        document.getElementsByClassName("main-top-right")[0].style.marginTop = String(marginTop - amount) ;
      }
    }
  });
}*/


//Code for rendering html to a div
function renderHTML(div, htmlString){
  var parser = new DOMParser();
  var parsedHtml = parser.parseFromString(htmlString, "text/html");
  for (var i in parsedHtml.children){
    div.appendChild(parsedHtml.children[i]);
  }
}

document.addEventListener("drag",function(drag){
  console.log("lolo");
})
console.log("this happened");


recent.onclick = function(){
  tabHandlers[0]();
} 

projects.onclick = function() {
  tabHandlers[1]();

}

blog.onclick = function() {
  tabHandlers[2]();

}

readroll.onclick = function(){
  tabHandlers[3]();

}

