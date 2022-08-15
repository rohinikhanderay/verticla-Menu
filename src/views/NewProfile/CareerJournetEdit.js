import { InputText } from "./InputText";
import { InputTextArea } from "./InputTextArea";
import EyeOffIcon from '../../assets/images/icons/eye_off.svg';

import DeleteIcon from '../../assets/images/icons/trash.svg';
import AddCircleIcon from '../../assets/images/icons/add_circle.svg';
import { useForm, useFieldArray } from "react-hook-form";
import CloseIcon from '../../assets/images/icons/close_icon.svg';
import { useEffect } from 'react';

export const CareerJourneyEdit = ({ onConfirm, onClose, editData, type }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {
    fields: experienceFields,
    append: experienceAppend,
    remove: experienceRemove
  } = useFieldArray({ control, name: "experience" });
  const {
    fields: trainingFields,
    append: trainingAppend,
    remove: trainingRemove
  } = useFieldArray({ control, name: "training" });
  const onFormSubmit = (data) => {
    onConfirm({ ...data }, type);
  };
  useEffect(() => {
    if (editData?.experience?.length) {
      experienceRemove();
      editData?.experience.forEach((e) => {
        experienceAppend({ value: e })
      });
    } else {
      experienceRemove();
      experienceAppend({ value: '' });
    }
    if (editData?.training?.length) {
      trainingRemove();
      editData?.training.forEach((e) => {
        trainingAppend({ value: e })
      });
    } else {
      trainingRemove();
      trainingAppend({ value: '' })
    }
  }, []);
  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-auto w-full h-full outline-none z-40`}
    >
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
        <div className="relative mx-auto max-w-3xl xs:w-full sm:w-4/5 md:w-4/5 w-2/5 xs:h-screen">
          <div className="border-0 md:rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 md:rounded-t shadow-modal_header">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalCenteredScrollableLabel"
              >
                {type === 'add' ? 'Add' : 'Edit'} Next Step
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
                  <InputText label="What is your next career step?" name="nextRole"
                    isRequired={true}
                    style={{
                      border: `${errors.nextRole ? "red" : "border-gray-300"
                        } solid 2px`,
                    }}
                    register={register}
                    value={editData?.nextRole}
                    error={errors.nextRole}
                  />
                  <InputTextArea label="Description" name="description"
                    style={{
                      border: `${errors.endYear ? "red" : "border-gray-300"
                        } solid 2px`,
                    }}
                    register={register}
                    value={editData?.description}
                    error={errors.description}
                  />
                  <hr className="flex w-full mt-4 mb-2 border-border_gray shadow-modal_header" />
                  <div className="flex flex-1 flex-col w-full">
                    <div className="flex flex-1 flex-row h-3">
                      <label className="font-semibold text-sm leading-18px">Relevant experience for next career step</label>
                    </div>
                    <ul>
                      {experienceFields.map((item, index) => {
                        return (
                          <li key={index} className={`flex flex-1 flex-row gap-2 ${index !== (experienceFields.length-1) ? 'mb-4': ''} justify-center`}>
                            <input
                              name={`experience.${index}.value`}
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
                              placeholder="Experience" {...register(`experience[${index}].value`)} />
                            <button type="button" onClick={() => experienceRemove(index)}>
                              <img alt="delete-icon" className="" src={DeleteIcon} />
                            </button>
                          </li>
                        );
                      })}
                      <button
                        type="button"
                        className={`flex pt-6
                        ${experienceFields.length >= 3 ? 
                        'opacity-40': ''}`}
                        onClick={() => experienceAppend({ value: '' })}
                        disabled={experienceFields.length >= 3}
                      >
                        <img src={AddCircleIcon} alt="add-circle-icon" width="22px" height="22px"/><span className="text-teal-700 font-normal ml-2">Add Experience</span>
                      </button>
                    </ul>
                  </div>
                  <hr className="flex w-full mt-4 mb-2 border-border_gray shadow-modal_header" />
                  <div className="flex flex-1 flex-col w-full">
                    <div className="flex flex-1 flex-row h-3">
                      <label className="font-semibold text-sm leading-18px">Training</label>
                    </div>
                    <ul>
                      {trainingFields.map((item, index) => {
                        return (
                          <li key={index} className={`flex flex-1 flex-row gap-2 ${index !== trainingFields.length-1 ? 'mb-4': ''} justify-center`}>
                            <input
                              name={`training[${index}].value`}
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
                              placeholder="Training" {...register(`training[${index}].value`)} />
                            <button type="button" onClick={() => trainingRemove(index)}>
                              <img alt="delete-icon" className="" src={DeleteIcon} />
                            </button>
                          </li>
                        );
                      })}
                      <button
                        type="button"
                        className={`flex pt-6
                        ${trainingFields.length >= 3 ? 
                        'opacity-40': ''}`}
                        onClick={() => trainingAppend({ value: '' })}
                        disabled={trainingFields.length >= 3}
                      >
                        <img src={AddCircleIcon} alt="add-circle-icon"  width="22px" height="22px" /><span className="text-teal-700 font-normal ml-2">Add Trainings</span>
                      </button>
                    </ul>
                  </div>
                </div>
                {type === 'edit' && (<div className="md:hidden xs:block">
                  <hr className="mb-7 mt-8 border-border_gray shadow-modal_header" />
                  <div className="">
                    <button
                      type="button"
                      className="flex text-lg bg-white text-teal-700 font-normal"
                    >
                      <img className="mr-2 mt-0.5" alt="delete-icon" src={EyeOffIcon} width="22px" height="22px" /><span>Hide Next Step</span>
                    </button>
                  </div>
                </div>)}
              </div>
              <div className="md:flex items-center justify-between p-6 border-t border-solid border-gray-200 md:rounded-b xs:hidden shadow-modal_footer">
                <div className="">
                  {type === 'edit' && (<button
                    type="button"
                    className="flex text-lg bg-white text-teal-700 font-normal"
                  >
                    <img className="mr-2 mt-0.5" alt="delete-icon" src={EyeOffIcon} width="22px" height="22px" /><span>Hide Next Step</span>
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
