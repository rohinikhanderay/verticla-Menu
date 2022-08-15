import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/profile'
import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/Footer.js'
import Proslider from '../../components/Profile-slider'
import clickIcon from '../../assets/images/clickIcon.png'
import deleteIcon from '../../assets/images/delete.png'
import exp_1 from '../../assets/images/exp-1.png'
import exp_3 from '../../assets/images/exp-3.png'
import exp_2 from '../../assets/images/exp-2.png'
import Add_img from '../../assets/images/upload_img.png'
import Pro_img from '../../assets/images/de_images.png'
import EdiText from 'react-editext'
import { useDispatch, useSelector } from 'react-redux'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import Autosuggest from 'react-autosuggest'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SkillSection from './skillSection'
import {
  updateUserDetails,
  updateProfile,
  getProfile,
  getInterestImages,
  uploadResume,
  getImages,
  updateResume,
  deleteResume,
  profileJoinchat,
} from '../../store/profile/index'
import { createConversion } from '../../store/chat/index'
import { UPDATE_PROFILE } from '../../store/profile/types'
import { combineReducers } from 'redux'
import { useForm } from 'react-hook-form'
import { editJob } from '../../store/job'
import { isElement } from 'react-dom/test-utils'
import { useHistory } from 'react-router-dom'
const Profile = ({ match, viewProfile, profile }) => {
  const [modal, setModal] = useState(false)
  const [myStoryModel, setMyStoryModel] = useState(false)
  const [myStorySkill, setMyStorySkill] = useState([])
  const [myStoryTitle, setMyStoryTitle] = useState()
  const [myStoryImage, setMyStoryImage] = useState()
  const [intrestModel, setIntrestModel] = useState(false)
  const [titleValid, setTitleValid] = useState(false)
  const [myIntrestImage, setMyIntrestImage] = useState()
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [publicProfile, setPublicProfile] = useState(false)
  const [options, setOptions] = useState()
  const [defalutJob, setDefalutJob] = useState()
  const [editJob, setEditJob] = useState(false)
  const [jobModelIndex, setJobModelIndex] = useState()
  const [activityModelIndex, setActivityModelIndex] = useState()
  const [isSelect, setIsSelect] = useState(0)
  const [activityModelType, setActivityModelType] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm()
  const history = useHistory()
  const onSubmit = (data) => {
    let sendData = [...profileData?.selectedProfile?.experience]
    if (editJob) {
      sendData[jobModelIndex] = {
        title: data?.title,
        company: data?.company,
        location: data?.location,
        from: new Date(fromDate),
        to: new Date(toDate),
      }
      dispatch(
        updateUserDetails({
          role: profileData?.selectedProfile?.userRef.role,
          experience: sendData,
        }),
      )
    } else {
      sendData.push({
        title: data?.title,
        company: data?.company || '',
        location: data?.location || '',
        from: new Date(fromDate) || new Date(),
        to: new Date(toDate) || new Date(),
      })
      dispatch(
        updateUserDetails({
          role: profileData?.selectedProfile?.userRef.role,
          experience: sendData,
        }),
      )
    }
    reset()
    setTimeout(() => {
      viewProfile(match.params.id)
    }, 1000)
    modelClose()
    setEditJob(false)
  }
  useEffect(() => {}, [])
  const dev = () => {
    dispatch(
      profileJoinchat({
        jobSeek: {
          id: profileData?.selectedProfile?._id,
          email: profileData?.selectedProfile?.userRef.email,
        },
        jobReq: {
          id: profileData?.profile?._id,
          email: profileData?.profile?.userRef.email,
        },
      }),
    ).then((res) => {
      if (res?.data) {
        console.log(res?.data?.roomId)
        history.push(`/conversations/${res?.data?.roomId}`)
      }
    })
  }
  // useEffect(()=>{
  //   console.log( profileData)
  //   console.log(publicProfile)
  // },[profileData])

  useEffect(() => {
    const field = ['title', 'location', 'company', 'from', 'to']
    if (editJob) {
      field.forEach((f) => {
        setValue(f, defalutJob[f])
      })
    } else {
      field.forEach((f) => {
        setValue(f, '')
      })
    }
  }, [defalutJob])

  const updateActivity = (ix) => {
    setMyStoryModel(true)
    setActivityModelIndex(ix)

    setActivityModelType(true)
    let sendData = [...profileData?.selectedProfile?.myStory?.activities]
    let objData = sendData.filter((i, index) => {
      return index === ix
    })
    console.log(objData)
    setMyStoryTitle(objData[0].title)
    setMyStorySkill(objData[0].skills)
    setMyStoryImage(objData[0].image)
    let a = profileData?.librearyImages?.findIndex(
      (x) => x.fullUrl === objData[0].image?.fullUrl,
    )
    setIsSelect(a)
  }

  const openModelUpdate = (ix) => {
    setEditJob(true)
    let sendData = [...profileData?.selectedProfile?.experience]
    let objData = sendData.filter((i, index) => {
      return index === ix
    })
    setFromDate(new Date(objData[0]?.from))
    setToDate(new Date(objData[0]?.to))

    setDefalutJob({
      title: objData[0]?.title,
      company: objData[0]?.company,
      location: objData[0]?.location,
      from: new Date(fromDate),
      to: new Date(toDate),
      ///  ix: ix,
    })
    setModal(true)
  }

  const updateResumes = async (e) => {
    if (e.target.files.length !== 0) {
      const res = await dispatch(updateResume(e.target.files))

      if (res?.success) {
        toast.success('successfully uploaded')
        viewProfile(match.params.id)
      } else {
        toast.error(res?.data?.error)
      }
    }
  }
  useEffect(() => {
    dispatch(getImages({ containerName: 'imagegallery' }))
    dispatch(getInterestImages({ containerName: 'interestimages' }))
  }, [])

  const profileData = useSelector((state) => state.profile)

  useEffect(() => {
    // localStorage.getItem("token") != null &&
    // profileData &&
    // profileData?.profile?.type == profileData?.selectedProfile?.userRef.role
    //   ? setPublicProfile(false)
    //   : setPublicProfile(true);

    if (profileData?.profile) {
      console.log(profileData?.profile?.type == 'jobSeeker')
      localStorage.getItem('token') != null &&
      profileData &&
      profileData?.profile?.type == 'jobSeeker'
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
              <img src={item.fullUrl} />
              <p>{item.fileName}</p>
            </div>
          ),
          value: item,
        }
      })
      setOptions(data)
    }
  }, [profileData])

  const removeActivity = (ix) => {
    let sendData = [...profileData?.selectedProfile?.myStory?.activities]
    let sendData2 = sendData.filter((t, index) => {
      return index !== ix
    })

    dispatch(
      updateUserDetails({
        myStory: {
          header: profileData?.selectedProfile?.myStory?.header,
          summary: profileData?.selectedProfile?.myStory?.summary,
          activities: sendData2,
        },
        role: profileData?.selectedProfile?.userRef.role,
      }),
    )
    setTimeout(() => {
      viewProfile(match.params.id)
    }, 1000)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    viewProfile(match.params.id)
  }, [viewProfile, match])

  const modelClose = () => {
    setModal(false)
    setEditJob(false)
  }
  const modelOpen = () => {
    setModal(true)
  }

  const modelIntrestClose = () => {
    setIntrestModel(false)
  }
  const modelIntrestOpen = () => {
    setIntrestModel(true)
  }

  const myStoryModelClose = () => {
    setTitleValid(false)
    setMyStoryModel(false)
    setIsSelect(0)
    setActivityModelType(false)
  }
  const myStoryModelOpen = () => {
    setMyStoryImage()
    setMyStorySkill([])
    setMyStoryTitle('')
    setMyStoryModel(true)
  }
  const states = () => {
    const a =
      profileData?.selectedProfile &&
      profileData?.selectedProfile?.skills?.map((item) => {
        return { name: item }
      })

    return a != null ? a : []
  }

  const intrestSave = () => {
    let sendData = [...profileData?.selectedProfile?.interests]
    sendData.push(
      !myIntrestImage ? profileData?.interestImages[0] : myIntrestImage,
    )

    dispatch(
      updateUserDetails({
        interests: sendData,
        role: profileData?.selectedProfile?.userRef.role,
      }),
    )
    setTimeout(() => {
      modelIntrestClose()

      viewProfile(match.params.id)
    }, 1000)
  }
  const removeIntrest = (i) => {
    let a = profileData?.selectedProfile?.interests.filter((x, index) => {
      return index != i
    })
    dispatch(
      updateUserDetails({
        interests: a,
        role: profileData?.selectedProfile?.userRef.role,
      }),
    )
    setTimeout(() => {
      viewProfile(match.params.id)
    }, 2000)
  }
  const mySortySave = () => {
    let sendData = [...profileData?.selectedProfile?.myStory.activities]
    if (!activityModelType) {
      let sendObj = {
        title: myStoryTitle,
        image: myStoryImage,
        skills: myStorySkill,
      }

      sendData.push(sendObj)
      var a = []
      const newSkills = sendData.map((item) => {
        item.skills.map((s) => {
          return a.push(s)
        })
      })
      a.push(...profileData?.selectedProfile?.skills)
    } else {
      var a = [...myStorySkill]
      a.push(...profileData?.selectedProfile?.skills)

      sendData[activityModelIndex] = {
        title: myStoryTitle,
        image: myStoryImage,
        skills: myStorySkill,
      }
    }

    if (myStoryTitle) {
      dispatch(
        updateUserDetails({
          myStory: {
            header: profileData && profileData.selectedProfile?.myStory?.header,
            summary:
              profileData && profileData.selectedProfile?.myStory?.summary,
            activities: sendData,
          },
          role: profileData?.selectedProfile?.userRef.role,
          skills: [...new Set(a)],
        }),
      )
      setTimeout(() => {
        viewProfile(match.params.id)
        myStoryModelClose()
        setMyStoryImage()
        setMyStorySkill([])
        setMyStoryTitle('')
      }, 1000)
    } else {
      setTitleValid(true)
    }
  }
  const nameData = (cb) => {
    let names = cb.split(' ')

    dispatch(updateUserDetails({ firstName: names[0], lastName: names[1] }))
  }

  const locationData = (cb) => {
    dispatch(
      updateUserDetails({
        streetAddress: cb,
        role: profileData?.selectedProfile?.userRef.role,
      }),
    )
  }

  const jobTitleData = (cb) => {
    dispatch(
      updateUserDetails({
        jobTitle: cb,
        role: profileData?.selectedProfile?.userRef.role,
      }),
    )
  }
  const removeJob = (ix) => {
    let sendData = [...profileData?.selectedProfile?.experience]
    let sendData2 = sendData.filter((t, index) => {
      return index !== ix
    })
    dispatch(
      updateUserDetails({
        role: profileData?.selectedProfile?.userRef.role,
        experience: sendData2,
      }),
    )
    setTimeout(() => {
      viewProfile(match.params.id)
    }, 1000)
  }
  const myStoryUpdate = (cb) => {
    dispatch(updateUserDetails(cb)).then(() => {
      viewProfile(match.params.id)
    })
  }
  const profileChange = async (e) => {
    //  console.log(e.target.files);
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('pid', match.params.id)

    if (e.target.files.length !== 0) {
      // dispatch(updateProfile(data));
      // setTimeout(() => {
      //   viewProfile(match.params.id);
      // }, 2000);
      const res = await dispatch(updateProfile(data))

      if (res?.success) {
        setTimeout(() => {
          toast.success('successfully uploaded')
          viewProfile(match.params.id)
          console.log('call---')
        }, 2000)
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
        viewProfile(match.params.id)
      } else {
        toast.error(res?.data?.error)
      }
    }
  }

  const autocompleteRenderInput = ({ addTag, ...props }) => {
    const handleOnChange = (e, { newValue, method }) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        props.onChange(e)
      }
    }

    const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
    const inputLength = inputValue.length

    let suggestions = states().filter((state) => {
      return state.name.toLowerCase().slice(0, inputLength) === inputValue
    })

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestions}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
        inputProps={{ ...props, onChange: handleOnChange }}
        onSuggestionSelected={(e, { suggestion }) => {
          addTag(suggestion.name)
        }}
        onSuggestionsClearRequested={() => {}}
        onSuggestionsFetchRequested={() => {}}
      />
    )
  }

  const renderEducation = () => {
    const results = []

    profileData?.selectedProfile?.education.forEach((edu, index) => {
      results.push(
        <div
          key={index}
          className="flex items-center justify-between px-10 py-8 border-t border-gray-300"
        >
          <p className="w-1/2 text-lg text-gray-700 md:text-3xl">
            {new Date(edu.from).getFullYear()}-
            {edu.to ? new Date(edu.to).getFullYear() : 'Present'}
          </p>
          <div className="w-1/2">
            <p className="font-bold text-gray-800">
              {edu.schoolOrOrganization}
            </p>
            <p className="mt-1 text-gray-600">{edu.fieldOfStudy}</p>
          </div>
        </div>,
      )
    })
    return results
  }

  return (
    <div>
      <div
        className="flex justify-center h-screen items-center bg-opacity-50 bg-black antialiased fixed top-0  w-full"
        style={{ zIndex: '9999', display: modal ? 'block' : 'none' }}
      >
        <div
          className="flex flex-col absolute top-2/4	right-0 left-0 w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg shadow-xl"
          style={{ transform: 'translateY(-50%)' }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row bg-teal-600 text-white justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
              <p className="font-semibold text-white">
                {editJob ? 'Edit' : 'Add'} Experience
              </p>
              <svg
                onClick={() => {
                  modelClose()
                }}
                className="w-6 h-6 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="p-5 bg-gray-50">
              <div className="flex flex-col px-6 pb-4">
                <p className="mb-2 font-semibold text-gray-700">Job title</p>
                <input
                  type="text"
                  {...register('title', { required: true })}
                  name="title"
                  className="  p-3
            
              bg-white
              border
              border-gray-200
              rounded
              shadow-sm
            "
                ></input>
                {errors?.title && (
                  <span className="text-red-500 text-sm mt-0.5">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col px-6 pb-4">
                <p className="mb-2 font-semibold text-gray-700">Company name</p>
                <input
                  type="text"
                  className="  p-3
             
              bg-white
              border
              border-gray-200
              rounded
              shadow-sm
            "
                  {...register('company', { required: true })}
                  name="company"
                ></input>
                {errors.company && (
                  <span className="text-red-500 text-sm mt-0.5">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col px-6 pb-4">
                <p className="mb-2 font-semibold text-gray-700">Location</p>
                <input
                  type="text"
                  className="  p-3
            
              bg-white
              border
              border-gray-200
              rounded
              shadow-sm
            "
                  {...register('location', { required: true })}
                  name="location"
                ></input>
                {errors.location && (
                  <span className="text-red-500 text-sm mt-0.5">
                    This field is required
                  </span>
                )}
              </div>

              <div className="flex flex-wrap px-6 pb-4 -mx-4">
                <div className="w-6/12 px-4">
                  <p className="mb-2 font-semibold text-gray-700">From</p>
                  <DatePicker
                    selected={fromDate}
                    maxDate={new Date()}
                    onChange={(date) => {
                      setFromDate(new Date(date))
                    }}
                    value={defalutJob?.from}
                    name="fromDate"
                    className="block w-full px-4 py-3 border-gray-300 rounded shadow-sm focus:ring-teal-600 focus:border-teal-600 sm:text-sm"
                  />
                </div>
                <div className="w-6/12 px-4">
                  <p className="mb-2 font-semibold text-gray-700">To</p>
                  <DatePicker
                    selected={toDate}
                    maxDate={new Date()}
                    onChange={(date) => {
                      setToDate(new Date(date))
                    }}
                    value={defalutJob?.to}
                    name="toDate"
                    className="block w-full px-4 py-3 border-gray-300 rounded shadow-sm focus:ring-teal-600 focus:border-teal-600 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
              <button
                onClick={() => {
                  modelClose()
                }}
                type="button"
                className="px-4 py-2 text-white font-semibold bg-red-500	rounded"
              >
                Cancel
              </button>
              <button
                //  onClick={expDataSave}
                type="submit"
                className="px-4 py-2 text-white font-semibold bg-teal-600 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className="flex justify-center h-screen items-center bg-opacity-50 bg-black antialiased fixed top-0  w-full"
        style={{ zIndex: '9999', display: myStoryModel ? 'block' : 'none' }}
      >
        <div
          className="flex flex-col absolute top-2/4	right-0 left-0 w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg shadow-xl"
          style={{ transform: 'translateY(-50%)' }}
        >
          <div className="flex flex-row bg-teal-600 text-white justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
            <p className="font-semibold text-white">
              {activityModelType ? 'Edit' : 'Add'} story
            </p>
            <svg
              onClick={myStoryModelClose}
              style={{ cursor: 'pointer' }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="p-5 bg-gray-50">
            <div className="flex flex-col px-6 pb-4">
              <p className="mb-2 font-semibold text-gray-700">Job title</p>
              <input
                type="text"
                name="title"
                className="  p-3
            
              bg-white
              border
              border-gray-200
              rounded
              shadow-sm
            "
                style={{ border: titleValid ? '1px solid red' : '' }}
                value={myStoryTitle}
                onChange={(e) => {
                  setMyStoryTitle(e.target.value)
                }}
              ></input>
            </div>
            <div className="flex flex-col px-6 pb-4">
              <p className="mb-2 font-semibold text-gray-700">Skills</p>
              <TagsInput
                value={myStorySkill}
                onChange={(tags) => {
                  setMyStorySkill(tags)
                }}
                renderInput={autocompleteRenderInput}
                maxTags={3}
                onlyUnique={true}
                inputProps={{ placeholder: 'Add Skill' }}
                //  disabled={myStorySkill.length == 3 ? true : false}
              />
            </div>
            <div className="flex flex-col px-6 pb-4">
              <p className="mb-2 font-semibold text-gray-700">Image</p>
              <div style={{ overflowY: 'scroll', height: '360px' }}>
                <div className="interest-imgbox grid grid-cols-3 sm:grid-cols-1 gap-4">
                  {profileData &&
                    profileData?.librearyImages.map((item, index) => {
                      return (
                        <div className="">
                          <div
                            className={`interest-img border relative ${
                              index === isSelect ? 'selected' : ''
                            }`}
                            onClick={() => {
                              setIsSelect(index)

                              setMyStoryImage(item)
                            }}
                          >
                            <img
                              className=" object-contain p-2.5"
                              src={item.fullUrl}
                            />
                            <div class="checked">
                              <div
                                class="icon"
                                style={{ background: `url(${clickIcon})` }}
                              ></div>
                            </div>
                          </div>
                          {/* <div className="text-center mt-1">
                            {item.fileName}
                          </div> */}
                        </div>
                      )
                    })}
                </div>
                {/* <ImagePicker
                  selected={1}
                  images={
                    profileData &&
                    profileData?.librearyImages.map((image, i) => ({
                      src: image.fullUrl,
                      value: image.blobName,
                    }))
                  }
                  className="image_picker"
                  onPick={(image) => {
                    setMyStoryImage(image);
                  }}
                /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
            <button
              onClick={myStoryModelClose}
              className="px-4 py-2 text-white font-semibold bg-red-500	rounded"
            >
              Cancel
            </button>
            <button
              onClick={mySortySave}
              className="px-4 py-2 text-white font-semibold bg-teal-600 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div
        className="flex justify-center h-screen items-center bg-opacity-50 bg-black antialiased fixed top-0  w-full"
        style={{ zIndex: '9999', display: intrestModel ? 'block' : 'none' }}
      >
        <div
          className="flex flex-col absolute top-2/4	right-0 left-0 w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg shadow-xl"
          style={{ transform: 'translateY(-50%)' }}
        >
          <div className="flex flex-row bg-teal-600 text-white justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
            <p className="font-semibold text-white">Add Interest</p>
            <svg
              onClick={modelIntrestClose}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="p-5 bg-gray-50">
            <div className="flex flex-col px-6 pb-4">
              <p className="mb-2 font-semibold text-gray-700">Image</p>
              <div style={{ overflowY: 'scroll', height: '360px' }}>
                {/* <ImagePicker
                  images={
                    profileData &&
                    profileData?.interestImages.map((image, i) => ({
                      src: image.fullUrl,
                      value: image,
                      text: "vcxv",
                    }))
                  }
                  className="image_picker"
                  onPick={(image) => {
                    setMyIntrestImage(image);
                  }}
                /> */}
                <div className="interest-imgbox grid grid-cols-3 sm:grid-cols-1 gap-4">
                  {profileData &&
                    profileData?.interestImages.map((item, index) => {
                      return (
                        <div className="">
                          <div
                            className={`interest-img border relative ${
                              index === isSelect ? 'selected' : ''
                            }`}
                            onClick={() => {
                              setIsSelect(index)

                              setMyIntrestImage(item)
                            }}
                          >
                            <img
                              className=" object-contain p-2.5"
                              src={item.fullUrl}
                            />
                            <div class="checked">
                              <div
                                class="icon"
                                style={{ background: `url(${clickIcon})` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-center mt-1">
                            {item.fileName}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
            <button
              onClick={modelIntrestClose}
              className="px-4 py-2 text-white font-semibold bg-red-500	rounded"
            >
              Cancel
            </button>
            <button
              onClick={intrestSave}
              className="px-4 py-2 text-white font-semibold bg-teal-600 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div>
        <Navbar />
        <ToastContainer />
        <div className="main-pro relative">
          <div
            className="back-pro absolute top-0 left-0 right-0 bg-white"
            style={{
              // background:
              //   "linear-gradient(180deg, #11ADB6 0%, rgba(66, 168, 207, 0.42) 68.23%, rgba(66, 168, 207, 0) 100%)",
              height: '1762px',
            }}
          >
            {' '}
          </div>
          <div className="container pro-main-text relative m-auto pt-10 pr-3.5 pl-3.5	">
            <div className="pro-menu text-right">
              <ul>
                <li class="inline-block pr-20" style={{ display: 'none' }}>
                  <a href="#" className="text-base text-black active">
                    Career Journey
                  </a>
                </li>
                <li class="inline-block">
                  <a
                    href="javascript:void(0)"
                    className="text-base text-black"
                    onClick={() => {
                      setPublicProfile(true)
                    }}
                    style={{
                      display:
                        profileData && profileData?.profile?.type == 'jobSeeker'
                          ? 'flex'
                          : 'none',
                    }}
                  >
                    Public Profile
                  </a>
                </li>
              </ul>
            </div>

            <div className="pro-detail-box bg-teal-50 p-6 shadow-lg rounded-3xl md:mt-16  mt-16 sm:mt-32 xs:mt-15">
              <div
                className="pro-img  md:h-44 md:w-44 h-44 w-44 sm:h-28 sm:w-28 flex relative bg-gray-300 rounded-full	m-auto -mt-32 sm:-mt-24"
                style={{
                  backgroundImage: `url(${
                    profileData?.selectedProfile?.profileImg &&
                    profileData?.selectedProfile?.profileImg[0]?.fullUrl
                      ? profileData?.selectedProfile?.profileImg[0]?.fullUrl
                      : Pro_img
                  })`,
                  backgroundPosition: 'center',
                  backgroundSize: '11rem',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="file-input"
                  className="file-input absolute w-px h-px overflow-hidden	opacity-0	z-0	"
                  onChange={profileChange}
                />
                <label
                  className="file-label m-0 cursor-pointer absolute right-3 w-10	h-10 bottom-0 text-center flex items-center rounded-full justify-center"
                  for="file-input"
                  style={{
                    display: publicProfile ? 'none' : 'flex',
                    backgroundColor: 'rgb(240 253 250)',
                  }}
                >
                  <img src={Add_img} className="sm:w-8" width="23px"></img>
                </label>
              </div>
              <div className="sub-box-pro text-center mt-4">
                <div className="head flex justify-center items-center">
                  <h1 className="inline-block font-semibold  text-3xl xs:text-2xl pl-2 pr-2">
                    <EdiText
                      hideIcons={publicProfile}
                      className="edit-btn"
                      type="text"
                      onSave={nameData}
                      value={
                        profileData?.selectedProfile?.firstName +
                        ' ' +
                        profileData?.selectedProfile?.lastName
                      }
                    />
                  </h1>{' '}
                </div>
                <h6 className="text-2xl xs:text-xl">
                  {profileData?.selectedProfile?.careerPath}
                </h6>
                <p className="flex justify-center mt-3 text-sm">
                  {' '}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 30 30"
                      width="30"
                      height="30"
                      fill="teal"
                    >
                      <path d="M22 9v1.528c-.476.69-3.815 1.971-9.77 1.971-6.239 0-9.736-1.358-10.23-2.088v-1.411h20zm2-2h-24v3.491c0 2.657 6.154 4.009 12.23 4.009 5.922 0 11.77-1.284 11.77-3.895v-3.605zm-2 8.074v4.926h-20v-5.001c-.823-.337-1.478-.711-2-1.096v8.097h24v-7.949c-.583.402-1.262.741-2 1.023zm-8 1.958c0 1.087-.896 1.968-2 1.968s-2-.881-2-1.968v-1.032h4v1.032zm-5-15.032c-1.104 0-2 .896-2 2v2h2v-1.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6z" />
                    </svg>
                  </span>{' '}
                  <EdiText
                    hideIcons={publicProfile}
                    className="edit-btn"
                    type="text"
                    onSave={jobTitleData}
                    value={profileData.selectedProfile?.jobTitle || 'Job title'}
                  />
                </p>
                <p className="flex justify-center mt-3 text-sm">
                  {' '}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 30 30"
                      width="30"
                      height="30"
                      stroke="currentColor"
                      class=" text-teal-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>{' '}
                  <EdiText
                    hideIcons={publicProfile}
                    className="edit-btn"
                    type="text"
                    onSave={locationData}
                    value={profileData.selectedProfile?.streetAddress}
                  />
                </p>
                <div className="btn-sec-pro mt-4 flex justify-center xs:block">
                  {/* <button
                    onClick={dev}
                    style={{
                      display:
                        profileData && profileData?.profile?.type == 'recruiter'
                          ? 'block'
                          : 'none',
                    }}
                    
                    className="btn pl-28 pr-28 sm:pl-16 sm:pr-16 pt-5 pb-5 sm:pt-3 sm:pb-3 xs:pl-0 xs:pr-0 bg-teal-600 text-white 
                    rounded-xl text-base	font-medium md:mr-16 mr-16 sm:mr-5  xs:w-full sm:mb-5 md:w-auto md:mb-0"
                  >
                    Contact
                  </button> */}
                  <span className="relative sm:block inline-block hov-tab  pt-0">
                    <div
                      className="absolute flex -top-10 right-0 mb-3 w-auto  rounded-xl p-3 bg-white new-sec-btn hidden"
                      style={{ boxShadow: 'rgb(0 0 0 / 25%) 0px 4px 12px' }}
                    >
                      <label
                        className="label mr-3 p-2 pr-3 text-white pl-3 bg-teal-600 rounded-md cursor-pointer	"
                        for="file-input-3"
                        style={{ display: publicProfile ? 'none' : 'block' }}
                      >
                        {' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#fff"
                          className="text-base"
                        >
                          <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" />
                        </svg>
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#fff"
                          className="text-base"
                          style={{
                            cursor:
                              profileData.selectedProfile?.resume &&
                              profileData.selectedProfile?.resume[0]
                                ? 'pointer'
                                : 'not-allowed',
                          }}
                        >
                          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                        </svg>
                      </a>
                      <button
                        style={{ display: publicProfile ? 'none' : 'block' }}
                        onClick={deleteResumeCall}
                        className="mr-0 p-2 pr-3 text-white pl-3 bg-teal-600 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="2+"
                          viewBox="0 0 24 24"
                          fill="#fff"
                          className="text-base"
                          style={{
                            cursor:
                              profileData.selectedProfile?.resume &&
                              profileData.selectedProfile?.resume[0]
                                ? 'pointer'
                                : 'not-allowed',
                          }}
                        >
                          <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                        </svg>
                      </button>
                    </div>
                    <button className="btn px-24 sm:px-16 py-4 sm:pt-3 sm:pb-3 xs:pl-0 xs:pr-0 bg-teal-600 text-white rounded-xl text-lg		font-medium sm:mr-0 sm:w-full sm:mb-5 md:w-auto md:mb-0">
                      Resume
                    </button>
                  </span>
                  {/* <label
                    className="label mr-16 sm:mr-0 pl-10 pr-10 pt-5 pb-5 inline-block sm:pt-3 sm:pb-3 xs:pl-0 xs:pr-0 text-gray-500 rounded-xl text-base border-solid border-gray-500  border sm:w-full md:w-auto sm:mb-5 md:mb-0 font-medium"
                    for="file-input-3"
                  >
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input-3"
                    className="file-input-3 absolute w-px h-px overflow-hidden	opacity-0	z-0	"
                    onChange={updateResumes}
                  />
                  <a
                    href={profileData.selectedProfile?.resume[0]?.fullUrl}
                    download={profileData.selectedProfile?.resume[0]?.fileName}
                    target="_blank"
                  >
                    <button className="btn pl-10 pr-10 pt-5 sm:pt-3 pb-5 sm:pb-3 xs:pl-0 xs:pr-0 text-gray-500 rounded-xl text-base border-solid border-gray-500  border sm:w-full md:w-auto md:mb-0 font-medium">
                      Preview Resume
                    </button>
                  </a> */}
                </div>
              </div>
            </div>
            <div
              className="proslider mt-5 -ml-3 -mr-3"
              style={{ display: 'none' }}
            >
              <Proslider
                data={profileData && profileData.selectedProfile?.projectImg}
                id={match.params.id}
                val={publicProfile}
              />{' '}
            </div>
            <div className="mystory-sec mt-16">
              <h1 className="font-semibold text-4xl sm:text-3xl xs:text-2xl xs:mb-5 mb-8">
                My Story
              </h1>
              <div
                className="mystory-box p-5 pl-16 pr-16 sm:pl-5 sm:pr-5 rounded-2xl mb-10"
                style={{ backgroundColor: '#F8F4E3' }}
              >
                <h2 className="font-normal flex justify-between items-center text-4xl sm:text-2xl xs:text-xl mb-5">
                  <EdiText
                    hideIcons={publicProfile}
                    type="text"
                    value={
                      profileData &&
                      profileData.selectedProfile?.myStory?.header
                        ? profileData.selectedProfile?.myStory?.header
                        : 'Give your Story a Headline'
                    }
                    onSave={(e) => {
                      myStoryUpdate({
                        myStory: {
                          header: e,
                          activities:
                            profileData &&
                            profileData.selectedProfile?.myStory?.activities,
                          summary:
                            profileData &&
                            profileData.selectedProfile?.myStory?.summary,
                        },
                        role: 'jobSeeker',
                      })
                    }}
                  />

                  {/* <span>
                    <svg
                      width="28"
                      height="30"
                      viewBox="0 0 28 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.9044 4.78886L23.1399 9.98687C23.3183 10.2059 23.3183 10.5631 23.1399 10.7821L12.8847 23.368L8.52719 23.9616C7.94494 24.0422 7.4519 23.4372 7.51764 22.7226L8.00128 17.3747L18.2565 4.78886C18.4349 4.56987 18.726 4.56987 18.9044 4.78886ZM26.5113 3.46918L24.2199 0.656955C23.5061 -0.218985 22.3463 -0.218985 21.6279 0.656955L19.9656 2.69697C19.7872 2.91596 19.7872 3.27325 19.9656 3.49223L24.2011 8.69024C24.3795 8.90923 24.6706 8.90923 24.8491 8.69024L26.5113 6.65023C27.225 5.76852 27.225 4.34512 26.5113 3.46918ZM18.0311 19.9449V25.8114H3.00518V7.37057H13.7956C13.9459 7.37057 14.0868 7.29566 14.1948 7.16888L16.073 4.86377C16.4299 4.4258 16.1763 3.6824 15.6739 3.6824H2.25388C1.00955 3.6824 0 4.9214 0 6.44853V26.7335C0 28.2606 1.00955 29.4996 2.25388 29.4996H18.7824C20.0267 29.4996 21.0362 28.2606 21.0362 26.7335V17.6398C21.0362 17.0232 20.4305 16.7178 20.0736 17.15L18.1954 19.4551C18.0921 19.5876 18.0311 19.7605 18.0311 19.9449Z"
                        fill="#7F7F81"
                      />
                    </svg>
                  </span> */}
                </h2>
                <p className="text-lg text-gray-500">
                  <EdiText
                    hideIcons={publicProfile}
                    type="text"
                    value={
                      profileData &&
                      profileData.selectedProfile?.myStory?.summary
                        ? profileData.selectedProfile?.myStory?.summary
                        : 'Give a summary of your story Add a moment or job that highlights your skills to your story'
                    }
                    onSave={(e) => {
                      myStoryUpdate({
                        myStory: {
                          summary: e,
                          header:
                            profileData &&
                            profileData.selectedProfile?.myStory?.header,
                          activities:
                            profileData &&
                            profileData.selectedProfile?.myStory?.activities,
                        },
                        role: 'jobSeeker',
                      })
                    }}
                  />
                </p>
                <div className="skill-box relative mt-14">
                  <div className="bor border border-dashed border-dashed border-gray-300 w-8/12 m-auto absolute right-0 left-0 top-50% top-24  lg:block md:hidden sm:hidden"></div>
                  <div className="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 relative w-11/12 m-auto">
                    {profileData &&
                      profileData.selectedProfile?.myStory?.activities.map(
                        (item, index) => {
                          return (
                            <div className="text-center  xl:pl-5 xl:pr-5 md:pl-0 lg:pr-0 mb-4 relative">
                              <div
                                className="icons-sec icon-11"
                                style={{
                                  display: publicProfile ? 'none' : 'flex',
                                }}
                              >
                                <span className="pr-3">
                                  <svg
                                    onClick={() => updateActivity(index)}
                                    style={{ cursor: 'pointer' }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="#2e9488"
                                    class="text-base"
                                  >
                                    <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"></path>
                                  </svg>
                                </span>
                                <span>
                                  <svg
                                    onClick={() => removeActivity(index)}
                                    style={{ cursor: 'pointer' }}
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
                                  </svg>
                                </span>
                              </div>
                              <h1 className="text-xl font-semibold mb-2">
                                {item.title}
                              </h1>
                              <div className="skill-box-img overflow-hidden	 w-36 h-28 bg-white flex m-auto items-center justify-center border-2 rounded-xl border-solid  border-border_red p-1 mb-7">
                                {' '}
                                <img src={item.image?.fullUrl}></img>
                              </div>
                              {item.skills.map((items) => {
                                return (
                                  <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                                    {items}
                                  </div>
                                )
                              })}
                              {/* <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                                Composition
                              </div>
                              <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                                Visual Design
                              </div>
                              <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                                Growth Mindset
                              </div> */}
                            </div>
                          )
                        },
                      )}

                    {profileData &&
                    profileData.selectedProfile?.myStory?.activities.length <
                      4 ? (
                      <div
                        className="text-center xl:pl-5 xl:pr-5 md:pl-0 lg:pr-0 mb-4 h-52 sm:h-44"
                        onClick={myStoryModelOpen}
                        style={{ display: publicProfile ? 'none' : 'block' }}
                      >
                        {' '}
                        <div className="bg-white h-full rounded-3xl">
                          <button className="text-7xl text-gray-400 cursor-pointer z-10 w-full h-full">
                            <label class="file-label data1 m-0 cursor-pointer  items-center justify-center flex  text-center block">
                              +
                            </label>
                          </button>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {/* <div className="text-center xl:pl-5 xl:pr-5 md:pl-0 lg:pr-0 mb-4">
                      <h1 className="text-xl font-semibold mb-2">
                        Family Caretaker
                      </h1>
                      <div className="skill-box-ag w-36 h-28 bg-white flex m-auto items-center justify-center border-2 rounded-xl border-solid  border-border_red p-1 mb-7">
                        {" "}
                        <img src={skill_3}></img>
                      </div>
                      <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                        Communication
                      </div>
                      <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                        Project Management
                      </div>
                      <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                        Growth Mindset
                      </div>
                    </div>
                    <div className="text-center xl:pl-5 xl:pr-5 md:pl-0 lg:pr-0 mb-4">
                      <h1 className="text-xl font-semibold mb-2">
                        Event Planner
                      </h1>
                      <div className="skill-box-img w-36 h-28 bg-white flex m-auto items-center justify-center border-2 rounded-xl border-solid  border-border_red p-1 mb-7">
                        {" "}
                        <img src={skill_4}></img>
                      </div>
                      <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                        Communication
                      </div>
                      <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                        Project Management
                      </div>
                      <div className="tag-skill bg-tag_br pt-1 pb-2 leading-8 xl:text-xl lg:text-base	 font-normal mt-3">
                        Growth Mindset
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="skills-sec mb-14">
                {/* {profileData.selectedProfile?.skills.map((item) => {
                    return (
                      <div className="bt-skill pl-6 pr-6 mb-4 sm:pl-4 sm:pr-2">
                        <button
                          className="font-medium text-font_18 border border-black rounded-full flex  justify-center pl-5 pr-5 h-8  bg-white"
                          style={{ fontSize: "18px" }}
                        >
                          + {item}
                        </button>
                      </div>
                    );
                  })} */}
                <SkillSection
                  data={profileData && profileData.selectedProfile?.skills}
                  id={match.params.id}
                  val={publicProfile}
                />
              </div>
              <div className="Experience-sec mb-14">
                <h1 className="font-semibold text-4xl sm:text-3xl xs:text-2xl xs:mb-5 mb-8">
                  Experience
                </h1>
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-4">
                  {/* <div
                    className="exp-box relative bg-white  rounded-3xl xl:pt-11 xl:pb-11 lg:pt-8 lg:pb-8 sm:pt-6 sm:pb-6 md:pb-6 md:pt-6 flex items-center sm:overflow-hidden"
                    style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}
                  >
                    <img
                      src={exp_1}
                      className="exp-img-back  m-auto absolute top-50 left-0 right-0 sm:max-w-xs"
                    ></img>
                    <div className="flex w-full h-full">
                      <div className="exp-text lg:pl-8 sm:pl-4 md:pl-4 pr-4 w-10/12 flex justify-between flex-col">
                        <div>
                          <h1 className="lg:text-2xl md:text-xl font-medium">
                            Marketing Intern
                          </h1>
                          <h5 className="lg:text-2xl md:text-xl font-light">
                            Twitch
                          </h5>
                        </div>
                        <div className="exp-text-bottom mt-5">
                          <p className="font-light text-lg leading-6">
                            Summer 2020
                          </p>
                          <p className="font-light text-lg leading-6">
                            Seattle, Washington
                          </p>
                        </div>
                      </div>
                      <div className="side-arrow w-2/12 text-center flex items-center justify-center">
                        {" "}
                        <span>
                          <svg
                            width="18"
                            height="34"
                            viewBox="0 0 18 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.376879 32.9487C0.257528 32.8296 0.162838 32.6882 0.0982284 32.5325C0.0336208 32.3768 0.000362299 32.2099 0.000362284 32.0413C0.000362269 31.8727 0.0336207 31.7058 0.0982283 31.5501C0.162838 31.3944 0.257528 31.253 0.376879 31.1339L14.8512 16.6622L0.376876 2.19042C0.136228 1.94977 0.00103292 1.62338 0.00103289 1.28305C0.00103286 0.942716 0.136228 0.616327 0.376876 0.375677C0.617526 0.135027 0.943915 -0.00016636 1.28425 -0.00016639C1.62457 -0.00016642 1.95096 0.135026 2.19161 0.375677L17.5707 15.7548C17.6901 15.8739 17.7848 16.0153 17.8494 16.171C17.914 16.3267 17.9473 16.4936 17.9473 16.6622C17.9473 16.8308 17.914 16.9977 17.8494 17.1534C17.7848 17.3091 17.6901 17.4505 17.5707 17.5695L2.19162 32.9487C2.07257 33.068 1.93114 33.1627 1.77544 33.2273C1.61974 33.2919 1.45282 33.3252 1.28425 33.3252C1.11567 33.3252 0.948757 33.2919 0.793056 33.2273C0.637354 33.1627 0.495928 33.068 0.376879 32.9487Z"
                              fill="#979797"
                            />
                          </svg>
                        </span>{" "}
                      </div>
                    </div>
                  </div> */}
                  {profileData.selectedProfile &&
                    profileData.selectedProfile?.experience?.map(
                      (item, index) => {
                        return (
                          <div
                            className="exp-box relative bg-white  rounded-3xl xl:pt-8 xl:pb-8 lg:pt-8 lg:pb-8 sm:pt-6 sm:pb-6 md:pb-6 md:pt-6 flex items-center overflow-hidden"
                            style={{
                              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
                            }}
                          >
                            <div
                              className="icons-sec"
                              style={{
                                display: publicProfile ? 'none' : 'flex',
                              }}
                            >
                              <span className="pr-3">
                                <svg
                                  onClick={() => {
                                    setDefalutJob()
                                    setModal(true)
                                    setJobModelIndex(index)
                                    openModelUpdate(index)
                                  }}
                                  style={{ cursor: 'pointer' }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="#2e9488"
                                  className="text-base"
                                >
                                  <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"></path>
                                </svg>
                              </span>
                              <span>
                                <svg
                                  onClick={() => {
                                    removeJob(index)
                                  }}
                                  style={{ cursor: 'pointer' }}
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
                                </svg>
                              </span>
                            </div>

                            <img
                              src={
                                (index + 1) % 3 === 0
                                  ? exp_1
                                  : (index + 1) % 3 === 1
                                  ? exp_3
                                  : (index + 1) % 3 === 2
                                  ? exp_2
                                  : ''
                              }
                              className="w-4/6 exp-img-back m-auto absolute top-50 left-0 right-0  sm:w-3/6"
                            ></img>
                            <div className="flex w-full h-full">
                              <div className="exp-text lg:pl-8 sm:pl-4 md:pl-4 pr-4 w-10/12 flex justify-between flex-col">
                                <h1 className="lg:text-2xl md:text-xl font-medium">
                                  {item.title}
                                </h1>
                                <h5 className="lg:text-2xl md:text-xl font-light">
                                  {item.company}
                                </h5>
                                <div className="exp-text-bottom mt-5">
                                  <p className="font-light text-lg leading-6">
                                    {new Date(item.from).getFullYear() || ''}{' '}
                                    {new Date(item.from).getFullYear()
                                      ? '-'
                                      : ''}
                                    {new Date(item.to).getFullYear() || ''}
                                  </p>
                                  <p className="font-light text-lg leading-6">
                                    {item.location}
                                  </p>
                                </div>
                              </div>
                              {/* <div
                            className="side-arrow w-2/12 text-center flex items-center justify-center"
                            //  onClick={modelOpen}
                          >
                            {" "}
                            <span>
                              <svg
                                width="18"
                                height="34"
                                viewBox="0 0 18 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0.376879 32.9487C0.257528 32.8296 0.162838 32.6882 0.0982284 32.5325C0.0336208 32.3768 0.000362299 32.2099 0.000362284 32.0413C0.000362269 31.8727 0.0336207 31.7058 0.0982283 31.5501C0.162838 31.3944 0.257528 31.253 0.376879 31.1339L14.8512 16.6622L0.376876 2.19042C0.136228 1.94977 0.00103292 1.62338 0.00103289 1.28305C0.00103286 0.942716 0.136228 0.616327 0.376876 0.375677C0.617526 0.135027 0.943915 -0.00016636 1.28425 -0.00016639C1.62457 -0.00016642 1.95096 0.135026 2.19161 0.375677L17.5707 15.7548C17.6901 15.8739 17.7848 16.0153 17.8494 16.171C17.914 16.3267 17.9473 16.4936 17.9473 16.6622C17.9473 16.8308 17.914 16.9977 17.8494 17.1534C17.7848 17.3091 17.6901 17.4505 17.5707 17.5695L2.19162 32.9487C2.07257 33.068 1.93114 33.1627 1.77544 33.2273C1.61974 33.2919 1.45282 33.3252 1.28425 33.3252C1.11567 33.3252 0.948757 33.2919 0.793056 33.2273C0.637354 33.1627 0.495928 33.068 0.376879 32.9487Z"
                                  fill="#979797"
                                />
                              </svg>
                            </span>{" "}
                          </div> */}
                            </div>
                          </div>
                        )
                      },
                    )}
                  <div
                    className="exp-box relative bg-white  rounded-3xl flex items-center overflow-hidden sm:min-h-40 min-h-52 h-52"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 4px 12px',
                      display: publicProfile ? 'none' : 'flex',
                    }}
                  >
                    <img
                      src={
                        (profileData.selectedProfile?.experience?.length + 1) %
                          3 ===
                        0
                          ? exp_1
                          : (profileData.selectedProfile?.experience?.length +
                              1) %
                              3 ===
                            1
                          ? exp_3
                          : (profileData.selectedProfile?.experience?.length +
                              1) %
                              3 ===
                            2
                          ? exp_2
                          : ''
                      }
                      className="w-4/6 exp-img-back m-auto absolute top-50 left-0 right-0  sm:w-3/6"
                    />
                    <div className="flex w-full h-full">
                      <div className="plus-exp flex w-full">
                        <button
                          className="text-7xl test text-gray-400 cursor-pointer z-10 w-full h-full"
                          onClick={() => {
                            setModal(true)
                            setDefalutJob()
                          }}
                        >
                          <label class="file-label m-0 cursor-pointer  items-center justify-center  h-full flex  text-center block">
                            +
                          </label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Experience-sec mb-14" style={{ display: 'none' }}>
                <h1 className="font-semibold text-4xl sm:text-3xl xs:text-2xl xs:mb-5 mb-8">
                  Activity
                </h1>
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-4">
                  <div
                    className="exp-box relative bg-white rounded-3xl xl:pt-8 xl:pb-8 overflow-hidden lg:pt-8 lg:pb-8 md:pt-6 md:pb-6 sm:pt-6 sm:pb-6 flex items-center"
                    style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
                  >
                    <div className="flex w-full h-full">
                      <div className="exp-text pl-8 md:pl-4 sm:pl-4 pr-4 w-10/12 flex justify-between flex-col">
                        <div>
                          <h1 className="lg:text-2xl md:text-xl font-medium">
                            CSS / HTML
                          </h1>
                          <h5 className="lg:text-2xl md:text-xl font-light">
                            Front End Development
                          </h5>
                        </div>
                        <div className="exp-text-bottom mt-9">
                          <p className="font-light text-lg leading-6 flex">
                            <span className="mr-2">
                              <svg
                                width="18"
                                height="21"
                                viewBox="0 0 18 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.3734 2.60153C13.6845 0.935753 11.3939 -7.05894e-05 9.00551 -7.05719e-05C6.6171 -7.05543e-05 4.32651 0.935753 2.63765 2.60153C0.948792 4.26731 1.7795e-08 6.52659 0 8.88235C-1.7795e-08 11.2381 0.948792 13.4974 2.63765 15.1632L8.23076 20.6903C8.32942 20.7884 8.4468 20.8663 8.57613 20.9194C8.70546 20.9726 8.84418 20.9999 8.98428 20.9999C9.12439 20.9999 9.26311 20.9726 9.39244 20.9194C9.52177 20.8663 9.63915 20.7884 9.73781 20.6903L15.3734 15.1108C17.0552 13.452 18 11.2021 18 8.85618C18 6.51024 17.0552 4.26038 15.3734 2.60153ZM13.8557 13.6139L9.00551 18.4187L4.15533 13.6139C3.19712 12.6679 2.54476 11.463 2.28073 10.1514C2.0167 8.83978 2.15283 7.48041 2.67194 6.24512C3.19104 5.00982 4.0698 3.95405 5.19714 3.21127C6.32448 2.46849 7.64978 2.07204 9.00551 2.07204C10.3612 2.07204 11.6865 2.46849 12.8139 3.21127C13.9412 3.95405 14.82 5.00982 15.3391 6.24512C15.8582 7.48041 15.9943 8.83978 15.7303 10.1514C15.4663 11.463 14.8139 12.6679 13.8557 13.6139ZM3 4.69764C2.14322 5.54531 1.5 6.73192 1.5 7.92887C1.5 9.12582 2.64322 13.1523 3.5 13.9999C4.13653 14.6288 7.69305 18.8237 8.57613 18.9999C9.45921 19.1761 11.4613 16.8354 12.2956 16.4999C13.1299 16.1645 13.9934 14.7348 14.5 13.9999C15.0066 13.265 17 14.4999 15.7303 10.1514C16.6222 5.721 15.6031 6.21705 15.3734 5.66866C15.1437 5.12027 14.9279 4.22657 14.5 3.80957C13.8557 0.80957 14.0536 2.3045 13.5 2.07204C9.73781 0.492348 12.1119 1.50479 11.5102 1.49993C10.9085 1.49506 9.54171 1.27645 8.98428 1.49993C8.42685 1.72341 6 -7.05719e-05 3 4.69764ZM10.7991 10.5677C10.3969 10.9705 9.8654 11.2229 9.29538 11.2819C8.72537 11.3409 8.15229 11.2027 7.67411 10.8911C7.19593 10.5794 6.84235 10.1136 6.67382 9.57333C6.50529 9.03301 6.53229 8.45173 6.75018 7.92887C6.96808 7.40601 7.36335 6.97404 7.86841 6.70682C8.37347 6.43959 8.95696 6.3537 9.51912 6.46383C10.0813 6.57397 10.5872 6.87328 10.9504 7.31061C11.3135 7.74793 11.5114 8.29611 11.5102 8.86141C11.4948 9.50757 11.2199 10.1213 10.7461 10.5677H10.7991Z"
                                  fill="#7F7F81"
                                />
                              </svg>
                            </span>
                            Udemy
                          </p>
                        </div>
                      </div>
                      <div className="side-arrow w-3/12 text-center pr-5 flex items-end justify-center flex-col justify-between">
                        <div className="dots-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 14C11.6044 14 11.2178 14.1173 10.8889 14.3371C10.56 14.5568 10.3036 14.8692 10.1522 15.2346C10.0009 15.6001 9.96126 16.0022 10.0384 16.3902C10.1156 16.7781 10.3061 17.1345 10.5858 17.4142C10.8655 17.6939 11.2219 17.8844 11.6098 17.9616C11.9978 18.0387 12.3999 17.9991 12.7654 17.8478C13.1308 17.6964 13.4432 17.44 13.6629 17.1111C13.8827 16.7822 14 16.3956 14 16C14 15.4696 13.7893 14.9609 13.4142 14.5858C13.0391 14.2107 12.5304 14 12 14Z"
                              fill="black"
                            />
                            <path
                              d="M13.1111 9.66294C12.7822 9.8827 12.3956 10 12 10C11.4696 10 10.9609 9.78929 10.5858 9.41421C10.2107 9.03914 10 8.53043 10 8C10 7.60444 10.1173 7.21776 10.3371 6.88886C10.5568 6.55996 10.8692 6.30362 11.2346 6.15224C11.6001 6.00087 12.0022 5.96126 12.3902 6.03843C12.7781 6.1156 13.1345 6.30608 13.4142 6.58579C13.6939 6.86549 13.8844 7.22186 13.9616 7.60982C14.0387 7.99778 13.9991 8.39992 13.8478 8.76537C13.6964 9.13082 13.44 9.44318 13.1111 9.66294Z"
                              fill="black"
                            />{' '}
                          </svg>
                        </div>
                        <div className="pro-act-img">
                          <div className="h-12 w-12 bg-black rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="exp-box relative bg-white rounded-3xl xl:pt-11 xl:pb-11 lg:pt-8 lg:pb-8 md:pt-6 md:pb-6 sm:pt-6 sm:pb-6 flex items-center"
                    style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
                  >
                    <div className="flex w-full h-full">
                      <div className="exp-text lg:pl-8 md:pl-4 sm:pl-4 pr-4 w-10/12 flex justify-between flex-col">
                        <div>
                          <h1 className="lg:text-2xl md:text-xl font-medium">
                            Figma
                          </h1>
                          <h5 className="lg:text-2xl md:text-xl font-light">
                            UX Certificate
                          </h5>
                        </div>
                        <div className="exp-text-bottom mt-9">
                          <p className="font-light text-lg leading-6 flex">
                            <span className="mr-2">
                              <svg
                                width="18"
                                height="21"
                                viewBox="0 0 18 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.3734 2.60153C13.6845 0.935753 11.3939 -7.05894e-05 9.00551 -7.05719e-05C6.6171 -7.05543e-05 4.32651 0.935753 2.63765 2.60153C0.948792 4.26731 1.7795e-08 6.52659 0 8.88235C-1.7795e-08 11.2381 0.948792 13.4974 2.63765 15.1632L8.23076 20.6903C8.32942 20.7884 8.4468 20.8663 8.57613 20.9194C8.70546 20.9726 8.84418 20.9999 8.98428 20.9999C9.12439 20.9999 9.26311 20.9726 9.39244 20.9194C9.52177 20.8663 9.63915 20.7884 9.73781 20.6903L15.3734 15.1108C17.0552 13.452 18 11.2021 18 8.85618C18 6.51024 17.0552 4.26038 15.3734 2.60153ZM13.8557 13.6139L9.00551 18.4187L4.15533 13.6139C3.19712 12.6679 2.54476 11.463 2.28073 10.1514C2.0167 8.83978 2.15283 7.48041 2.67194 6.24512C3.19104 5.00982 4.0698 3.95405 5.19714 3.21127C6.32448 2.46849 7.64978 2.07204 9.00551 2.07204C10.3612 2.07204 11.6865 2.46849 12.8139 3.21127C13.9412 3.95405 14.82 5.00982 15.3391 6.24512C15.8582 7.48041 15.9943 8.83978 15.7303 10.1514C15.4663 11.463 14.8139 12.6679 13.8557 13.6139ZM3 4.69764C2.14322 5.54531 1.5 6.73192 1.5 7.92887C1.5 9.12582 2.64322 13.1523 3.5 13.9999C4.13653 14.6288 7.69305 18.8237 8.57613 18.9999C9.45921 19.1761 11.4613 16.8354 12.2956 16.4999C13.1299 16.1645 13.9934 14.7348 14.5 13.9999C15.0066 13.265 17 14.4999 15.7303 10.1514C16.6222 5.721 15.6031 6.21705 15.3734 5.66866C15.1437 5.12027 14.9279 4.22657 14.5 3.80957C13.8557 0.80957 14.0536 2.3045 13.5 2.07204C9.73781 0.492348 12.1119 1.50479 11.5102 1.49993C10.9085 1.49506 9.54171 1.27645 8.98428 1.49993C8.42685 1.72341 6 -7.05719e-05 3 4.69764ZM10.7991 10.5677C10.3969 10.9705 9.8654 11.2229 9.29538 11.2819C8.72537 11.3409 8.15229 11.2027 7.67411 10.8911C7.19593 10.5794 6.84235 10.1136 6.67382 9.57333C6.50529 9.03301 6.53229 8.45173 6.75018 7.92887C6.96808 7.40601 7.36335 6.97404 7.86841 6.70682C8.37347 6.43959 8.95696 6.3537 9.51912 6.46383C10.0813 6.57397 10.5872 6.87328 10.9504 7.31061C11.3135 7.74793 11.5114 8.29611 11.5102 8.86141C11.4948 9.50757 11.2199 10.1213 10.7461 10.5677H10.7991Z"
                                  fill="#7F7F81"
                                />
                              </svg>
                            </span>
                            General Assembly
                          </p>
                        </div>
                      </div>
                      <div className="side-arrow w-3/12 pr-5 text-center flex items-end justify-center flex-col justify-between">
                        <div className="dots-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 14C11.6044 14 11.2178 14.1173 10.8889 14.3371C10.56 14.5568 10.3036 14.8692 10.1522 15.2346C10.0009 15.6001 9.96126 16.0022 10.0384 16.3902C10.1156 16.7781 10.3061 17.1345 10.5858 17.4142C10.8655 17.6939 11.2219 17.8844 11.6098 17.9616C11.9978 18.0387 12.3999 17.9991 12.7654 17.8478C13.1308 17.6964 13.4432 17.44 13.6629 17.1111C13.8827 16.7822 14 16.3956 14 16C14 15.4696 13.7893 14.9609 13.4142 14.5858C13.0391 14.2107 12.5304 14 12 14Z"
                              fill="black"
                            />
                            <path
                              d="M13.1111 9.66294C12.7822 9.8827 12.3956 10 12 10C11.4696 10 10.9609 9.78929 10.5858 9.41421C10.2107 9.03914 10 8.53043 10 8C10 7.60444 10.1173 7.21776 10.3371 6.88886C10.5568 6.55996 10.8692 6.30362 11.2346 6.15224C11.6001 6.00087 12.0022 5.96126 12.3902 6.03843C12.7781 6.1156 13.1345 6.30608 13.4142 6.58579C13.6939 6.86549 13.8844 7.22186 13.9616 7.60982C14.0387 7.99778 13.9991 8.39992 13.8478 8.76537C13.6964 9.13082 13.44 9.44318 13.1111 9.66294Z"
                              fill="black"
                            />{' '}
                          </svg>
                        </div>
                        <div className="pro-act-img">
                          <div className="h-12 w-12 bg-black rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="exp-box relative bg-white rounded-3xl xl:pt-11 xl:pb-11 lg:pt-8 lg:pb-8 md:pt-6 md:pb-6 sm:pt-6 sm:pb-6 flex items-center"
                    style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)' }}
                  >
                    <div className="flex w-full h-full">
                      <div className="plus-exp flex w-full">
                        <button className="text-7xl text-gray-400 cursor-pointer z-10 w-full h-full">
                          <label
                            class="file-label m-0 cursor-pointer  items-center justify-center  h-full flex  text-center block"
                            for="file-input"
                          >
                            +
                          </label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Interests-sec mb-14">
                <h1 className="font-semibold text-4xl sm:text-3xl xs:text-2xl xs:mb-5 mb-8">
                  Interests
                </h1>
                <div className="grid grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-3  place-items-center	">
                  {profileData &&
                    profileData?.selectedProfile?.interests?.map(
                      (item, index) => {
                        return (
                          <div className="int-box text-center relative h-48 w-48 xl:h-64 xl:w-64 lg:h-64 lg:w-64 flex flex-wrap sm:h-54 md:h-48">
                            {/* <div
                              style={{
                                background: `url(${deleteIcon})`,
                                display: publicProfile ? "none" : "block",
                              }}
                              className="close-img invisible"
                              onClick={() => {
                                removeIntrest(index);
                              }}
                            >
                              {" "}
                              
                            </div> */}
                            <svg
                              onClick={() => {
                                removeIntrest(index)
                              }}
                              style={{
                                cursor: 'pointer',
                                display: publicProfile ? 'none' : 'block',
                              }}
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              version="1.1"
                              fill="#2e9488"
                              xmlns="http://www.w3.org/2000/svg"
                              className="close-11 absolute right-0"
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
                            </svg>
                            <img
                              src={item.fullUrl}
                              className="w-32 m-auto mb-4"
                            ></img>
                            <h4 className="text-lg	font-medium w-full">
                              {item.fileName}
                            </h4>
                          </div>
                        )
                      },
                    )}
                  <div
                    className="int-box text-center relative bg-white  h-48 w-48 xl:h-64 xl:w-64 lg:h-64 lg:w-64 rounded-3xl xl:pt-15 xl:pb-15 lg:pt-8 lg:pb-8 md:pt-6 md:pb-6 sm:pt-6 sm:pb-6 flex items-center"
                    style={{
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
                      display: publicProfile ? 'none' : 'block',
                    }}
                  >
                    <div className="flex w-full h-full">
                      <div className="plus-exp flex w-full">
                        <button
                          className="text-7xl text-gray-400 cursor-pointer z-10 w-full h-full"
                          onClick={modelIntrestOpen}
                        >
                          <label class="file-label m-0 cursor-pointer  items-center justify-center  h-full flex  text-center block">
                            +
                          </label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, actions)(Profile)
