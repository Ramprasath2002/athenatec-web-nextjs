"use client";
import { useState, useEffect } from "react";
import "./bot.scss";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [step, setStep] = useState<"name" | "email" | "chat">("name");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  // Auto welcome message when chatbot opens first time
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi there! Welcome to Athenatec! How can we assist you today?\n\nPlease let me know your name first.",
        },
      ]);
    }
  }, [open]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    // STEP 1 — Collect Name
    if (step === "name") {
      setUserData({ ...userData, name: input });

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Thanks! Please enter your email address.",
        },
      ]);

      setStep("email");
      return;
    }

    // STEP 2 — Collect Email
    if (step === "email") {
      if (!validateEmail(input)) {
        setMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content: "Please enter a valid email address.",
          },
        ]);
        return;
      }

      setUserData({ ...userData, email: input });

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Great! Now tell us how we can assist you today.",
        },
      ]);

      setStep("chat");
      return;
    }

    // STEP 3 — Normal AI Chat
    if (step === "chat") {
      setLoading(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          name: userData.name,
        }),
      });

      const data = await res.json();

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);

      setLoading(false);
    }
  };

  return (
    <>
<div className="chat-button" onClick={() => setOpen(!open)}>
  <div className="chat-icon-wrapper">
    <img src="/assets/icons/chatai.png" alt="AI Chat" loading="lazy" className="chat-icon" />
  </div>
  <span className="pulse-ring"></span>
</div>


      {open && (
        <div className="chat-window">
  <div className="chat-header">
    <div className="chat-header-left">
      <div className="chat-avatar">AI</div>
      <div>
        <div className="chat-title">Athenatec Bot</div>
        <div className="chat-status">● Online</div>
      </div>
    </div>
    <div className="chat-close" onClick={() => setOpen(false)}>✕</div>
  </div>

  <div className="chat-body">
    {messages.map((msg, i) => (
      <div key={i} className={`chat-row ${msg.role}`}>
        <div className="chat-bubble">
          {msg.content}
        </div>
      </div>
    ))}
    {loading && (
      <div className="chat-row assistant">
        <div className="chat-bubble typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    )}
  </div>

  <div className="chat-input">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type your message..."
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button onClick={sendMessage}>Send</button>
  </div>
</div>

      )}
    </>
  );
}
