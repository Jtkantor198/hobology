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

//Code for rendering html to a div
function renderHTML(div, htmlString){
  var parser = new DOMParser();
  var parsedHtml = parser.parseFromString(htmlString, "text/html");
  for (var i = 0; i < parsedHtml.body.children.length; i++){
    div.appendChild(parsedHtml.body.children[i]);
  }
}

var sectionContainerCopy = sectionContainer.cloneNode();

function clearSectionContainer(){
  sectionContainer.remove();
  sectionContainer = sectionContainerCopy.cloneNode();
  document.getElementById("child-viewport").appendChild(sectionContainer);
}

recent.onclick = function(){
  clearSectionContainer();
  tabHandlers[0]();
} 

projects.onclick = function() {
  clearSectionContainer();
  tabHandlers[1]();
  renderHTML(sectionContainer,
    '<ul class="project-list"><li class="project"><img class="project-image" src="3Dmonkey.png"></img><div class="project-name">3D Rendering</div></li><li class="project"><div class="project-image">H</div><div class="project-name">Hobology.com</div></li></ul>');
}

blog.onclick = function() {
  clearSectionContainer();
  tabHandlers[2]();

}

readroll.onclick = function(){
  clearSectionContainer()
  tabHandlers[3]();

}

