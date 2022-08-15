import React from "react";
import { EducationEdit } from "./EducationEdit";
import EditIcon from "../../assets/images/icons/edit.svg";
import AddIcon from '../../assets/images/icons/add.svg';
import EducationIcon from '../../assets/images/icons/Education.svg';
import Moment from 'moment';
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../store/profile";
import { ToastContainer, toast } from 'react-toastify';
import {
  VIEW_PROFILE,
} from '../../store/profile/types';

export const Education = ({ selectedProfile }) => {
  const [isEducationEditOpen, setIsEducationEditOpen] = React.useState(false);
  const [isEducationAddOpen, setIsEducationAddOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const dispatch = useDispatch();

  const onClose = (type) => {
    if (type === 'add') {
      setIsEducationAddOpen(false);
      return;
    }
    if (type === 'edit') {
      setEditData(null);
      setIsEducationEditOpen(false);
      return;
    }
  };

  const onEdit = (data) => () => {
    setEditData(data);
    setIsEducationEditOpen(true);
  };

  const onSave = async (data, type, id,) => {
    let education = [...selectedProfile?.education];
    if (type === 'add') {
      education.push({
        ...data, ...{
          from: Moment(data.from?.format?.('MMMM D YYYY')).toISOString(),
          to: Moment(data.to?.format?.('MMMM D YYYY')).toISOString(),
        }
      })
    } else if (type === 'edit') {
      const index = education.findIndex((e) => e._id === id);
      education[index] = {
        ...data, ...{
          from: Moment(data.from?.format?.('MMMM D YYYY')).toISOString(),
          to: Moment(data.to?.format?.('MMMM D YYYY')).toISOString(),
          _id: editData?._id,
        }
      }
    } else if (type === 'delete') {
      if (id) education = education.filter((e) => e._id !== id);
    }
    const res = await dispatch(
      updateUserDetails({
        role: selectedProfile?.userRef.role,
        education,
      }),
    )
    if (res?.success) {
      setTimeout(() => {
        toast.success('Profile successfully updated');
        dispatch({
          type: VIEW_PROFILE,
          payload: res.data,
        });
        if (type === 'edit' || type === 'delete') {
          setEditData(null);
          setIsEducationEditOpen(false);
          return;
        }
        if (type === 'add') {
          setIsEducationAddOpen(false);
          return;
        }
      }, 1000)
    } else {
      toast.error(res?.data?.error);
    }
  };

  return (
    <div
      className="flex flex-1 flex-col shrink-0 border md:rounded-xl md:shadow-lg xs:py-6 xs:px-4 md:p-10 bg-white"
    >
      <ToastContainer />
      <div className="flex flex-1 justify-between items-center">
        <h4 className="text-2xl leading-8 font-bold">Education</h4>
        {selectedProfile?.education?.length > 0 && (
            <button
              className="text-white border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1"
              onClick={() => setIsEducationAddOpen(true)}
            >
              <img src={AddIcon} alt="edit-icon" /><span className="text-teal-700 font-normal">Add Education</span>
            </button>
            )}
      </div>
      {selectedProfile?.education?.length > 0 && (<div className="grid mt-4">
        {selectedProfile?.education?.map((edu, index) => {
          return (
            <div key={edu._id}>
              <div className="flex flex-1 flex-row gap-4 pt-4">
                <div className="shrink-0">
                  <img className="h-14 w-14 rounded" src={EducationIcon} alt="education" />
                </div>
                <div className="w-full">
                <div className="flex flex-1 justify-between">
                  <h4 className="font-semibold text-lg leading-6">
                    {edu.schoolOrOrganization}
                  </h4>

                  <button className="text-white" onClick={onEdit(edu)}>
                    <img alt="Edit-Button-Icon" src={EditIcon} />
                  </button>
                  </div>
                  <h3 className="font-normal text-lg leading-6">
                    {`${edu.degreeCertification}, ${edu.fieldOfStudy}`}, ({`${Moment.utc(edu.from).format('MMMM')} - ${Moment.utc(edu.from).format('yyyy')} to ${Moment.utc(edu.to).format('MMMM')} - ${Moment.utc(edu.to).format('yyyy')}`})</h3>
                  <p className="font-normal text-base">{edu.description || '-'}</p>
                  {selectedProfile?.education.length > 1 &&
                        index + 1 < selectedProfile?.education.length &&
                  (<div className="border-b pt-5" />)}
                </div>
              </div>
              {isEducationEditOpen &&
                editData && editData._id === edu._id && (
                  <EducationEdit
                    onSave={onSave}
                    onClose={onClose}
                    editData={editData}
                    currentStudyExists={selectedProfile?.experience?.length > 0 ? selectedProfile?.experience.some((e) => e.present) : false}
                    type='edit'
                  />
                )}
            </div>
          );
        })}
      </div>)}
      {!selectedProfile?.education?.length && (<div className="py-4">
        <div className="font-normal mb-2 text-lg leading-6">What school or certified training did you complete?</div>
        <button
          className="text-white border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1"
          onClick={() => setIsEducationAddOpen(true)}
        >
          <img src={AddIcon} alt="edit-icon" /><span className="text-teal-700 font-normal">Add Education</span>
        </button>
      </div>)}
      {isEducationAddOpen && (
        <EducationEdit onSave={onSave}
          onClose={onClose}
          type='add'
          currentStudyExists={selectedProfile?.education?.length > 0 ? selectedProfile?.education.some((e) => e.present) : false}
          editData={null} />
      )}
    </div>
  );
};
