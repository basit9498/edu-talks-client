

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BaseModal from "../../../../../components/common/Modal/BaseModal";
import { FileText, FileStack, MessageSquare, Upload } from "lucide-react";
import { createDiscussion } from "../../../../../services/discussion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllDocuments } from "../../../../../services/doc";

const DiscussionModal = ({ onClose }) => {
  const [mode, setMode] = useState("general"); // general | document | worksheet
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await getAllDocuments();
      setDocuments(documents);
    };
    fetchDocuments();
  }, []);

  const formik = useFormik({
    
    initialValues: {
      title: "",
      description: "",
      visibility: "Public",
      file: null,
      document_id: "",

    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      // description:
      //   mode === "general" || mode === "worksheet"
      //     ? Yup.string().required("Description is required")
      //     : Yup.string().nullable(),
      
    }),
    onSubmit: async (values) => {
      console.log("Discussion Submitted:", values);
      try {
        const payload = {
          title: values.title,
          description: values.description,
          visibility: values.visibility.toLowerCase(),
          // file: values.file,
          type: mode,
        };
        if (mode === "document") {
          payload.doc_id = values.document_id;
        }
        const discussion = await createDiscussion(payload);
        toast.success("Discussion created successfully");
        navigate(`/dashboard/discussion/detail?discussion=${discussion.id}`);
        console.log(discussion);
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
      onClose();
    },
    
  });

  return (
    <BaseModal title="Create New Discussion" onClose={onClose}>

{Object.keys(formik.errors).length > 0 && (
  <pre className="text-red-500 text-sm">
    {JSON.stringify(formik.errors, null, 2)}
  </pre>
)}
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        {/* MODE SELECT BUTTONS */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* From Worksheet */}
          {/* <button
            type="button"
            onClick={() => setMode("worksheet")}
            className={`p-4 border-2 rounded-lg text-center hover:bg-blue-50 dark:hover:bg-gray-700 ${
              mode === "worksheet"
                ? "border-blue-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <FileText
              className="mx-auto mb-2 text-gray-900 dark:text-white"
              size={24}
            />
            <span className="text-sm text-gray-900 dark:text-white">
              From Worksheet
            </span>
          </button> */}

             {/* General */}
             <button
            type="button"
            onClick={() => setMode("general")}
            className={`p-4 border-2 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-700 ${
              mode === "general"
                ? "border-blue-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <MessageSquare
              className="mx-auto mb-2 text-gray-900 dark:text-white"
              size={24}
            />
            <span className="text-sm text-gray-900 dark:text-white">General</span>
          </button>

          {/* From Document */}
          <button
            type="button"
            onClick={() => setMode("document")}
            className={`p-4 border-2 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-700 ${
              mode === "document"
                ? "border-blue-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <FileStack
              className="mx-auto mb-2 text-gray-900 dark:text-white"
              size={24}
            />
            <span className="text-sm text-gray-900 dark:text-white">
              From Document
            </span>
          </button>

       
        </div>

        {/* TITLE - always shown */}
        <input
          type="text"
          name="title"
          placeholder="Discussion Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg 
                     dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        {/* DESCRIPTION - hidden for DOCUMENT mode */}
        {(mode === "general" || mode === "worksheet") && (
          <textarea
            name="description"
            placeholder="Description / Topic"
            rows={3}
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg 
                     dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        )}

        {mode === "document" && (
          <select name="document_id" onChange={formik.handleChange} value={formik.values.document_id} className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg 
                     dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option value="">Select Document</option>
            {documents.map((document) => (
              <option key={document.id} value={document.id}>{document.name}</option>
            ))}
          </select>
        )}


        {/* VISIBILITY - same for all modes */}
        <select
          name="visibility"
          onChange={formik.handleChange}
          value={formik.values.visibility}
          className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg 
                     dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Select Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 
                     text-white py-3 rounded-lg font-medium hover:shadow-lg 
                     transition-shadow"
        >
          Create Discussion
        </button>
      </form>
    </BaseModal>
  );
};

export default DiscussionModal;

