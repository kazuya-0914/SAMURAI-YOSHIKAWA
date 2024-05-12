import { fetchWeatherData } from "./weather.js";
import { DeepL } from "./translation.js";

let html = '';
const domCode = document.getElementById('dom-code');

// ----- 教材コード

try {
  html += '<h4 class="mb-4 text-decoration-underline">JavaScript基礎編</h4>';
} catch(e) {
  const deepLmsg = await DeepL(e.message);
  html += `<div class="text-danger">【エラー】${deepLmsg}</div>`;
}

// -----

domCode.innerHTML = html;
fetchWeatherData();

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
  location.reload();
});