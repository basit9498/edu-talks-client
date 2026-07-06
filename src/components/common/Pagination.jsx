import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import ReactPaginate from "react-paginate";


// const Pagination = ({ pageCount, onPageChange ,currentPage}) => {
//   return (
//     <section className="flex justify-center mt-6 py-4">
//       <ReactPaginate
//        key={pageCount} 
//         forcePage={currentPage} 
//         previousLabel={<ChevronLeft size={18} className="text-gray-600 dark:text-gray-400" />}
//         nextLabel={<ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />}
//         breakLabel={<span className="text-gray-600 dark:text-gray-400">...</span>}
//         pageCount={pageCount}
//         marginPagesDisplayed={1}
//         pageRangeDisplayed={3}
//         onPageChange={onPageChange}
//         containerClassName="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-max mx-auto p-2 rounded-lg shadow-sm"
//         pageClassName="text-gray-700 dark:text-gray-300 text-sm font-medium size-9 flex justify-center items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
//         previousClassName="size-9 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//         nextClassName="size-9 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//         breakClassName="text-gray-600 dark:text-gray-400 text-sm mx-1"
//         activeClassName="!bg-gradient-to-r !from-blue-500 !to-purple-500 !text-white !shadow-md"
//         renderOnZeroPageCount={null}
//       />
//     </section>
//   );
// };

const Pagination = ({ pageCount, onPageChange }) => {
    if (pageCount <= 1) return null;
  
    return (
      <section className="flex justify-center mt-6 py-4">
        <ReactPaginate
          previousLabel={<ChevronLeft size={18} className="text-gray-600 dark:text-gray-400" />}
          nextLabel={<ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />}
          breakLabel={<span className="text-gray-600 dark:text-gray-400">...</span>}
          pageCount={pageCount}
          onPageChange={onPageChange}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
        //   containerClassName="flex items-center gap-2"
        //   pageClassName="text-gray-700 dark:text-gray-300 text-sm font-medium size-9 flex justify-center items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        //   activeClassName="bg-blue-500 text-white"

          containerClassName="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 w-max mx-auto p-2 rounded-lg shadow-sm"
           pageClassName="text-gray-700 dark:text-gray-300 text-sm font-medium size-9 flex justify-center items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        //   previousClassName="size-9 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        //   nextClassName="size-9 rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        //    breakClassName="text-gray-600 dark:text-gray-400 text-sm mx-1"
          activeClassName="!bg-gradient-to-r !from-blue-500 !to-purple-500 !text-white !shadow-md"
        />
      </section>
    );
  };
  
export default Pagination;