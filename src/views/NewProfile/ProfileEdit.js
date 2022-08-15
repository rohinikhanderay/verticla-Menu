import { InputText } from "./InputText";
import { InputTextArea } from "./InputTextArea";
import { InputCheckbox } from "./InputCheckbox";
import { useForm } from "react-hook-form";
import CloseIcon from '../../assets/images/icons/close_icon.svg';

export const ProfileEdit = ({ onSave, onClose, editData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onFormSubmit = (data) => onSave(data);

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
                Edit Intro
              </h5>
              <button
                type="button"
                onClick={onClose}
                className="btn-close box-content w-5 h-5 py-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              >
                <img src={CloseIcon} alt="close-icon" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="relative overflow-y-auto p-6 pb-10 xs:p-4 xs:h-83vh md:h-auto md:max-h-70vh">
                <div className="flex flex-1 items-start flex-col gap-2">
                  <div className="flex flex-1 xs:flex-col md:flex-row w-full gap-2">
                    <InputText label="First name" isRequired={true} name="firstName"
                      style={{
                        border: `${errors.firstName ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      value={editData?.firstName}
                      error={errors.firstName}
                    />
                    <InputText label="Last name" isRequired={true} name="lastName"
                      style={{
                        border: `${errors.lastName ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      value={editData?.lastName}
                      error={errors.lastName} /></div>
                  <div className="flex flex-1 xs:flex-col md:flex-row w-full gap-2">
                    <InputText label="Job title" isRequired={true} name="jobTitle"
                      style={{
                        border: `${errors.jobTitle ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      value={editData?.jobTitle}
                      error={errors.jobTitle} />
                    <InputText label="Company name" isRequired={false} name="currentCompany"
                      style={{
                        border: `${errors.currentCompany ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register} value={editData.currentCompany}
                      error={errors.currentCompany} /></div>
                  <div className="flex flex-1 xs:flex-col md:flex-row w-full gap-2 items-center">
                    <InputText label="Location" isRequired={true} name="streetAddress"
                      style={{
                        border: `${errors.streetAddress ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register}
                      value={editData.streetAddress}
                      error={errors.streetAddress} />
                    <div className="flex flex-1 flex-col w-full xs:mt-4 xs:mb-4 md:mt-5">
                      <InputCheckbox label="Open to remote roles" name="remote" checked={editData?.remote} style={{
                        border: `${errors.remote ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                        register={register}
                        value={editData?.remote}
                        error={errors.remote} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-row w-full gap-2">
                    <InputText label="Website" placeholder="[website address]" isRequired={false} name="websiteUrl"
                      style={{
                        border: `${errors.websiteUrl ? "red" : "border-gray-300"
                          } solid 2px`,
                      }}
                      register={register} value={editData?.websiteUrl}
                      error={errors?.websiteUrl} />
                  </div>
                  <InputTextArea label="Description" name="bio"
                    style={{
                      border: `${errors.bio ? "red" : "border-gray-300"
                        } solid 2px`,
                    }}
                    register={register} value={editData?.bio} error={errors.bio} />
                </div>
              </div>
              <div className="md:flex items-center justify-between p-6 border-t border-solid border-gray-200 md:rounded-b xs:hidden shadow-modal_footer">
                <div className="">
                </div>
                <div className="">
                  <button
                    type="button"
                    className="bg-white text-teal-700 rounded-3xl px-6 py-1 font-normal border border-teal-700 mr-4"
                    onClick={onClose}
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
