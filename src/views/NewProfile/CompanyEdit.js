import { InputCheckbox } from "./InputCheckbox";
import { InputMonthSelect } from "./InputMonthSelect";
import { InputText } from "./InputText";
import { InputTextArea } from "./InputTextArea";
import { InputYearSelect } from "./InputYearSelect";
import DeleteIcon from '../../assets/images/icons/trash.svg';
import { useForm, useFieldArray } from "react-hook-form";
import CloseIcon from '../../assets/images/icons/close_icon.svg';
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import AddCircleIcon from '../../assets/images/icons/add_circle.svg';
import Moment from 'moment';
import { useState, useEffect } from 'react';

export const CompanyEdit = ({ onConfirm, onClose, editData, type, currentWorkExists }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const {
    fields: impactFields,
    append: impactAppend,
    remove: impactRemove,
  } = useFieldArray({ control, name: "impact" });

  const onFormSubmit = (data) => {
    onConfirm({ ...data }, type, editData?._id);
  };
  let current = watch('current', editData?.current);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);

  const onDelete = () => {
    setShowDeleteConfirmationDialog(true);
  };

  const onDeleteConfirmation = async () => {
    await onConfirm({}, 'delete', editData?._id);
  };

  const onDeleteClose = () => {
    setShowDeleteConfirmationDialog(false);
  };
  useEffect(() => {
    if (editData?.impact?.length) {
      impactRemove();
      editData?.impact.forEach((e) => {
        impactAppend({ value: e })
      });
    } else {
      impactRemove();
      impactAppend({ value: '' })
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-auto w-full h-full outline-none z-40`}
    >
      {showDeleteConfirmationDialog && (
        <DeleteConfirmModal
          onClose={onDeleteClose}
          onConfirm={onDeleteConfirmation}
          title={`Delete Experience`}
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
                {type === 'add' ? 'Add' : 'Edit'} Experience
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
                  <InputText label="Job title" name="title" isRequired={true}
                      style={{
                        border: `${errors.title ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      value={editData?.title}
                      error={errors.title}
                    />
                  <InputText label="Company name" name="company"
                    isRequired={true}
                    style={{
                      border: `${errors.company ? "red" : "border-gray-300"
                        } solid 2px`,
                    }}
                    register={register}
                    value={editData?.company}
                    error={errors.company}
                  />
                  <InputText label="Location" name="location"
                    style={{
                      border: `${errors.location ? "red" : "border-gray-300"
                        } solid 2px`,
                    }}
                    register={register}
                    value={editData?.location}
                    error={errors.location}
                  />
                  <hr className="flex w-full mt-4 mb-2 border-border_gray shadow-modal_header" />
                  <InputCheckbox label="I currently work here in this role" name="current"
                    checked={editData?.current}
                    style={{
                      border: `${errors.current ? "red" : "border-gray-300"
                        } solid 2px`,
                    }}
                    register={register}
                    value={editData?.current}
                    error={errors.current}
                    disabled={currentWorkExists && !editData?.current} />
                  <div className="flex flex-1 flex-row w-full gap-2">
                    <InputMonthSelect label="Start month" isRequired={true} name="startMonth"
                      style={{
                        border: `${errors.startMonth ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      value={editData?.from ? Moment(editData.from).format('MMMM') : ''}
                      error={errors.startMonth} />
                    <InputYearSelect label="Start year" isRequired={true} name="startYear"
                      style={{
                        border: `${errors.startYear ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      value={editData?.from ? Moment(editData.from).format('yyyy') : ''}
                      error={errors.startYear} />
                  </div>
                  <div className="flex flex-1 flex-row w-full gap-2">
                    <InputMonthSelect label="End month" name="endMonth"
                      style={{
                        border: `${errors.schoolOrOrganization ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      disabled={current}
                      value={!editData?.current || editData.to ? Moment(editData.to).format('MMMM') : ''}
                      error={errors.endMonth} />
                    <InputYearSelect label="End year" name="endYear"
                      style={{
                        border: `${errors.endYear ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      disabled={current}
                      value={!editData?.current || editData.to ? Moment(editData.to).format('YYYY') : ''}
                      error={errors.endYear} />
                  </div>
                  <hr className="flex w-full mt-4 mb-2 border-border_gray shadow-modal_header" />
                  <InputTextArea label="Description" name="descriptionC"
                    register={register}
                    value={editData?.descriptionC}
                  />
                  <div className="flex flex-1 flex-col w-full">
                    <div className="flex flex-1 flex-row h-3">
                      <label className="font-semibold text-sm leading-18px">Impact</label>
                    </div>
                    <ul>
                      {impactFields.map((item, index) => {
                        return (
                          <li key={index} className={`flex flex-1 flex-row gap-2 ${index !== (impactFields.length-1) ? 'mb-4': ''} justify-center`}>
                            <input
                              name={`impact.${index}.value`}
                              type="text"
                              className="
                                  block
                                  w-full
                                  px-2
                                  py-1
                                  text-base
                                  font-normal
                                  text-gray-700
                                  bg-white bg-clip-padding
                                  border border-solid
                                  rounded
                                  transition
                                  ease-in-out
                                  m-0
                                  focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-none"
                              placeholder="Impact" {...register(`impact[${index}].value`)} />
                            <button type="button" onClick={() => impactRemove(index)}>
                              <img alt="delete-icon" className="" src={DeleteIcon} />
                            </button>
                          </li>
                        );
                      })}
                      <button
                        type="button"
                        className="flex pt-6"
                        onClick={() => impactAppend({ value: '' })}
                      >
                        <img src={AddCircleIcon} alt="add-circle-icon" width="22px" height="22px"/><span className="text-teal-700 font-normal ml-2">Add Impact</span>
                      </button>
                    </ul>
                  </div>
                </div>
                {type === 'edit' && (<div className="md:hidden xs:block">
                  <hr className="mb-7 mt-8 border-border_gray shadow-modal_header" />
                  <div className="">
                    <button
                      type="button"
                      onClick={() => onDelete()}
                      className="flex text-lg bg-white text-teal-700 font-normal"
                    >
                      <img className="mr-2 mt-0.5" alt="delete-icon" src={DeleteIcon} width="22px" height="22px" /><span>Delete Experience</span>
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
                    <img className="mr-2 mt-0.5" alt="delete-icon" src={DeleteIcon} width="22px" height="22px" /><span>Delete Experience</span>
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
