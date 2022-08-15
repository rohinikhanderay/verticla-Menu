import React from 'react'
import BriefCase from '../../assets/images/icons/briefcase.svg';
import Location from '../../assets/images/icons/location.svg';
import CareerIcon from '../../assets/images/icons/Career.svg';
import CompanyIcon from '../../assets/images/icons/Company.svg';
import AwardsIcon from '../../assets/images/icons/Awards.svg';
import EducationIcon from '../../assets/images/icons/Education.svg';
import BackArrowIcon from '../../assets/images/icons/back_arrow.svg';
import OpenIcon from '../../assets/images/icons/open.svg';
import Pro_img from '../../assets/images/de_images.png'
import Moment from 'moment';
import SkillsIcon from '../../assets/images/icons/Skills.svg';

export const PreviewPublic = ({ match, selectedProfile, resetPublicProfile, roletype }) => {
    const openLink = (url) => {
        const openUrl = (!url.includes('http://') || !url.includes('https://')) ? `https://${url}` : url
        window.open(openUrl, "_blank");
    }
    return (
        <div className="xs:py-4 md:p-8 flex flex-1 gap-2 flex-col w-full font-roboto">
            {roletype === 'jobSeeker' && <div className="flex justify-start">
                <button type="button" className="text-teal-700 flex items-center justify-center border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1" onClick={() => resetPublicProfile(true)}><img src={BackArrowIcon} alt="back-arrow" className="pr-2 w-22 h-22" /> Back to Profile edit</button>
            </div>}
            <div className="flex flex-1 md:gap-8 flex-col w-full">
                <div className="flex flex-1 bg-white shrink-0 border md:rounded-xl md:shadow-lg font-roboto">
                    <div className="relative w-full">
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
                                </div>
                            </div>
                        </div>
                        <div className="relative flex flex-1 flex-col bg-teal-50 xs:py-6 xs:px-4 md:p-10 md:shadow-lg md:rounded-xl">
                            <div className="flex flex-1 justify-between items-center">
                                <h4 className="font-bold mb-2 text-2xl">{selectedProfile?.fullName}</h4>
                            </div>
                            <div className="flex xs:flex-col md:flex-row xs:gap-2 md:gap-4">
                                {selectedProfile?.jobTitle && (<p className="text-black text-lg font-normal">
                                <img className="inline-block mr-1 align-text-bottom" src={BriefCase} alt="brief-icon"/>
                                {selectedProfile?.jobTitle}
                                </p>)}
                                {selectedProfile?.streetAddress && (<p className="text-black text-lg font-normal">
                                <img className="inline-block mr-1 align-text-bottom" src={Location} alt="address-icon"/>
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
                            {selectedProfile?.websiteUrl && (<div className="flex flex-col justify-center gap-2 pt-8 py-4">
                                <button type="button" className="text-teal-700 w-40 border-2 rounded-full items-center justify-center border-teal-700 flex pl-3 pr-2 py-1" onClick={() => openLink(selectedProfile?.websiteUrl)}>View Website<img src={OpenIcon} alt="back-arrow" className="pl-2 w-22 h-22" /></button>
                            </div>)}
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-1 flex-col shrink-0 border md:rounded-xl md:shadow-lg xs:py-6 xs:px-4 md:p-10 bg-white"
                >
                    <div className="flex flex-1 justify-between items-center">
                        <h4 className="text-2xl leading-8 font-bold">
                            Career Journey
                        </h4>
                    </div>
                    <div className="grid mt-4">
                        {(selectedProfile?.careerJourney?.experience.length > 0 || selectedProfile?.careerJourney?.nextRole || selectedProfile?.careerJourney?.training?.length > 0) && (
                        <div className="flex flex-1 flex-row gap-4 pt-4">
                            <div className="shrink-0">
                                <img className="h-14 w-14 rounded" src={CareerIcon} alt="career" />
                            </div>
                            <div className="w-full">
                                <h4 className="font-semibold text-lg leading-6 pb-1">
                                    Next, I'am interested in being a {selectedProfile?.careerJourney.nextRole}
                                </h4>
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
                        </div>)}
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
                                            <p className="font-normal text-lg leading-6">{company.description}</p>
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
                                            index + 1 < selectedProfile?.experience.length && (
                                            <div className="border-b pt-5" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {selectedProfile?.skills?.length > 0 &&
                        (<div className="flex flex-1 flex-col shrink-0  border md:rounded-xl md:shadow-lg xs:py-6 xs:px-4 md:p-10 bg-white">
                    <div className="flex flex-1 justify-between items-center">
                        <h4 className="text-2xl leading-8 font-bold">Skills</h4>
                    </div>
                        <div className="grid mt-4">
                            <div className="flex flex-1 flex-row gap-4 pt-4">
                                <div className="shrink-0">
                                    <img className="h-14 w-14 rounded" src={SkillsIcon} alt="career" />
                                </div>
                                <div className="w-full">
                                    <div className="flex flex-1 gap-2 py-4">
                                        {selectedProfile?.skills && selectedProfile?.skills.map(
                                            (skill, skillIndex) => {
                                                return (
                                                    <span
                                                        key={`res_${skillIndex}`}
                                                        className="text-base inline-block py-1 px-2.5 leading-5 text-center font-semibold bg-bg_yellow text-black rounded border border-border_yellow"
                                                    >
                                                        {skill}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>)}
                {selectedProfile?.awards?.length > 0 && (<div className="flex flex-1 flex-col shrink-0  border md:rounded-xl md:shadow-lg xs:py-6 xs:px-4 md:p-10 bg-white">
                    <div className="flex flex-1 justify-between items-center">
                        <h4 className="text-2xl leading-8 font-bold">Awards</h4>
                    </div>
                    <div className="grid mt-4">
                        {selectedProfile.awards.map((award, index) => {
                            return <div key={index}>
                                <div className="flex flex-1 flex-row gap-4 pt-4">
                                    <div className="shrink-0">
                                        <img className="h-14 w-14 rounded" src={AwardsIcon} alt="career" />
                                    </div>
                                    <div className="w-full">
                                        <h4 className="font-semibold text-lg leading-6">{award.awardName}</h4>
                                        <h3 className="font-semibold text-lg leading-6">{award.companyName}, ({`${Moment(award.date).format('MMMM yyyy')}`})</h3>
                                        <p className="font-normal text-base">{award.description || '-'}</p>
                                        {selectedProfile?.awards.length > 1 &&
                                            index + 1 < selectedProfile?.awards.length && (
                                            <div className="border-b pt-5" />
                                        )}
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        })
                        }
                    </div>
                </div>)}
                
                {selectedProfile?.education?.length > 0 && (<div
                    className="flex flex-1 flex-col shrink-0  border md:rounded-xl md:shadow-lg xs:py-6 xs:px-4 md:p-10 bg-white"
                >
                    <div className="flex flex-1 justify-between items-center">
                        <h4 className="text-2xl leading-8 font-bold">Education</h4>
                    </div><div className="grid mt-4">
                        {selectedProfile?.education?.map((edu, index) => {
                            return (
                                <div key={edu._id}>
                                    <div className="flex flex-1 flex-row gap-4 pt-4">
                                        <div className="shrink-0">
                                            <img className="h-14 w-14 rounded" src={EducationIcon} alt="education" />
                                        </div>
                                        <div className="w-full">
                                            <h4 className="font-semibold text-lg">
                                                {edu.schoolOrOrganization}
                                            </h4>
                                            <h3 className="font-normal text-lg leading-6">
                                                {`${edu.degreeCertification}, ${edu.fieldOfStudy}`}, ({`${Moment.utc(edu.from).format('MMMM yyyy')} to ${Moment.utc(edu.to).format('MMMM yyyy')}`})</h3>
                                            <p className="font-normal text-base">{edu.description || '-'}</p>
                                            {selectedProfile?.education.length > 1 &&
                                                index + 1 < selectedProfile?.education.length && (
                                                <div className="border-b pt-5" />
                                             )}
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>)}
            </div>
        </div>
    );
};
