function AIAssistant() {
  return (
    <div
      style={{
        flex: 1,
        background: "#f2f2f2",
        padding: "20px",
      }}
    >
      <h3>AI Assistant</h3>

      <textarea
        rows="10"
        placeholder="Ask AI..."
      ></textarea>

      <br /><br />

      <button>Ask AI</button>
    </div>
  );
}

export default AIAssistant;