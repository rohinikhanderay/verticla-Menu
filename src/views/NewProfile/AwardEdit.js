import { InputMonthYearSelect } from "./InputMonthYearSelect";
import { InputText } from "./InputText";
import DeleteIcon from '../../assets/images/icons/trash.svg';
import { useForm, Controller } from "react-hook-form";
import CloseIcon from '../../assets/images/icons/close_icon.svg';
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useState } from 'react';
import { InputTextArea } from "./InputTextArea";

export const AwardEdit = ({ onSave, onClose, editData, type }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    onSave({ ...data }, type, editData?._id);
  };
  const onDelete = () => {
    setShowDeleteConfirmationDialog(true);
  };
  const onDeleteConfirmation = async () => {
    await onSave({}, 'delete', editData?._id);
  };

  const onDeleteClose = () => {
    setShowDeleteConfirmationDialog(false);
  };
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-auto w-full h-full outline-none z-40`}
    >
      {showDeleteConfirmationDialog && (
        <DeleteConfirmModal
          onClose={onDeleteClose}
          onConfirm={onDeleteConfirmation}
          title={`Delete Award`}
        >
          <p className="p-4">Are you sure you want to remove this?</p>
        </DeleteConfirmModal>
      )}
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
        <div className="relative mx-auto max-w-3xl xs:w-full sm:w-4/5 md:w-4/5 w-2/5 xs:h-screen">
          <div className="border-0 md:rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 md:rounded-t shadow-modal_header">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalCenteredScrollableLabel"
              >
                {type === 'add' ? 'Add' : 'Edit'} Award
              </h5>
              <button
                type="button"
                onClick={() => onClose(type)}
                className="btn-close box-content w-5 h-5 py-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              >
                <img src={CloseIcon} alt="close-icon" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="relative overflow-y-auto p-6 pb-10 xs:p-4 xs:h-83vh md:h-auto md:max-h-70vh">
                <div className="flex flex-1 items-start flex-col gap-2">
                   <div className="flex flex-1 flex-row w-full">
                    <InputText label="Award name" isRequired={true}
                      style={{
                        border: `${errors.awardName ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register} name="awardName"
                      value={editData?.awardName}
                      error={errors.awardName} />
                  </div>
                  <div className="flex flex-1 flex-row w-full">
                    <InputText label="Company or institution name" isRequired={true} name="companyName"
                      style={{
                        border: `${errors.companyName ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      value={editData?.companyName}
                      error={errors.companyName}/>
                  </div>
                  <div className="flex flex-1 flex-row w-1/2 pr-1">
                    <Controller
                      control={control}
                      name="date"
                      defaultValue={editData?.date || ''}
                      rules={{ required: true }} //optional
                      render={({
                        field: { onChange, name },
                        formState: { errors }, //optional, but necessary if you want to show an error message
                      }) => (
                        <>
                          <InputMonthYearSelect
                            label="Award date"
                            error={errors.date}
                            onChange={onChange}
                            value={(editData?.date) || ''}
                            format={'MMMM YYYY'}
                            isRequired={true}
                          />
                        </>
                      )}
                    />
                  </div>
                  <hr className="flex w-full mt-4 mb-2 border-border_gray shadow-modal_header" />
                  <InputTextArea
                      label="Description"
                      register={register}
                      name="description"
                      value={editData?.description}
                  />
                </div>
                {type === 'edit' && (<div className="md:hidden xs:block">
                  <hr className="mb-7 mt-8 border-border_gray shadow-modal_header" />
                  <div className="">
                    <button
                      type="button"
                      onClick={() => onDelete()}
                      className="flex text-lg bg-white text-teal-700 font-normal"
                    >
                      <img className="mr-2 mt-0.5" alt="delete-icon" src={DeleteIcon} width="22px" height="22px" /><span>Delete Award</span>
                    </button>
                  </div>
                </div>)}
              </div>
              <div className="md:flex items-center justify-between p-6 border-t border-solid border-gray-200 md:rounded-b xs:hidden shadow-modal_footer">
                <div className="">
                  {type === 'edit' && (<button
                    type="button"
                    onClick={() => onDelete()}
                    className="flex text-lg bg-white text-teal-700 font-normal"
                  >
                    <img className="mr-2 mt-0.5" alt="delete-icon" src={DeleteIcon} width="22px" height="22px" /><span>Delete Award</span>
                  </button>)}
                </div>
                <div className="">
                  <button
                    type="button"
                    className="bg-white text-teal-700 rounded-3xl px-6 py-1 font-normal border border-teal-700 mr-4"
                    onClick={() => onClose(type)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-600 text-white rounded-3xl px-4 py-1 font-normal"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="md:hidden items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b xs:block shadow-modal_footer">
                <button
                  type="submit"
                  className="bg-teal-600 w-full text-white rounded-3xl px-4 py-1 font-normal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
