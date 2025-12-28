import { useRef, useState } from "react";

function VoiceInput({ onResult }) {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const lastTranscriptRef = useRef("");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;
    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();

      // 🚫 Prevent duplicate firing
      if (transcript === lastTranscriptRef.current) return;
      lastTranscriptRef.current = transcript;

      onResult(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Voice error:", event.error);
      alert("Voice service unavailable. Try again.");
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <button
        onClick={startListening}
        disabled={listening}
        className="voice-btn"
      >
        {listening ? "🎙️ Listening..." : "🎤 Add by Voice"}
      </button>
    </div>
  );
}

export default VoiceInput;
  