import { useEffect, useState } from "react";
import { getProfileApi, updateProfileApi } from "../api/profileApi";
import { useNavigate } from "react-router-dom";
import { getFinanceProfileApi } from "../api/financeApi";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [finance, setFinance] = useState(null);


useEffect(() => {
  getProfileApi()
    .then((res) => {
      setProfile(res.data);
      setName(res.data.name || "");
      setAvatar(res.data.avatar || "");
    })
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });

  getFinanceProfileApi()
    .then((res) => setFinance(res.data))
    .catch(() => setFinance(null));
}, []);


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      await updateProfileApi({ name, avatar });
      alert("Profile updated successfully");
      setEditing(false);
    } catch {
      alert("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!profile) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="page">
      <div className="glass" style={{ maxWidth: "500px", margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>My Profile</h2>

        {/* Avatar (UNCHANGED) */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={
              avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="avatar"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ddd",
            }}
          />

          {editing && (
            <div style={{ marginTop: "10px" }}>
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
          )}
        </div>

        {/* Email */}
        <p>
          <strong>Email:</strong> {profile.email}
        </p>

        {/* Name (INLINE FIX) */}
        <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <strong>Name:</strong>
          {editing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 1 }}
            />
          ) : (
            <span>{name || "Not set"}</span>
          )}
        </p>

                {/* Buttons */}
        {editing ? (
          <>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn"
              style={{ marginLeft: "10px" }}
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}

        {/* 👇👇 ADD THIS HERE 👇👇 */}
        {finance && (
          <>
            <hr style={{ margin: "20px 0" }} />
            <h3>Financial Profile</h3>

            <p><strong>Income:</strong> ₹{finance.monthly_income}</p>
            <p><strong>Fixed Expenses:</strong> ₹{finance.fixed_expenses}</p>
            <p><strong>Investments:</strong> ₹{finance.investments}</p>
            <p><strong>Liabilities:</strong> ₹{finance.liabilities}</p>
            <p><strong>Risk Level:</strong> {finance.risk_level}</p>

            {finance.financial_goal && (
              <p><strong>Goal:</strong> {finance.financial_goal}</p>
            )}
          </>
        )}

        <hr style={{ margin: "20px 0" }} />

        <button
          className="btn"
          style={{ background: "#ff4d4d", color: "white", width: "100%" }}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;
