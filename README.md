# 오늘식단

음식과 섭취량을 입력하면 AI가 칼로리, 영양성분, 식단 팁을 정리해주는 바닐라 웹 서비스입니다.

## 제출 정보

- 배포 URL: https://today-diet.vercel.app/
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
2. `.env.example`을 `.env`로 복사하고 `GEMINI_API_KEY`에 실제 키를 입력합니다. PowerShell에서는 `Copy-Item .env.example .env`를 사용할 수 있습니다.
3. 프로젝트 루트에서 `vercel dev`를 실행합니다.
4. 브라우저에서 Vercel이 안내한 로컬 주소를 엽니다.

정적 파일만 Live Server로 열면 화면은 보이지만 `/api/analyze`는 동작하지 않습니다. AI 기능까지 확인하려면 `vercel dev`를 사용하세요. `api/analyze.py`는 Vercel이 지원하는 `BaseHTTPRequestHandler` 방식의 파일 기반 함수입니다.

## 환경 변수

Vercel 프로젝트 Settings > Environment Variables에 `GEMINI_API_KEY`를 등록합니다. API 키는 브라우저 코드, GitHub, README, 스크린샷에 절대 기록하지 않습니다. 기존 키가 노출되었다면 Google AI Studio에서 폐기 후 새 키를 발급하세요.

## 배포

GitHub 저장소를 Vercel에 Import하고, 환경 변수 `GEMINI_API_KEY`를 등록한 뒤 Deploy합니다. 배포 후 메뉴 이동, 모바일 화면, 정상 입력, 빈 입력, API 오류를 직접 확인하고 실제 Vercel 주소를 위 제출 정보에 기록합니다.

## 배포 전 검증

- 데스크톱과 모바일에서 `서비스 소개`, `AI 분석`, `이용 안내` 메뉴가 이동하는지 확인합니다.
- `김치찌개` / `1인분`을 입력해 결과 카드가 표시되는지 확인합니다.
- 두 입력을 비우고 제출해 필수 입력 안내가 표시되는지 확인합니다.
- Vercel 환경 변수에서 키를 잠시 제거한 테스트 배포로 서버 오류 안내를 확인한 뒤, 실제 운영 환경에는 키를 다시 등록합니다.
- 20초 안에 응답하지 않는 경우 프론트가 타임아웃 안내를 표시하는지 확인합니다.
- 키가 포함된 `.env`가 GitHub에 올라가지 않았는지 `git ls-files .env` 결과가 비어 있는지 확인합니다.

## 보안 및 비용 주의

API 키는 `api/analyze.py`에서만 환경 변수로 읽으며 브라우저에 전달하지 않습니다. Gemini 호출은 사용자 제출 1회당 1회 발생하므로 공개 배포 후 과금과 사용량을 확인하고, 필요하면 Vercel 또는 Google AI Studio의 사용량 제한을 설정합니다. 키가 노출되면 즉시 폐기하고 새 키를 발급합니다.
