import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/profile';
import Navbar from '../../components/layouts/navbar';
import JobSeekerApplicationDashboard from './jobSeekerApplications';
import RecruiterApplicationDashboard from './recruiterApplications';

const Applications = ({ getProfile, profile, history }) => {
    useEffect(() => {
        getProfile(history);
    }, [getProfile, history]);

    if (!profile) {
        history.push('/onboarding');
    }

    return (
        <div>
            <Navbar />
            {profile.profile?.type === 'jobSeeker' && (
                <JobSeekerApplicationDashboard />
            )}
            {profile.profile?.type === 'recruiter' && (
                <RecruiterApplicationDashboard />
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default withRouter(connect(mapStateToProps, actions)(Applications));
