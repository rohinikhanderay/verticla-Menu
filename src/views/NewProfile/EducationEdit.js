import { InputText } from "./InputText";
import { InputTextArea } from "./InputTextArea";
import { InputMonthYearSelect } from "./InputMonthYearSelect";
import { InputCheckbox } from "./InputCheckbox";
import DeleteIcon from "../../assets/images/icons/trash.svg";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from '../../assets/images/icons/close_icon.svg';
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useState } from 'react';

export const EducationEdit = ({ onSave, onClose, editData, type, currentStudyExists }) => {
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);

    const onFormSubmit = (data) => {
        console.log(data);
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
    let present = watch('present', editData?.present);

    return (
        <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-auto w-full h-full outline-none z-40`}
        >
            {showDeleteConfirmationDialog && (
              <DeleteConfirmModal
                onClose={onDeleteClose}
                onConfirm={onDeleteConfirmation}
                title={`Delete Education`}
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
                                {type === 'add' ? 'Add' : 'Edit'} Education
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
                                    <InputText
                                        name="schoolOrOrganization"
                                        label="School/Program name"
                                        isRequired={true}
                                        style={{
                                            border: `${errors.schoolOrOrganization ? "red" : "border-gray-300"
                                                } solid 2px`,
                                        }}
                                        register={register}
                                        value={editData?.schoolOrOrganization}
                                        error={errors.schoolOrOrganization}
                                    />
                                    <InputText
                                        label="Degree"
                                        name="degreeCertification"
                                        isRequired={true}
                                        register={register}
                                        style={{
                                            border: `${errors.degreeCertification ? "red" : "border-gray-300"
                                                } solid 2px`,
                                        }}
                                        error={errors.degreeCertification}
                                        value={editData?.degreeCertification}
                                    />
                                    <InputText
                                        label="Major"
                                        name="fieldOfStudy"
                                        isRequired={true}
                                        register={register}
                                        style={{
                                            border: `${errors.fieldOfStudy ? "red" : "border-gray-300"
                                                } solid 2px`,
                                        }}
                                        error={errors.fieldOfStudy}
                                        value={editData?.fieldOfStudy}
                                    />
                                    <hr className="flex w-full mt-4 mb-2 border-border_gray shadow-modal_header" />
                                    <InputCheckbox label="I currently study here" name="present"
                                        checked={editData?.present}
                                        style={{
                                            border: `${errors.present ? "red" : "border-gray-300"
                                                } solid 2px`,
                                        }}
                                        register={register}
                                        value={editData?.present}
                                        error={errors.present}
                                        disabled={currentStudyExists && !editData?.present} />
                                    <div className="flex flex-1 xs:flex-col md:flex-row w-full gap-2">
                                        <Controller
                                            control={control}
                                            name="from"
                                            defaultValue={editData?.from || ''}
                                            rules={{ required: true }} //optional
                                            render={({
                                                field: { onChange, name, value },
                                                formState: { errors }, //optional, but necessary if you want to show an error message
                                            }) => (
                                                <>
                                                    <InputMonthYearSelect
                                                        label="Start date"
                                                        error={errors.from}
                                                        onChange={onChange}
                                                        value={editData?.from || ''}
                                                        format={'MMMM YYYY'}
                                                        isRequired={true} />
                                                </>
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="to"
                                            defaultValue={editData?.to || ''}
                                            rules={{ required: true }} //optional
                                            render={({
                                                field: { onChange, name },
                                                formState: { errors }, //optional, but necessary if you want to show an error message
                                            }) => (
                                                <>
                                                    <InputMonthYearSelect
                                                        label="End date"
                                                        error={errors.to}
                                                        onChange={onChange}
                                                        value={(!editData?.present && editData?.to) || ''}
                                                        format={'MMMM YYYY'}
                                                        isRequired={true}
                                                        disabled={present} />
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
                                            <img className="mr-2 mt-0.5" alt="delete-icon" src={DeleteIcon} width="22px" height="22px" /><span>Delete Education</span>
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
                                        <img className="mr-2 mt-0.5" alt="delete-icon" src={DeleteIcon} width="22px" height="22px" /><span>Delete Education</span>
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
