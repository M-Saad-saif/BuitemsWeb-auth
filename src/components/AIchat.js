import { useState, useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function AIchat() {
  const [text, setText] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const typingSpeed = 0.2;

  const HOST_API = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  // Load history from localStorage on component mount
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("aiChatHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("aiChatHistory", JSON.stringify(history));
  }, [history]);

  // typewriter
  useEffect(() => {
    if (!fullResponse) return;

    setIsTyping(true);
    setDisplayedResponse("");

    let i = 0;
    const typeWriter = () => {
      if (i < fullResponse.length) {
        setDisplayedResponse((prev) => prev + fullResponse.charAt(i));
        i++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    const timer = setTimeout(typeWriter, 100);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [fullResponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter a question");
      return;
    }

    try {
      setLoader(true);
      setError("");
      setFullResponse("");
      setDisplayedResponse("");

      const apiResponse = await fetch(`${HOST_API}/api/ai/generate-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const json = await apiResponse.json();

      if (json.success) {
        const aiResponse =
          json.result || json.data || json.response || json.text || "";

        setFullResponse(aiResponse);

        const historyItem = {
          id: Date.now(),
          query: text,
          response: aiResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: new Date().toLocaleDateString(),
        };

        // Save to history - it will automatically sync to localStorage via useEffect
        setHistory((prev) => {
          const newHistory = [historyItem, ...prev];
          if (newHistory.length > 8) {
            return newHistory.slice(0, 8);
          }
          return newHistory;
        });
        setText("");
      } else {
        setError(json.error || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to connect to server");
      console.error("Fetch error:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    if (error) setError("");
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
    }
  };

  const removeHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const setResponseFromHistory = (responseText) => {
    setFullResponse(responseText);
  };

  // Toggle history visibility on mobile
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <section className="Aichat-container">
      {/* Mobile History Toggle Button */}
      <button
        className="mobile-history-toggle"
        onClick={toggleHistory}
        aria-label="Toggle history"
      >
        <i className={showHistory ? "ri-close-line" : "ri-history-line"}></i>
        <span>{showHistory ? "Hide History" : "Show History"}</span>
      </button>

      <div className="AI-chat-cards">
        {/* Response Card - Always visible */}
        <div className="card para-card" style={{ textAlign: "justify" }}>
          <div className="text-center">
            <h4>✦ Response</h4>
            <div className="chatAI-underline"></div>
          </div>
          <div className="text-justify response-content">
            {loader ? (
              <div className="ai-loader">
                <InfinitySpin
                  width="200"
                  color="#ffd700"
                  className="text-center"
                />
                <div className="loader">Generating response...</div>
              </div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : displayedResponse ? (
              <>
                <div className="animated-text">
                  {displayedResponse}
                  {isTyping && <span className="typing-cursor">|</span>}
                </div>
              </>
            ) : (
              "Your AI response will appear here..."
            )}
          </div>
        </div>

        {/* History Card - Conditionally visible on mobile */}
        <div className={`card history-card ${showHistory ? "show" : ""}`}>
          <div className="history-header">
            <div className="text-center">
              <h4>✦ History ({history.length})</h4>
              <div className="chatAI-underline"></div>
            </div>
            <div className="history-header-controls">
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="clear-history-btn my-2"
                  title="Clear all history"
                >
                  Clear All
                </button>
              )}
              {/* Mobile close button inside history card */}
              <button
                className="mobile-history-close"
                onClick={toggleHistory}
                aria-label="Close history"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>

          <div className="history-content">
            {history.length === 0 ? (
              <p className="no-history">
                No history yet. Your queries will appear here.
              </p>
            ) : (
              <div className="history-list text-justify">
                <div className="historyDivider"></div>
                {history.map((item) => (
                  <div key={item.id} className="history-item">
                    <div className="history-item-header">
                      <span className="history-time">
                        {item.timestamp} - {item.date}
                      </span>
                      <button
                        onClick={() => removeHistoryItem(item.id)}
                        className="remove-history-btn mx-1"
                        title="Remove this item"
                      >
                        <i className="ri-delete-bin-6-line"></i>
                      </button>
                    </div>
                    <div className="history-query">
                      <strong>Q:</strong> {item.query}
                    </div>
                    <div className="history-response">
                      <strong>A:</strong>{" "}
                      {item.response && typeof item.response === "string"
                        ? item.response.length > 100
                          ? item.response.substring(0, 100) + "..."
                          : item.response
                        : "No response available"}
                    </div>
                    <div
                      className="view-full-response"
                      onClick={() => setResponseFromHistory(item.response)}
                      title="Click to view full response"
                      style={{ justifySelf: "center" }}
                    >
                      <button
                        className="view-response-btn my-2"
                        onClick={toggleHistory}
                      >
                        View full response
                      </button>
                    </div>
                    <div className="historyDivider"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask anything๋࣭ ⭑"
          onChange={handleInputChange}
          value={text}
          disabled={loader}
        />
        <button
          disabled={loader || !text.trim()}
          className="button"
          type="submit"
        >
          {loader ? "Processing..." : "Search"}{" "}
          <i className="ri-search-ai-line"></i>
        </button>
      </form>
    </section>
  );
}
