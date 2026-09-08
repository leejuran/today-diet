
const foodForm = document.getElementById("food-form");
const foodInput = document.getElementById("food-name");
const amountInput = document.getElementById("food-amount");
const analyzeBtn = document.getElementById("analyze-btn");
const loadingEl = document.getElementById("loading");
const resultContent = document.getElementById("result-content");
const resultPlaceholder = document.getElementById("result-placeholder");
const formMessage = document.getElementById("form-message");

foodForm.addEventListener("submit", analyzeFood);

async function analyzeFood(event) {
	event.preventDefault();
	const food = foodInput.value.trim();
	const amount = amountInput.value.trim();

	if (!food || !amount) {
		formMessage.textContent = "음식 이름과 섭취량을 모두 입력해주세요.";
		(food ? amountInput : foodInput).focus();
		return;
	}

	formMessage.textContent = "";
	analyzeBtn.disabled = true;
	loadingEl.hidden = false;
	resultPlaceholder.hidden = true;
	resultContent.innerHTML = "";
	let timeout;

	try {
		const controller = new AbortController();
		timeout = setTimeout(() => controller.abort(), 20000);
		const response = await fetch("/api/analyze", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ food, amount }),
			signal: controller.signal,
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "분석 요청에 실패했습니다.");
		}

		resultContent.innerHTML = `<article class="result-card"><p class="result-label">${escapeHtml(data.food)}</p><div class="result-text">${formatResult(data.result)}</div></article>`;
		document.getElementById("result-section").scrollIntoView({ behavior: "smooth", block: "start" });

	} catch (error) {
		const message = error.name === "AbortError" ? "응답이 늦어지고 있어요. 잠시 후 다시 시도해주세요." : error.message || "네트워크 연결을 확인하고 다시 시도해주세요.";
		formMessage.textContent = message;
		resultPlaceholder.hidden = false;
	} finally {
		clearTimeout(timeout);
		loadingEl.hidden = true;
		analyzeBtn.disabled = false;
	}
}

function formatResult(text) {
	return escapeHtml(text).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
}

function escapeHtml(text) {
	const div = document.createElement("div");
	div.textContent = text;
	return div.innerHTML;
}
