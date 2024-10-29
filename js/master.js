//add or remove open class for setting
let gear = document.querySelector(".settings-box .gear");
gear.onclick = function () {
    gear.parentElement.classList.toggle("open");
};
//change the main color of the page and save it in the local strorage
const colorsLi = document.querySelectorAll(
    ".settings-box .option-box .colors-list li"
);
if (localStorage.getItem("mainColor")) {
    document.documentElement.style.setProperty(
        "--main-color",
        localStorage.getItem("mainColor")
    );
    colorsLi.forEach((li) => {
        li.dataset.color === localStorage.mainColor
            ? li.classList.add("active")
            : li.classList.remove("active");
    });
}
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        // add and remove active calss  from li
        HandleActive(e);
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );
        localStorage.mainColor = li.dataset.color;
    });
});
//random-backgrouns:en click remove active class from span active and add it to current sapn(cliquer)
let randomBackground = true; //random background option
let bagroundInrerval; //id to reference setTnterval
//get the random background option from localstorage if it exist if not the default value is true
if (localStorage.randomBackground) {
    randomBackground = JSON.parse(localStorage.randomBackground);
    document
        .querySelectorAll(
            ".settings-box .option-box .random-backgrounds > span"
        )
        .forEach((ele) => {
            //remove class active for the old span option and add it in the  new sapn option
            ele.classList.contains(randomBackground ? "yes" : "no")
                ? ele.classList.add("active")
                : ele.classList.remove("active");
        });
}
document
    .querySelectorAll(".settings-box .option-box .random-backgrounds > span")
    .forEach((opt) => {
        opt.addEventListener("click", (ev) => {
            //remove active class from last option and add it in the new option
            HandleActive(ev);
            //get the option choose by the user
            if (ev.target.classList.contains("yes")) {
                randomBackground = true;
                random_Background();
            } else {
                randomBackground = false;
                //stop random_background
                clearInterval(bagroundInrerval);
                //change the background page to the first background
                document.getElementsByClassName(
                    "landding"
                )[0].style.backgroundImage = "url(./images/land1.jpg)";
            }
            //save the option in localstorage
            localStorage.randomBackground = randomBackground;
        });
    });
//display or not the nav-bullets
const showBullet = document.querySelectorAll(
    ".settings-box .show-bullets span"
);
showBullet.forEach((opt) => {
    opt.addEventListener("click", (e) => {
        HandleActive(e);
        if (e.target.classList.contains("yes")) {
            document.querySelector(".nav-bullets").style.display = "block";
        } else document.querySelector(".nav-bullets").style.display = "none";
    });
});
// add and remove class from element function
function HandleActive(event) {
    //remove active class from all element
    event.target.parentElement.querySelectorAll("*").forEach((ele) => {
        ele.classList.remove("active");
    });
    //add active class to the current element clicked
    event.target.classList.add("active");
}
//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
//go to the section on  bullet clicked
scrollToSections(allBullets);
//select all links
const allLinks = document.querySelectorAll(".header-area ul li a");
//go to the section on  link clicked
scrollToSections(allLinks);
//scroll into clicked sectionLink function
function scrollToSections(elements) {
    elements.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault(); //to elimenate the default action of the links
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth", // ne marche pas !!!;
            });
        });
    });
}
//  changer l'image de coverture de ladding page
let landding = document.getElementsByClassName("landding")[0];
const landImages = [
    "./images/land1.jpg",
    "./images/land2.jpg",
    "./images/land3.jpg",
    "./images/land4.jpg",
    "./images/land5.jpg",
];
let curLandimageIndex = 1; //l'index de l'image a afficher
//creer une fonction qui va changer l'image
function changeLandImage() {
    landding.style.backgroundImage = `url(${landImages[curLandimageIndex]})`;
    curLandimageIndex += 1;
    if (curLandimageIndex === landImages.length) curLandimageIndex = 0;
}
//appler la fonction chaque 10seconde si l'utilisateur a choisi l'option yes dans random-backgrouns  settigns
function random_Background() {
    if (randomBackground)
        bagroundInrerval = setInterval(changeLandImage, 10000);
}
random_Background();

//select skills selector
let skills = document.querySelector(".skills");
let progressSpans = skills.querySelectorAll(".skill-box .skill-progress span");
window.onscroll = function () {
    //skills offset top
    let skillsOffsetTop = skills.offsetTop;
    //skills outer Height
    let skillsOuterHeight = skills.offsetHeight;
    //window Height
    let windowHeight = window.innerHeight;
    //window scroll top
    let windowScrollTop = this.scrollY;
    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
        progressSpans.forEach((span) => {
            span.style.width = span.dataset.progress;
        });
        // console.log("our scills section");
    }
};
//create poup for images gallery
//select images in the gallery
let galleryImgs = document.querySelectorAll(".gallery .images-box img");
galleryImgs.forEach((img) => {
    img.addEventListener("click", function () {
        //create popup-overlay
        let popupOverlay = document.createElement("div");
        //add class popup.overlay in the popup-overlay
        popupOverlay.className = "popup overlay";
        //append the popup-overlay in body
        document.body.appendChild(popupOverlay);
        //create popup-box
        let popupBox = document.createElement("div");
        //add class to  popup-box
        popupBox.className = "popup-box";
        //create h3 element if we have a title attribute
        if (img.title) {
            let popupTitle = document.createElement("h3");
            //create text of title
            let textTitle = document.createTextNode(img.title);
            //add text in the h3
            popupTitle.appendChild(textTitle);
            //append h3 in the popup
            popupBox.appendChild(popupTitle);
        }
        //create img element in the popup-box
        let popupImg = document.createElement("img");
        //add the src of the current img in the img in the pop-box
        popupImg.src = img.src;
        //append the image in the popup-box
        popupBox.appendChild(popupImg);
        //append the popup-box in body
        document.body.appendChild(popupBox);
        //craete close span
        let closeButton = document.createElement("span");
        //add class for close sapn
        closeButton.className = "close-button";
        //add text on the close button
        closeButton.append("X");
        //append close button on the popup
        popupBox.appendChild(closeButton);
    });
});

//close popup
document.addEventListener("click", (e) => {
    if (e.target.className === "close-button") {
        //remove pop-Box from the page
        document.body.removeChild(e.target.parentElement);
        //remove pop-overlay from the page
        document.querySelector(".popup.overlay").remove();
    }
});
