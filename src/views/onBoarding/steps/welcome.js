import React from 'react';
import { BriefcaseIcon, OfficeBuildingIcon } from '@heroicons/react/outline';

const Welcome = ({ setRole, role, setShowWizard }) => {
    return (
        <div className="max-w-xl p-12 mx-auto mt-12 text-center bg-white rounded shadow">
            <div>
                <p className="text-3xl text-gray-700 font-baskerville">
                    Welcome to <span className="text-teal-500">Nuleep!</span>
                </p>
                <p className="mt-6 leading-loose text-gray-700">
                    Let’s learn about you and see what you’re about. <br /> A
                    job search starts with you! Let us know what your are here
                    for.
                </p>
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => {
                            setRole('jobSeeker');
                        }}
                        className={`w-1/2 rounded-lg py-7 px-4
                        ${
                            role === 'jobSeeker'
                                ? ` bg-teal-100 text-teal-700 border-4 border-teal-600`
                                : ` border border-gray-500 text-gray-500`
                        }`}
                    >
                        {' '}
                        <BriefcaseIcon className="w-12 h-12 mx-auto" />
                        <p className="mt-2">Looking for a job</p>
                    </button>
                    <button
                        onClick={() => {
                            setRole('recruiter');
                        }}
                        className={`w-1/2 rounded-lg py-7 px-4
                        ${
                            role === 'recruiter'
                                ? ` bg-teal-100 text-teal-600 border-4 border-teal-600`
                                : ` border border-gray-500 text-gray-500`
                        }`}
                    >
                        <OfficeBuildingIcon className="w-12 h-12 mx-auto" />
                        <p className="mt-2">Hiring</p>
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => setShowWizard(true)}
                        disabled={!role}
                        className={`${
                            !role
                                ? 'bg-gray-400 text-white'
                                : 'bg-green-200 text-green-900'
                        } px-24 py-2 mt-8 rounded`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
