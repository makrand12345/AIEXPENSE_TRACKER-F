export function parseExpenseFromVoice(text) {
  if (!text) return null;

  const lower = text.toLowerCase();

  // Match amounts like: 50, 120, rs 200, rupees 300
  const amountMatch = lower.match(/(\d+(\.\d+)?)/);
  if (!amountMatch) return null;

  const amount = Number(amountMatch[1]);

  // Remove filler words
  const title = lower
    .replace(amountMatch[1], "")
    .replace(
      /spent|spend|paid|pay|for|on|rs|rupees|inr|₹|today|yesterday|kal|aaj|pe/g,
      ""
    )
    .trim();

  if (!title) return null;

  return {
    title: title.charAt(0).toUpperCase() + title.slice(1),
    amount,
  };
}

// 🔊 AI Voice Feedback
export function speak(text) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}
 