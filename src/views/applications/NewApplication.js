import React, { useState, useEffect } from 'react'
import Navbar from '../../components/layouts/navbar'
import { numberWithCommas } from '../../components/common/commonHelper'
import {
  PencilAltIcon,
  OfficeBuildingIcon,
  LocationMarkerIcon,
  CurrencyDollarIcon,
  ClockIcon,
  MailIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Link, withRouter } from 'react-router-dom'
import * as jobActions from '../../store/job'
import * as applicationActions from '../../store/application'
import { connect } from 'react-redux'
import Spinner from '../../components/spinner'
import { Editor } from '@tinymce/tinymce-react'
const NewApplication = ({
  match,
  history,
  viewJob,
  jobs,
  createApplication,
  jobId
}) => {
  const [form, setForm] = useState({
    coverLetter: '',
    skills: [],
  })

  if (!jobs.selectedJob) <Spinner />

  useEffect(() => {
    viewJob(jobId, history)
  }, [viewJob, jobId, history])

  const removeTag = (i) => {
    const tags = form.skills
    tags.splice(i, 1)
    setForm({ ...form }, (form.skills = tags))
  }

  const inputKeyDown = (e) => {
    const val = e.target.value
    if (e.key === 'Enter' && val) {
      if (form.skills.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return
      }
      setForm({ ...form }, form.skills.push(val.toLowerCase()))
      e.target.value = null
    } else if (e.key === 'Backspace' && !val) {
      removeTag(form.skills.length - 1)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createApplication(form, jobId, history)
  }
  const handleEditorChange = (content, editor) => {
    setForm({
      ...form,
      coverLetter: content,
    })
  }
  return (
    <div>
      <div className="max-w-5xl px-4 py-12 mx-auto mt-6 mb-64 border border-gray-200 rounded-lg md:px-32 font-inter">
        <p className="text-2xl text-center text-gray-700 font-baskerville ">
          Apply to {jobs.selectedJob?.positionTitle}
        </p>
        <div className="flex flex-wrap justify-between py-4 mt-4 text-gray-600 border-t border-b border-gray-200">
          <div className="flex items-center w-1/2 mt-2 md:w-auto">
            <OfficeBuildingIcon className="w-6 h-6" />
            <p className="ml-2">{jobs.selectedJob.organization?.name}</p>
          </div>
          <div className="flex items-center w-1/2 mt-2 md:w-auto">
            <LocationMarkerIcon className="w-6 h-6" />
            <p className="ml-2">{jobs.selectedJob?.location}</p>
          </div>
          <div className="flex items-center w-1/2 mt-2 md:w-auto">
            <CurrencyDollarIcon className="w-6 h-6" />
            <p className="ml-2">{numberWithCommas(jobs.selectedJob?.salary)}</p>
          </div>
          <div className="flex items-center w-1/2 mt-2 md:w-auto">
            <ClockIcon className="w-6 h-6" />
            <p className="ml-2">{jobs.selectedJob?.jobType}</p>
          </div>
          {jobs.selectedJob?.companyEmail && (
            <div className="flex items-center mt-2">
              <MailIcon className="w-6 h-6" />
              <p className="ml-2">{jobs.selectedJob?.companyEmail}</p>
            </div>
          )}
        </div>
        <div className="flex px-6 py-4 mt-6 text-green-600 border-2 border-green-500 rounded-lg bg-teal-50">
          <PencilAltIcon className="w-8 h-8" />
          <div className="mt-1 ml-2">
            <p className="font-bold">Creating Your Application</p>
            <p className="mt-1">
              You are applying to this position with your public Nuleep profile.
              Feel free to add any additional information to help you stand out!{' '}
            </p>
          </div>
        </div>
        <div>
          <div className="mt-6">
            <label
              htmlFor="coverLetter"
              className="block text-lg text-gray-700"
            >
              Cover Letter (Optional)
            </label>
            <p className="mt-1 text-sm text-gray-400">
              Feel free to add a cover letter and personalize your application
              for this position.
            </p>
            <div className="mt-2">
              {/* <textarea
                                id="coverLetter"
                                name="coverLetter"
                                rows={3}
                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        coverLetter: e.target.value,
                                    })
                                }
                                value={form.coverLetter}
                            /> */}
              <Editor
                value={form.coverLetter}
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
          </div>
          <div className="mt-4">
            <ul>
              <label htmlFor="skills" className="block text-lg text-gray-700">
                Relavant Skills (Optional)
              </label>
              <p className="mt-1 text-sm text-gray-400">
                Add any skills that you think will be useful for this position.
              </p>

              <input
                name="skills"
                id="skills"
                type="text"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm group-hover:border-2 group-hover:border-teal-500 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                onKeyDown={inputKeyDown}
              />
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {form.skills.map((tag, i) => (
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

          <div className="flex items-center justify-end mt-6">
            <Link className="text-gray-300" to={`/jobs/${jobId}`}>
              Back
            </Link>
            <button
              onClick={(e) => onSubmit(e)}
              className="px-4 py-2 ml-8 text-green-800 bg-green-100 rounded-md"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  jobs: state.jobs,
})

export default withRouter(
  connect(mapStateToProps, {
    ...jobActions,
    ...applicationActions,
  })(NewApplication),
)
