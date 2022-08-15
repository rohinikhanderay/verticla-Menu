import React, { useEffect } from 'react'
import Navbar from '../../components/layouts/navbar'
import { Link, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as companyActions from '../../store/company'
import * as jobActions from '../../store/job'
import { connect } from 'react-redux'
import {
  OfficeBuildingIcon,
  MailIcon,
  FireIcon,
  LightBulbIcon,
  SparklesIcon,
} from '@heroicons/react/outline'
import Spinner from '../../components/spinner'
import parse from 'html-react-parser'
const Company = ({
  // where do I put this in?

  history,
  match,
  viewOrganization,
  company: { selectedCompany, loading },
}) => {
  useEffect(() => {
    viewOrganization(match.params.id)
  }, [viewOrganization, match.params.id])
  const profileData = useSelector((state) => state.profile)
  if (loading) return <Spinner />

  if (!loading && !selectedCompany) {
    history.push('/')
  }

  // const stringToHTML = function (str, id) {
  //   if (str != undefined) {
  //     setTimeout(() => {
  //       document.getElementById(id).innerHTML = str
  //     }, 0)
  //   }
  // }
  const renderJobs = () => {
    const renderedJobs = []
    selectedCompany?.jobs?.forEach((job, index) => {
      renderedJobs.push(
        <div
          key={job._id}
          className="p-4 mt-2 border border-gray-200 rounded-lg"
        >
          <Link to={`/jobs/${job._id}`}>
            <p className="font-bold tracking-wide text-teal-600">
              {job.positionTitle}
            </p>
            {/* <p>{job.description.slice(0, 60)}...</p> */}
            <div className="descriptionText " id={`data-${index}`}>
              {/* {stringToHTML(job.description, `data-${index}`)} */}
              {parse(job.description)}
            </div>
            {job.jobType ? (
              <p className="inline-block px-2 py-1 mt-1 text-xs text-gray-800 bg-gray-200 rounded-full">
                {job.jobType}
              </p>
            ) : (
              ''
            )}
          </Link>
        </div>,
      )
    })

    if (renderedJobs.length === 0)
      <p className="mt-6 text-center text-gray-400">
        No Open Positions at this time.
      </p>

    return renderedJobs
  }

  return (
    <div>
      <Navbar />

      <div>
        <img
          className="block object-cover w-full h-32 shadow"
          src="https://images.unsplash.com/photo-1527769929977-c341ee9f2033?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
          alt="company"
        />

        <main className="leading-relaxed font-inter">
          <div className="relative max-w-5xl px-4 pb-48 mx-auto mb-48 text-gray-700 rounded-b sm:px-6 lg:px-20 font-inter">
            {selectedCompany?.organization?.orgImage &&
            selectedCompany?.organization?.orgImage?.fullUrl ? (
              <div
                className="flex items-center justify-center -mt-20 text-5xl font-bold text-blue-900 capitalize bg-blue-100 w-28 h-28 rounded-2xl"
                style={{
                  backgroundImage: `url(${selectedCompany?.organization?.orgImage.fullUrl})`,
                  backgroundPosition: 'center',
                  backgroundSize: '112px',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            ) : (
              <div className="flex items-center justify-center -mt-20 text-5xl font-bold text-blue-900 capitalize bg-blue-100 w-28 h-28 rounded-2xl">
                {' '}
                {selectedCompany?.organization.name[0]}
              </div>
            )}

            <p className="mt-4 text-4xl font-bold leading-tight tracking-wider text-teal-700 capitalize font-baskerville">
              {selectedCompany?.organization.name}
            </p>

            {profileData.profile?.organizationRole === 'admin' ? (
              <Link
                to={`/company/${match.params.id}/edit`}
                className="inline-block px-4 py-2 mt-4 text-white bg-teal-600 rounded"
              >
                Edit Company
              </Link>
            ) : (
              ''
            )}

            <div className="flex items-center py-4 mt-4 text-gray-200 border-t border-b">
              <OfficeBuildingIcon className="w-5 h-5 text-teal-600" />
              <p className="ml-2 text-sm text-gray-600 capitalize">
                {selectedCompany?.organization.city}
                {selectedCompany?.organization.stateProvince}
              </p>
              <MailIcon className="w-5 h-5 ml-8 text-teal-600" />
              <p className="ml-2 text-sm text-gray-600">
                {selectedCompany?.organization.email}
              </p>
            </div>

            <p className="mt-8 text-gray-600">
              {selectedCompany?.organization.about}
            </p>
            {/* Our Mission */}
            <div className="grid grid-cols-12 mt-8">
              <div className="inline-block w-10 h-10 col-span-1 p-2 mx-auto text-teal-700 rounded-full bg-teal-50">
                <FireIcon />
              </div>
              <p className="col-span-11 mt-1 ml-4 text-2xl text-gray-700 md:ml-0 font-baskerville">
                Our Mission
              </p>
              <div className="flex justify-center col-span-1">
                <div className="w-px mt-4 border-l"></div>
              </div>
              <p className="col-span-10 mt-2 text-gray-600">
                {selectedCompany?.organization.mission}
              </p>
            </div>
            {/* / Our Mission */}

            {/* Our Culture */}
            <div className="grid grid-cols-12 mt-8">
              <div className="inline-block w-10 h-10 col-span-1 p-2 mx-auto text-teal-700 rounded-full bg-teal-50">
                <LightBulbIcon />
              </div>
              <p className="col-span-11 mt-1 ml-4 text-2xl text-gray-700 md:ml-0 font-baskerville">
                Our Culture
              </p>
              <div className="flex justify-center col-span-1">
                <div className="w-px mt-4 border-l"></div>
              </div>
              <p className="col-span-10 mt-2 text-gray-600">
                {selectedCompany?.organization.culture}
              </p>
            </div>
            {/* / Our Culture */}

            {/* Our Benefits */}
            <section className="grid grid-cols-12 mt-8">
              <div className="inline-block w-10 h-10 col-span-1 p-2 mx-auto text-teal-700 rounded-full bg-teal-50">
                <SparklesIcon />
              </div>
              <p className="col-span-11 mt-1 ml-4 text-2xl text-gray-700 md:ml-0 font-baskerville">
                Our Benefits
              </p>
              <div className="flex justify-center col-span-1">
                <div className="w-px mt-4 border-l"></div>
              </div>
              <p className="col-span-10 mt-2 text-gray-600">
                {selectedCompany?.organization.benefits}
              </p>
            </section>
            {/* / Our Benefits */}

            {/* Perks */}
            <section className="mt-16">
              <p className="col-span-11 mt-1 ml-4 sm:ml-0 text-2xl font-bold text-gray-700 md:ml-0 font-baskerville">
                Perks of working at {selectedCompany?.organization.name}
              </p>
              <p className="col-span-10 mt-2 text-gray-600">
                {selectedCompany?.organization.perks}
              </p>
            </section>
            {/* / Perks */}

            {/* Jobs at Company */}
            <div className="mt-12">
              <p className="col-span-11 mt-1 ml-4 text-2xl font-bold text-gray-700 md:ml-0 font-baskerville">
                Jobs at {selectedCompany?.organization.name}
              </p>
              <hr className="mt-2" />
              <div className="grid gap-4 mt-4 md:grid-cols-3">
                {renderJobs()}
              </div>
            </div>
            {/* / Jobs at Company */}
          </div>
        </main>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  company: state.company,
  jobs: state.jobs,
})

export default withRouter(
  connect(mapStateToProps, { ...companyActions, ...jobActions })(Company),
)
