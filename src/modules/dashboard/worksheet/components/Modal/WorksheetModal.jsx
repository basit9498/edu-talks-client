import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import BaseModal from "../../../../../components/common/Modal/BaseModal";
import { Sparkles } from "lucide-react";
import { createWorksheet } from "../../../../../services/worksheet";
import { toast } from "react-toastify";

const WorksheetModal = ({ onClose, setWorksheets,worksheets}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      source: "",
      type: "Mix",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
      visibility: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("Worksheet Created:", values);
      try {
        const payload = {
          name: values.title,
          type: values.type,
          visibility: values.visibility,
        };
        const worksheet = await createWorksheet(payload);
        setWorksheets([worksheet,...worksheets, ]);
        toast.success("Worksheet created successfully");
        onClose();
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
   
    },
  });





  return (
    <BaseModal
      title={"Create New Worksheet"}
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        {/* Title Input */}
        <div>

        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Worksheet Name"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {formik.errors.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}
        </div>

 

        {/* Type Select */}
       <div>
         <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
        <select
          name="type"
          onChange={formik.handleChange}
          value={formik.values.type}
          className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">Mix</option>
          <option value="fill_in_the_blank">Fill in the Blanks</option>
          <option value="mcqs">MCQ Only</option>
          <option value="short_question">Short Answer</option>
          <option value="long_answer">Long Answer</option>
      
        </select>
        {formik.errors.type && (
          <p className="text-red-500 text-sm">{formik.errors.type}</p>
        )}
       </div>

        {/* Visibility Select */}
       <div>
       <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visibility</label>
        <select
          name="visibility"
          onChange={formik.handleChange}
          value={formik.values.visibility}
          className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        {formik.errors.visibility && (
          <p className="text-red-500 text-sm">{formik.errors.visibility}</p>
        )}
       </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
        >
          <Sparkles size={18} />
          Create Worksheet
        </button>
      </form>
    </BaseModal>
  );
};

export default WorksheetModal;
