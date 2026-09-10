# 제출 증빙 체크리스트

## 서비스 스크린샷 1세트

- [x] 데스크톱: 서비스 소개와 상단 메뉴 (`screenshots/desktop-home.png`)
- [x] 모바일: 반응형 메뉴와 분석 입력 폼 (`screenshots/mobile-analyzer.png`)
- [ ] AI 동작: 실제 Vercel URL에서 입력값과 분석 결과가 함께 보이는 장면
- [x] 빈 입력 오류 안내 (`screenshots/validation-message.png`)
- [x] API 키, 토큰, 개인 정보가 화면에 노출되지 않았는지 확인

## AI 코딩 도구 사용 증빙 1세트

- [ ] 요구사항을 전달한 AI 코딩 도구 대화 화면
- [ ] `api/analyze.py`와 프론트 호출 흐름을 수정한 AI 코딩 도구 대화 화면
- [ ] 오류 검사 또는 테스트 결과 화면

## 제출 전 확인

- [x] GitHub에 `api/`, `css/`, `js/`, `docs/` 구조가 포함됨
- [x] `.env`는 커밋되지 않고 `.env.example`만 업로드됨
- [ ] Vercel 환경 변수에 `GEMINI_API_KEY`가 등록됨
- [ ] README의 배포 URL을 실제 주소로 교체함

현재 스크린샷은 로컬 화면과 빈 입력 오류를 증명합니다. 정상 AI 결과 캡처와 AI 코딩 도구 사용 캡처는 Vercel 배포 및 제출 직전에 추가해야 합니다. 체크되지 않은 항목은 미완료 상태를 의미하므로 제출 전에 실제 증빙 파일 또는 화면을 확보합니다.
