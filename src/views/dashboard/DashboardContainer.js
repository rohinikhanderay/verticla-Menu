import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
// import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom'
import Spinner from '../../components/spinner'
import * as actions from '../../store/profile'
import JobSeekerDashboard from './jobSeekerDashboard'
import RecruiterDashboard from './recruiterDashboard'
import { socketEstablish } from '../../store/chat/index'
import Unapproved from '../../components/layouts/unApprove'
import BetaSign from '../../components/layouts/betaSignage'

const Dashboard = ({ getProfile, profile, history }) => {
  const dispatch = useDispatch()
  const sockets = useSelector((state) => state.chat)

  const state = useSelector(state => state)

  useEffect(() => {
    getProfile()
  }, [getProfile])

  if (profile.loading || !profile.profile) {
    return <Spinner />
    // history.push({
    //       pathname: "/onboarding",
    //       state: { type: 'recruiter', status: true },
    //     });
  }
  //@ socket-24/3/22
  if (profile?.profile) {
    if (sockets && sockets.socket.length == 0) {
      dispatch(socketEstablish())
    }
  }

  if (!localStorage.getItem('token')) {
    history.push('/')
  }

  return (
    <div className="min-h-screen">
      {profile.profile?.userRef.role === 'jobSeeker' && (
        <JobSeekerDashboard
          profile={profile}
          loginVal={history.location.state?.login ? true : false}
        />
      )}
      {profile.profile?.userRef.role === 'recruiter' &&
      profile.profile.organizationApproved ? (
        <RecruiterDashboard loading={history.location.state ? true : false} />
      ) : (
        profile.profile?.userRef.role === 'recruiter' && <Unapproved />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default withRouter(connect(mapStateToProps, actions)(Dashboard))
