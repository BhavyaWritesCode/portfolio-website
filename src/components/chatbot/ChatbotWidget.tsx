"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_CHIPS = [
  "What's Bhavya's stack?",
  "What has he built?",
  "Is he open to internships?",
  "Tell me about his AI work",
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Escape closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || loading) return;
      setError(null);

      const newMessages: Message[] = [
        ...messages,
        { role: "user", content: content.trim() },
      ];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!res.ok) throw new Error("Network error");

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } catch {
        setError("Failed to get response. Please try again.");
        setMessages((prev) => prev.slice(0, -1)); // Remove optimistic user message
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating trigger button */}
      <div
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 500,
        }}
        aria-label="Ask about Bhavya"
      >
        {/* Pulse ring */}
        {!open && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              border: "2px solid rgba(168, 200, 255,0.5)",
              animation: "chatPulse 2s ease-out infinite",
              pointerEvents: "none",
            }}
          />
        )}

        <button
          id="chatbot-trigger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close AI chat" : "Ask about Bhavya"}
          aria-expanded={open}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: open ? "#18181b" : "#7c3aed",
            border: open ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            boxShadow: open ? "none" : "0 0 24px rgba(124, 58, 237, 0.6)",
            color: "#ffffff",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (!open) (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          {open ? <X size={20} /> : <Sparkles size={20} />}
        </button>
      </div>

      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="Ask about Bhavya"
        aria-modal="true"
        style={{
          position: "fixed",
          bottom: "92px",
          right: "28px",
          width: "min(360px, calc(100vw - 40px))",
          height: "min(520px, calc(100vh - 140px))",
          zIndex: 499,
          display: "flex",
          flexDirection: "column",
          background: "rgba(14,14,26,0.92)",
          border: "1px solid rgba(168, 200, 255,0.25)",
          borderRadius: "16px",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(168, 200, 255,0.08)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
          transition: "opacity 0.3s ease, transform 0.3s var(--ease-spring)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(168, 200, 255,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <Sparkles size={16} style={{ color: "var(--starlight)" }} />
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            ✦ Ask about Bhavya
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--starlight)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 16px 0",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Starter chips */}
          {messages.length === 0 && !loading && (
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  marginBottom: "14px",
                  textAlign: "center",
                }}
              >
                Ask me anything about Bhavya!
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {STARTER_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    style={{
                      padding: "6px 12px",
                      background: "rgba(168, 200, 255,0.06)",
                      border: "1px solid rgba(168, 200, 255,0.2)",
                      borderRadius: "100px",
                      fontFamily: "var(--font-code)",
                      fontSize: "11px",
                      color: "var(--text-code)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(168, 200, 255,0.12)";
                      el.style.borderColor = "var(--starlight)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(168, 200, 255,0.06)";
                      el.style.borderColor = "rgba(168, 200, 255,0.2)";
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message list */}
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background:
                    msg.role === "user"
                      ? "var(--starlight)"
                      : "rgba(168, 200, 255,0.06)",
                  borderLeft: msg.role === "assistant" ? "2px solid var(--starlight)" : "none",
                  border:
                    msg.role === "assistant"
                      ? "1px solid rgba(168, 200, 255,0.15)"
                      : undefined,
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: msg.role === "user" ? "var(--void)" : "var(--text-secondary)",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: "flex", gap: "5px", padding: "10px 14px", alignSelf: "flex-start" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--starlight)",
                    animation: `typingDot 1.2s ${i * 0.15}s ease infinite`,
                  }}
                />
              ))}
            </div>
          )}

          {error && (
            <div style={{ fontFamily: "var(--font-code)", fontSize: "12px", color: "var(--lava)", textAlign: "center" }}>
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "14px 16px",
            borderTop: "1px solid rgba(168, 200, 255,0.12)",
            display: "flex",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            aria-label="Chat message input"
            disabled={loading}
            style={{
              flex: 1,
              background: "rgba(168, 200, 255,0.04)",
              border: "1px solid rgba(168, 200, 255,0.15)",
              borderRadius: "8px",
              padding: "8px 14px",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--text-primary)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(168, 200, 255,0.4)"; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(168, 200, 255,0.15)"; }}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Send message"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: input.trim() && !loading ? "#7c3aed" : "rgba(168, 200, 255,0.15)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
          >
            <Send size={14} style={{ color: input.trim() && !loading ? "var(--void)" : "var(--text-muted)" }} />
          </button>
        </form>
      </div>
    </>
  );
}
