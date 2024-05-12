import { API } from "./api.js";
const api = new API();

export async function DeepL(message) {
  const apiKey = api.DeepLfreeAPI();
  const url = 'https://api-free.deepl.com/v2/translate';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `auth_key=${apiKey}&text=${encodeURIComponent(message)}&target_lang=JA`
  });

  if (!response.ok) {
    throw new Error('翻訳エラーが発生しました');
  }

  const data = await response.json();
  return data.translations[0].text;
}