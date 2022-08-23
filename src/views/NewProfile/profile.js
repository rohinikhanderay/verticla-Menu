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
  viewProfile, getImages, getInterestImages
} from '../../store/profile/index'
import { Skills } from './Skills';

const profileId = '';
const Profile = ({ match, profile_Id}) => {
  console.log(profile_Id)
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
              <img src={item.fullUrl} alt="full-url"/>
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
    if(!profileId || profileId !== profile_Id){
      setProfileId(profile_Id);
      dispatch(viewProfile(profile_Id));
    }
  }, [profile_Id])

  return (
    <>
      <div>
        {/* <Navbar /> */}
        {!publicProfile && (
          <div className="xs:py-4 md:p-8 flex flex-1 gap-2 flex-col w-full font-roboto">
              <div className="flex justify-end xs:px-4">
              {/* <button type="button" className="text-teal-700 border-2 rounded-full  border-teal-700 w-42 pl-3 pr-3 py-1 mr-3" onClick={() => setPublicProfile(true)}> Resume</button> */}
              <button type="button" className="text-white border-2 rounded-full bg-teal-600 hover:bg-teal-600 hover:text-white border-teal-600 w-42 pl-3 pr-3 py-1" onClick={() => setPublicProfile(true)}> Preview Public</button></div>
              <div className="flex flex-1 md:gap-8 flex-col w-full">
              <ProfileInfo selectedProfile={profileData?.selectedProfile}/>
              <CareerJourney selectedProfile={profileData?.selectedProfile}/>
              <Skills selectedProfile={profileData?.selectedProfile}/>
              <Awards selectedProfile={profileData?.selectedProfile}/>
              <Education selectedProfile={profileData?.selectedProfile}/></div>
        </div>)}
        {publicProfile && (
          <PreviewPublic selectedProfile={profileData?.selectedProfile} roletype={profileData?.profile?.type} resetPublicProfile={() => setPublicProfile(false)}/>)}
      {/* <Footer /> */}
    </div>
    </>
  );
};

export default Profile;
