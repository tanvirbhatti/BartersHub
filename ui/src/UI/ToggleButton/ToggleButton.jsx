import React, { useState } from 'react';
import './ToggleButton.css';

function ToggleButton({ id, initialToggleState, onToggle }) {
  const [isToggled, setIsToggled] = useState(initialToggleState);

  const handleClick = () => {
    const toggleState = !isToggled;
    setIsToggled(toggleState);
    if (onToggle) {
      onToggle(toggleState);
    }
  };

  return (
    <div className="switch">
      <input
        id={id} // Use the id prop for input id
        type="checkbox"
        className="toggle-button"
        checked={isToggled}
        onChange={handleClick}
      />
      <label htmlFor={id}> {/* Use the id prop for label htmlFor */}
        <div className={`slider ${isToggled ? 'active' : ''}`} />
      </label>
    </div>
  );
}

export default ToggleButton;
