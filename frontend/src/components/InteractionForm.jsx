function InteractionForm() {
  return (
    <div style={{ flex: 2, padding: "20px" }}>
      <h3>Interaction Details</h3>

      <input placeholder="HCP Name" /><br /><br />

      <input placeholder="Interaction Type" /><br /><br />

      <input type="date" /><br /><br />

      <textarea
        rows="8"
        placeholder="Topics Discussed"
      ></textarea><br /><br />

      <button>Save Interaction</button>
    </div>
  );
}

export default InteractionForm;