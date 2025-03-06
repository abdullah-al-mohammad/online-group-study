import React from "react";
import useAssignment from "../../../Hooks/useAssignment";

const MarkAssignment = () => {
  const [assignmentMark] = useAssignment();
  console.log(assignmentMark);
  return (
    <div>
      {assignmentMark.map((mark) => {
        if (mark.status === "pending") {
          return (
            <div className="card">
              <div className="card bg-base-100 w-96 shadow-sm">
                <div className="card-body">
                  <h2 className="card-title">PdfLink: {mark.pdfLink}</h2>
                  <p>Mark: {mark.note}</p>
                  <div>
                    <input
                      type="text"
                      placeholder="giving marks"
                      className="input border border-red-400"
                    />
                    <input
                      type="text"
                      placeholder="give your feedback"
                      className="input border border-red-400"
                    />
                  </div>
                  <div className="card-actions">
                  <button className="btn btn-active btn-success">Success</button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MarkAssignment;
