function Settings() {
  return (
    <div className="glass" style={{ margin: "40px" }}>
      <h2>Settings ⚙️</h2>

      <label>Preferred Language</label>
      <select style={inputStyle}>
        <option>English</option>
        <option>Hindi</option>
        <option>Marathi</option>
      </select>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
};

export default Settings;
