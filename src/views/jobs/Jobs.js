import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import * as jobActions from '../../store/job'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'
import defaultImg from '../../assets/images/dfimag.png'
import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/Footer'
import Select from 'react-select'
import img_19 from '../../assets/images/2.gif'
import SlideToggle from 'react-slide-toggle'
import {
  viewProfile,
  updateUserDetails,
  getProfile,
} from '../../store/profile/index'
import {
  viewJobs,
  getRecommandedJob,
  getZipRecJobs,
  getRecommandedJobjobTitle,
} from '../../store/job/index'
import parse from 'html-react-parser'
import moment from 'moment'
const Jobs = ({ jobs, profile }) => {
  const [savejobsSeeMore, setSaveJobsSeeMore] = useState(3)
  const [searchjobsSeeMore, setSearchJobsSeeMore] = useState(2)
  const [recommandedjobsSeeMore, setRecommandedJobsSeeMore] = useState(3)
  const [
    recommandedjobsTitleSeeMore,
    setRecommandedJobsTitleSeeMore,
  ] = useState(3)
  const [searchJobInput, setSearchJobInput] = useState()
  const [searchFilter, setSearchFilter] = useState()
  const [spinnerState, setSpinnerState] = useState(false)
  const [formSpinnerState, setFormSpinnerState] = useState(false)
  const [searchFormObj, setSearchFormObj] = useState()
  const [pageInc, setPageInc] = useState(1)
  const [noDataStatus, setNoDataStatus] = useState(false)
  let history = useHistory()

  const dispatch = useDispatch()
  const redMoreBtn = (job) => {
    if (job?._id) {
      history.push(`/jobs/${job?._id}`)
    } else {
      window.open(
        job?.url,
        '_blank', // <- This is what makes it open in a new window.
      )
    }
  }
  // const stringToHTML = function (str, id) {
  //   console.log('--', str, id)
  //   if (str != undefined) {
  //     setTimeout(() => {
  //       document.getElementById(id).innerHTML = str
  //     }, 0)
  //   }
  // }
  //  useEffect(() => {
  //  console.log(jobs.allJobs)
  //   }, [jobs.allJobs]);
  // useEffect(() => {
  //  if((jobs?.allJobs?.data?.length >= 0 &&
  //                   jobs?.allJobs?.data?.length == jobs?.allJobs?.total)){
  //    dispatch(getZipRecJobs(searchJobInput,2,1))
  //  }
  // }, [jobs.allJobs]);
  useEffect(() => {
    if (profile?.profile != null && profile?.profile?.skills?.length !== 0) {
      dispatch(
        getRecommandedJob({
          skills: profile?.profile?.skills,
          page: 1,
          limit: recommandedjobsSeeMore,
        }),
      )
    }
    if (profile?.profile != null && profile?.profile?.jobTitle) {
      dispatch(
        getRecommandedJobjobTitle({
          name: profile?.profile?.jobTitle,
          page: 1,
          limit: recommandedjobsTitleSeeMore,
        }),
      )
    }
  }, [profile])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    setFormSpinnerState(true)
    setNoDataStatus(false)
    let a = data
    a.skills = data.skills != '' ? data.skills.split(',') : []
    a.benefits = data.benefits ? data.benefits.split(',') : []

    setSearchFormObj(data)
    setSearchJobsSeeMore(2)
    dispatch(
      viewJobs({ ...data, name: searchJobInput, page: 1, limit: 2 }),
    ).then((res) => {
      if (res?.data.length == 0 || res?.data.length == 1) {
        dispatch(
          getZipRecJobs(data, searchJobInput, res?.data.length == 1 ? 1 : 2, 1),
        )
        setPageInc(1)
      }
      setFormSpinnerState(false)
    })
  }
  useEffect(() => {
    if (searchjobsSeeMore != 2) {
      dispatch(
        viewJobs({
          limit: searchjobsSeeMore,
          page: 1,
          name: searchJobInput,
          ...searchFormObj,
        }),
      ).then((res) => {
        if (res?.data.length % 2 == 1) {
          dispatch(getZipRecJobs(searchFormObj, searchJobInput, 1, pageInc))
          setPageInc(pageInc + 1)
        }
      })
      // console.log(jobs?.allJobs.data.length)
    }
  }, [searchjobsSeeMore])

  useEffect(() => {
    if (recommandedjobsSeeMore != 3) {
      dispatch(
        getRecommandedJob({
          skills: profile?.profile?.skills,
          page: 1,
          limit: recommandedjobsSeeMore,
        }),
      )
    }
  }, [recommandedjobsSeeMore])
  // const noData=()=>{

  //   setTimeout(()=>{

  //     // if(jobs?.allJobs?.data?.length==0){

  //     setNoDataStatus(true)
  //     // }

  //   },500)

  // }
  const removeSaveJobs = async (ix) => {
    let sendData = [...(profile && profile?.profile?.savedJobs)]
    let sendData2 = sendData.filter((t, index) => {
      return index !== ix
    })

    await dispatch(
      updateUserDetails({
        savedJobs: sendData2,
        role: profile && profile?.profile?.userRef.role,
      }),
    )
    await dispatch(getProfile())
  }
  const options = [
    { value: 'chocolate', label: 'Job Title' },
    { value: 'strawberry', label: 'Salary' },
    { value: 'vanilla', label: 'Locations' },
    { value: 'vanilla', label: 'Skills' },
    { value: 'vanilla', label: 'When Posted' },
  ]
  const saveJobs = async (e, item) => {
    let a = [...(profile && profile?.profile?.savedJobs)]

    let result = a.some((vendor) => vendor['_id'] === item._id)
    if (!result) {
      a.unshift(item)
    } else {
      let indexArry = a.findIndex(({ _id }) => _id === item._id)

      if (indexArry > -1) {
        a.splice(indexArry, 1)
      }
    }

    await dispatch(
      updateUserDetails({
        role: profile?.profile?.userRef.role,
        savedJobs: a,
      }),
    )
    await dispatch(getProfile())
  }
  const searchFilterChange = (e) => {
    setSearchFilter(e)
  }

  const handleSubmit1 = (e) => {
    if (e.key === 'Enter' || e === 'click') {
      setNoDataStatus(false)
      setSearchJobsSeeMore(2)
      setSpinnerState(true)
      dispatch(viewJobs({ name: searchJobInput, page: 1, limit: 2 }))
        .then((res) => {
          setSpinnerState(false)

          if (res?.data.length == 0 || res?.data.length == 1) {
            dispatch(
              getZipRecJobs(
                '',
                searchJobInput,
                res?.data.length == 1 ? 1 : 2,
                1,
              ),
            )
            setPageInc(1)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="container m-auto px-5">
        <div className="mb-3 mt-5 w-11/12 m-auto xs:mb-14">
          <h1 className="container m-auto lg:text-5xl md:text-4xl flex items-center text-3xl font-semibold xs:text-2xl">
            <svg
              viewBox="0 0 32 32"
              className="inline mr-3"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '40px',
                fill: '#38acb8',
                cursor: 'pointer',
                display: 'none',
              }}
            >
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z" />
                <path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z" />
              </g>
            </svg>
            Jobs & Internships{' '}
          </h1>
        </div>
        <SlideToggle
          duration={2000}
          collapsed={true}
          whenReversedUseBackwardEase={false}
          render={({ toggle, setCollapsibleElement }) => (
            <>
              <div className="relative h-12 mt-7 sm:mt-5">
                <div className="w-11/12 m-auto" style={{ display: 'flex' }}>
                  <div className="">
                    <button
                      onClick={toggle}
                      className="flex px-4 py-1 font-medium font-bold  border h-11 border-solid border-black	 rounded mr-4 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        className="mr-2"
                        fill="#16acb2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z" />
                      </svg>
                      Filter
                    </button>
                  </div>
                  <div className="relative w-full flex items-center">
                    <input
                      type="text"
                      value={searchJobInput}
                      onKeyDown={(e) => {
                        handleSubmit1(e)
                      }}
                      placeholder="Search"
                      className="border-solid border-2 h-12 rounded-full pl-16 placeholder-gray-400 text-lg w-10/12 font-medium"
                      style={{ borderColor: '#C4C4C4' }}
                      onChange={(e) => {
                        setSearchJobInput(e.target.value)
                      }}
                    ></input>
                    <img
                      className="ml-5 w-10 sm:w-8"
                      src={img_19}
                      style={{ display: spinnerState ? 'block' : 'none' }}
                    ></img>
                    <svg
                      className="absolute top-2/4 left-3"
                      style={{
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M29.0797 18.9757C28.1619 22.517 27.7029 24.2877 27.9407 25.151C28.1785 26.0142 29.0164 26.8426 30.6921 28.4992L31.717 29.5124C32.0841 29.8754 32.1024 30.4459 31.7229 30.821L30.4296 32.0996C30.0657 32.4594 29.4888 32.4723 29.1059 32.0938L27.9854 30.9861C26.3278 29.3473 25.499 28.528 24.6381 28.2991C23.7772 28.0702 22.0573 28.5276 18.6175 29.4425C17.391 29.7687 16.1013 29.9427 14.7705 29.9427C6.613 29.9427 0 23.405 0 15.3403C0 7.27571 6.613 0.738037 14.7705 0.738037C22.9281 0.738037 29.5411 7.27571 29.5411 15.3403C29.5411 16.5954 29.3809 17.8135 29.0797 18.9757ZM14.7705 26.2921C20.8887 26.2921 25.8484 21.3888 25.8484 15.3403C25.8484 9.29187 20.8887 4.38861 14.7705 4.38861C8.65238 4.38861 3.69264 9.29187 3.69264 15.3403C3.69264 21.3888 8.65238 26.2921 14.7705 26.2921Z"
                        fill="#979797"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className=" border-t border-slate-400	border-solid py-4 mt-5 w-11/12 m-auto"
                ref={setCollapsibleElement}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap -mx-2">
                    <div className="px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                      <label className="block">Location</label>
                      <input
                        className="w-full rounded"
                        type="text"
                        {...register('location')}
                      ></input>
                    </div>
                    <div className="px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                      <label className="block">Company</label>
                      <input
                        className="w-full rounded"
                        type="text"
                        {...register('companyname')}
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                      <label className="block">Skills</label>
                      <input
                        className="w-full rounded"
                        type="text"
                        {...register('skills')}
                      ></input>
                    </div>
                    <div className="px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                      <label className="block">Benefits</label>
                      <input
                        className="w-full rounded"
                        type="text"
                        {...register('benefits')}
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                      <label className="block">Culture</label>
                      <input
                        className="w-full rounded"
                        type="text"
                        {...register('culture')}
                      ></input>
                    </div>
                    {/* <div className="px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                      <label className="block">Values</label>
                      <input
                        className="w-full rounded"
                        type="text"
                        {...register("values")}
                      ></input>
                    </div> */}
                  </div>
                  <div className="flex mt-3 -mx-2 flex-wrap">
                    {/* <div className="w-2/12 px-2 sm:w-1/2 xs:w-full">
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: "rgba(0,0,0,.03)" }}
                      >
                        <h1>Skills</h1>
                      </div>
                      <div className="px-5 py-4">
                        {profile?.profile?.skills?.map((item, idnex) => {
                          return (
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="mr-3"
                                {...register("skills[]")}
                                value={item}
                              ></input>
                              {item}
                            </label>
                          );
                        })}
                      </div>
                    </div> */}
                    <div className="w-4/12 px-2 sm:w-1/2 xs:w-full">
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: 'rgba(0,0,0,.03)' }}
                      >
                        <h1>Salary</h1>
                      </div>
                      <div className="px-5 py-4 flex flex-wrap items-center lg:justify-between md:justify-center sm:justify-center">
                        <input
                          type="number"
                          min="0"
                          className="lg:w-5/12 h-8 p-0 px-3 text-sm md:w-full sm:w-full"
                          placeholder={0}
                          {...register('minSalary')}
                        ></input>
                        <p className="lg:m-0 md:text-center md:my-3 sm:text-center sm:my-1">
                          To
                        </p>
                        <input
                          type="number"
                          min="0"
                          placeholder={100}
                          className="lg:w-5/12 h-8 p-0 px-3 text-sm md:w-full sm:w-full"
                          {...register('maxSalary')}
                        ></input>
                      </div>
                    </div>
                    <div className="w-3/12 px-2 sm:w-1/2 xs:w-full">
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: 'rgba(0,0,0,.03)' }}
                      >
                        <h1>Compensation</h1>
                      </div>
                      <div className="px-5 py-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3"
                            {...register('compensation[]')}
                            value="Hourly"
                          ></input>
                          Hourly
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register('compensation[]')}
                            className="mr-3"
                            value="Salary"
                          ></input>
                          Salary
                        </label>
                      </div>
                    </div>
                    <div className="w-3/12 px-2 sm:w-1/2 xs:w-full">
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: 'rgba(0,0,0,.03)' }}
                      >
                        <h1>Job Type</h1>
                      </div>
                      <div className="px-5 py-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3"
                            {...register('jobType[]')}
                            value="Full-Time"
                          ></input>
                          Full Time
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register('jobType[]')}
                            className="mr-3"
                            value="Part-Time"
                          ></input>
                          Part Time
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register('jobType[]')}
                            value="Contract"
                            className="mr-3"
                          ></input>
                          Contract
                        </label>
                      </div>
                    </div>
                    <div
                      className="w-2/12 px-2 sm:w-1/2 xs:w-full"
                      style={{ display: 'none' }}
                    >
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: 'rgba(0,0,0,.03)' }}
                      >
                        <h1>Experience</h1>
                      </div>
                      <div className="px-5 py-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3"
                            {...register('experience[]')}
                            value="entry level"
                          ></input>
                          Entry level
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register('experience[]')}
                            className="mr-3"
                            value="Intermediate"
                          ></input>
                          Intermediate
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register('experience[]')}
                            value="Expert"
                            className="mr-3"
                          ></input>
                          Expert
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block flex justify-end items-center">
                      <img
                        className="mr-3 w-7 sm:w-7 h-7 "
                        src={img_19}
                        style={{ display: formSpinnerState ? 'block' : 'none' }}
                      ></img>
                      <button className="px-8 py-2 bg-red-500 rounded text-white">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        />

        <div className="my-14">
          {/* <h1 className="font-semibold text-4xl sm:text-3xl xs:text-2xl xs:mb-5 mb-8">
            Recommended jobs
          </h1> */}

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-6 rj-jobs">
            {jobs.allJobs?.data?.length == 0 ? (
              <h5 className="lg:text-3xl md:text-xl font-light text-right">
                No records found !
              </h5>
            ) : (
              jobs.allJobs?.data?.map((job, index) => {
                return (
                  <div
                    style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
                    // onClick={() => {
                    //   redMoreBtn(job);
                    // }}
                    className="exp-box relative bg-white  rounded-3xl xl:pt-10 xl:pb-10 lg:pt-10 lg:pb-10 sm:pt-6 sm:pb-6 md:pb-6 md:pt-6 flex items-center overflow-hidden"
                  >
                    <div className="flex w-full h-full ">
                      <div className="exp-text lg:pl-8 sm:pl-4 md:pl-4 pr-10 w-full flex flex-col">
                        <div>
                          <div class="flex justify-between">
                            <h1 className="lg:text-3xl md:text-xl sm:text-xl font-bold">
                              {' '}
                              {job?.positionTitle || job?.name}
                            </h1>
                            <svg
                              onClick={(e) => {
                                saveJobs(e, job)
                              }}
                              width="26"
                              style={{
                                cursor: 'pointer',
                                fill: profile?.profile?.savedJobs?.some(
                                  (vendor) => vendor['_id'] === job._id,
                                )
                                  ? '#0bacb4'
                                  : '',
                                display: job._id ? 'block' : 'none',
                              }}
                              height="34"
                              className="ml-auto mr-0 md:w-5 sm:w-5 absolute right-3"
                              viewBox="0 0 26 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1432_20521)">
                                <path
                                  d="M0.5 33.1386V3.18823C0.5 1.71305 1.722 0.500732 3.25 0.500732H22.75C24.278 0.500732 25.5 1.71305 25.5 3.18823V33.1386L13.2483 26.1292L13 25.9872L12.7517 26.1292L0.5 33.1386Z"
                                  stroke="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1432_20521">
                                  <rect
                                    width="26"
                                    height="34"
                                    fill="white"
                                    transform="translate(0 0.000732422)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>

                          <h5
                            className="lg:text-3xl md:text-xl font-light descriptionText"
                            id={`job-desc-${index}`}
                          >
                            {/* {job?.description?.replace(/<[^>]*>?/gm, '') ||
                              job?.snippet?.replace(/<[^>]*>?/gm, '')} */}
                            {/* {stringToHTML(
                              job?.description || job?.snippet,
                              `job-desc-${index}`,
                            )} */}
                            {parse(job?.description || job?.snippet || '')}
                          </h5>
                        </div>
                        <div className="exp-text-bottom mt-2">
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.organization?.name}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.jobType}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            Salary ${job?.salary}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.location}
                          </p>
                          <p className="font-light text-base mt-2">
                            {job?.postingDate
                              ? moment(
                                  moment(job?.postingDate).format('YYYYMMDD'),
                                ).fromNow()
                              : job?.posted_time_friendly}
                          </p>
                        </div>
                        <div
                          className="absolute top-2/4 right-3"
                          className="absolute top-2/4 right-3"
                        >
                          <svg
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              redMoreBtn(job)
                            }}
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
            <center>
              <a
                href="javascript:void(0)"
                style={{
                  display:
                    jobs?.allJobs.data && jobs?.allJobs?.data.length != 0
                      ? 'block'
                      : 'none',
                }}
                onClick={() => {
                  if (
                    jobs?.allJobs?.data?.length >= 0 &&
                    jobs?.allJobs?.data?.length == jobs?.allJobs?.total
                  ) {
                    dispatch(
                      getZipRecJobs(
                        searchFormObj,
                        searchJobInput,
                        2,
                        pageInc + 1,
                      ),
                    )
                    setPageInc(pageInc + 1)
                  } else {
                    setSearchJobsSeeMore(searchjobsSeeMore + 2)
                  }
                }}
                className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
              >
                See More
              </a>
            </center>
          </div>
        </div>

        <div className="mb-14">
          <div className="flex justify-between">
            <h1 className="lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-10/12 ">
              Recommended jobs
              <input
                type="button"
                value="Get great recommendations! Add in your job title."
                style={{
                  cursor: 'pointer',
                  background: 'teal',
                  display: profile?.profile?.jobTitle ? 'none' : 'block',
                }}
                className="btn px-10 sm:px-16 py-3 sm:pt-3 sm:pb-3 xs:pl-0 xs:pr-0 bg-teal-600 text-white rounded-xl text-base	 mt-5	font-medium sm:mr-0 sm:w-full sm:mb-5 md:w-auto md:mb-0"
                onClick={() => {
                  history.push(`/profiles/${profile?.profile?._id}`)
                }}
              />
              {/* <svg
                className="ml-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                onClick={() => {
                  history.push(`/profiles/${profile?.profile?._id}`)
                }}
                viewBox="0 0 24 24"
                style={{
                  fill: 'teal',
                  cursor: 'pointer',
                  display: profile?.profile?.jobTitle ? 'none' : 'block',
                }}
              >
                <title id="unique-id">
                  Get great recommendations! Add in your job title.
                </title>
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
              </svg> */}
            </h1>

            <a
              style={{
                display:
                  jobs?.recommandedTitleJob?.data &&
                  jobs?.recommandedTitleJob?.data?.length > 2 &&
                  jobs?.recommandedTitleJob?.data?.length !==
                    jobs?.recommandedTitleJob?.total
                    ? 'block'
                    : 'none',
              }}
              href="javascript:void(0)"
              onClick={() => {
                setRecommandedJobsTitleSeeMore(recommandedjobsTitleSeeMore + 3)
              }}
              className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
            >
              See More{' '}
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-6">
            {jobs &&
              jobs?.recommandedTitleJob?.data?.map((job, index) => {
                return (
                  <div
                    style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
                    className="exp-box relative bg-white  rounded-3xl xl:pt-8 xl:pb-8 lg:pt-8 lg:pb-8 sm:pt-6 sm:pb-6 md:pb-6 md:pt-6 flex items-center overflow-hidden"
                  >
                    <div className="flex w-full h-full items-center">
                      <div className="exp-text lg:pl-8 sm:pl-4 md:pl-4 pr-10 w-full flex flex-col">
                        <div>
                          <div className="flex justify-between">
                            <h1 className="lg:text-3xl md:text-xl sm:text-xl font-bold">
                              {' '}
                              {job?.positionTitle}
                            </h1>
                            <svg
                              width="26"
                              onClick={(e) => {
                                saveJobs(e, job)
                              }}
                              style={{
                                cursor: 'pointer',
                                fill: profile?.profile?.savedJobs?.some(
                                  (vendor) => vendor['_id'] === job._id,
                                )
                                  ? '#0bacb4'
                                  : '',
                              }}
                              height="34"
                              className="ml-auto mr-0 md:w-5 sm:w-5 absolute right-3"
                              viewBox="0 0 26 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1432_20521)">
                                <path
                                  d="M0.5 33.1386V3.18823C0.5 1.71305 1.722 0.500732 3.25 0.500732H22.75C24.278 0.500732 25.5 1.71305 25.5 3.18823V33.1386L13.2483 26.1292L13 25.9872L12.7517 26.1292L0.5 33.1386Z"
                                  stroke="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1432_20521">
                                  <rect
                                    width="26"
                                    height="34"
                                    fill="white"
                                    transform="translate(0 0.000732422)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <h5
                            className="lg:text-3xl md:text-xl font-light descriptionText"
                            id={`job-desc-skill-${index}`}
                          >
                            {parse(job?.description || '')}
                            {/* {stringToHTML(
                              job?.description,
                              `job-desc-skill-${index}`,
                            )} */}
                          </h5>
                        </div>

                        <div className="exp-text-bottom mt-2">
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.organization?.name}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.jobType}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            Salary ${job?.salary}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.location}
                          </p>
                          <p className="font-light text-sm mt-1">
                            {' '}
                            {moment(
                              moment(job?.postingDate).format('YYYYMMDD'),
                            ).fromNow()}
                          </p>
                        </div>
                        <div className="absolute top-2/4 right-3">
                          <svg
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              redMoreBtn(job)
                            }}
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="mb-14">
          <div className="flex justify-between">
            <h1 className="lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-10/12">
              Jobs based on your skills
            </h1>
            <a
              style={{
                display:
                  jobs?.recommandedJob?.data &&
                  jobs?.recommandedJob?.data?.length > 2 &&
                  jobs?.recommandedJob?.data?.length !==
                    jobs?.recommandedJob?.total
                    ? 'block'
                    : 'none',
              }}
              href="javascript:void(0)"
              onClick={() => {
                setRecommandedJobsSeeMore(recommandedjobsSeeMore + 3)
              }}
              className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
            >
              See More{' '}
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-6">
            {jobs &&
              jobs?.recommandedJob?.data?.map((job, index) => {
                return (
                  <div
                    style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
                    className="exp-box relative bg-white  rounded-3xl xl:pt-8 xl:pb-8 lg:pt-8 lg:pb-8 sm:pt-6 sm:pb-6 md:pb-6 md:pt-6 flex items-center overflow-hidden"
                  >
                    <div className="flex w-full h-full items-center">
                      <div className="exp-text lg:pl-8 sm:pl-4 md:pl-4 pr-10 w-full flex flex-col">
                        <div>
                          <div className="flex justify-between">
                            <h1 className="lg:text-3xl md:text-xl sm:text-xl font-bold">
                              {' '}
                              {job?.positionTitle}
                            </h1>
                            <svg
                              width="26"
                              onClick={(e) => {
                                saveJobs(e, job)
                              }}
                              style={{
                                cursor: 'pointer',
                                fill: profile?.profile?.savedJobs?.some(
                                  (vendor) => vendor['_id'] === job._id,
                                )
                                  ? '#0bacb4'
                                  : '',
                              }}
                              height="34"
                              className="ml-auto mr-0 md:w-5 sm:w-5 absolute right-3"
                              viewBox="0 0 26 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1432_20521)">
                                <path
                                  d="M0.5 33.1386V3.18823C0.5 1.71305 1.722 0.500732 3.25 0.500732H22.75C24.278 0.500732 25.5 1.71305 25.5 3.18823V33.1386L13.2483 26.1292L13 25.9872L12.7517 26.1292L0.5 33.1386Z"
                                  stroke="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1432_20521">
                                  <rect
                                    width="26"
                                    height="34"
                                    fill="white"
                                    transform="translate(0 0.000732422)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <h5
                            className="lg:text-3xl md:text-xl font-light descriptionText"
                            id={`job-desc-reco-${index}`}
                          >
                            {/* {stringToHTML(
                              job?.description,
                              `job-desc-reco-${index}`,
                            )} */}
                            {parse(job?.description || '')}
                          </h5>
                        </div>

                        <div className="exp-text-bottom mt-2">
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.organization?.name}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.jobType}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            Salary ${job?.salary}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.location}
                          </p>
                          <p className="font-light text-sm mt-1">
                            {' '}
                            {moment(
                              moment(job?.postingDate).format('YYYYMMDD'),
                            ).fromNow()}
                          </p>
                        </div>
                        <div className="absolute top-2/4 right-3">
                          <svg
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              redMoreBtn(job)
                            }}
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          >
                            <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="mb-14" style={{ display: 'none' }}>
          <div className="flex justify-between">
            <h1 className="lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-10/12">
              Recently viewed
            </h1>
            <a
              href="javascript:void(0)"
              className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
            >
              See More{' '}
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-6">
            {profile &&
              profile?.profile?.recentlyViewJobs?.map((job, index) => {
                return (
                  <div
                    style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
                    className="exp-box relative bg-white  rounded-3xl xl:pt-8 xl:pb-8 lg:pt-8 lg:pb-8 sm:pt-6 sm:pb-6 md:pb-6 md:pt-6 flex items-center overflow-hidden"
                  >
                    <div className="flex w-full h-full items-center">
                      <div className="exp-text lg:pl-8 sm:pl-4 md:pl-4 pr-10 w-full flex flex-col">
                        <div>
                          <div className="flex justify-between">
                            <h1 className="lg:text-3xl md:text-xl sm:text-xl font-bold">
                              {' '}
                              {job?.positionTitle}
                            </h1>
                            <svg
                              width="26"
                              style={{ cursor: 'pointer' }}
                              height="34"
                              className="ml-auto mr-0 md:w-5 sm:w-5 absolute right-3"
                              viewBox="0 0 26 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1432_20521)">
                                <path
                                  d="M0.5 33.1386V3.18823C0.5 1.71305 1.722 0.500732 3.25 0.500732H22.75C24.278 0.500732 25.5 1.71305 25.5 3.18823V33.1386L13.2483 26.1292L13 25.9872L12.7517 26.1292L0.5 33.1386Z"
                                  stroke="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1432_20521">
                                  <rect
                                    width="26"
                                    height="34"
                                    fill="white"
                                    transform="translate(0 0.000732422)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          ?{' '}
                          <h5
                            className="lg:text-3xl md:text-xl font-light descriptionText"
                            id={`job-desc-sev-${index}`}
                          >
                            {/* {stringToHTML(
                              job?.description,
                              `job-desc-sev-${index}`,
                            )} */}
                            {parse(job?.description || '')}
                          </h5>
                        </div>
                        <div className="exp-text-bottom mt-2">
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.organization?.name}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.jobType}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            Salary ${job?.salary}
                          </p>
                          <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                            {job?.location}
                          </p>
                          <p className="font-light text-sm mt-1">
                            {' '}
                            {moment(
                              moment(job?.postingDate).format('YYYYMMDD'),
                            ).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="mb-14">
          <div className="flex justify-between">
            <h1
              style={{
                display:
                  profile?.profile?.savedJobs?.length !== 0 ? 'block' : 'none',
              }}
              className="lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-10/12"
            >
              Saved jobs
            </h1>

            <a
              onClick={() => {
                setSaveJobsSeeMore(savejobsSeeMore + 3)
              }}
              style={{
                display:
                  profile &&
                  profile?.profile?.savedJobs &&
                  profile &&
                  profile?.profile?.savedJobs?.length > 3 &&
                  profile?.profile?.savedJobs?.slice(0, savejobsSeeMore)
                    .length !== profile?.profile?.savedJobs.length
                    ? 'block'
                    : 'none',
              }}
              href="javascript:void(0)"
              className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
            >
              See More{' '}
            </a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-1 gap-6">
            {profile &&
              profile?.profile?.savedJobs

                ?.slice(0, savejobsSeeMore)
                .map((job, index) => {
                  return (
                    <div
                      style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
                      className="exp-box relative bg-white  rounded-3xl xl:pt-8 xl:pb-8 lg:pt-8 lg:pb-8 sm:pt-6 sm:pb-6 md:pb-6 md:pt-6 flex items-center overflow-hidden"
                    >
                      <div className="flex w-full h-full items-center">
                        <div className="exp-text lg:pl-8 sm:pl-4 md:pl-4 pr-10 w-full flex flex-col">
                          <div>
                            <div className="flex justify-between">
                              <h1 className="lg:text-3xl md:text-xl sm:text-xl font-bold">
                                {' '}
                                {job?.positionTitle}
                              </h1>
                              <svg
                                width="26"
                                onClick={(e) => {
                                  saveJobs(e, job)
                                }}
                                style={{
                                  cursor: 'pointer',
                                  fill: profile?.profile?.savedJobs.some(
                                    (vendor) => vendor['_id'] === job._id,
                                  )
                                    ? '#0bacb4'
                                    : '',
                                }}
                                height="34"
                                className="ml-auto mr-0 md:w-5 sm:w-5 absolute right-3"
                                viewBox="0 0 26 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_1432_20521)">
                                  <path
                                    d="M0.5 33.1386V3.18823C0.5 1.71305 1.722 0.500732 3.25 0.500732H22.75C24.278 0.500732 25.5 1.71305 25.5 3.18823V33.1386L13.2483 26.1292L13 25.9872L12.7517 26.1292L0.5 33.1386Z"
                                    stroke="black"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1432_20521">
                                    <rect
                                      width="26"
                                      height="34"
                                      fill="white"
                                      transform="translate(0 0.000732422)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>

                          <h5 className="lg:text-3xl md:text-xl font-light descriptionText">
                            {parse(job?.description || '')}
                          </h5>

                          <div className="exp-text-bottom mt-2">
                            <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                              {job?.organization?.name}
                            </p>
                            <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                              {job?.jobType}
                            </p>
                            <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                              Salary ${job?.salary}
                            </p>
                            <p className="font-light text-xl leading-6 md:text-base sm:text-base">
                              {job?.location}
                            </p>
                            <p className="font-light text-sm mt-1">
                              {' '}
                              {moment(
                                moment(
                                  job?.postingDate || job?.posted_time,
                                ).format('YYYYMMDD'),
                              ).fromNow()}
                            </p>
                          </div>
                          <div className="absolute top-2/4 right-3">
                            <svg
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                redMoreBtn(job)
                              }}
                              width="24"
                              height="24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            >
                              <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
                            </svg>
                            {/* <svg
                              onClick={() => {
                                removeSaveJobs(index);
                              }}
                              style={{ cursor: "pointer" }}
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              version="1.1"
                              fill="#2e9488"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line
                                x1="1"
                                y1="20"
                                x2="20"
                                y2="1"
                                stroke="#2e9488"
                                stroke-width="2"
                              />
                              <line
                                x1="1"
                                y1="1"
                                x2="20"
                                y2="20"
                                stroke="#2e9488"
                                stroke-width="2"
                              />
                            </svg> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
          </div>
        </div>

        <div className="mb-14" style={{ display: 'none' }}>
          <div className="flex justify-between">
            <h1 className="lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-10/12">
              Explore Career Paths
            </h1>
            <a
              href="javascript:void(0)"
              className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
            >
              See More{' '}
            </a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-1 gap-6 ecp-box">
            <div
              style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
              className="ecp-box-1 relative bg-white  rounded-3xl xl:pt-20 xl:pb-20 lg:pt-20 lg:pb-20 sm:pt-14 sm:pb-14 md:pb-14 md:pt-14 flex items-center overflow-hidden"
            >
              <div className="flex w-full h-full items-center justify-between">
                <div className=" lg:pl-8 sm:pl-4 md:pl-4 pr-4 w-full flex h-full flex-col justify-center">
                  <div>
                    <div className="text-right absolute right-8 top-8 md:right-4 md:top-4 sm:right-6 sm:top-6">
                      <svg
                        width="26"
                        height="34"
                        className="ml-auto mr-0 md:w-5 sm:w-5 absolute right-3"
                        viewBox="0 0 26 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1432_20521)">
                          <path
                            d="M0.5 33.1386V3.18823C0.5 1.71305 1.722 0.500732 3.25 0.500732H22.75C24.278 0.500732 25.5 1.71305 25.5 3.18823V33.1386L13.2483 26.1292L13 25.9872L12.7517 26.1292L0.5 33.1386Z"
                            stroke="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1432_20521">
                            <rect
                              width="26"
                              height="34"
                              fill="white"
                              transform="translate(0 0.000732422)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h1 className="lg:text-4xl md:text-2xl sm:text-2xl sm:mb-2 font-medium text-center mb-6 md:mb-2">
                      UX Designer
                    </h1>
                    <a
                      href="#"
                      className="font-normal text-2xl md:text-xl sm:text-xl text-gray-500 block text-center"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
              className="ecp-box-2 relative bg-white  rounded-3xl xl:pt-20 xl:pb-20 lg:pt-20 lg:pb-20 sm:pt-14 sm:pb-14 md:pb-14 md:pt-14 flex items-center overflow-hidden"
            >
              <div className="flex w-full h-full items-center justify-between">
                <div className=" lg:pl-8 sm:pl-4 md:pl-4 pr-4 w-full flex h-full flex-col justify-center">
                  <div>
                    <div className="text-right absolute right-8 top-8 md:right-4 md:top-4 sm:right-6 sm:top-6">
                      <svg
                        width="26"
                        height="34"
                        className="ml-auto mr-0 md:w-5 sm:w-5 absolute right-3"
                        viewBox="0 0 26 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1432_20521)">
                          <path
                            d="M0.5 33.1386V3.18823C0.5 1.71305 1.722 0.500732 3.25 0.500732H22.75C24.278 0.500732 25.5 1.71305 25.5 3.18823V33.1386L13.2483 26.1292L13 25.9872L12.7517 26.1292L0.5 33.1386Z"
                            stroke="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1432_20521">
                            <rect
                              width="26"
                              height="34"
                              fill="white"
                              transform="translate(0 0.000732422)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h1 className="lg:text-4xl md:text-2xl sm:text-2xl sm:mb-2 font-medium text-center mb-6 md:mb-2">
                      UX Designer
                    </h1>
                    <a
                      href="#"
                      className="font-normal text-2xl md:text-xl sm:text-xl text-gray-500 block text-center"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
              className="ecp-box-3 relative bg-white  rounded-3xl xl:pt-20 xl:pb-20 lg:pt-20 lg:pb-20 sm:pt-14 sm:pb-14 md:pb-14 md:pt-14 flex items-center overflow-hidden"
            >
              <div className="flex w-full h-full items-center justify-between">
                <div className=" lg:pl-8 sm:pl-4 md:pl-4 pr-4 w-full flex h-full flex-col justify-center">
                  <div>
                    <div className="text-right absolute right-8 top-8 md:right-4 md:top-4 sm:right-6 sm:top-6">
                      <svg
                        width="26"
                        height="34"
                        className="ml-auto mr-0 md:w-5 sm:w-5 absolute right-3"
                        viewBox="0 0 26 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1432_20521)">
                          <path
                            d="M0.5 33.1386V3.18823C0.5 1.71305 1.722 0.500732 3.25 0.500732H22.75C24.278 0.500732 25.5 1.71305 25.5 3.18823V33.1386L13.2483 26.1292L13 25.9872L12.7517 26.1292L0.5 33.1386Z"
                            stroke="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1432_20521">
                            <rect
                              width="26"
                              height="34"
                              fill="white"
                              transform="translate(0 0.000732422)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h1 className="lg:text-4xl md:text-2xl sm:text-2xl sm:mb-2 font-medium text-center mb-6 md:mb-2">
                      UX Designer
                    </h1>
                    <a
                      href="#"
                      className="font-normal text-2xl md:text-xl sm:text-xl text-gray-500 block text-center"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  jobs: state.jobs,
})

export default connect(mapStateToProps, jobActions)(Jobs)
