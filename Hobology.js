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

var aboutContent='<div class="about-title">Hobology</div><div class="about-content"><p>During the summer of 2015, Sergei and I decided to work on a few devolpment projects. Among those was designing and building a website for us to  share ideas and present the projects we were working on.</p><p>We  attempted to use Bootstrap by editing their Sass. But the more we worked the more we realized our limited, child-like attempts to customize the framework to our needs weren’t working. This website was built with raw html, css, and javascript. No preprocessors, no frameworks, no libraries. It was build as a demonstration that frameworks, although helpful for speed and clarity, can hamper creativity and cause reliance. Now that we’re much better at building websites we’ll likely use more CSS frameworks in the future. And we’ll definitely be using preproessors.</p><p>When we built this we were not actually homeless. We were renting a room from a friend in Lancaster, PA. I had just graduated college as had many of my friends, and among fears of unemployment we often joked of becoming hobo’s. During the summer we devolped a comformtable lifestyle. Making all our own meals, taking lots of walks in the local parks, and studying whatever we felt like between our coding sessions. (Mostly differential equations for me. Sergei was often working on online classes.) We called this lifestyle Hobology.</p><p>If the website’s name seems off-putting, perhaps too unprofessional, too devoid of terms like “enterprise-driven” then you’re also part of the reason this website is called Hobology.</p></div>';

var contactContent='<div class="about-title">Hobology</div><div class="about-content"><p>If you have questions, or just want to say hi, feel free to contact us at</p><table><tr><td>Justin</td><td>Sergey</td></tr><tr><td>jtkantor198@gmail.com</td><td>powah.serge@gmail.com</td></tr></table><p>Direct all work inquiries to <a href="mailto:team.hobology@gmail.com">here</a></p></div>';

/*--------Assigning hadlers to build about and contact pages, and switch between them--------*/
var mainTopRight = document.getElementsByClassName("main-top-right")[0];

function aboutHandler(){
    var aboutPage = document.createElement("div");
    aboutPage.className = "about-contact-page";
    var aboutPageBackround = document.createElement("div");
    aboutPageBackround.className = "about-contact-page-backround";
    aboutPage.id = "active-about-page";
    document.body.appendChild(aboutPageBackround);
    document.body.appendChild(aboutPage);
    var aboutPage = document.getElementById("active-about-page");
    var aboutMainTopRight = mainTopRight.cloneNode(true);
    aboutMainTopRight.id = "main-top-right";
    aboutPage.appendChild(aboutMainTopRight);
    renderHTML(aboutPage, aboutContent);
    aboutPage.children[0].children.namedItem("main-about").onclick = function(){
      document.body.removeChild(document.getElementsByClassName("about-contact-page-backround")[0]);
      document.body.removeChild(document.getElementById("active-about-page"));
    }
    aboutPage.children[0].children.namedItem("main-contact").onclick = function(){
      document.body.removeChild(document.getElementsByClassName("about-contact-page-backround")[0]);
      document.body.removeChild(document.getElementById("active-about-page"));
      contactHandler();
    }
    aboutPage.children.namedItem("main-top-right").children.namedItem("main-about").className += "main-selected-about-contact";
}



function contactHandler(){
    var contactPage = document.createElement("div");
    contactPage.className = "about-contact-page";
    var aboutPageBackround = document.createElement("div");
    aboutPageBackround.className = "about-contact-page-backround";
    contactPage.id = "active-contact-page";
    document.body.appendChild(aboutPageBackround);
    document.body.appendChild(contactPage);
    var contactPage = document.getElementById("active-contact-page");
    var contactMainTopRight = mainTopRight.cloneNode(true);
    contactMainTopRight.id = "main-top-right";
    contactPage.appendChild(contactMainTopRight);
    renderHTML(contactPage, contactContent);
    contactPage.children[0].children.namedItem("main-contact").onclick = function(){
      document.body.removeChild(document.getElementsByClassName("about-contact-page-backround")[0]);
      document.body.removeChild(document.getElementById("active-contact-page"));
    }
    contactPage.children[0].children.namedItem("main-about").onclick = function(){
      document.body.removeChild(document.getElementsByClassName("about-contact-page-backround")[0]);
      document.body.removeChild(document.getElementById("active-contact-page"));
      aboutHandler();
    }
    contactPage.children.namedItem("main-top-right").children.namedItem("main-contact").className += "main-selected-about-contact";
}

//assigning the actual handlers
document.getElementById("main-contact").onclick = contactHandler;
document.getElementById("main-about").onclick = aboutHandler;

//Code for rendering html to a div
function renderHTML(div, htmlString){
  var parser = new DOMParser();
  var parsedHtml = parser.parseFromString(htmlString, "text/html");
  div.innerHTML += parsedHtml.body.innerHTML;
}

var sectionContainerCopy = sectionContainer.cloneNode();

function clearSectionContainer(){
  sectionContainer.remove();
  sectionContainer = sectionContainerCopy.cloneNode();
  document.getElementById("child-viewport").appendChild(sectionContainer);
}

recent.onclick = function(){
  /*clearSectionContainer();*/
  tabHandlers[0]();
}

projects.onclick = function() {
  clearSectionContainer();
  tabHandlers[1]();
  renderHTML(sectionContainer,
    '<ul class="project-list"><li class="project"><img class="project-image" src="3Dmonkey.png"></img><div class="project-name">3D Rendering</div></li><li class="project"><div class="project-image">H</div><div class="project-name">Hobology.com</div></li></ul>');
  /*var stateObj = {};
  history.pushState(stateObj, "projects page", "/Projects");*/
}

blog.onclick = function() {
  clearSectionContainer();
  tabHandlers[2]();
}

readroll.onclick = function(){
  clearSectionContainer()
  tabHandlers[3]();
}

function resizeContent(className){
  for (var i=0; i < document.getElementsByClassName(className).length;i++){
    var boxHeight = document.getElementsByClassName(className)[i].children[0].offsetHeight;
    document.getElementsByClassName(className)[i].children[1].style.height = String(0.9*boxHeight) + "px";
    document.getElementsByClassName(className)[i].children[1].style["margin-top"] = String(0.005*boxHeight) + "px";
  }
}

resizeContent("blog-post");
resizeContent("recent-readroll-post");
fixTheProblem();


window.onresize = function(){
  resizeContent();
  fixTheProblem();
}


function ellipseText(div){
    var i = 0;
    while(div.childNodes[i].getBoundingClientRect().bottom < div.getBoundingClientRect().bottom){
        if ((typeof div.children[i].completeText) != "undefined"){
          div.children[i].innerText = div.children[i].completeText;
        }
        i++;
    }
    //i is now the paragraph that intersects
    var psize   = div.getBoundingClientRect().bottom - div.childNodes[i].getBoundingClientRect().top;
    var pheight = div.childNodes[i].getBoundingClientRect().bottom - div.childNodes[i].getBoundingClientRect().top;
    var fontsize= Number(window.getComputedStyle(div.childNodes[i]).fontSize.substring(0,(window.getComputedStyle(div.childNodes[i]).fontSize.length - 2)));
    var allowedCharacters = Math.floor(div.childNodes[i].innerText.length*Math.floor((psize*0.7)/fontsize)/Math.floor(pheight/fontsize));
    if ((typeof div.children[i].completeText) == "undefined"){
      div.children[i].completeText = div.children[i].innerText;
    }
    div.children[i].innerText = div.children[i].completeText.substring(0,allowedCharacters-4) + '...';
};

function fixTheProblem(){
  for (var i=0; i < document.getElementsByClassName("blog-post").length;i++){
    ellipseText(document.getElementsByClassName("blog-post")[i].children[1]);
  }
}
