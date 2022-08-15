export const DeleteConfirmModal = ({ title, children, onConfirm, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity w-full h-full outline-none overflow-hidden z-50`}
    >
      <div className="flex relative pointer-events-none w-full h-full items-center justify-center">
        <div
          className={`border-none mx-auto shadow-lg relative flex flex-col sm:w-4/5 md:w-1/4 pointer-events-auto bg-clip-padding rounded-md outline-none text-current bg-white`}
        >
          <div className="flex flex-shrink-0 items-start justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-normal leading-normal text-gray-800 w-full">
              {title}
            </h5>
            <button
              type="button"
              onClick={() => onClose()}
              className="btn-close box-content w-4 h-4 p-1 text-teal-700 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-teal-700 hover:opacity-75 hover:no-underline"
            >X</button>
          </div>
          <div className="relative overflow-y-auto">{children}</div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 py-3 border-t border-gray-200 rounded-b-md gap-2 mt-auto">
            <button
              type="button"
              onClick={() => onConfirm()}
              className="bg-white text-teal-700 rounded-3xl px-4 py-1 font-normal border border-teal-700"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => onClose()}
              className="bg-teal-600 text-white rounded-3xl px-4 py-1 font-normal "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
