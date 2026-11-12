const body = document.querySelector("body");
const topBtn = document.querySelector(".top");

const hero = document.querySelector(".hero");
const scenes = document.querySelectorAll(".hero-scene");
const tonearm = document.querySelector(".tonearm");

const previousBtn = document.querySelector(".hero-arrow.prev");
const nextBtn = document.querySelector(".hero-arrow.next");

const currentText = document.querySelector("#heroCurrent");
const volumeText = document.querySelector(".hero-vol");
const subtitleText = document.querySelector(".sub");

const slideDuration = 8000;
const fadeDuration = 1200;

const tabs=document.querySelectorAll('.guide-tabs li ')
const contents= document.querySelectorAll('.guide-content li')

let current = 0;
let slideTimer;
let isReady = false;

function showScene(index) {

    current = (index + scenes.length) % scenes.length;

    const nextVideo = scenes[current].querySelector("video");

    if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
    }

    scenes.forEach((scene, i) => {
        scene.classList.toggle("is-active", i === current);
    });

    hero.dataset.scene = String(current + 1);

    currentText.textContent =
        String(current + 1).padStart(2, "0");

    const volume = String(current + 1).padStart(3, "0");

    volumeText.textContent =
        "VOL. " + volume + " · 2026 / SEOUL";

    subtitleText.textContent =
        "CURATED MIX / VOL. " + volume;

    setTimeout(() => {
        scenes.forEach((scene, i) => {
            if (i !== current) {
                const video = scene.querySelector("video");

                if (video) {
                    video.pause();
                }
            }
        });
    }, fadeDuration);
}

function resetTimer() {
    clearInterval(slideTimer);

    slideTimer = setInterval(() => {
        showScene(current + 1);
    }, slideDuration);
}

function startPlayback() {

    if (isReady) return;

    isReady = true;

    hero.classList.add("is-playing");

    previousBtn.disabled = false;
    nextBtn.disabled = false;

    resetTimer();
}

const startupTimer = setTimeout(startPlayback, 2100);

tonearm.addEventListener("animationend", (event) => {

    if (event.animationName === "tonearmMove") {
        clearTimeout(startupTimer);
        startPlayback();
    }
});

previousBtn.addEventListener("click", () => {
    if (!isReady) return;

    showScene(current - 1);
    resetTimer();
});

nextBtn.addEventListener("click", () => {
    if (!isReady) return;

    showScene(current + 1);
    resetTimer();
});

/* TOP 버튼 */

window.addEventListener("scroll", () => {
    body.classList.toggle("scroll", window.scrollY > 80);
});

topBtn.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

init(0)

function init(num){
    tabs[num].classList.add('on')
    contents[num].classList.add('on')
}

function reset(){
    for(let i=0 ;i<tabs.length;i++){
        
        tabs[i].classList.remove('on')
        contents[i].classList.remove('on')
    }
}


tabs.forEach(function(tab,i){
    tab.addEventListener('click',function(){
        console.log(i)
        reset()
        init(i)
    })

})
