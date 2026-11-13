const body = document.body;
const topBtn = document.querySelector('.top');

const hero = document.querySelector('.hero');
const scenes = [...document.querySelectorAll('.hero-scene')];
const tonearm = document.querySelector('.tonearm');

const prevBtn = document.querySelector('.hero-arrow.prev');
const nextBtn = document.querySelector('.hero-arrow.next');

const heroCurrent = document.querySelector('#heroCurrent');
const heroVolume = document.querySelector('.hero-vol');
const heroSub = document.querySelector('.sub');

const slideDuration = 8000;
const fadeDuration = 1200;

let currentScene = 0;
let slideTimer = null;
let videoStopTimer = null;
let heroReady = false;

/* HERO 배경 전환 */

function showScene(index) {
    currentScene = (index + scenes.length) % scenes.length;

    const activeVideo = scenes[currentScene].querySelector('video');

    if (activeVideo) {
        try {
            activeVideo.currentTime = 0;
        } catch (_) {}

        activeVideo.play().catch(() => {});
    }

    scenes.forEach((scene, i) => {
        scene.classList.toggle('is-active', i === currentScene);
    });

    hero.dataset.scene = String(currentScene + 1);

    const number = String(currentScene + 1).padStart(2, '0');
    const volume = String(currentScene + 1).padStart(3, '0');

    heroCurrent.textContent = number;
    heroVolume.textContent = `VOL. ${volume} · 2026 / SEOUL`;
    heroSub.textContent = `CURATED MIX / VOL. ${volume}`;

    clearTimeout(videoStopTimer);

    videoStopTimer = setTimeout(() => {
        scenes.forEach((scene, i) => {
            if (i !== currentScene) {
                scene.querySelector('video')?.pause();
            }
        });
    }, fadeDuration);
}

function resetHeroTimer() {
    clearInterval(slideTimer);

    slideTimer = setInterval(() => {
        showScene(currentScene + 1);
    }, slideDuration);
}

function startHero() {
    if (heroReady) return;

    heroReady = true;
    hero.classList.add('is-playing');

    prevBtn.disabled = false;
    nextBtn.disabled = false;

    resetHeroTimer();
}

const heroStartFallback = setTimeout(startHero, 2200);

tonearm.addEventListener('animationend', event => {
    if (event.animationName === 'tonearmMove') {
        clearTimeout(heroStartFallback);
        startHero();
    }
});

prevBtn.addEventListener('click', () => {
    if (!heroReady) return;

    showScene(currentScene - 1);
    resetHeroTimer();
});

nextBtn.addEventListener('click', () => {
    if (!heroReady) return;

    showScene(currentScene + 1);
    resetHeroTimer();
});

/* TOP 버튼 */

function updateScrollHeader() {
    body.classList.toggle('scroll', window.scrollY > 80);
}

window.addEventListener('scroll', updateScrollHeader, {
    passive: true
});

updateScrollHeader();

topBtn.addEventListener('click', event => {
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* 선곡 노트 탭 */

const noteTabs = [...document.querySelectorAll('.note-tabs button')];
const noteCards = [...document.querySelectorAll('.note-card')];

function selectNote(index) {
    noteTabs.forEach((tab, i) => {
        const isSelected = i === index;

        tab.classList.toggle('is-active', isSelected);

        tab.setAttribute(
            'aria-selected',
            String(isSelected)
        );

        tab.tabIndex = isSelected ? 0 : -1;
    });

    noteCards.forEach((card, i) => {
        const isSelected = i === index;

        card.classList.toggle('is-active', isSelected);

        card.setAttribute(
            'aria-hidden',
            String(!isSelected)
        );
    });
}

/* 탭 클릭 및 키보드 이동 */

noteTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
        selectNote(i);
    });

    tab.addEventListener('keydown', event => {
        let next = i;

        if (event.key === 'ArrowRight') {
            next = (i + 1) % noteTabs.length;
        } else if (event.key === 'ArrowLeft') {
            next = (i - 1 + noteTabs.length) % noteTabs.length;
        } else if (event.key === 'Home') {
            next = 0;
        } else if (event.key === 'End') {
            next = noteTabs.length - 1;
        } else {
            return;
        }

        event.preventDefault();

        selectNote(next);
        noteTabs[next].focus();
    });
});

/* 데스크톱에서는 카드 직접 클릭 가능 */

noteCards.forEach((card, i) => {
    card.addEventListener('click', () => {
        selectNote(i);
    });
});

/* 초기 상태 */

selectNote(0);