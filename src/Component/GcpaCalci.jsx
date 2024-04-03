import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./GcpaCalci.css";
import Happy from "./assests/images/Happy.gif";
import Sad from "./assests/images/Sad.gif";
import SubjectList from "./SubjectList";
function GcpaCalci() {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const showPopup = () => setPopupVisibility(true);
  const hidePopup = () => setPopupVisibility(false);
  const [subjects, setSubjects] = useState([
    {
      name: "JMA1303 Discrete Mathematics and Number Theory",
      credits: 3,
    },
    { name: "JCS1301 Data Structures", credits: 3 },
    { name: "JCS1302 Database Management Systems", credits: 3 },
    { name: "JCS1303 Computer Architecture", credits: 3 },
    { name: "JCS1321 Object Oriented Programming", credits: 3 },
    { name: "JCS1311 Data Structures Laboratory", credits: 2 },
    {
      name: "JCS1312 Database Management Systems Laboratory",
      grade: "",
      credits: 2,
    },
    {
      name: "JGE1309 Tamils and Technology",
      grade: "",
      credits: 1,
    },
  ]);

  const gradeOptions = ["O", "A+", "A", "B+", "B", "C"];

  const handleGradeChange = (subjectIndex, selectedGrade) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].grade = selectedGrade;
    setSubjects(updatedSubjects);
    console.log(updatedSubjects)
  };

  const calculateCGPA = () => {
    const totalCredits = subjects.reduce(
      (total, subject) => total + subject.credits,
      0
    );
    const totalGradePoints = subjects.reduce(
      (total, subject) =>
        total + getGradePoints(subject.grade) * subject.credits,
      0
    );
    const cgpa = totalGradePoints / totalCredits;
    return cgpa.toFixed(2);
  };
  const gcpa = () => {
    const vinoth = calculateCGPA();
    showPopup();
  };

  const getGradePoints = (selectedGrade) => {
    const gradePointsMap = {
      O: 10,
      "A+": 9,
      A: 8,
      "B+": 7,
      B: 6,
      C: 5,
      U: 0,
    };

    return gradePointsMap[selectedGrade] || 0;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a header to the PDF
    doc.text("Result", 20, 10);

    // Create a table with autotable
    doc.autoTable({
      theme: "grid",
      head: [["Subject", "Grade"]],
      body: subjects.map((subject) => [subject.name, subject.grade]),
      startY: 20,
    });

    // Calculate CGPA and add it to the PDF
    const cgpa = calculateCGPA();
    doc.text(`\nCGPA: ${cgpa}`, 20, doc.autoTable.previous.finalY + 10);

    // Save the PDF
    doc.save("result.pdf");

    // Show the popup with CGPA
    showPopup();
  };

  return (
    <div className={`${isPopupVisible ? "active" : ""}  `}>
      <h1>CGPA Calculator - Sem3</h1>
      <div className="test">
        <SubjectList
          subjects={subjects}
          handleGradeChange={handleGradeChange}
          generatePDF={generatePDF}
        />
        <button onClick={generatePDF}>Generate PDF</button>
        <button onClick={gcpa}>Calculate CGPA</button>
      </div>

      {isPopupVisible && (
        <div className={`popup ${isPopupVisible ? "active" : ""}`}>
          <div className="popup-content">
            <span className="close" onClick={hidePopup}>
              &times;
            </span>

            <h2>CGPA Result</h2>
            {calculateCGPA() > 5 ? (
              <>
                <img src={Happy} alt="Happy Emoji" className="gifSize" />
                <h3>Congratulations </h3>
              </>
            ) : (
              <>
                <img src={Sad} alt="Sad Emoji" className="gifSize" />
                <h3>Try More Marks in Upcoming Exams </h3>
              </>
            )}
            <h1>
              CGPA: <span style={{ color: "green" }}>{calculateCGPA()}</span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default GcpaCalci;
