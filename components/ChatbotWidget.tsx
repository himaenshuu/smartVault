"use client";
import { useState } from "react";
import Chatbot from "./Chatbot";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 1000,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          cursor: "grab",
          transition: "box-shadow 0.2s",
          userSelect: "none",
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          "×"
        ) : (
          <svg width="35" height="60" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 2v2M8 5H6a2 2 0 0 0-2 2v7h2v3l3-3h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 10h.01M15 10h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Chatbot Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 24,
            bottom: 90, // 24 (button margin) + 56 (button height) + 10 (gap)
            zIndex: 1000,
            width: 370,
            maxWidth: "90vw",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(236, 139, 20, 0.18)",
            overflow: "hidden",
            animation: "fadeInUp .2s",
            border: "10px double rgb(130, 180, 246)",
            
          }}
        >
          <Chatbot />
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </>
  );
}
