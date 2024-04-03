import React from "react";

const SubjectList = ({ subjects, handleGradeChange }) => {
  const gradeOptions = ["Select Grade", "O", "A+", "A", "B+", "B", "C"];

  return (
    <div>
      {subjects.map((sub, index) => (
        <div key={index}>
          <h3>{sub.name}</h3>
          <label>Grade:</label>
          <select onChange={(e) => handleGradeChange(index, e.target.value)}>
            {gradeOptions.map((option) => (
              <option key={option} value={option} >
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;
