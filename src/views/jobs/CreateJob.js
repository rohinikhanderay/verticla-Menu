import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/job'
import Navbar from '../../components/layouts/navbar'
import { XIcon, PlusSmIcon } from '@heroicons/react/outline'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { mockComponent } from 'react-dom/test-utils'
import axios from 'axios'
import { API_URL } from '../../store/API_URL'
import { LocationSearchInputCities } from '../test-locations/LocationSearchInputCities'
import { fileToTextConvert } from '../../store/profile/index'
import { useSelector, useDispatch } from 'react-redux'
import img_19 from '../../assets/images/2.gif'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Editor } from '@tinymce/tinymce-react'
import { numberWithCommas } from '../../components/common/commonHelper'
const CreateJob = (props) => {
  const [form, setForm] = useState({
    positionTitle: '',
    location: '',
    description: '',
    department: '',
    requirements: [],
    skillKeywords: [],
    jobType: '',
    salaryType: '',
    salary: '',
    remote: '',
    requisitionNumber: '',
    postingDate: '',
    closingDate: '',
    companyContact: '',
    companyEmail: '',
    showRequired: false,
  })
  const [fielErr, setFileErr] = useState('')
  const [fileLoader, setFileLoader] = useState(false)

  useEffect(() => {
    setDefaultValues()
  }, [])
  const dispatch = useDispatch()
  const handleRequirementsChange = (e, requirementIndex) => {
    const { value } = e.target
    const list = form.requirements
    list[requirementIndex] = value
    setForm({ ...form }, (form.requirements = list))
  }

  const handleRequirementRemoveClick = (index) => {
    const list = form.requirements
    list.splice(index, 1)
    setForm({ ...form }, (form.requirements = list))
  }
  // const numberWithCommas = (x) => {
  //   if (x != null) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //   } else {
  //     return ''
  //   }
  // }
  const handleRequirementAddClick = () => {
    setForm({ ...form }, form.requirements.push(''))
  }

  const removeTag = (i) => {
    const tags = form.skillKeywords
    tags.splice(i, 1)
    setForm({ ...form }, (form.skillKeywords = tags))
  }
  const removeTagRequirement = (i) => {
    const tags = form.requirements
    tags.splice(i, 1)
    setForm({ ...form }, (form.requirements = tags))
  }

  const inputKeyDown = (e) => {
    const val = e.target.value
    if (e.key === 'Enter' && val) {
      if (
        form.skillKeywords.find(
          (tag) => tag.toLowerCase() === val.toLowerCase(),
        )
      ) {
        return
      }
      setForm({ ...form }, form.skillKeywords.push(val.toLowerCase()))
      e.target.value = null
    }
    // else if (e.key === 'Backspace' && !val) {
    //     removeTag(form.skillKeywords.length - 1);
    // }
  }
  const handleEditorChange = (content, editor) => {
    setForm({
      ...form,
      description: content,
    })
  }
  const inputKeyDownRequirements = (e) => {
    const val = e.target.value
    if (e.key === 'Enter' && val) {
      if (
        form.requirements.find((tag) => tag.toLowerCase() === val.toLowerCase())
      ) {
        return
      }
      setForm({ ...form }, form.requirements.push(val.toLowerCase()))
      e.target.value = null
    }
    //  else if (e.key === 'Backspace' && !val) {
    //     removeTag(form.requirements.length - 1);
    // }
  }

  const submit = (e) => {
    e.preventDefault()
    if (e.target[0].value === '' || e.target[1].value === '') {
      setForm({
        ...form,
        showRequired: true,
      })
      return
    }
    props.createJob(form, props.history)
  }

  const setDefaultValues = async () => {
    const dateInfo = getDateInfo()
    const profileInfo = await getProfileInfo()

    setForm({
      ...form,
      postingDate: dateInfo[0],
      closingDate: dateInfo[1],
      companyContact: profileInfo[0],
      companyEmail: profileInfo[1],
    })
  }

  const getDateInfo = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    if (mm === '13') {
      mm = String(0)
    }
    let yyyy = String(today.getFullYear())
    let monthAhead = new Date(yyyy, mm, dd)

    return [today, monthAhead]
  }

  const getProfileInfo = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/profiles`, {
        headers: { authorization: localStorage.token },
      })
      return [
        res.data.data.firstName + ' ' + res.data.data.lastName,
        res.data.data.organization.email,
      ]
    } catch (err) {
      console.log(err)
    }
  }
  const showFile = (e) => {
    if (e.target.files.length !== 0) {
      setFileLoader(true)
      setForm({
        ...form,
        description: '',
      })
      dispatch(fileToTextConvert(e.target.files)).then((res) => {
        if (res) {
          setFileLoader(false)
        }
        if (res?.data) {
          toast.success('successfully uploaded')
          setFileErr('')
          setForm({
            ...form,
            description: res?.data,
          })
        } else {
          setFileErr(<p className="mt-2 text-sm text-red-500">{res.error}</p>)
        }
      })
    }
  }

  return (
    <div>
      {/* <Navbar /> */}
      <ToastContainer />
      <img
        className="object-cover object-center w-full h-48 border-t-2"
        src="https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        alt="office"
      />
      <div className="max-w-4xl px-8 mx-auto mt-12 mb-24 sm:px-2 md:px-4 font-inter">
        <h1 className="text-3xl font-bold leading-tight tracking-wide text-gray-700 font-baskerville">
          Create a new Job
        </h1>
        <p className="mt-2 text-gray-500 text-md">
          This is where you will upload your job posting information.
        </p>
        {/* <input type="file" onChange={(e)=>{showFile(e)}}/> */}
        <main>
          <form
            onSubmit={submit}
            onKeyPress={(e) => {
              e.key === 'Enter' && e.preventDefault()
            }}
            className="mt-12 "
          >
            <div className="px-4 py-5 bg-white border-t-8 border-teal-600 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-bold leading-6 text-gray-700">
                    Position Information
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    Enter in your position details here. This will be seen by
                    the applicant when applying to this position.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        {form.showRequired ? (
                          <p className="block text-sm font-medium text-red-500">
                            {' '}
                            Required{' '}
                          </p>
                        ) : (
                          ''
                        )}
                        <label
                          htmlFor="positionTitle"
                          className="block text-sm font-medium text-gray-700"
                        >
                          * Position Title
                        </label>
                        <input
                          type="text"
                          name="positionTitle"
                          id="positionTitle"
                          placeholder="What are you hiring for? (Software Developer, Finance Intern, etc)"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              positionTitle: e.target.value,
                            })
                          }
                          value={form.positionTitle}
                        />
                      </div>

                      <div className="col-span-6">
                        {form.showRequired ? (
                          <p className="block text-sm font-medium text-red-500">
                            {' '}
                            Required{' '}
                          </p>
                        ) : (
                          ''
                        )}
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          * Location
                        </label>
                        {/* <input
                                                    type="text"
                                                    name="location"
                                                    id="location"
                                                    placeholder="Los Angeles, Ca"
                                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            location:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={form.location}
                                                /> */}

                        <LocationSearchInputCities
                          {...props.input}
                          id="location"
                          name="location"
                          autoComplete="address-level2"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              location: e,
                            })
                          }
                        />
                      </div>
                      <div className="col-span-6">
                        <div className="flex">
                          {' '}
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Upload a job description
                          </label>
                          <span
                            style={{ display: fileLoader ? 'block' : 'none' }}
                          >
                            <img className="ml-2 w-5 sm:w-3" src={img_19} />
                          </span>
                        </div>
                        <div className="mt-1">
                          <input
                            type="file"
                            onChange={(e) => {
                              showFile(e)
                            }}
                          />
                        </div>
                        {fielErr}
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <Editor
                            value={form.description}
                            apiKey={`${process.env.REACT_APP_TINYMCE_KEY}`}
                            init={{
                              height: 500,
                              menubar: false,
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                              ],
                              toolbar:
                                'undo redo | formatselect | bold italic underline | code|\
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat |link|unlink| help',
                            }}
                            onEditorChange={handleEditorChange}
                          />
                          {/* <textarea
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                description:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        value={form.description }
                                                        id="description"
                                                        name="description"
                                                        rows={5}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                                    /> */}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Write a few sentences about the job. Let people know
                          what the position is all about!
                        </p>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="requirements"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Requirements
                        </label>

                        <input
                          name="requirements"
                          id="requirements"
                          placeholder="Enter in position requirements"
                          type="text"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm group-hover:border-2 group-hover:border-teal-500 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          onKeyUp={inputKeyDownRequirements}
                        />
                        <div className="flex flex-wrap gap-2 mt-4">
                          {form.requirements.map((tag, i) => (
                            <li
                              key={tag}
                              className="flex items-center inline px-4 py-2 font-bold text-center text-teal-700 capitalize bg-teal-100 rounded-full"
                            >
                              {tag}

                              <XIcon
                                className="w-5 h-5 ml-2 text-red-400 hover:text-red-700"
                                onClick={() => {
                                  removeTagRequirement(i)
                                }}
                              />
                            </li>
                          ))}
                        </div>
                        <ul>
                          <label
                            htmlFor="skills"
                            className="block mt-8 text-sm font-medium text-gray-700"
                          >
                            Skills
                          </label>
                          <input
                            name="skills"
                            id="skills"
                            placeholder="Required skills (Leadership, Photoshop, React, etc)"
                            type="text"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm group-hover:border-2 group-hover:border-teal-500 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            onKeyUp={inputKeyDown}
                          />
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {form.skillKeywords.map((tag, i) => (
                            <li
                              key={tag}
                              className="flex items-center inline px-4 py-2 font-bold text-center text-teal-700 capitalize bg-teal-100 rounded-full"
                            >
                              {tag}

                              <XIcon
                                className="w-5 h-5 ml-2 text-red-400 hover:text-red-700"
                                onClick={() => {
                                  removeTag(i)
                                }}
                              />
                            </li>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-3">
                        <label
                          htmlFor="department"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Department
                        </label>
                        <input
                          type="text"
                          name="department"
                          id="department"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              department: e.target.value,
                            })
                          }
                          value={form.department}
                        />
                      </div>

                      <div className="col-span-6 md:col-span-3">
                        <label
                          htmlFor="jobType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Job Type
                        </label>
                        <div className="mt-1">
                          <select
                            onChange={(e) =>
                              setForm({
                                ...form,
                                jobType: e.target.value,
                              })
                            }
                            value={form.jobType}
                            id="jobType"
                            name="jobType"
                            autoComplete="jobType"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                          >
                            <option>Select One</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Contract">Contract</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-3">
                        <label
                          htmlFor="salaryType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Salary Type
                        </label>
                        <div className="mt-1">
                          <select
                            onChange={(e) =>
                              setForm({
                                ...form,
                                salaryType: e.target.value,
                              })
                            }
                            value={form.salaryType}
                            id="salaryType"
                            name="salaryType"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                          >
                            <option>Select One</option>
                            <option value="Salary">Salary</option>
                            <option value="Hourly">Hourly</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-3">
                        <label
                          htmlFor="salary"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Salary
                        </label>
                        <div className="flex items-center">
                          <span className="w-5 font-semibold">$</span>
                          <input
                            type="text"
                            name="salary"
                            id="salary"
                            placeholder="10,000"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                salary: numberWithCommas(e.target.value),
                              })
                            }
                            pattern="[0-9]+([\.,][0-9]+)?"
                            value={form.salary}
                          />
                        </div>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="remote"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Remote
                        </label>
                        <div className="mt-1">
                          <select
                            onChange={(e) =>
                              setForm({
                                ...form,
                                remote: e.target.value,
                              })
                            }
                            value={form.remote}
                            id="remote"
                            name="remote"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                          >
                            <option>Select One</option>
                            <option value="Remote">Remote</option>
                            <option value="In-Person">In-Person</option>
                            <option value="In-Person/Remote">
                              In-Person/Remote
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 mt-8 bg-white border-t-8 border-teal-600 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-bold leading-6 text-gray-700">
                    Logistics
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    These fields will be used to help you manage this job. You
                    may also post your own contact information for each job.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor="requisitionNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Requisition Number
                        </label>
                        <input
                          type="text"
                          name="requisitionNumber"
                          id="requisitionNumber"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              requisitionNumber: e.target.value,
                            })
                          }
                          value={form.requisitionNumber}
                        />
                      </div>

                      <div className="col-span-6 md:col-span-3">
                        <label
                          htmlFor="postingDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Posting Date
                        </label>
                        <div className="mt-1">
                          <DatePicker
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                postingDate: e,
                              })
                            }
                            selected={form.postingDate}
                          />
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-3">
                        <label
                          htmlFor="closingDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Closing Date
                        </label>
                        <div className="mt-1">
                          <DatePicker
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                closingDate: e,
                              })
                            }
                            selected={form.closingDate}
                          />
                        </div>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="companyContact"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Posted Point of Contact
                        </label>
                        <input
                          type="text"
                          name="companyContact"
                          id="companyContact"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              companyContact: e.target.value,
                            })
                          }
                          value={form.companyContact}
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          (This name will be listed on the job posting)
                        </p>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="companyEmail"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Posted Email
                        </label>
                        <input
                          type="text"
                          name="companyEmail"
                          id="companyEmail"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              companyEmail: e.target.value,
                            })
                          }
                          value={form.companyEmail}
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          (This email will be listed on the job posting)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm text-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default withRouter(connect(null, actions)(CreateJob))
