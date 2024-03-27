import React, { useState } from 'react';
import './ToggleButton.css'

function ToggleButton({initialToggleState,onToggle}) {
  const [isToggled, setIsToggled] = useState(initialToggleState);

  const handleClick = () => {
    const toggleState = !isToggled;
    setIsToggled(toggleState);
    if (onToggle) {
      onToggle(toggleState);
    }
  };

  return (
    <div className='d-flex align-items-center px-2'>
        <button className={`rounded toggle-button p-0 ${isToggled? 'active' : ''}`} 
        onClick={handleClick} style={{height:"18px", width:"40px"}}>
            <div className='slider'/>
        </button>
    </div>
  );
}

export default ToggleButton;
