import React, { useState, useEffect } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as jobActions from '../../../../../store/job'
import * as profileActions from '../../../../../store/profile'
import { XIcon, PlusSmIcon } from '@heroicons/react/outline'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { adminEditJob } from '../../../../../store/company/index'
import { fileToTextConvert } from '../../../../../store/profile/index'
import img_19 from '../../../../../assets/images/2.gif'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Editor } from '@tinymce/tinymce-react'
import Layout from '../../Layout'
import { numberWithCommas } from '../../../../../components/common/commonHelper'
const initialState = {
  positionTitle: '',
  location: '',
  description: '',
  department: '',
  requirements: [''],
  skillKeywords: [],
  jobType: '',
  salaryType: '',
  salary: '',
  remote: '',
  requisitionNumber: '',
  postingDate: null,
  closingDate: null,
  companyContact: '',
  companyEmail: '',
}

const EditJob = ({
  getProfile,
  viewJob,
  editJob,
  deleteJob,
  match,
  jobs,
  profile,
  history,
}) => {
  const [form, setForm] = useState(initialState)
  const [fileLoader, setFileLoader] = useState(false)
  const dispatch = useDispatch()
  const [fielErr, setFileErr] = useState('')
  useEffect(() => {
    getProfile()
    viewJob(match.params.id, history).then((res) => {
      if (res.salary) {
        res.salary = numberWithCommas(res.salary)
      }
      setForm(res)
    })
    // if (!jobs.loading) {
    //   const jobData = { ...initialState }
    //   for (const key in jobs.selectedJob) {
    //     if (key in jobData) {
    //       jobData[key] = jobs.selectedJob[key]
    //     }
    //   }
    //   setForm(jobData)
    // }
  }, [jobs.loading, viewJob, getProfile, history, match.params.id])

  // if (jobs.loading || !profile.profile) {
  //     return <Spinner />;
  // }

  // if (profile.profile?._id !== jobs.selectedJob.recruiter?._id) {
  //     return <Redirect to="/dashboard" />;
  // }
  // const numberWithCommas = (x) => {
  //   if (x != null) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //   } else {
  //     return ''
  //   }
  // }
  const handleEditorChange = (content, editor) => {
    setForm({
      ...form,
      description: content,
    })
  }
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
      e.preventDefault()
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
  const inputKeyDownRequirements = (e) => {
    const val = e.target.value
    if (e.key === 'Enter' && val) {
      e.preventDefault()
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
    dispatch(adminEditJob({ ...form, id: match.params.id }, history))
    ///  editJob(form, match.params.id, history);
  }

  const deleteJobPosting = (e) => {
    deleteJob(match.params.id, history)
  }
  const showFile = (e) => {
    if (e.target.files.length !== 0) {
      setFileLoader(true)
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
    <Layout>
      <ToastContainer />
      <div className="max-w-4xl px-8 mx-auto mt-12 mb-24 sm:px-2 md:px-4 font-inter">
        <h1 className="text-3xl font-bold leading-tight tracking-wide text-gray-700 font-baskerville">
          Edit {jobs.selectedJob.positionTitle} Job Posting
        </h1>
        <p className="mt-2 text-gray-500 text-md">
          Edit or update your job posting information below.
        </p>
        <main>
          <form
            onSubmit={(e) => submit(e)}
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
                        <label
                          htmlFor="positionTitle"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Position Title
                        </label>
                        <input
                          type="text"
                          name="positionTitle"
                          id="positionTitle"
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
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          placeholder="Los Angeles, Ca"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              location: e.target.value,
                            })
                          }
                          value={form.location}
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
                        </div>{' '}
                        {fielErr}
                        {/* <p className="mt-2 text-sm text-gray-500">
                                                    Write a few sentences about the job. Let people know what
                                                    the position is all about!
                                                </p> */}
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          {/* <textarea
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                description:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        value={form.description}
                                                        id="description"
                                                        name="description"
                                                        rows={3}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                                                    /> */}
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
                        <ul>
                          <input
                            name="skills"
                            id="skills"
                            type="text"
                            placeholder="Enter in position requirements"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm group-hover:border-2 group-hover:border-teal-500 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            onKeyDown={inputKeyDownRequirements}
                          />
                        </ul>
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
                            type="text"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm group-hover:border-2 group-hover:border-teal-500 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            onKeyDown={inputKeyDown}
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
                            selected={new Date(form.postingDate)}
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
                            selected={new Date(form.closingDate)}
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
              <div className="flex items-center justify-between">
                <p
                  style={{ visibility: 'hidden' }}
                  onClick={(e) => deleteJobPosting(e)}
                  className="px-4 py-2 text-red-300 border border-red-300 rounded cursor-pointer"
                >
                  Delete Job Posting
                </p>
                <div className="flex justify-end">
                  <a
                    onClick={() => {
                      history.goBack()
                    }}
                    className="px-4 py-2 fon}t-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm text-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Cancel
                  </a>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  profile: state.profile,
})

export default withRouter(
  connect(mapStateToProps, { ...jobActions, ...profileActions })(EditJob),
)
