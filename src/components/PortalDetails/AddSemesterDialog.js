import './userPortal.css'

const GRADE_OPTIONS = [
  { label: "85% or Above (A)", value: "A" },
  { label: "80% - 84% (A-)", value: "A-" },
  { label: "75% - 79% (B+)", value: "B+" },
  { label: "70% - 74% (B)", value: "B" },
  { label: "65% - 69% (B-)", value: "B-" },
  { label: "61% - 64% (C+)", value: "C+" },
  { label: "58% - 60% (C)", value: "C" },
  { label: "55% - 57% (C-)", value: "C-" },
  { label: "50% - 54% (D)", value: "D" }, 
  { label: "49% or below (F)", value: "F" },
];

const AddSemesterDialog = ({
  open,
  onClose,
  newSemester,
  setNewSemester,
  handleAddSubject,
  handleRemoveSubject,
  handleSubjectChange,
  handleAddSemester,
}) => {
  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleBackdropClick}>
      <div className="dialog-container">
        <div className="dialog-header">
          <h2 className="dialog-title">Add New Semester Record</h2>
        </div>

        <div className="dialog-content">
          <div className="form-group">
            <label className="form-label">Semester Number *</label>
            <select
              className="form-select"
              value={newSemester.semesterNumber}
              onChange={(e) =>
                setNewSemester({
                  ...newSemester,
                  semesterNumber: parseInt(e.target.value) || 1,
                })
              }
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  Semester {num}
                </option>
              ))}
            </select>
          </div>

          <div className="subjects-section">
            <h3 className="section-title">Subjects</h3>

            {newSemester.subjects.map((subject, index) => (
              <div key={index} className="subject-card">
                <div className="subject-fields">
                  <div className="form-group">
                    <label className="form-label">Subject Name *</label>
                    <input
                      type="text"
                      className={`form-input ${!subject.name.trim() ? "error" : ""}`}
                      value={subject.name}
                      onChange={(e) =>
                        handleSubjectChange(index, "name", e.target.value)
                      }
                      placeholder="Enter subject name"
                      required
                    />
                    {!subject.name.trim() && (
                      <span className="error-text">Required</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Credit Hours *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={subject.creditHours}
                      onChange={(e) =>
                        handleSubjectChange(
                          index,
                          "creditHours",
                          parseInt(e.target.value) || 1,
                        )
                      }
                      min="1"
                      max="5"
                      required
                    />
                  </div>

                  {/* GRADE SELECT - MUST MATCH BACKEND */}
                  <div className="form-group">
                    <label className="form-label">Grade *</label>
                    <select
                      className="form-select"
                      value={subject.grade || "A"}
                      onChange={(e) => {
                        console.log("Grade selected:", e.target.value); // Debug
                        handleSubjectChange(index, "grade", e.target.value);
                      }}
                      required
                    >
                      {GRADE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="remove-btn-container">
                    {newSemester.subjects.length > 1 && (
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveSubject(index)}
                        type="button"
                        title="Remove subject"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <button
              className="add-subject-btn"
              onClick={handleAddSubject}
              type="button"
            >
              <span className="btn-icon">➕</span>
              Add Another Subject
            </button>
          </div>
        </div>

        <div className="dialog-actions">
          <button className="btn-cancel" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="btn-submit"
            onClick={handleAddSemester}
            disabled={newSemester.subjects.some((s) => !s.name.trim())}
            type="button"
          >
            Add Semester
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSemesterDialog;
