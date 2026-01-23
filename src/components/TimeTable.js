import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import buitemsLogo from './images/buitems logo.png'

const TimetableGenerator = () => {
  const [timeInput, setTimeInput] = useState('');
  const [dayInput, setDayInput] = useState('monday');
  const [subjectInput, setSubjectInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [timetableData, setTimetableData] = useState([
    { time: '00', monday: '--', tuesday: '--', wednesday: '--', thursday: '--', friday: '--' },
    { time: '00', monday: '--', tuesday: '--', wednesday: '--', thursday: '--', friday: '--' },
    { time: '00', monday: '--', tuesday: '--', wednesday: '--', thursday: '--', friday: '--' },
    { time: '00', monday: '--', tuesday: '--', wednesday: '--', thursday: '--', friday: '--' },
    { time: '00', monday: '--', tuesday: '--', wednesday: '--', thursday: '--', friday: '--' },
    { time: '00', monday: '--', tuesday: '--', wednesday: '--', thursday: '--', friday: '--' }
  ]);

  const tableRef = useRef(null);
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const dayIndexMap = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
  };

  const generatePDF = () => {
    const element = tableRef.current;
    const opt = {
      margin: 10.5,
      filename: 'Timetable.pdf',
      image: { type: 'jpeg', quality: 1 },
      scale: 3,
      html2canvas: {
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'landscape'
      },
      pagebreak: { mode: ['css'] }
    };

    html2pdf().set(opt).from(element).save();
  };

  const addEntry = () => {
    // Validation
    if (!timeInput.trim() || !subjectInput.trim() || !locationInput.trim()) {
      setValidationMessage('Fill all the above requirements');
      setTimeout(() => {
        setValidationMessage('');
      }, 1400);
      return;
    }

    // Create a copy of the timetable data
    const newTimetableData = [...timetableData];
    const dayIndex = dayIndexMap[dayInput];
    const dayKey = days[dayIndex];

    let entryAdded = false;

    // Find first available slot in the row
    for (let i = 0; i < newTimetableData.length; i++) {
      // Update time slot if it's still "00"
      if (newTimetableData[i].time === '00') {
        newTimetableData[i].time = timeInput.toUpperCase();
      }

      // Check if the day slot is available ("--")
      if (newTimetableData[i][dayKey] === '--') {
        newTimetableData[i][dayKey] = `${locationInput.toUpperCase()} | ${subjectInput.toUpperCase()}`;
        entryAdded = true;
        break;
      }
    }

    if (entryAdded) {
      setTimetableData(newTimetableData);
      
      // Reset inputs
      setTimeInput('');
      setDayInput('monday');
      setSubjectInput('');
      setLocationInput('');
    }
  };



  return (
    <>
    <title>BUITEMS - TimeTable Generator</title>
    <div id="timetable-body">
      <div id="timetable-container">
        <img src={buitemsLogo} alt="BUITEMS Logo" id="logoimgtt" />

        <div id="titbl-inputs">
          <label htmlFor="time-slot">Enter time:</label>
          <input
            type="text"
            placeholder="Enter Time Eg: (9:00 - 10:30)"
            id="time-slot"
            className="input"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
          />

          <label htmlFor="day">Enter day</label>
          <select
            id="day"
            className="input"
            value={dayInput}
            onChange={(e) => setDayInput(e.target.value)}
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
          </select>

          <label htmlFor="subject">Enter Subject</label>
          <input
            type="text"
            placeholder="Subject"
            id="subject"
            className="input"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
          />

          <label htmlFor="location">Class location</label>
          <input
            type="text"
            placeholder="Enter location"
            id="location"
            className="input"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        {validationMessage && (
          <p className="validation">{validationMessage}</p>
        )}

        <button id="tt-add-btn" onClick={addEntry}>
          Add
        </button>

        <table id="timetable-table" ref={tableRef}>
          <thead id="table-hdng">
            <tr>
              <td id="time-area-slot">Time slot</td>
              <td>Monday</td>
              <td>Tuesday</td>
              <td>Wednesday</td>
              <td>Thursday</td>
              <td>Friday</td>
            </tr>
          </thead>

          <tbody>
            {timetableData.map((row, index) => (
              <tr key={index} className="tbody-timeteale">
                <td className="timimg-area">{row.time}</td>
                <td>{row.monday}</td>
                <td>{row.tuesday}</td>
                <td>{row.wednesday}</td>
                <td>{row.thursday}</td>
                <td>{row.friday}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button id="pdf-gen" onClick={generatePDF}>
          Generate PDF
        </button>

        <Link to="/">
          <button id="homepg">Home</button>
        </Link>
      </div>
    </div>
    </>

  );
};

export default TimetableGenerator;