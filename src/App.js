import React, { useEffect, useState } from "react";
import "./App.css";
import Progressbar from "./Component/Progressbar";
import Accordion from './Component/Accordian/Accordian';

function App() {
  const [progress, setProgress] = useState(0);
  const [accordionItems, setAccordionItems] = useState([]);

  useEffect(() => {
    fetch(`https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress`)
      .then((res) => res.json())
      .then((data) => {
        setAccordionItems(data);
        const totalValues = data.reduce((acc, item) => {
          return acc + item.tasks.reduce((taskAcc, task) => taskAcc + task.value, 0);
        }, 0);

        const initialProgress = ((data.reduce((acc, item) => {
          return acc + item.tasks.filter(task => task.checked).reduce((taskAcc, checkedTask) => taskAcc + checkedTask.value, 0);
        }, 0) * 100) / totalValues).toFixed(2);

        setProgress(parseFloat(initialProgress));
      })
      .catch((errors) => console.log(errors));
  }, []);


  const handleRadioChange = (index, taskIndex, checked) => {
    const updatedAccordionItems = [...accordionItems];
    const taskValue = updatedAccordionItems[index].tasks[taskIndex].value;

    updatedAccordionItems[index].tasks[taskIndex].checked = checked;

    const totalCheckedValues = updatedAccordionItems.reduce((acc, item) => {
      return acc + item.tasks.reduce((taskAcc, task) => taskAcc + (task.checked ? task.value : 0), 0);
    }, 0);

    const totalValues = updatedAccordionItems.reduce((acc, item) => {
      return acc + item.tasks.reduce((taskAcc, task) => taskAcc + task.value, 0);
    }, 0);

    const newProgress = ((totalCheckedValues * 100) / totalValues).toFixed(2);
    setProgress(parseFloat(newProgress));

    setAccordionItems(updatedAccordionItems);
  };



  return (
    <div className="App">
      <h1>Lodgify Grouped Tasks</h1>
      <Progressbar bgcolor="#00B797" progress={progress} height={30} />
      <div>
        <Accordion items={accordionItems} onRadioChange={handleRadioChange} />
      </div>
    </div>
  );
}

export default App;
