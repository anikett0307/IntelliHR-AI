import { useState, useRef } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Chatbot() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const recognitionRef = useRef(null);

    const speakText = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    };

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = (event) => {
            const transcript =
                event.results[0][0].transcript;

            setMessage(transcript);
        };

        recognitionRef.current = recognition;
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            sender: "You",
            text: message,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        try {
            const response = await api.post(
                "/chatbot/",
                {
                    message,
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: "IntelliHR AI",
                    text: response.data.response,
                },
            ]);

            speakText(response.data.response);

            setMessage("");
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "IntelliHR AI",
                    text:
                        "Error communicating with chatbot.",
                },
            ]);

            console.error(error);
        }
    };

    return (
        <Layout>
            {/* Header */}
            <div
                style={{
                    background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                    color: "white",
                    padding: "25px",
                    borderRadius: "16px",
                    marginBottom: "20px",
                    boxShadow:
                        "0 6px 20px rgba(37,99,235,0.25)",
                }}
            >
                <h1
                    style={{
                        margin: 0,
                    }}
                >
                    🤖 IntelliHR AI Assistant
                </h1>

                <p
                    style={{
                        marginTop: "8px",
                        opacity: 0.9,
                    }}
                >
                    Powered by Ollama AI
                </p>
            </div>

            {/* Chat Area */}
            <div
                style={{
                    background: "white",
                    height: "60vh",
                    overflowY: "auto",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow:
                        "0 4px 12px rgba(0,0,0,0.08)",
                    marginBottom: "20px",
                }}
            >
                {messages.length === 0 ? (
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "120px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "60px",
                            }}
                        >
                            🤖
                        </div>

                        <h2>
                            IntelliHR AI Assistant
                        </h2>

                        <p>
                            How can I help you today?
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "center",
                                gap: "10px",
                                marginTop: "20px",
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                className="btn"
                                onClick={() =>
                                    setMessage(
                                        "Leave Policy"
                                    )
                                }
                            >
                                Leave Policy
                            </button>

                            <button
                                className="btn"
                                onClick={() =>
                                    setMessage(
                                        "Payroll Help"
                                    )
                                }
                            >
                                Payroll Help
                            </button>

                            <button
                                className="btn"
                                onClick={() =>
                                    setMessage(
                                        "Attendance Help"
                                    )
                                }
                            >
                                Attendance Help
                            </button>

                            <button
                                className="btn"
                                onClick={() =>
                                    setMessage(
                                        "Recruitment Help"
                                    )
                                }
                            >
                                Recruitment Help
                            </button>
                        </div>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent:
                                    msg.sender ===
                                    "You"
                                        ? "flex-end"
                                        : "flex-start",
                                marginBottom:
                                    "15px",
                            }}
                        >
                            <div
                                style={{
                                    background:
                                        msg.sender ===
                                        "You"
                                            ? "#2563eb"
                                            : "#ffffff",
                                    color:
                                        msg.sender ===
                                        "You"
                                            ? "white"
                                            : "#1e293b",
                                    padding: "12px",
                                    borderRadius:
                                        "16px",
                                    maxWidth: "70%",
                                    boxShadow:
                                        "0 2px 10px rgba(0,0,0,0.08)",
                                }}
                            >
                                <strong>
                                    {msg.sender}
                                </strong>
                                <br />
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input Area */}
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                }}
            >
                <input
                    type="text"
                    placeholder="Ask anything..."
                    value={message}
                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    style={{
                        flex: 1,
                        padding: "14px",
                        borderRadius: "14px",
                        border:
                            "1px solid #cbd5e1",
                        fontSize: "15px",
                    }}
                />

                <button
    onClick={startListening}
    style={{
        width: "52px",
        height: "52px",
        border: "none",
        borderRadius: "14px",
        background: "#7c3aed",
        color: "white",
        fontSize: "22px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
            "0 4px 12px rgba(124,58,237,0.25)",
    }}
>
    🎙️
</button>

<button
    onClick={sendMessage}
    style={{
        width: "52px",
        height: "52px",
        border: "none",
        borderRadius: "14px",
        background: "#2563eb",
        color: "white",
        fontSize: "22px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
            "0 4px 12px rgba(37,99,235,0.25)",
    }}
>
    ➤
</button>
            </div>
        </Layout>
    );
}

export default Chatbot;