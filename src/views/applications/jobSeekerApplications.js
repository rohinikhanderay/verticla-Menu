import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/application'
import { useSelector } from 'react-redux'
import noJobsImg from '../../assets/images/No-Jobs.png'
// const tabs = [
//     { name: 'Submitted', href: '#', count: '52', current: false },
//     { name: 'Screened', href: '#', count: '52', current: false },
//     { name: 'Interviewed', href: '#', count: '6', current: false },
//     { name: 'Offer Made', href: '#', count: '4', current: true },
//     { name: 'Offer Accepted', href: '#', current: false },
//     { name: 'Disqualified', href: '#', current: false },
// ];

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }

const JobSeekerApplicationContainer = ({
  getProfileApplications,
  application,
}) => {
  const applicationData = useSelector((state) => state.application)
  useEffect(() => {
    getProfileApplications()
  }, [getProfileApplications])

  const renderApplications = () => {
    return applicationData?.applications.map((app, index) => (
      <Link
        key={index}
        to={`/applications/${app._id}`}
        className="flex flex-col border border-gray-100 rounded-md shadow-md"
      >
        <div className="flex-grow px-8 pt-8">
          <div className="flex items-center">
            {/* <div className="flex items-center justify-center w-16 h-16 text-3xl font-bold text-blue-900 bg-blue-300 rounded-md font-baskerville">
              {!app?.job
                ? ''
                : app?.job.organization
                ? app?.job.organization.name.charAt(0)
                : ''}
            </div> */}

            {app?.job?.organization?.orgImage &&
            app?.job?.organization?.orgImage?.fullUrl ? (
              <div
                className="flex items-center justify-center w-16 h-16 text-3xl font-bold text-blue-900 bg-blue-300 rounded-md font-baskerville"
                style={{
                  backgroundImage: `url(${app?.job?.organization?.orgImage.fullUrl})`,
                  backgroundPosition: 'center',
                  backgroundSize: '112px',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            ) : (
              <div className="flex items-center justify-center w-16 h-16 text-3xl font-bold text-blue-900 bg-blue-300 rounded-md font-baskerville">
                {' '}
                {app?.job?.organization.name.charAt(0)}
              </div>
            )}

            <div className="ml-4">
              <p className="font-bold tracking-wider text-teal-600">
                {!app?.job
                  ? ''
                  : app?.job.organization
                  ? app?.job.organization.name.slice(0, 25)
                  : ''}
              </p>
              <p>{!app?.job ? '' : app?.job?.location && app?.job?.location}</p>
            </div>
          </div>
          <p className="mt-4 text-xl font-bold text-gray-600 font-baskerville">
            {!app?.job ? '' : app?.job.positionTitle}
          </p>
          <p className="mt-2">
            {!app?.job
              ? ''
              : app?.job.description.replace(/<[^>]*>?/gm, '').slice(0, 120)}
          </p>
        </div>
        <div className="flex items-center justify-between px-8 mt-4 text-xs">
          <p className="px-4 py-2 text-yellow-800 bg-yellow-100 rounded-full">
            {app.status}
          </p>
          <p className="text-gray-400">{!app?.job ? '' : app?.job.jobType}</p>
        </div>
        <p className="p-2 mt-4 text-center bg-green-100 rounded-b">
          Applied on {new Date(app?.createdAt).toLocaleDateString()}
        </p>
      </Link>
    ))
  }

  return (
    <div>
      <div className="mb-48 font-inter">
        {/* <header>
          <div className="h-32 px-4 pt-12 bg-teal-600 sm:px-6 lg:px-8">
            <h1 className="max-w-5xl mx-auto text-3xl font-bold leading-tight text-white">
              My Applications
            </h1>
          </div>
        </header> */}
        <main className="max-w-5xl px-4 mx-auto md:px-0">
          <div className="">
            <div className="mt-10">
              {applicationData && applicationData.applications.length != 0 ? (
                renderApplications()
              ) : (
                <div>
                  <img
                    src={noJobsImg}
                    width="300"
                    heigh=""
                    className="m-auto "
                  />
                  <div className="text-center  text-3xl xs:text-2xl sm:text-3xl">
                    <h1 className="mb-2 xs:mb-0 sm:mb-0">
                      You haven't applied to jobs.
                    </h1>
                    <h1>
                      Apply to jobs{' '}
                      <Link
                        className="cursor-pointer text-teal-600 underline"
                        to="/jobs"
                      >
                        here.
                      </Link>
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  application: state.application,
})

export default connect(mapStateToProps, actions)(JobSeekerApplicationContainer)
