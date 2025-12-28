function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        marginBottom: "15px",
      }}
    />
  );
}

export default Input;
