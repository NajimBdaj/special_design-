//add or remove open class for setting
let gear = document.querySelector(".settings-box .gear");
gear.onclick = function () {
    gear.parentElement.classList.toggle("open");
};
//change the main color of the page and save it in the local strorage 
const colorsLi = document.querySelectorAll(".settings-box .option-box .colors-list li");
if (localStorage.getItem("mainColor")) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("mainColor"))
    colorsLi.forEach(li => {
         li.dataset.color === localStorage.mainColor ? li.classList.add("active"):li.classList.remove("active");

    })
};
colorsLi.forEach(li => {
    li.addEventListener("click", () => {
        //remove active class from all li
        colorsLi.forEach(li => {
            li.classList.remove("active");
        })
       document.documentElement.style.setProperty("--main-color", li.dataset.color);
        localStorage.mainColor = li.dataset.color;
        //add active class to the current color
       li.classList.add("active");
    })
})
//random-backgrouns:en click remove active class from span active and add it to current sapn(cliquer)
let randomBackground=true;//random background option
let bagroundInrerval; //id to reference setTnterval
//get the random background option from localstorage if it exist if not the default value is true
if (localStorage.randomBackground) {
    randomBackground = JSON.parse(localStorage.randomBackground);
    document.querySelectorAll(".settings-box .option-box .random-backgrounds > span").forEach(ele => {
        //remove class active for the old span option and add it in the  new sapn option
        ele.classList.contains( randomBackground ? "yes" : "no" ) ? ele.classList.add("active") : ele.classList.remove("active");
    })
}
console.log(randomBackground);
document.querySelectorAll(".settings-box .option-box .random-backgrounds > span").forEach(opt => {
    opt.addEventListener("click", () => {
        //remove active class from last option
        opt.parentElement.querySelector(".active").classList.remove("active");
        //add active class to new option
        opt.classList.add("active");
            //get the option choose by the user
        if (opt.classList.contains("yes")) {
            randomBackground = true;
            random_Background();
        }
            else {
            randomBackground = false;
            //stop random_background
            clearInterval(bagroundInrerval);
            //change the background page to the first background
            document.getElementsByClassName("landding")[0].style.backgroundImage="url(../images/land1.jpg)"
        };
        //save the option in localstorage
        localStorage.randomBackground = randomBackground;
    })
})
//  changer l'image de coverture de ladding page
let landding = document.getElementsByClassName("landding")[0];
const landImages = [
    "../images/land1.jpg",
    "../images/land2.jpg",
    "../images/land3.jpg",
    "../images/land4.jpg",
    "../images/land5.jpg"
];
let curLandimageIndex = 1;//l'index de l'image a afficher
//creer une fonction qui va changer l'image
function changeLandImage() {
    landding.style.backgroundImage = `url(${landImages[curLandimageIndex]})`;
    curLandimageIndex += 1;
    if (curLandimageIndex === landImages.length) curLandimageIndex = 0;
}
//appler la fonction chaque 10seconde si l'utilisateur a choisi l'option yes dans random-backgrouns  settigns
function random_Background() {
    if (randomBackground) bagroundInrerval = setInterval(changeLandImage, 1000);
};
random_Background();
