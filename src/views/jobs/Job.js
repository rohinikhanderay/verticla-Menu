import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as jobActions from '../../store/job'
import * as applicationActions from '../../store/application'
import Footer from '../../components/layouts/Footer'
import * as profileActions from '../../store/profile'
import Navbar from '../../components/layouts/navbar'
import { numberWithCommas } from '../../components/common/commonHelper'
import {useDispatch} from 'react-redux'
import {
  LocationMarkerIcon,
  MailIcon,
  CurrencyDollarIcon,
  CubeIcon,
  ClockIcon,
  BriefcaseIcon,
} from '@heroicons/react/outline'
import Spinner from '../../components/spinner'
import parse from 'html-react-parser'
const Job = ({
  match,
  viewJob,
  jobs: { selectedJob, loading },
  profile: { profile },
  application: { applications },
  history,
  getProfileApplications,
  jobId
}) => {
  useEffect(() => {
    viewJob(jobId, history)
    getProfileApplications()
  }, [viewJob, getProfileApplications, jobId, history])


  const dispatch = useDispatch()

  if (loading) {
    return <Spinner />
  }
  // const stringToHTML = function (str) {
  //   var parser = new DOMParser()
  //   var doc = parser.parseFromString(str, 'text/html').body
  //   console.log(doc.innerHTML)
  //   setTimeout(() => {
  //     document.getElementsByClassName('textPrintClass')[0].innerHTML =
  //       doc.innerHTML
  //   }, 200)

  //   //return doc.innerHTML;
  // }
  // const numberWithCommas = (x) => {
  //   if (x != null) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //   } else {
  //     return ''
  //   }
  // }
  const renderButton = () => {


    if (applications?.find((app) => app.job._id === jobId)) {
      const appId = applications?.find((app) => app.job._id === jobId)
      return (
        <Link
          className="inline-block px-4 py-2 text-teal-900 bg-teal-100 rounded-md shadow"
          to={`/applications/${appId._id}`}
        >
          View your application
        </Link>
      )
    }
    if (profile?.userRef.role === 'jobSeeker') {
      return (
        <div
          onClick={() => {
            console.log("performing on click")
            dispatch({type: 'title', title: 'New Application'})
            dispatch({type: 'New Application', jobId: jobId})
          }}
          to={`/jobs/${jobId}/new`}
          className="block px-24 py-2 text-center text-white bg-teal-600 rounded-md md:inline-block cursor-pointer"
        >
          Apply
        </div>
      )
    }

    return null
  }

  return (
    <div>
      {/* <Navbar /> */}
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <main className="max-w-5xl px-4 pt-8 mx-auto mb-48 text-gray-700 rounded-md md:border md:border-gray-200 sm:px-6 lg:px-16 md:py-12 md:mt-8 font-inter">
            {/* BG Container */}
            <div className="p-8 rounded-tr-3xl rounded-bl-3xl bg-teal-50">
              {/* Company Logo */}
              <div className="flex items-center">
                {/* <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white bg-teal-600 rounded-md cursor-pointer">
                  {selectedJob.organization?.name[0]}

                  

                </div> */}
                {console.log(selectedJob?.organization)}

                {selectedJob?.organization?.orgImage &&
                selectedJob?.organization?.orgImage?.fullUrl ? (
                  <div
                    className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white bg-teal-600 rounded-md cursor-pointer"
                    style={{
                      backgroundImage: `url(${selectedJob?.organization?.orgImage?.fullUrl})`,
                      backgroundPosition: 'center',
                      backgroundSize: '112px',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white bg-teal-600 rounded-md cursor-pointer">
                    {' '}
                    {selectedJob?.organization?.name[0]}
                  </div>
                )}

                {profile?.userRef.role === 'recruiter' ? (
                  <Link to={`/company/${selectedJob.organization?._id}`}>
                    <p className="ml-4 text-xl font-bold tracking-wide tracking-widest text-teal-600 cursor-pointer">
                      {selectedJob.organization?.name}
                    </p>
                  </Link>
                ) : (
                  <p className="ml-4 text-xl font-bold tracking-wide tracking-widest text-teal-600 cursor-pointer">
                    {selectedJob.organization?.name}
                  </p>
                )}
              </div>
              {/* / Company Logo */}

              {/* Job Details */}
              <div className="justify-between mt-4 md:flex">
                <div>
                  <h1 className="text-2xl font-bold leading-normal text-gray-700 md:text-4xl md:w-2/3 font-baskerville">
                    {selectedJob.positionTitle}
                  </h1>
                  {profile?._id === selectedJob.recruiter?._id && (
                    <div
                    onClick={() => {
                      dispatch({type: 'title', title: 'Edit'})
                      dispatch({type: 'Edit Job', jobId: jobId})
                    }}
                      to={`/jobs/${jobId}/edit`}
                      className="inline-block px-4 py-2 mt-4 text-white bg-teal-600 rounded"
                    >
                      Edit Job
                    </div>
                  )}
                </div>
                <div className="grid sm:block grid-cols-2 gap-2 mt-4 text-sm text-gray-500 md:mt-0 md:gap-4 md:w-1/2">
                  <div className="flex items-center sm:mb-2 ">
                    <LocationMarkerIcon className="w-5 h-5 text-teal-600" />
                    <p className="ml-2 leading-tight">{selectedJob.location}</p>
                  </div>
                  <div className="flex items-center sm:mb-2 ">
                    <CurrencyDollarIcon className="w-5 h-5 text-teal-600" />
                    <p className="ml-2 leading-tight">
                      {numberWithCommas(selectedJob && selectedJob?.salary)}
                    </p>
                  </div>
                  <div className="flex items-center sm:mb-2 ">
                    <CubeIcon className="w-5 h-5 text-teal-600" />
                    <p className="ml-2 leading-tight">
                      {selectedJob.salaryType}
                    </p>
                  </div>
                  <div className="flex items-center sm:mb-2 ">
                    <ClockIcon className="w-5 h-5 text-teal-600" />
                    <p className="ml-2 leading-tight">{selectedJob.jobType}</p>
                  </div>
                  <div className="flex items-center sm:mb-2 ">
                    <MailIcon className="w-5 h-5 text-teal-600" />
                    <p className="ml-2 leading-tight">
                      {selectedJob.organization?.email}
                    </p>
                  </div>
                  <div className="flex items-center sm:mb-2 ">
                    <BriefcaseIcon className="w-5 h-5 text-teal-600" />
                    <p className="ml-2 leading-tight">{selectedJob?.remote}</p>
                  </div>
                  <div className="col-span-2 mt-4 md:col-span-1">
                    {renderButton()}
                  </div>
                </div>
              </div>
              {/* / Job Details */}
            </div>
            {/* /BG Container */}

            <div className="px-6 mt-8 md:px-12">
              <p className="text-2xl font-semibold tracking-wide font-baskerville">
                About this position
              </p>
              <div className="mt-4 leading-relaxed text-gray-600 textPrintClass">
                {/* {stringToHTML(selectedJob.description)} */}
                {parse(selectedJob?.description || '')}
              </div>
              {/* Grid Wrapper */}
              <div className="grid gap-2 mt-8 md:grid-cols-2">
                {/* Skills Container */}
                <div>
                  <p className="text-2xl font-semibold tracking-wide font-baskerville">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedJob.skillKeywords?.length > 0 ? (
                      selectedJob?.skillKeywords.map((skill, index) => (
                        <p
                          key={index}
                          className="px-4 py-2 text-center rounded bg-teal-50 "
                        >
                          {skill}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-300">No skills listed</p>
                    )}
                  </div>
                </div>
                {/* / Skills Container */}

                {/* Requirements Container */}
                <div>
                  <p className="mt-8 text-2xl font-semibold tracking-wide md:mt-0 font-baskerville">
                    Requirements
                  </p>
                  <ul className="mt-4 list-disc">
                    {selectedJob.requirements?.map((req, index) => (
                      <li className="mt-2 ml-4 text-teal-600" key={index}>
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* / Requirements Container */}
              </div>
              {/* / Flexbox Wrapper */}
            </div>

            {/* Working At Nuleep */}
            <section className="px-6 mt-16 md:px-12">
              <div className="px-8 py-12 rounded-md md:px-24 bg-teal-50">
                <p className="pb-4 text-2xl font-bold text-center text-gray-700 border-b border-gray-200 md:text-3xl font-baskerville">
                  Working At {selectedJob.organization?.name}
                </p>
              </div>
              <p className="mt-12 text-xl font-semibold tracking-wide font-baskerville">
                About {selectedJob.organization?.name}
              </p>
              <p className="mt-4 text-gray-600">
                {selectedJob.organization?.about}
              </p>
              <p className="mt-12 text-xl font-semibold tracking-wide font-baskerville">
                Mission
              </p>
              <p className="mt-4 text-gray-600">
                {selectedJob.organization?.mission}
              </p>
              <p className="mt-12 text-xl font-semibold tracking-wide font-baskerville">
                Culture
              </p>
              <p className="mt-4 text-gray-600">
                {selectedJob.organization?.culture}
              </p>
              <p className="mt-12 text-xl font-semibold tracking-wide font-baskerville">
                Benefits
              </p>
              <p className="mt-4 text-gray-600">
                {selectedJob.organization?.benefits}
              </p>
            </section>
            {/* / Working At Nuleep */}
          </main>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  )
}

const mapStateToProps = (state) => ({
  application: state.application,
  jobs: state.jobs,
  profile: state.profile,
})

export default withRouter(
  connect(mapStateToProps, {
    ...jobActions,
    ...applicationActions,
    ...profileActions,
  })(Job),
)
