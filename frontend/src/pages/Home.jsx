import { useState, useEffect } from "react";
import API from "../services/api";
import { saveAs } from "file-saver";

function Home() {
  const [hcpName, setHcpName] = useState("");
const [interactionType, setInteractionType] = useState("Meeting");
const [date, setDate] = useState("");

const [attendees, setAttendees] = useState("");
const [input, setInput] = useState("");
const [materials, setMaterials] = useState("");
const [samples, setSamples] = useState("");
const [sentiment, setSentiment] = useState("Neutral");
const [outcomes, setOutcomes] = useState("");
const [followUp, setFollowUp] = useState("");
const [response, setResponse] = useState("");
const [interactions, setInteractions] = useState([]);
const [editingId, setEditingId] = useState(null);
const [search, setSearch] = useState("");
const [isRecording, setIsRecording] =useState(false);
const [recognition, setRecognition] =useState(null);
const [meetingTime, setMeetingTime] = useState("");
const [timeFormat, setTimeFormat] = useState("AM");
const [attachment, setAttachment] = useState(null);

const materialOptions = [
  "CardioX Brochure",
  "Clinical Trial Report",
  "Product Monograph",
  "Patient Information Leaflet",
  "Visual Aid",
  "Safety Guidelines",
  "Doctor Leave Behind",
];
  const askAI = async () => {

  const prompt = `
Doctor Name: ${hcpName}

Interaction Type: ${interactionType}

Date: ${date}

Time: ${meetingTime} ${timeFormat}

Attendees: ${attendees}

Topics Discussed:
${input}

Materials Shared:
${materials}

Samples Distributed:
${samples}

Sentiment:
${sentiment}

Outcomes:
${outcomes}

Follow-up Actions:
${followUp}
`;

  try {

    const res = await API.post("/ask", {
      text: prompt,
    });

    setResponse(res.data.response);

  } catch (err) {

    console.log(err);
    alert("Backend Error");

  }

};

  const saveInteraction = async () => {
  try {
    if (editingId) {
  await API.put(`/interaction/${editingId}`, {
      hcp_name: hcpName,
      interaction_type: interactionType,
      date: date,
      time: `${meetingTime} ${timeFormat}`,
      attendees: attendees,
      topics: input,
      materials: materials,
      samples: samples,
      sentiment: sentiment,
      outcomes: outcomes,
      follow_up: followUp,
      ai_response: response,
      attachment: attachment ? attachment.name : "",
     });
} else {
  await API.post("/save", {
  hcp_name: hcpName,
  interaction_type: interactionType,
  date: date,
  time: `${meetingTime} ${timeFormat}`,
  attendees: attendees,
  topics: input,
  materials: materials,
  samples: samples,
  sentiment: sentiment,
  outcomes: outcomes,
  follow_up: followUp,
  ai_response: response,
  attachment: attachment ? attachment.name : "",
});
}

   await loadInteractions();
   setEditingId(null);
alert("Interaction Saved Successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to save interaction.");
  }
};
const loadInteractions = async () => {
  try {
    const res = await API.get("/interactions");
    setInteractions(res.data);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  loadInteractions();
}, []);
const addMaterial = () => {
  const selected = prompt(
    "Enter Material Name\n\nExamples:\nCardioX Brochure\nClinical Trial Report\nVisual Aid"
  );

  if (!selected) return;

  if (materials === "") {
    setMaterials(selected);
  } else {
    setMaterials(materials + ", " + selected);
  }
};
const startRecording = () => {

  if (!("webkitSpeechRecognition" in window)) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const speech = new window.webkitSpeechRecognition();

  speech.continuous = true;
  speech.interimResults = false;
  speech.lang = "en-US";

  speech.onstart = () => {
    setIsRecording(true);
  };

  speech.onend = () => {
    setIsRecording(false);
  };

  speech.onresult = (event) => {

    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript + " ";
    }

    setInput(transcript);

  };

  speech.start();

  setRecognition(speech);

};
const stopRecording = () => {

  if (recognition) {
    recognition.stop();
  }

};
const deleteInteraction = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this interaction?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/interaction/${id}`);
    await loadInteractions();
    alert("Interaction deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Delete failed.");
  }
};
const exportCSV = () => {
  if (interactions.length === 0) {
    alert("No interactions to export.");
    return;
  }

  const headers = [
    "HCP Name",
    "Interaction Type",
    "Date",
    "Time",
    "Attendees",
    "Topics",
    "Materials",
    "Samples",
    "Sentiment",
    "Outcomes",
    "Follow Up",
  ];

  const rows = interactions.map((item) => [
    item.hcp_name,
    item.interaction_type,
    item.date,
    item.time,
    item.attendees,
    item.topics,
    item.materials,
    item.samples,
    item.sentiment,
    item.outcomes,
    item.follow_up,
  ]);

  const csv =
    [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${value ?? ""}"`)
          .join(",")
      )
      .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "hcp_interactions.csv");
};


const editInteraction = (item) => {
  setHcpName(item.hcp_name);
  setInteractionType(item.interaction_type);
  setDate(item.date);
  setTime(item.time);
  setAttendees(item.attendees);
  setInput(item.topics);
  setMaterials(item.materials);
  setSamples(item.samples);
  setSentiment(item.sentiment);
  setOutcomes(item.outcomes);
  setFollowUp(item.follow_up);
  setResponse(item.ai_response);

  // remember which record is being edited
  setEditingId(item.id);
};
  return (
    <>
      {/* Header */}
      <div className="header">

        <h1>AI-First CRM HCP Module</h1>
        <p>Log HCP Interaction Screen</p>
        <input
  type="text"
  placeholder="Search HCP..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      </div>

      <div className="container">
        {/* LEFT PANEL */}
        <div className="left">

          <h2>Interaction Details</h2>

          <input
  type="text"
  placeholder="HCP Name"
  value={hcpName}
  onChange={(e) => setHcpName(e.target.value)}
/>
          <select
  value={interactionType}
  onChange={(e) => setInteractionType(e.target.value)}
>
            <option>Meeting</option>
            <option>Call</option>
            <option>Email</option>
            <option>Conference</option>
          </select>

          <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

         <input
    type="time"
    value={meetingTime}
    onChange={(e) => setMeetingTime(e.target.value)}
  />

  <select
    value={timeFormat}
    onChange={(e) => setTimeFormat(e.target.value)}
    style={{ width: "120px" }}
  >
    <option>AM</option>
    <option>PM</option>
  </select>

         <input
  type="text"
  placeholder="Attendees"
  value={attendees}
  onChange={(e) => setAttendees(e.target.value)}
/>
          <textarea
            placeholder="Topics Discussed"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
className="voiceBtn"
type="button"
onClick={isRecording ? stopRecording : startRecording}
>

{isRecording
? "🛑 Stop Recording"
: "🎤 Summarize from Voice Note"}

</button>

          <div className="row">
  <input
    type="text"
    placeholder="Materials Shared"
    value={materials}
    onChange={(e) => setMaterials(e.target.value)}
  />

  <button
    onClick={() => {
      const material = prompt(
        "Enter Material Name\n\nExamples:\n• CardioX Brochure\n• Clinical Trial Report\n• Visual Aid"
      );

      if (material && material.trim() !== "") {
        setMaterials(material);
        alert("Material Added Successfully!");
      }
    }}
  >
    Search/Add
  </button>
</div>

          <div className="row">
            <input
  type="text"
  placeholder="Samples Distributed"
  value={samples}
  onChange={(e) => setSamples(e.target.value)}
/>

            <button
  onClick={() => {
    const product = prompt("Enter Product Name");

    if (!product) return;

    const qty = prompt("Enter Quantity");

    if (!qty) return;

    const sampleText = `${product} (${qty})`;

    if (samples.trim() === "") {
      setSamples(sampleText);
    } else {
      setSamples(samples + ", " + sampleText);
    }

    alert("Sample Added Successfully!");
  }}
>
  Add Sample
</button>
          </div>

          <h3>
            Observed / Inferred HCP Sentiment
          </h3>

          <div className="radioGroup">

  <label>
    <input
      type="radio"
      name="sentiment"
      value="Positive"
      checked={sentiment === "Positive"}
      onChange={(e) => setSentiment(e.target.value)}
    />
    Positive
  </label>

  <label>
    <input
      type="radio"
      name="sentiment"
      value="Neutral"
      checked={sentiment === "Neutral"}
      onChange={(e) => setSentiment(e.target.value)}
    />
    Neutral
  </label>

  <label>
    <input
      type="radio"
      name="sentiment"
      value="Negative"
      checked={sentiment === "Negative"}
      onChange={(e) => setSentiment(e.target.value)}
    />
    Negative
  </label>

</div>

          <textarea
  placeholder="Outcomes"
  value={outcomes}
  onChange={(e) => setOutcomes(e.target.value)}
/>
<h4 style={{ marginTop: "20px" }}>
  Attachments
</h4>

<input
  type="file"
  onChange={(e) => setAttachment(e.target.files[0])}
/>

{attachment && (
  <p
    style={{
      marginTop: "10px",
      color: "green",
      fontWeight: "bold",
    }}
  >
    Selected: {attachment.name}
  </p>
)}

          <textarea
  placeholder="Follow-up Actions"
  value={followUp}
  onChange={(e) => setFollowUp(e.target.value)}
/>

          <h4>AI Suggested Follow-up</h4>

          <ul className="suggestions">
            <li>Schedule follow-up meeting in 2 weeks</li>
            <li>Send Product X brochure</li>
            <li>Arrange requested samples</li>
          </ul>

          <div className="buttonRow">

  <button onClick={askAI}>
    Ask AI
  </button>

  <button onClick={saveInteraction}>
    Save Interaction
  </button>

  <button onClick={exportCSV}>
    Export CSV
  </button>

</div>
          <div
  style={{
    display: "flex",
    gap: "20px",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>

  <div
    style={{
      flex: 1,
      background: "#eff6ff",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>{interactions.length}</h3>
    <p>Total Interactions</p>
  </div>

  <div
    style={{
      flex: 1,
      background: "#ecfdf5",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>
      {
        interactions.filter(
          (x) => x.sentiment === "Positive"
        ).length
      }
    </h3>

    <p>Positive</p>
  </div>

  <div
    style={{
      flex: 1,
      background: "#fef3c7",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>
      {
        interactions.filter(
          (x) => x.sentiment === "Neutral"
        ).length
      }
    </h3>

    <p>Neutral</p>
  </div>

  <div
    style={{
      flex: 1,
      background: "#fee2e2",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center",
    }}
  >
    <h3>
      {
        interactions.filter(
          (x) => x.sentiment === "Negative"
        ).length
      }
    </h3>

    <p>Negative</p>
  </div>

</div>
<h4>Saved Interactions</h4>

<div
  style={{
    maxHeight: "300px",
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    marginTop: "15px",
    background: "#fafafa",
  }}
>
  {interactions.length === 0 ? (
    <p>No interactions yet.</p>
  ) : (
   interactions
  .filter((item) =>
    item.hcp_name.toLowerCase().includes(search.toLowerCase())
  )
  .map((item) => (
      <div
  key={item.id}
  style={{
    borderBottom: "1px solid #ddd",
    padding: "12px 0",
  }}
>
  <b>{item.hcp_name}</b>

  <br />

  {item.interaction_type}

  <br />

  {item.date}

  <br />

  {item.sentiment}

  <br />
  <br />

  <button
    onClick={() => editInteraction(item)}
    style={{ marginRight: "10px" }}
  >
    Edit
  </button>

  <button
    onClick={() => deleteInteraction(item.id)}
    style={{ background: "crimson" }}
  >
    Delete
  </button>
</div>
    ))
  )}
</div>
        </div>

        {/* RIGHT PANEL */}

        <div className="right">

          <h2>AI Assistant</h2>

          <div className="aiBox">

            {response ||
              "Describe an interaction and click 'Ask AI'."}

          </div>

          <div className="chatRow">

            <input
              type="text"
              placeholder="Describe interaction..."
            />

            <button onClick={askAI}>
              Log
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Home;