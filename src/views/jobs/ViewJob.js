import React, { useEffect } from 'react';
import Navbar from '../../components/layouts/navbar';
import * as jobActions from '../../store/job';
import * as applicationActions from '../../store/application';
import { connect, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    CurrencyDollarIcon,
    LinkIcon,
    LocationMarkerIcon,
    MailIcon,
} from '@heroicons/react/solid';
import Spinner from '../../components/spinner';

const ViewJob = ({
    match,
    history,
    jobs: { selectedJob, loading },
    applications: { jobApplications },
    viewJob,
    getAllJobApplications,
    jobId
}) => {

    const dispatch = useDispatch()
    useEffect(() => {
        viewJob(jobId, history);
        getAllJobApplications(jobId, history);
    }, [viewJob, getAllJobApplications, history, jobId]);

    if (loading && !selectedJob) {
        return <Spinner />;
    }

    return (
        <div>
            <div className="max-w-5xl px-2 mx-auto sm:px-4 lg:px-8 font-inter">
                <header className="py-4">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
                        <div className="flex-1 min-w-0">
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-4">
                                    <li>
                                        <div>
                                            <div
                                                // onClick={() => {
                                                //     dispatch({title: 'My Applications', title: 'My Applications'})
                                                //     dispatch({type: 'Application', appId: jobId})
                                                // }}
                                                to="/applications"
                                                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                            >
                                                Jobs
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <ChevronRightIcon
                                                className="flex-shrink-0 w-5 h-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            {selectedJob.positionTitle}
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                {selectedJob.positionTitle}
                            </h1>
                            <div className="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <BriefcaseIcon
                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    {selectedJob.jobType}
                                </div>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <LocationMarkerIcon
                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    {selectedJob.location ? (
                                        selectedJob.location
                                    ) : (
                                        <span>
                                            {selectedJob.organization?.city},{' '}
                                            {
                                                selectedJob.organization
                                                    ?.stateProvince
                                            }
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <CurrencyDollarIcon
                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    {selectedJob.salary}
                                </div>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <CalendarIcon
                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    Closing on{' '}
                                    {new Date(
                                        selectedJob.closingDate
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-5 xl:mt-0 xl:ml-4">
                            <span className="hidden ml-0 md:ml-3 sm:block">
                                {/* <Link
                                    to={`/jobs/${jobId}`}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-teal-500"
                                >
                                    <LinkIcon
                                        className="w-5 h-5 mr-2 -ml-1 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    View
                                </Link> */}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="pt-8 pb-16">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <h1 className="pb-4 text-xl font-semibold text-gray-700 border-b border-gray-200 font-baskerville">
                            Applications
                        </h1>
                        {/* Stacked list */}
                        <ul className="mt-2 divide-y divide-gray-200">
                            {jobApplications.map((application) => (
                                <li key={application._id}>
                                    <div
                                        onClick={() => {
                                            dispatch({ type: 'title', title: 'My Applications' })
                                            dispatch({ type: 'Application', appId: application._id })
                                        }}
                                        to={`/applications/${application._id}`}
                                        className="block group cursor-pointer"
                                    >
                                        <div className="flex items-center px-4 py-5 sm:py-6 sm:px-0">
                                            <div className="flex items-center flex-1 min-w-0">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full">
                                                        <p className="p-2 font-bold text-center text-blue-900 font-nunito">
                                                            {
                                                                application
                                                                    ?.profile
                                                                    .firstName[0]
                                                            }
                                                            {
                                                                application
                                                                    ?.profile
                                                                    .lastName[0]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-teal-600 truncate">
                                                            {
                                                                application
                                                                    ?.profile
                                                                    .firstName
                                                            }{' '}
                                                            {
                                                                application
                                                                    ?.profile
                                                                    .lastName
                                                            }
                                                        </p>
                                                        <p className="flex items-center mt-2 text-sm text-gray-500">
                                                            <MailIcon
                                                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                            <span className="truncate">
                                                                {
                                                                    application
                                                                        .profile
                                                                        ?.email
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="hidden md:block">
                                                        <div>
                                                            <p className="text-sm text-gray-900">
                                                                Applied on{' '}
                                                                {new Date(
                                                                    application.createdAt
                                                                ).toLocaleDateString()}
                                                            </p>
                                                            <p className="flex items-center mt-2 text-sm text-gray-500">
                                                                <CheckCircleIcon
                                                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                                                    aria-hidden="true"
                                                                />
                                                                {
                                                                    application.status
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <ChevronRightIcon
                                                    className="w-5 h-5 text-gray-400 group-hover:text-gray-700"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    jobs: state.jobs,
    applications: state.application,
});

export default withRouter(
    connect(mapStateToProps, { ...jobActions, ...applicationActions })(ViewJob)
);
