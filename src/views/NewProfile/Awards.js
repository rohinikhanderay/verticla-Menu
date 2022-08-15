import React from "react";
import { AwardEdit } from "./AwardEdit";
import AddIcon from '../../assets/images/icons/add.svg';
import EditIcon from '../../assets/images/icons/edit.svg';
import AwardsIcon from '../../assets/images/icons/Awards.svg';
import Moment from 'moment';
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../store/profile";
import { ToastContainer, toast } from 'react-toastify';
import {
  VIEW_PROFILE,
} from '../../store/profile/types';

export const Awards = ({ selectedProfile }) => {
  const [isAwardEditOpen, setIsAwardEditOpen] = React.useState(false);
  const [isAwardAddOpen, setIsAwardAddOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const dispatch = useDispatch();
  const onClose = (type) => {
    if (type === 'edit') {
      setEditData(null);
      setIsAwardEditOpen(false);
      return;
    }
    if (type === 'add') {
      setIsAwardAddOpen(false);
      return;
    }
  };

  const onEdit = (data) => () => {
    setEditData(data);
    setIsAwardEditOpen(true);
  };

  const onSave = async (data, type, id) => {
    let awards = selectedProfile?.awards ? [...selectedProfile?.awards] : [];
    if (type === 'add') {
      awards.push({
        ...data,
        ...{ date: Moment(data.date?.format?.('MMMM D YYYY')).toISOString() }
      });
    } else if (type === 'edit') {
      const index = awards.findIndex((e) => e._id === id);
      awards[index] = {
        ...data,
        ...{
          date: Moment(data.date?.format?.('MMMM D YYYY')).toISOString(),
          _id: editData?._id
        }
      }
    } else if (type === 'delete') {
      if (editData?._id) awards = awards.filter((e) => e._id !== id);
    }
    const res = await dispatch(
      updateUserDetails({
        role: selectedProfile?.userRef.role,
        awards,
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
          setIsAwardEditOpen(false);
          return;
        }
        if (type === 'add') {
          setIsAwardAddOpen(false);
          return;
        }
      }, 1000)
    } else {
      toast.error(res?.data?.error);
    }
  };
  return (
    <>
      <div className="flex flex-1 flex-col shrink-0 border md:rounded-xl md:shadow-lg xs:py-6 xs:px-4 md:p-10 bg-white">
        <ToastContainer />
        <div>
          <div className="flex flex-1 justify-between items-center">
            <h4 className="text-2xl leading-8 font-bold">Awards</h4>
            {selectedProfile?.awards?.length > 0 && (
              <button
                className="text-white border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1"
                onClick={() => setIsAwardAddOpen(true)}
              >
                <img src={AddIcon} alt="edit-icon" /><span className="text-teal-700 font-normal">Add Award</span>
              </button>
            )}
          </div>
          {selectedProfile?.awards?.length > 0 && (<div className="grid mt-4">
            {selectedProfile.awards.map((award, index) => {
              return <div key={index}>
                <div className="flex flex-1 flex-row gap-4 pt-4">
                  <div className="shrink-0">
                    <img className="h-14 w-14 rounded" src={AwardsIcon} alt="career" />
                  </div>
                  <div className="w-full">
                    <div className="flex flex-1 justify-between">
                      <h4 className="font-semibold text-lg leading-6">{award.awardName}</h4>
                      <button className="text-white"><img alt="Edit-Button-Icon" src={EditIcon} onClick={onEdit(award)} /></button>
                    </div>
                    <h3 className="font-semibold text-lg leading-6">{award.companyName}, ({`${Moment(award.date).format('MMMM yyyy')}`})</h3>
                    <p className="font-normal text-base">{award.description || '-'}</p>
                    {selectedProfile?.awards.length > 1 &&
                        index + 1 < selectedProfile?.awards.length &&
                        (<div className="border-b pt-5" />)}
                  </div>
                </div>
                {isAwardEditOpen &&
                  editData &&
                  editData._id === award._id && (
                    <AwardEdit type="edit" onSave={onSave}
                      onClose={onClose}
                      editData={editData} />
                  )}
              </div>
             })
            }
          </div>)}
        </div>
        {!selectedProfile?.awards?.length && (<div className="py-4">
          <div className="font-normal mb-2 text-lg leading-6">Share your awards and achievements</div>
          <button
            className="text-white border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1"
            onClick={() => setIsAwardAddOpen(true)}
          >
            <img src={AddIcon} alt="edit-icon" /><span className="text-teal-700 font-normal">Add Award</span>
          </button>
        </div>
        )}
        {isAwardAddOpen && (
          <AwardEdit type="add" onSave={onSave}
            onClose={onClose}
            editData={null} />
        )}
      </div>
    </>
  );
};
