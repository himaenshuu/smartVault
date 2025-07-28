import { useState, useEffect, useRef } from "react";

export default function Chatbot() {
    const [messages, setMessages] = useState<
        { role: "user" | "bot"; text: string }[]
    >([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;
        setMessages([...messages, { role: "user", text: input }]);
        setLoading(true);
        const userInput = input;
        setInput("");
        try {
            const res = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput }),
            });
            const data = await res.json();
            setMessages((msgs) => [...msgs, { role: "bot", text: data.response }]);
        } catch {
            setMessages((msgs) => [
                ...msgs,
                {
                    role: "bot",
                    text: "Sorry, there was an error contacting the chatbot.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: 400,
                margin: "0 auto",
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                background: "#fff",
            }}
        >
            <h3 style={{ textAlign: "center" }}>AI Chatbot</h3>
            <div
                style={{
                    minHeight: 200,
                    maxHeight: 300,
                    overflowY: "auto",
                    marginBottom: 12,
                    background: "#f9f9f9",
                    padding: 8,
                    borderRadius: 4,
                }}
            >
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            textAlign: msg.role === "user" ? "right" : "left",
                            margin: "8px 0",
                        }}
                    >
                        <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.text}
                    </div>
                ))}
                {loading && <div style={{ color: "#888" }}>Bot is typing...</div>}
                <div ref={messagesEndRef} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: 8,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                    }}
                    disabled={loading}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    style={{
                        padding: "8px 16px",
                        borderRadius: 4,
                        background: "#0070f3",
                        color: "#fff",
                        border: "none",
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
