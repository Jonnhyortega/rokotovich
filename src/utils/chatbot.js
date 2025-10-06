
const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL
// "https://2j5uuy7hcg.execute-api.us-east-1.amazonaws.com"

async function callChatAPI(message, history = [], context = "") {
  const payload = { message, history, context };

  const res = await fetch(`${API_URL}/api/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error ${res.status}: ${errorText}`);
  }

  const { response } = await res.json();
  return response;
}

export default callChatAPI;