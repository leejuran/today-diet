import json
import os
from http.server import BaseHTTPRequestHandler
import urllib.error
import urllib.request


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(content_length).decode("utf-8"))
            food = str(payload.get("food", "")).strip()
            amount = str(payload.get("amount", "")).strip()
        except (TypeError, ValueError, AttributeError, json.JSONDecodeError):
            self._send_json({"error": "요청 형식이 올바르지 않습니다."}, 400)
            return

        if not food or not amount:
            self._send_json({"error": "음식 이름과 섭취량을 모두 입력해주세요."}, 400)
            return
        if len(food) > 100 or len(amount) > 50:
            self._send_json({"error": "입력 내용을 조금 줄여서 다시 시도해주세요."}, 400)
            return

        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            self._send_json({"error": "서버에 AI API 키가 설정되지 않았습니다."}, 500)
            return

        prompt = f"""음식: {food}\n섭취량: {amount}\n\n한국어로 다음 형식에 맞춰 간결하게 분석해주세요. 의료 진단이 아닌 참고 정보임을 포함하세요.\n\n[칼로리]\n[영양성분] 탄수화물, 단백질, 지방, 나트륨\n[오늘의 팁] 실천 가능한 팁 2가지\n[참고] 추정치의 한계"""
        body = json.dumps({"contents": [{"parts": [{"text": prompt}]}]}).encode("utf-8")
        url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + api_key
        request_to_ai = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})

        try:
            with urllib.request.urlopen(request_to_ai, timeout=18) as response:
                data = json.loads(response.read().decode("utf-8"))
            result = data["candidates"][0]["content"]["parts"][0]["text"]
        except (urllib.error.URLError, KeyError, IndexError, json.JSONDecodeError):
            self._send_json({"error": "AI 분석에 실패했습니다. 잠시 후 다시 시도해주세요."}, 502)
            return

        self._send_json({"food": food, "result": result}, 200)

    def do_GET(self):
        self._send_json({"error": "POST 요청만 사용할 수 있습니다."}, 405)

    def _send_json(self, body, status):
        encoded_body = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded_body)))
        self.end_headers()
        self.wfile.write(encoded_body)