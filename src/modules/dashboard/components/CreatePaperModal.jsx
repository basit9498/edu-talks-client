
import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const CreatePaperModal = ({ onClose, discussionTitle ,worksheets,discussionId}) => {
  const [paperFormStep, setPaperFormStep] = useState(1);

  const linkedDocChapters = [
    { id: 1, title: "Chapter 1: Introduction to Quantum Mechanics", selected: false },
    { id: 2, title: "Chapter 2: Wave-Particle Duality", selected: false },
    { id: 3, title: "Chapter 3: Quantum Entanglement", selected: true },
    { id: 4, title: "Chapter 4: Quantum Computing Applications", selected: false }
  ];

  const validationSchema = Yup.object().shape({
    paperName: Yup.string().required("Paper name is required"),
    marks: Yup.number().required("Marks required").min(1),
    passingPercentage: Yup.number().required("Passing percentage is required").min(1),
    timeAllowed: Yup.number().required("Time allowed is required").min(1),
    worksheet: Yup.string().required("Worksheet is required"),
    // worksheetType: Yup.string().required("Worksheet type is required"),
    questionTypes: Yup.array().min(1, "Select at least one question type"),
    // numQuestions: Yup.number().required("Required").min(1),
    difficulty: Yup.string().required(),
    contentSource: Yup.string().required(),
    // selectedDocument: Yup.string().when("contentSource", {
    //   is: "both",
    //   then: Yup.string().required("Document required")
    // }),
    // selectedChapters: Yup.array().when("contentSource", {
    //   is: "both",
    //   then: Yup.array().min(1, "Select at least one chapter")
    // })
  });

  const initialValues = {
    paperName: "",
    marks: "",
    passingPercentage: "",
    timeAllowed: "",
    worksheet: "",
    worksheetType: "",
    questionTypes: [],
   
    difficulty: "medium",
    contentSource: "discussion",
    selectedDocument: "",
    selectedChapters: []
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {

        const questionSetup = values.questionTypes.map((qt) => ({
          type: qt.type,
          number_of_questions: qt.numQuestions,
          total_marks: qt.totalMarks,
        }))

        const payload = {
          title: values.paperName,
          total_marks: values.marks,
          difficulty_level: values.difficulty ,
          passing_percentage: values.passingPercentage,
          time_limit_minutes: values.timeAllowed,
          source_type: values.contentSource,
          worksheet_id: values.worksheet,
          discussion_id: discussionId,
          question_setup: questionSetup,
        }

        console.log("payload", payload)
           
          

        
        
      }}
    >
      {({ values, errors, touched, handleChange, setFieldValue, validateForm, setTouched }) => (

       <Form>
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
               
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Create New Paper
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  From: {discussionTitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      paperFormStep >= step
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        paperFormStep > step
                          ? "bg-gradient-to-r from-blue-500 to-purple-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* STEP 1 */}
            {paperFormStep === 1 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Paper Details
                </h4>

                {/* Paper Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Paper Name
                  </label>
                  <input
                    type="text"
                    name="paperName"
                    value={values.paperName}
                    onChange={handleChange}
                    placeholder="e.g., Quantum Physics Midterm"
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors.paperName && <p className="text-red-500 text-sm">{errors.paperName}</p>}
                </div>

                {/* Marks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    name="marks"
                    value={values.marks}
                    onChange={handleChange}
                    placeholder="e.g., 100"
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors.marks && <p className="text-red-500 text-sm">{errors.marks}</p>}
                </div>

        

                {/* passing percentage of marks to the worksheet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Passing Percentage
                  </label>
                  <input
                    type="number"
                    name="passingPercentage"
                    value={values.passingPercentage}
                    onChange={handleChange}
                    placeholder="e.g., 50"
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"  
                  />
                  {errors.passingPercentage && <p className="text-red-500 text-sm">{errors.passingPercentage}</p>}
                </div>

                        {/* time allowed */}
                        <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time Allowed
                  </label>
                  <input
                    type="number"
                    name="timeAllowed"
                    value={values.timeAllowed}
                    onChange={handleChange}
                    placeholder="e.g., 60"
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors.timeAllowed && <p className="text-red-500 text-sm">{errors.timeAllowed}</p>}
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    name="difficulty"
                    value={values.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty}</p>}

                {/* Worksheet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add to Worksheet
                  </label>
                  <select
                    name="worksheet"
                    value={values.worksheet}
                    onChange={async (e) => {
                      setFieldValue("worksheet", e.target.value)
                      await setTouched({ worksheet: true })
                      const newType = worksheets.find(ws => ws.id === e.target.value).type
                      setFieldValue("worksheetType", newType)
                    
                      const singleTypes = ["mcqs", "fill_in_the_blank", "short_question", "long_answer"];

                      if (newType === "all") {
                        // Reset types when selecting ALL
                        setFieldValue("questionTypes", []);
                      } 
                      else if (singleTypes.includes(newType)) {
                        // Reset to only the selected type
                        setFieldValue("questionTypes", [
                          {
                            type: newType,
                            numQuestions: "",
                            marksPerQuestion: ""
                          }
                        ]);
                      }
                    
                    }}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select existing worksheet</option>
                    {worksheets.map((worksheet) => (
                      <option key={worksheet.id} value={worksheet.id}>{worksheet.name}</option>
                    ))}
                  </select>
                  {errors.worksheet && <p className="text-red-500 text-sm">{errors.worksheet}</p>}
                </div>
              </div>
            )}

    
            {paperFormStep === 2 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Question Setup
                </h4>

                {(() => {
                  const allTypesList = [
                    { id: "mcqs", label: "MCQs" },
                    { id: "fill_in_the_blank", label: "Fill in the Blank" },
                    { id: "short_question", label: "Short Question" },
                    { id: "long_answer", label: "Long Answer" }
                  ];

                  // Non-"all" → only one type allowed
                  const forcedType = ["mcqs", "fill_in_the_blank", "short_question", "long_answer"].includes(
                    values.worksheetType
                  )
                    ? values.worksheetType
                    : null;

                  // Determine active types
                  const selectedTypes =
                    values.worksheetType === "all"
                      ? values.questionTypes.map((q) => q.type)
                      : forcedType
                      ? [forcedType]
                      : [];

                  // TOTAL MARKS ALLOCATED BY USER
                  const totalAllocated = values.questionTypes.reduce(
                    (acc, qt) => acc + Number(qt.totalMarks || 0),
                    0
                  );

                  const marksRemaining = Number(values.marks || 0) - totalAllocated;

                  const markStatusText =
                    marksRemaining === 0
                      ? "Perfect! All marks allocated."
                      : marksRemaining > 0
                      ? `You still have ${marksRemaining} marks remaining.`
                      : `You exceeded total marks by ${Math.abs(marksRemaining)}!`;

                  // Toggle types
                  const handleCheckboxToggle = (type) => {
                    let updated;

                    if (selectedTypes.includes(type)) {
                      updated = selectedTypes.filter((t) => t !== type);
                    } else {
                      updated = [...selectedTypes, type];
                    }

                    // Rebuild formik array
                    const newQT = updated.map((t) => {
                      const existing = values.questionTypes.find((q) => q.type === t);
                      return (
                        existing || {
                          type: t,
                          numQuestions: "",
                          totalMarks: "",
                          marksPerQuestion: ""
                        }
                      );
                    });

                    setFieldValue("questionTypes", newQT);
                  };

                  return (
                    <div className="space-y-6">
                      {/* TYPE CHECKBOXES – SAME UI */}
                      {values.worksheetType === "all" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Question Types
                          </label>

                          <div className="space-y-2">
                            {allTypesList.map((t) => (
                              <label
                                key={t.id}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedTypes.includes(t.id)}
                                  onChange={() => handleCheckboxToggle(t.id)}
                                  className="w-4 h-4 text-blue-600 rounded"
                                />
                                <span className="text-sm text-gray-900 dark:text-white">
                                  {t.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* MARKS TOTALS */}
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Total Marks: {values.marks}
                        </p>

                        <p
                          className={`text-sm mt-2 ${
                            marksRemaining < 0
                              ? "text-red-600"
                              : marksRemaining > 0
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {markStatusText}
                        </p>
                      </div>

                      {/* TYPES DATA INPUT */}
                      {values.questionTypes
                        .filter((qt) => selectedTypes.includes(qt.type))
                        .map((qt) => {
                          const updateQuestions = (val) => {
                            const num = Number(val);
                            const mpq =
                              num > 0 && qt.totalMarks
                                ? Number(qt.totalMarks) / num
                                : "";

                            const updated = values.questionTypes.map((q) =>
                              q.type === qt.type
                                ? {
                                    ...q,
                                    numQuestions: val,
                                    marksPerQuestion: mpq
                                  }
                                : q
                            );

                            setFieldValue("questionTypes", updated);
                          };

                          const updateTotalMarks = (val) => {
                            const tm = Number(val);
                            const mpq =
                              tm > 0 && qt.numQuestions
                                ? tm / Number(qt.numQuestions)
                                : "";

                            const updated = values.questionTypes.map((q) =>
                              q.type === qt.type
                                ? {
                                    ...q,
                                    totalMarks: tm,
                                    marksPerQuestion: mpq
                                  }
                                : q
                            );

                            setFieldValue("questionTypes", updated);
                          };

                          return (
                            <div
                              key={qt.type}
                              className="p-4 border dark:border-gray-700 rounded-lg"
                            >
                              <h5 className="font-medium text-gray-900 dark:text-white mb-3 capitalize">
                                {qt.type.replace(/_/g, " ")}
                              </h5>

                              <div className="grid grid-cols-2 gap-4">
                                {/* Number of Questions */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Number of Questions
                                  </label>
                                  <input
                                    type="number"
                                    value={qt.numQuestions}
                                    onChange={(e) => updateQuestions(e.target.value)}
                                    placeholder="e.g., 10"
                                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
                                  />
                                </div>

                                {/* Total Marks for this Type */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Total Marks for this {qt.type.replace(/_/g, " ")}
                                  </label>
                                  <input
                                    type="number"
                                    value={qt.totalMarks}
                                    onChange={(e) => updateTotalMarks(e.target.value)}
                                    placeholder="e.g., 20"
                                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
                                  />
                                </div>
                              </div>

                              {/* Auto per-question marks */}
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Marks per question:{" "}
                                {qt.marksPerQuestion ? qt.marksPerQuestion : "--"}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  );
                })()}
              </div>
            )}



            {/* STEP 3 */}
            {paperFormStep === 3 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Content Source
                </h4>

                {/* Content Source Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Include Questions From:
                  </label>

                  <div className="space-y-3">
                    {/* Discussion */}
                    <button
                      type="button"
                      onClick={() => setFieldValue("contentSource", "discussion")}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        values.contentSource === "discussion"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            values.contentSource === "discussion"
                              ? "border-blue-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {values.contentSource === "discussion" && (
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Only This Discussion
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Generate questions from discussion messages only
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Both */}
                    <button
                      type="button"
                      onClick={() => setFieldValue("contentSource", "discussion_document")}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        values.contentSource === "both"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            values.contentSource === "both"
                              ? "border-blue-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {values.contentSource === "both" && (
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Discussion + Uploaded Document
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Include content from linked documents
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Document + Chapters */}
                {values.contentSource === "both" && (
                  <div className="mt-4 space-y-4">
                    {/* Select Document */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Document
                      </label>
                      <select
                        name="selectedDocument"
                        value={values.selectedDocument}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Choose a document</option>
                        <option value="quantum">
                          Introduction to Quantum Mechanics.pdf
                        </option>
                        <option value="physics">Advanced Physics Notes.pdf</option>
                      </select>
                    </div>

                    {/* Select Chapters */}
                    {values.selectedDocument && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Select Chapters
                        </label>
                        <div className="space-y-2 max-h-48 overflow-y-auto border dark:border-gray-600 rounded-lg p-3">
                          {linkedDocChapters.map((chapter) => (
                            <label
                              key={chapter.id}
                              className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={values.selectedChapters.includes(
                                  chapter.id
                                )}
                                onChange={() => {
                                  const exists = values.selectedChapters.includes(
                                    chapter.id
                                  );
                                  const updated = exists
                                    ? values.selectedChapters.filter(
                                        (id) => id !== chapter.id
                                      )
                                    : [...values.selectedChapters, chapter.id];
                                  setFieldValue(
                                    "selectedChapters",
                                    updated
                                  );
                                }}
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                              <span className="text-sm text-gray-900 dark:text-white">
                                {chapter.title}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 */}
            {paperFormStep === 4 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  AI Generation Controls
                </h4>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Sparkles
                      className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">
                        AI-Powered Question Generation
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        EduTalks AI will generate questions from your selected
                        sources. You can review and edit them before finalizing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary box */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    Paper Summary
                  </h5>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Paper Name:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {values.paperName || "Not set"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Total Marks:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {values.marks || "Not set"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Questions:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {values.numQuestions || "Not set"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Difficulty:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {values.difficulty}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Question Types:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {values.questionTypes.join(", ") || "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
              {paperFormStep > 1 && (
                <button
                  type="button"
                  onClick={() => setPaperFormStep(paperFormStep - 1)}
                  className="px-6 py-3 border dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                >
                  Back
                </button>
              )}

              {paperFormStep < 4 ? (
                <button
                  type="button"
                  // onClick={() => setPaperFormStep(paperFormStep + 1)}
                  onClick={async () => {
                    console.log("values", values)
                    const valid = await validateForm();
                    console.log("valid", valid)

                    if(paperFormStep === 1){
                      await setTouched({
                        paperName: true,
                        marks: true,
                        passingPercentage: true,
                        timeAllowed: true,
                        worksheet: true,
                        difficulty: true
                      });
                   
                      if(valid.paperName || valid.marks || valid.passingPercentage || valid.timeAllowed || valid.worksheet || valid.difficulty){
                        return;
                      }
                    
                      setPaperFormStep(2);
                    }
                    else if(paperFormStep === 2){
                           // TOTAL MARKS ALLOCATED BY USER
                      const totalAllocated = values.questionTypes.reduce(
                        (acc, qt) => acc + Number(qt.totalMarks || 0),
                        0
                      );

                      const marksRemaining = Number(values.marks || 0) - totalAllocated;
                      const toastMessage = marksRemaining > 0 ? `You still have ${marksRemaining} marks remaining.` : `You exceeded total marks by ${Math.abs(marksRemaining)}!`;

                      if(marksRemaining > 0 || marksRemaining < 0){
                        toast.error(toastMessage)
                        return;
                      }

                      if(valid.questionTypes){
                        return;
                      }
                      setPaperFormStep(3);
                    }
                    else if(paperFormStep === 3){
                      if(valid.contentSource || valid.selectedDocument || valid.selectedChapters){
                        return;
                      }
                      setPaperFormStep(4);
                    }
                    else if(paperFormStep === 4){
                      if(valid.paperSummary){
                        return;
                      }
                      setPaperFormStep(5);
                    }
                  
                  
                  
                  
                  
                  
                  }}
                  
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} />
                  Generate Paper
                </button>
              )}
            </div>
          </div>
        </div>
       </Form>
      )}
    </Formik>
  );
};

export default CreatePaperModal;
