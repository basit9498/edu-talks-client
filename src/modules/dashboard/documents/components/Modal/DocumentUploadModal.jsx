// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import BaseModal from '../../../../../components/common/Modal/BaseModal';
// import { Upload, Sparkles } from 'lucide-react';
// import { uploadDocument } from '../../../../../services/doc'; 

// const DocumentUploadModal = ({ onClose }) => {
//   const formik = useFormik({
//     initialValues: {
//       file: null,
//       title: '',
//     },

//     validationSchema: Yup.object({
//       title: Yup.string().required("Title is required"),
//       file: Yup.mixed().required("File is required"),
//     }),

//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         const formData = new FormData();
//         formData.append("file", values.file);
//         formData.append("name", values.title); // optional (backend can ignore)

//         await uploadDocument(formData);

//         onClose();
//       } catch (error) {
//         console.error("Upload failed", error);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <BaseModal title="Upload Document" onClose={onClose}>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">

//         {/* Upload box */}
//         <div
//           className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
//           onClick={() => document.getElementById("fileInput").click()}
//         >
//           <Upload className="mx-auto mb-2 text-gray-400" size={32} />
//           <p>
//             {formik.values.file
//               ? formik.values.file.name
//               : "Click to upload or drag & drop"}
//           </p>
//         </div>

//         {/* Hidden input */}
//         <input
//           id="fileInput"
//           type="file"
//           accept=".pdf,.txt,.docx"
//           className="hidden"
//           onChange={(e) =>
//             formik.setFieldValue("file", e.currentTarget.files[0])
//           }
//         />

//         {formik.errors.file && (
//           <p className="text-red-500 text-sm">{formik.errors.file}</p>
//         )}

//         {/* Title */}
//         <input
//           name="title"
//           placeholder="Document Title"
//           onChange={formik.handleChange}
//           value={formik.values.title}
//           className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
//         />

//         {formik.errors.title && (
//           <p className="text-red-500 text-sm">{formik.errors.title}</p>
//         )}

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={formik.isSubmitting}
//           className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
//         >
//           <Sparkles size={18} />
//           {formik.isSubmitting ? "Uploading..." : "Upload Document"}
//         </button>

//       </form>
//     </BaseModal>
//   );
// };

// export default DocumentUploadModal;
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BaseModal from '../../../../../components/common/Modal/BaseModal';
import { Upload, Sparkles } from 'lucide-react';
import { uploadDocument } from '../../../../../services/doc';

const DocumentUploadModal = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      file: null,
      title: '',
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      file: Yup.mixed().required("File is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("name", values.title);

        await uploadDocument(formData);
        onClose();
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <BaseModal title="Upload Document" onClose={onClose}>
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        {/* Upload Box */}
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <Upload className="mx-auto mb-2 text-gray-400" size={32} />

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formik.values.file
              ? formik.values.file.name
              : "Click to upload or drag and drop"}
          </p>

          <p className="text-xs text-gray-500">
            PDF, DOCX, or TXT
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.txt,.docx"
          className="hidden"
          onChange={(e) =>
            formik.setFieldValue("file", e.currentTarget.files[0])
          }
        />

        {formik.errors.file && (
          <p className="text-red-500 text-sm">{formik.errors.file}</p>
        )}

        {/* Document Title */}
        <input
          name="title"
          placeholder="Document Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        {formik.errors.title && (
          <p className="text-red-500 text-sm">{formik.errors.title}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
        >
          <Sparkles size={18} />
          {formik.isSubmitting ? "Uploading..." : "Upload & Analyze"}
        </button>

      </form>
    </BaseModal>
  );
};

export default DocumentUploadModal;
