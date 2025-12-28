import { useState } from "react";

function VoiceAssistant() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN"; // can be hi-IN, mr-IN
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
      speak(`I heard: ${speechText}`);
      // later → send to backend AI
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  };

  const speak = (msg) => {
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="glass" style={{ margin: "40px" }}>
      <h2>AI Voice Assistant 🎙️</h2>

      <p>Say something like:</p>
      <i>"Add 200 rupees for food"</i>

      <br /><br />

      <button className="btn" onClick={startListening}>
        {listening ? "Listening..." : "Start Voice Input"}
      </button>

      <br /><br />

      <div className="glass">
        <strong>Recognized Text:</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default VoiceAssistant;
