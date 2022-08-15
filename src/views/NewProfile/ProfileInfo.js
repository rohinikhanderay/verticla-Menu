import React from 'react'
import EditWhiteIcon from '../../assets/images/icons/edit_white.svg';
import BriefCase from '../../assets/images/icons/briefcase.svg';
import Location from '../../assets/images/icons/location.svg';
import Camera from '../../assets/images/icons/camera_white.svg';
import EditIcon from '../../assets/images/icons/edit.svg';
import { ProfileEdit } from "./ProfileEdit";
import Pro_img from '../../assets/images/de_images.png'
import { useDispatch } from 'react-redux'
import {
  updateProfile, viewProfile, updateUserDetails, updateProfileHeaderImage
} from '../../store/profile/index'
import { ToastContainer, toast } from 'react-toastify'
import {
  VIEW_PROFILE,
} from '../../store/profile/types';

export const ProfileInfo = ({ match, selectedProfile }) => {
  const [isProfileEditOpen, setIsProfileEditOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [doSave, setDoSave] = React.useState(false);
  React.useEffect(() => {
    if (doSave) {
      setDoSave(false);
      setEditData(null);
      setIsProfileEditOpen(false);
      // call save data api
      // after the edit api complete, fetch new education list or update existing education list in client side
    }
  }, [doSave]);

  const onClose = () => {
    setEditData(null);
    setIsProfileEditOpen(false);
  };

  const onEdit = (data) => {
    setEditData(data);
    setIsProfileEditOpen(true);
  };

  const onSave = async (data) => {
    const res = await dispatch(updateUserDetails({
      ...data,
      ...{ role: selectedProfile?.userRef.role }
    }));
    if (res?.success) {
      setTimeout(() => {
        toast.success('Profile successfully updated');
        dispatch({
          type: VIEW_PROFILE,
          payload: res.data,
        });
      }, 2000)
    } else {
      toast.error(res?.data?.error);
    }
    setDoSave(true);
  };

  const dispatch = useDispatch();
  const profileChange = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('pid', selectedProfile?._id)

    if (e.target.files.length !== 0) {
      // dispatch(updateProfile(data));
      // setTimeout(() => {
      //   viewProfile(match.params.id);
      // }, 2000);
      const res = await dispatch(updateProfile(data))

      if (res?.success) {
        setTimeout(() => {
          toast.success('successfully uploaded')
          dispatch(viewProfile(selectedProfile?._id))
        }, 2000)
      } else {
        toast.error(res?.data?.error)
      }
    }
  }
  const HeaderImageChange = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('pid', selectedProfile?._id)

    if (e.target.files.length !== 0) {
      // dispatch(updateProfile(data));
      // setTimeout(() => {
      //   viewProfile(match.params.id);
      // }, 2000);
      const res = await dispatch(updateProfileHeaderImage(data))

      if (res?.success) {
        setTimeout(() => {
          toast.success('Image successfully uploaded')
          dispatch(viewProfile(selectedProfile?._id))
        }, 2000)
      } else {
        toast.error(res?.data?.error)
      }
    }
  }
  return (
    <div className="flex flex-1 bg-white shrink-0 border md:rounded-xl md:shadow-lg font-roboto">
      <ToastContainer />
      <div className="relative w-full">
        <div className="absolute xs:top-5 xs:right-5 md:top-11 md:right-11 z-10 text-white">
          <input
            type="file"
            accept="image/*"
            id="header-file-input"
            className="file-input absolute w-px h-px overflow-hidden opacity-0 z-0"
            onChange={HeaderImageChange}
          />
          <label htmlFor="header-file-input">
              <img className="inline-block mr-1 cursor-pointer" src={Camera} alt="img" />
          </label>
        </div>
        <div className="relative w-full h-60 px-32 bg-teal-600 md:rounded-t-xl">
          {selectedProfile?.headerImage && selectedProfile?.headerImage?.fullUrl && (<div
            className="absolute inset-0 object-cover w-full h-full md:rounded-t-xl"
            style={{
              backgroundImage: `url(${selectedProfile?.headerImage?.fullUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>)}
        </div>
        <div className="flex bg-teal-50 py-10 shadow-lg">
          <div className="absolute top-40 md:left-10 w-full xs:justify-center md:justify-left flex">
            <div className="relative w-40 h-40 rounded-full border-4 border-white overflow-hidden">
              <div
                style={{
                  backgroundImage: `url(${selectedProfile?.profileImg &&
                      selectedProfile?.profileImg[0]?.fullUrl
                      ? selectedProfile?.profileImg[0]?.fullUrl
                      : Pro_img
                    })`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
                className="w-full h-full"
              />
              {/* <span className="absolute -bottom-10 left-0 z-10 bg-black opacity-40 w-full h-20 rounded-bl-full rounded-br-full rotate-180" /> */}
              <input
                type="file"
                accept="image/*"
                id="file-input"
                className="file-input absolute w-px h-px overflow-hidden opacity-0	z-0	"
                onChange={profileChange}
              />
              <label htmlFor="file-input">
                <div className="absolute bottom-0 left-0 z-10 bg-black bg-opacity-70 w-full h-10 rounded-bl-full rounded-br-full rotate-180">
                  <span className="absolute bottom-2 opacity-1 left-12 z-20 text-white cursor-pointer">
                    <img className="inline-block mr-1" src={EditWhiteIcon} alt="edit-icon" />
                    Edit
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col bg-teal-50 xs:py-6 xs:px-4 md:p-10 md:shadow-lg md:rounded-xl">
          <div className="flex flex-1 justify-between items-center h-12">
            <h4 className="font-semibold mb-2 text-2xl">{selectedProfile?.fullName}</h4>
            <button
              className="text-white"
              onClick={() => onEdit(selectedProfile)}
            >
              <img src={EditIcon} alt="edit-icon" />
            </button>
          </div>
          <div className="flex xs:flex-col md:flex-row xs:gap-2 md:gap-4">
            {selectedProfile?.jobTitle && (<p className="text-black text-lg font-normal">
              <img className="inline-block mr-1 align-text-bottom" src={BriefCase} alt="brief-icon" />
              {selectedProfile?.jobTitle}
            </p>)}
            {selectedProfile?.streetAddress && (<p className="text-black text-lg font-normal">
              <img className="inline-block mr-1 align-text-bottom" src={Location} alt="address-icon" />
              {selectedProfile?.streetAddress}
              {selectedProfile?.remote && (
                <span>, Remote</span>)}
            </p>)}
          </div>
          <div className="flex flex-1 mt-6">
            <p className="text-black text-lg font-normal">
              {selectedProfile?.bio}
            </p>
          </div>
        </div>
        {isProfileEditOpen && (
            <ProfileEdit onSave={onSave}
              onClose={onClose}
              editData={editData} />
        )}
      </div>
    </div>
  );
};
