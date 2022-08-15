import React, { useEffect, useState } from 'react'
import { Awards } from "./Awards";
import { CareerJourney } from "./CareerJourney";
import { Education } from "./Education";
import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/Footer.js'
import { ProfileInfo } from "./ProfileInfo";
import { PreviewPublic } from "./PreviewPublic";
import { useDispatch, useSelector } from 'react-redux'
import {
  viewProfile, getImages, getInterestImages, updateResume, deleteResume
} from '../../store/profile/index'
import { Skills } from './Skills';
import { ToastContainer, toast } from 'react-toastify'
import ResumeEditIcon from '../../assets/images/icons/resume_edit_icon.svg';
import DocumentDownloadIcon from '../../assets/images/icons/document_download_icon.svg';
import DeleteWhiteIcon from '../../assets/images/icons/delete_white_icon.svg';

const profileId = '';
const Profile = ({ match }) => {
  const [publicProfile, setPublicProfile] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [options, setOptions] = useState();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile)
  useEffect(() => {
    dispatch(getImages({ containerName: 'imagegallery' }))
    dispatch(getInterestImages({ containerName: 'interestimages' }))
  }, [])
  useEffect(() => {
    // localStorage.getItem("token") != null &&
    // profileData &&
    // profileData?.profile?.type == profileData?.selectedProfile?.userRef.role
    //   ? setPublicProfile(false)
    //   : setPublicProfile(true);

    if (profileData?.profile) {
      localStorage.getItem('token') != null &&
        profileData &&
        profileData?.profile?.type === 'jobSeeker'
        ? setPublicProfile(false)
        : setPublicProfile(true)
    } else {
      setPublicProfile(true)
    }
    if (profileData?.interestImages) {
      const data = profileData?.interestImages.map((item) => {
        return {
          label: (
            <div>
              <img src={item.fullUrl} alt="full-url" />
              <p>{item.fileName}</p>
            </div>
          ),
          value: item,
        }
      })
      setOptions(data)
    }
  }, [profileData, setOptions, setPublicProfile])

  useEffect(() => {
    if (!profileId || profileId !== match.params.id) {
      setProfileId(match.params.id);
      dispatch(viewProfile(match.params.id));
    }
  }, [match])

  const updateResumes = async (e) => {
    if (e.target.files.length !== 0) {
      const res = await dispatch(updateResume(e.target.files))

      if (res?.success) {
        toast.success('successfully uploaded')
        dispatch(viewProfile(match.params.id));
      } else {
        toast.error(res?.data?.error)
      }
    }
  }
  const deleteResumeCall = async () => {
    if (profileData.selectedProfile?.resume[0]) {
      const datas = new FormData()
      datas.append('file', profileData.selectedProfile?.resume[0]?.blobName)

      const res = await dispatch(deleteResume(datas))

      if (res?.success) {
        toast.success('successfully delete')
        dispatch(viewProfile(match.params.id));
      } else {
        toast.error(res?.data?.error)
      }
    }
  }
  return (
    <>
      <div>
        <Navbar />
        <ToastContainer />
        {!publicProfile && (
          <div className="xs:py-4 md:p-8 flex flex-1 gap-2 flex-col w-full font-roboto">
            <div className="flex justify-end xs:px-4 items-center">
              <span className="relative sm:block inline-block hov-tab pt-0">
                <div
                  className="absolute flex -top-10 right-0 mb-3 w-48 rounded-xl p-3 bg-white new-sec-btn hidden"
                  style={{ boxShadow: 'rgb(0 0 0 / 25%) 0px 4px 12px' }}
                >
                  <label
                    className="label mr-3 p-2 pr-3 text-white pl-3 bg-teal-600 rounded-md cursor-pointer"
                    for="file-input-3"
                    style={{ display: publicProfile ? 'none' : 'block' }}
                  >
                    {' '}
                    <img src={ResumeEditIcon} alt="upload-edit-icon" />
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.pages"
                    id="file-input-3"
                    className="file-input-3 absolute w-px h-px overflow-hidden	opacity-0	z-0	"
                    onChange={updateResumes}
                  />
                  <a
                    href={
                      profileData.selectedProfile?.resume &&
                      profileData.selectedProfile?.resume[0]?.fullUrl
                    }
                    download={
                      profileData.selectedProfile?.resume &&
                      profileData.selectedProfile?.resume[0]?.fileName
                    }
                    target="_blank"
                    className="mr-3 p-2 pr-3 text-white pl-3 bg-teal-600 rounded-md"
                  >
                    <img src={DocumentDownloadIcon} alt="document-download"
                      style={{
                        cursor:
                          profileData.selectedProfile?.resume &&
                            profileData.selectedProfile?.resume[0]
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                    />
                  </a>
                  <button
                    style={{ display: publicProfile ? 'none' : 'block' }}
                    onClick={deleteResumeCall}
                    className="mr-0 p-2 pr-3 text-white pl-3 bg-teal-600 rounded-md"
                  >
                    <img src={DeleteWhiteIcon} alt="delete-icon"
                      style={{
                        cursor:
                          profileData.selectedProfile?.resume &&
                            profileData.selectedProfile?.resume[0]
                            ? 'pointer'
                            : 'not-allowed',
                      }}
                    />
                  </button>
                </div>
                <button className="text-teal-700 border-2 rounded-full  border-teal-700 pl-3 pr-3 py-1 mr-3">Upload Resume</button>
              </span>
              <button type="button" className="text-white border-2 rounded-full bg-teal-600 hover:bg-teal-600 hover:text-white border-teal-600 pl-3 pr-3 py-1" onClick={() => setPublicProfile(true)}> Preview Public</button></div>
            <div className="flex flex-1 md:gap-8 flex-col w-full">
              <ProfileInfo selectedProfile={profileData?.selectedProfile} />
              <CareerJourney selectedProfile={profileData?.selectedProfile} />
              <Skills selectedProfile={profileData?.selectedProfile} />
              <Awards selectedProfile={profileData?.selectedProfile} />
              <Education selectedProfile={profileData?.selectedProfile} /></div>
          </div>)}
        {publicProfile && (
          <PreviewPublic selectedProfile={profileData?.selectedProfile} roletype={profileData?.profile?.type} resetPublicProfile={() => setPublicProfile(false)} />)}
        <Footer />
      </div>
    </>
  );
};

export default Profile;
