
const foodInput = document.getElementById("food-name");
const analyzeBtn = document.getElementById("analyze-btn");
const resultSection = document.getElementById("result-section");
const loadingEl = document.getElementById("loading");
const resultContent = document.getElementById("result-content");

analyzeBtn.addEventListener("click", analyzeFood);

async function analyzeFood() {
	const food = foodInput.value.trim();

	if (!food) {
		alert("음식을 입력해주세요! 🍽️");
		return;
	}

	// 로딩 표시
	resultSection.style.display = "block";
	loadingEl.style.display = "block";
	resultContent.innerHTML = "";

	const prompt = `
다음 음식의 칼로리와 영양 정보를 분석해주세요: "${food}"

아래 형식으로 답변해주세요:

🍽️ **${food} 칼로리 분석**

📊 **기본 정보**
- 1인분 기준 칼로리: OOO kcal
- 1인분 기준 용량: OOOg

🥗 **영양성분 (1인분 기준)**
- 탄수화물: OOg
- 단백질: OOg
- 지방: OOg
- 나트륨: OOmg

💡 **다이어트 팁**
(이 음식 관련 건강 팁 2-3줄)

⚠️ **주의사항**
(칼로리 관련 주의사항 1-2줄)
	`;

	try {
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [
								{
									text: prompt,
								},
							],
						},
					],
				}),
			}
		);

		const data = await response.json();
		console.log("API 응답:", data); // 디버깅용

		if (!response.ok) {
			console.error("오류 상세:", data);
			throw new Error(`API 오류: ${data.error?.message || response.status}`);
		}

		const resultText = data.candidates[0].content.parts[0].text;

		// 마크다운 → HTML 간단 변환
		const formattedText = resultText
			.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
			.replace(/\n/g, "<br>");

		loadingEl.style.display = "none";
		resultContent.innerHTML = formattedText;

	} catch (error) {
		loadingEl.style.display = "none";
		resultContent.innerHTML = `
			<p style="color: red;">❌ 오류가 발생했습니다: ${error.message}</p>
			<p>콘솔(F12)에서 자세한 내용을 확인해주세요.</p>
		`;
		console.error("상세 오류:", error);
	}
}
