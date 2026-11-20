# 33⅓ | TODAY PLAYLIST

오늘의 선곡과 무드별 플레이리스트, 짧은 감상 노트를 기록하는 **개인 음악 아카이브 웹사이트**입니다.

- 배포: https://bin0864.github.io/my_blog/
- 기술: HTML5, CSS3, JavaScript, AOS (Animate On Scroll)
- 방식: 별도 빌드 도구 없는 정적 웹사이트 / GitHub Pages

## 실행 방법

1. 저장소를 다운로드하거나 `git clone https://github.com/bin0864/my_blog.git`으로 복제합니다.
2. VS Code에서 프로젝트를 열고 `index.html`을 브라우저로 엽니다. 또는 VS Code Live Server로 실행할 수 있습니다.
3. `index.html`에서 참조하는 `css/`, `js/`, `img/`, `video/` 폴더를 같은 상대 경로로 유지합니다.
4. 외부 Google Fonts와 AOS CDN을 사용하므로 인터넷 연결이 있으면 원래 디자인 및 스크롤 효과가 표시됩니다.

## 페이지 구조

| 구역 | 내용 |
| --- | --- |
| Header | 33⅓ 로고, 메뉴 앵커, 모바일 햄버거 메뉴 |
| Hero | 레코드/톤암 애니메이션, 3개 장면 자동 전환과 이전·다음 버튼 |
| Profile | DJ 소개 및 K-POP/J-POP/POP 태그 |
| 오늘의 선곡 | 장르별 추천곡 카드 3개 |
| 선곡 노트 | 4개의 탭: 선곡 노트·곡 소개·리스닝 포인트·평점 |
| 무드별 Playlist | 5개 이미지 카드, Grid 배치 및 hover/스크롤 효과 |
| Footer | 사이트 소개와 TOP 버튼 |

## 주요 기능 및 구현

### 1. 반응형 페이지

- `css/style.css`: 기본 스타일, Flex 카드, Grid 무드 갤러리, CSS 애니메이션
- `css/media.css`: 화면 너비 1024px / 768px 등의 조건에 맞춘 배치 변경
- 모바일에서 헤더 메뉴는 버튼 클릭으로 열고 닫습니다.

### 2. Hero 장면 전환

- `js/app.js`의 `showScene()`, `resetHeroTimer()`, `startHero()`
- 세 장면을 8초 간격으로 자동 전환하고 수동 이전/다음 버튼도 제공합니다.
- 톤암의 `animationend` 이벤트 이후 장면 자동 전환이 시작됩니다.
- CSS `recordSpin`으로 레코드가 회전합니다.

### 3. 선곡 노트 탭

- `js/app.js`의 `selectNote(index)`
- 탭/카드를 클릭하면 활성 콘텐츠가 바뀝니다.
- 방향키, Home, End 키를 처리하며 `aria-selected` 상태를 업데이트합니다.

### 4. 스크롤 애니메이션

- AOS를 이용해 `data-aos="fade-up"`, `data-aos="fade-zoom-in"` 효과를 적용했습니다.
- `once: false`, `mirror: true` 설정으로 스크롤 재진입 동작을 제어합니다.

## 대표 코드

```css
.photos {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-areas:
        "p1 p1 p2 p3"
        "p4 p5 p5 p3";
}
```

```js
function resetHeroTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        showScene(currentScene + 1);
    }, slideDuration);
}
```

전체 코드는 `index.html`, `css/style.css`, `css/media.css`, `js/app.js`에서 확인할 수 있습니다.

## 현재 기능 범위 및 점검 사항

- **'▶ 플레이리스트 듣기' 링크는 실제 음악 재생이 아닌 선곡 노트(`#notes`)로의 페이지 내 이동**입니다.
- 정적 웹사이트로 별도의 회원가입·서버·데이터베이스는 없습니다.
- 무드별 카드의 첫 번째 `<li>` 시작 태그와 두 번째 카드의 `<p>` 태그 오류는 `index.html`에서 수정했습니다.
- 제출 전 모바일 햄버거 메뉴 동작, F12 콘솔 오류 및 모바일 가로 스크롤 여부를 실제 브라우저에서 확인합니다.
- 외부 링크 접속 여부는 시크릿 창에서 로그인 없이 확인하세요.

## 평가 제출 링크

- [GitHub Pages 결과물](https://bin0864.github.io/my_blog/)
- [GitHub 소스 코드](https://github.com/bin0864/my_blog)
