# 오늘식단

음식과 섭취량을 입력하면 AI가 칼로리, 영양성분, 식단 팁을 정리해주는 바닐라 웹 서비스입니다.

## 제출 정보

- 배포 URL: `Vercel 배포 후 주소를 입력하세요`
- GitHub: https://github.com/leejuran/today-diet
- 기획서: [docs/service-plan.md](docs/service-plan.md)
- 증빙 체크리스트: [docs/evidence-checklist.md](docs/evidence-checklist.md)
- 스크린샷: [docs/screenshots](docs/screenshots)

## 주요 기능

- 서비스 소개, AI 분석, 이용 안내의 3개 섹션과 메뉴 이동
- 음식 이름과 섭취량 입력 후 Gemini AI 영양 분석
- 빈 입력, API 오류, 20초 지연에 대한 사용자 안내
- 모바일, 태블릿, 데스크톱 반응형 화면

## 기술 스택

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Vercel Serverless Functions (Python)
- AI: Google Gemini API
- Deploy: Vercel, GitHub

## 폴더 구조

```text
index.html
css/style.css
js/app.js
api/analyze.py
requirements.txt
.env.example
docs/service-plan.md
docs/evidence-checklist.md
docs/screenshots/
```

## 로컬 실행

1. 저장소를 내려받고 Vercel CLI를 설치합니다: `npm i -g vercel`
2. 프로젝트 루트에서 `vercel dev`를 실행합니다.
3. `.env.example`을 `.env`로 복사하고 실제 키를 입력합니다.
4. 브라우저에서 Vercel이 안내한 로컬 주소를 엽니다.

정적 파일만 Live Server로 열면 화면은 보이지만 `/api/analyze`는 동작하지 않습니다. AI 기능까지 확인하려면 `vercel dev`를 사용하세요. `api/analyze.py`는 Vercel이 지원하는 `BaseHTTPRequestHandler` 방식의 파일 기반 함수입니다.

## 환경 변수

Vercel 프로젝트 Settings > Environment Variables에 `GEMINI_API_KEY`를 등록합니다. API 키는 브라우저 코드, GitHub, README, 스크린샷에 절대 기록하지 않습니다. 기존 키가 노출되었다면 Google AI Studio에서 폐기 후 새 키를 발급하세요.

## 배포

GitHub 저장소를 Vercel에 Import하고, 환경 변수 `GEMINI_API_KEY`를 등록한 뒤 Deploy합니다. 배포 후 메뉴 이동, 모바일 화면, 정상 입력, 빈 입력, API 오류를 직접 확인하고 실제 Vercel 주소를 위 제출 정보에 기록합니다.
