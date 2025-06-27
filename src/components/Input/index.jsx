import './input.css';

export const Input = ({ label, value, onChange, type = "text", placeholder = "", width, ...props }) => (
  <div>
    {label && <label className="input-label">{label}</label>}
    <input
      className="input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={width ? { '--input-width': width } : undefined}
      {...props}
    />
  </div>
);