import React, { useState } from 'react';
import './Accordian.css';
import arrowDown from './arrow-line-down.png';
import arrowUp from './arrow-line-up.png'

const CustomAccordion = ({ items, onRadioChange }) => {
  const [expanded, setExpanded] = useState(null);

  const handleCheckboxChange = (index, taskIndex, checked) => {
    onRadioChange(index, taskIndex, checked);
  };

  const handleClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <div className="accordion-header" onClick={() => handleClick(index)}>
            <h3>{item.name}</h3>
            <span className="show-hide">{expanded === index ? 'Hide' : 'Show'}{expanded === index ? (
              <img src={arrowUp} alt="Up Arrow" />
            ) : (
              <img src={arrowDown} alt="Down Arrow" />
            )}</span>
          </div>

          {expanded === index && (
            <div className="accordion-content">
              {item.tasks.map((task, taskIndex) => (
                <div className='checkbox-name' key={taskIndex}>
                  <input
                    type="checkbox"
                    name={`task_${index}_${taskIndex}`}
                    checked={task.checked}
                    onChange={(e) => handleCheckboxChange(index, taskIndex, e.target.checked)}
                  />
                  <label>{task.description}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomAccordion;
