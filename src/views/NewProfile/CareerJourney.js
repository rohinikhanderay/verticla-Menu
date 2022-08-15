import React from "react";
import { CompanyEdit } from "./CompanyEdit";
import EditIcon from "../../assets/images/icons/edit.svg";
import AddIcon from '../../assets/images/icons/add.svg';
import CareerIcon from '../../assets/images/icons/Career.svg';
import CompanyIcon from '../../assets/images/icons/Company.svg';
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../store/profile";
import Moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import {
  VIEW_PROFILE,
} from '../../store/profile/types';
import { CareerJourneyEdit } from "./CareerJournetEdit";

export const CareerJourney = ({ selectedProfile }) => {
  const [isCareerEditOpen, setIsCareerEditOpen] = React.useState(false);
  const [isCompanyEditOpen, setIsCompanyEditOpen] = React.useState(false);
  const [isCompanyAddOpen, setIsCompanyAddOpen] = React.useState(false);
  const [isCareerAddOpen, setIsCareerAddOpen] = React.useState(false);
  const [editCompanyData, setEditCompanyData] = React.useState(null);
  const [editCareerData, setEditCareerData] = React.useState(null);
  const dispatch = useDispatch();

  const onCompanyClose = (type) => {
    if (type === 'add') {
      setIsCompanyAddOpen(false);
    } else {
      setIsCompanyEditOpen(false);
      setEditCompanyData(null);
    }
  };

  const onEditCompany = (data) => {
    setEditCompanyData({ ...data });
    setIsCompanyEditOpen(true);
  };

  const onCompanyConfirm = async (data, type, id) => {
    let experience = [...selectedProfile?.experience];
    console.log(data);
    if (type === 'add') {
      experience.push({
        ...data, ...{
          impact: data.impact.filter((e) => e.value).map((e) => e.value),
          from: Moment(new Date()).set({ 'year': data.startYear, 'month': data.startMonth }).format('YYYY-MM-DDTHH:mm:ss[Z]'),
          to: data?.current ? '' : Moment(new Date()).set({ 'year': data.endYear, 'month': data.endMonth }).format('YYYY-MM-DDTHH:mm:ss[Z]'),
        }
      });
    } else if (type === 'edit') {
      const index = experience.findIndex((e) => e._id === editCompanyData._id);
      experience[index] = {
        ...data, ...{
          impact: data.impact.filter((e) => e.value).map((e) => e.value),
          from: Moment(new Date()).set({ 'year': data.startYear, 'month': data.startMonth }).format('YYYY-MM-DDTHH:mm:ss[Z]'),
          to: data?.current ? '' : Moment(new Date()).set({ 'year': data.endYear, 'month': data.endMonth }).format('YYYY-MM-DDTHH:mm:ss[Z]'),
          _id: editCompanyData?._id,
        }
      }
    } else if (type === 'delete') {
      if (editCompanyData?._id) experience = experience.filter((e) => e._id !== editCompanyData?._id);
    }
    const res = await dispatch(
      updateUserDetails({
        role: selectedProfile?.userRef.role,
        experience,
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
          setEditCompanyData(null);
          setIsCompanyEditOpen(false);
          return;
        }
        if (type === 'add') {
          setIsCompanyAddOpen(false);
          return;
        }
      }, 2000)
    } else {
      toast.error(res?.data?.error);
    }
  };

  const onCareerConfirm = async (data, type) => {
    const careerJourney = {
      experience: data.experience.filter((e) => e.value).map((e) => e.value),
      training: data.training.filter((e) => e.value).map((e) => e.value),
      nextRole: data.nextRole,
      description: data.description,
    };
    const res = await dispatch(
      updateUserDetails({
        role: selectedProfile?.userRef.role,
        careerJourney,
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
          setEditCareerData(null);
          setIsCareerEditOpen(false);
          return;
        }
        if (type === 'add') {
          setIsCareerAddOpen(false);
          return;
        }
      }, 2000)
    } else {
      toast.error(res?.data?.error);
    }
  };
  const onCareerClose = (type) => {
    setEditCareerData(null);
    if (type === 'add') {
      setIsCareerAddOpen(false);
    } else setIsCareerEditOpen(false);
  };

  const onEditCareer = (data) => {
    setEditCareerData({ ...data });
    setIsCareerEditOpen(true);
  };

  return (
    <>
      <div
        className="flex flex-1 flex-col shrink-0 border md:rounded-xl md:shadow-lg xs:py-6 xs:px-4 md:p-10 bg-white"
      >
        <ToastContainer />
        <div className="flex flex-1 justify-between items-center">
          <h4 className="text-2xl leading-8 font-bold">
            Career Journey
          </h4>
          {selectedProfile?.experience?.length > 0  && (
              <button
                className="text-white border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1"
                onClick={() => setIsCompanyAddOpen(true)}
              >
                <img src={AddIcon} alt="edit-icon" /><span className="text-teal-700 font-normal">Add Experience</span>
              </button>
          )}
        </div>
        <div className="grid mt-4">
          {(selectedProfile?.careerJourney?.experience.length > 0 || selectedProfile?.careerJourney?.nextRole || selectedProfile?.careerJourney?.training?.length > 0) && (
            <div className="flex flex-1 flex-row gap-4 pt-4">
              <div className="shrink-0">
                <img className="h-14 w-14 rounded" src={CareerIcon} alt="career" />
              </div>
              <div className="w-full">
                <div className="flex flex-1 justify-between">
                <h4 className="font-semibold text-lg leading-6 pb-1">
                  Next, I'am interested in being a {selectedProfile?.careerJourney.nextRole}
                </h4>
                {(selectedProfile?.careerJourney?.experience.length > 0 || selectedProfile?.careerJourney?.nextRole || selectedProfile?.careerJourney?.trainings?.length > 0) &&
                  (<button
                    className="text-white"
                    onClick={() => onEditCareer(selectedProfile?.careerJourney)}
                  >
                    <img src={EditIcon} alt="edit-icon" />
                  </button>)}
                </div>
                <p className="font-normal text-lg leading-6">
                  {selectedProfile?.careerJourney.description}
                </p>
                <div className="py-1">
                  <h4 className="font-semibold text-lg leading-6 py-1">Experience</h4>
                  <ul className="list-disc pl-7">
                    {selectedProfile?.careerJourney.experience.map((e) => {
                      return <li className="font-normal text-lg leading-6" key={e}>{e}</li>
                    })
                    }
                  </ul>
                </div>
                <div className="py-1">
                  <h4 className="font-semibold text-lg leading-6 py-1">Training</h4>
                  <ul className="list-disc pl-7">
                    {selectedProfile?.careerJourney.training.map((e) => {
                      return <li className="font-normal text-lg leading-6" key={e}>{e}</li>
                    })
                    }
                  </ul>
                </div>
                <div className="border-b py-2" />
              </div>
            </div>
          )}
          {isCareerEditOpen && (
            <CareerJourneyEdit
              onConfirm={onCareerConfirm}
              onClose={onCareerClose}
              editData={editCareerData}
              type="edit"
            />
          )}
          {!isCareerAddOpen && selectedProfile?.careerJourney?.experience.length === 0 && !selectedProfile?.careerJourney?.nextRole && selectedProfile?.careerJourney?.training?.length === 0 && (
            <div className="py-4">
              <div className="font-normal mb-2 text-lg leading-6">What do you want to do next in your career journey?</div>
              <button
                className="text-white border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1"
                onClick={() => setIsCareerAddOpen(true)}
              >
                <img src={AddIcon} alt="edit-icon" /><span className="text-teal-700 font-normal">Add Next Step</span>
              </button>
            </div>
          )}
          {isCareerAddOpen && (
            <div className="flex flex-1 flex-col bg-white shrink-0 border rounded-xl py-8 px-8 mt-6">
              <CareerJourneyEdit
                onConfirm={onCareerConfirm}
                onClose={onCareerClose}
                editData={{}}
                type="add"
              />
            </div>
          )}
          {selectedProfile?.experience?.length > 0 && selectedProfile?.experience.map((company, index) => {
            return (
              <div key={company._id}>
                  <div
                    className="flex flex-1 flex-row gap-4 pt-6"
                  >
                    <div className="shrink-0">
                      <img className="h-14 w-14 rounded" src={CompanyIcon} alt="Company" />
                    </div>
                    <div className="w-full">
                      <div className="flex flex-1 justify-between">
                        <h4 className="font-semibold text-lg leading-6">
                          {company?.company}
                        </h4>
                        <button
                          className="text-white"
                          onClick={() => onEditCompany(company)}
                        >
                          <img src={EditIcon} alt="edit-icon" />
                        </button>
                      </div>
                      <h4 className="font-semibold text-lg leading-6">
                        {company.title} ({company.current ? `${Moment(company.from).format('MMMM')} - ${Moment(company.from).format('yyyy')} to Present Date ` : `${Moment(company.from).format('MMMM')} - ${Moment(company.from).format('yyyy')} to ${Moment(company.to).format('MMMM')} - ${Moment(company.to).format('yyyy')}`})
                      </h4>
                      <div className="flex flex-1 gap-2">
                        {company?.responsibilities && company?.responsibilities.map(
                          (responsibility, responsibilityIndex) => {
                            return (
                              <span
                                key={`res_${responsibilityIndex}`}
                                className="text-xs inline-block py-1 px-2.5 leading-none text-center font-semibold bg-yellow-200 text-black rounded border border-yellow-600"
                              >
                                {responsibility}
                              </span>
                            );
                          }
                        )}
                      </div>
                      <p className="font-normal text-lg leading-6">{company.descriptionC}</p>
                      <div className="py-1">
                      <ul className="list-disc pl-7">
                        {company?.impact && company.impact.map(
                          (impact, whatDidIndex) => {
                            return (
                              <li
                                key={`impact_${whatDidIndex}`}
                                className="font-normal text-lg leading-6"
                              >
                                {impact}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                      {selectedProfile?.experience.length > 1 &&
                        index + 1 < selectedProfile?.experience.length &&
                        (<div className="border-b pt-5" />)}
                    </div>
                  </div>
                {isCompanyEditOpen && editCompanyData && editCompanyData?._id === company._id &&
                  (
                      <CompanyEdit
                        onClose={onCompanyClose}
                        onConfirm={onCompanyConfirm}
                        editData={editCompanyData}
                        currentWorkExists={selectedProfile?.experience?.length > 0 ? selectedProfile?.experience.some((e) => e.current) : false}
                        type='edit'
                      />
                  )}
              </div>
            );
          })}
            {!selectedProfile?.experience?.length  && (<div className="py-4">
              <div className="font-normal mb-2 text-lg leading-6">Tell us about your work experience</div>
              <button
                className="text-white border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1"
                onClick={() => setIsCompanyAddOpen(true)}
              >
                <img src={AddIcon} alt="edit-icon" /><span className="text-teal-700 font-normal">Add Experience</span>
              </button>
            </div>)}
          {isCompanyAddOpen && (
              <CompanyEdit
                onClose={onCompanyClose}
                onConfirm={onCompanyConfirm}
                editData={{}}
                currentWorkExists={selectedProfile?.experience?.length > 0 ? selectedProfile?.experience.some((e) => e.current) : false}
                type='add' />
          )}
        </div>
      </div>
    </>
  );
};
