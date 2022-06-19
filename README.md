# Netflix Clone

## Using

1. React

2. React-query

   Query client 를 통한 tmdb Api 호출 (api.tx)
   영화 정보 검색 및 화면 구성을 위한 자료 호출 라이브러리

3. React-router

   사이트 내 탭 이동 (Tv , Search 등)을 위한 Router 구성 라이브러리

4. Styled-components

   React 구성 중 TS 내부에서 CSS 구성 라이브러리

5. Framer-motion

   사이트 내 전반적인 에니매이션 라이브러리

6. TypeScript

   에러 검출 및 Snippet 사용

## Introduce

Nomad 챌린지인 넷플릭스 클론 사이트입니다.

https://zerosial.github.io/NomadClone-ReactMovie/

## Refactoring

### CSS

- [x] 메뉴바 가림 해결
- [x] 박스 클릭시 나오는 설명 수정 & 하부 Subinfo 수정 (글자수 오버시 CSS 변경)
- [x] 좌우 슬라이스 버튼 투명화 애니메이션
- [x] 좌우 버튼과 그림이 겹칠 경우 나타나는 CSS 에러 개선
- [ ] 폰트 최적화

### React

- [x] 타이틀 및 아이콘 (탭) 갱신( React-App -> 다른이름 )
- [x] 시작시 나오는 Loading 화면 (붉은색) 개선
- [x] 각 타이틀 한글화 ( 검색창 포함 )
- [x] 왼쪽 상단 NetFlix 버튼 클릭시 홈메뉴로 돌아가기
- [ ] 로딩 화면 추가
- [ ] 재생시 영상 나오게 하기
- [ ] 검색창 TV , 영화 탭 나누기

### Typescript

- [x] 에러 검출 확인 및 수정

### Chrome-Debuger

- [x] 에러 검출 확인 및 수정
- [x] 404 에러 (Api 데이터를 받아올 시 첫 시작이 undefined) => 기본 Id를 지정해 주는것으로 해결
- [x] map 사용시 고유 Key 전체 지정 완료
- [ ] Warning: Received NaN for the `children` attribute. If this is expected, cast the value to a string.
- [ ] Warning: React does not recognize the `scrollY` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `scrolly` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
