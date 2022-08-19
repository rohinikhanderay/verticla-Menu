import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import reducers from './store'
import Home from './views/landingPages/LandingPage'
import PrivacyPolicy from './views/landingPages/PrivacyPolicy'
import Signin from './views/auth/Signin'
import PartnersSignup from './views/auth/partners/PartnersSignup'
import PartnersSignin from './views/auth/partners/PatnersSignin'
import Signup from './views/auth/Signup'
import ForgotPassword from './views/auth/ForgotPassword'
import ResetPassword from './views/auth/ResetPassword'
import Signout from './views/auth/Signout'
import RequireAuth from './utils/require_auth'
import Dashboard from './views/dashboard/DashboardContainer'
import OnBoarding from './views/onBoarding/OnBoarding'
import Partners from './views/landingPages/PartnerLandingPage'
import Company from './views/company/Company'
import CompanyDashboard from './views/company/CompanyDashboard'
import EditCompany from './views/company/EditCompany'
import Job from './views/jobs/Job'
import Jobs from './views/jobs/Jobs'
import CreateJob from './views/jobs/CreateJob'
import EditJob from './views/jobs/EditJob'
import Profile from './views/NewProfile/profile'
import Application from './views/applications/Application'
import Applications from './views/applications/ApplicationsContainer'
import NewApplication from './views/applications/NewApplication'
import { AUTH_USER } from './store/auth/types'
import ViewJob from './views/jobs/ViewJob'
import TermsOfUse from './views/landingPages/TermsOfUse'
import ScrollToTop from './utils/scrollToTop'
import About from './views/landingPages/About.js'
import Skill from './views/profile/Skill'
import AdminLogin from './views/admin/Login'
import Candidates from './views/profile/Candidates'

import AdminDashboard from './views/admin/Components/organizations/index'
import JobListing from './views/admin/Components/organizations/jobs/ViewJobs'
import EmployeeListing from './views/admin/Components/organizations/jobs/employees/ViewEmployee'
import AddJob from './views/admin/Components/organizations/jobs/addJob'
import AdminEditJob from './views/admin/Components/organizations/jobs/EditJob'
import AddCompany from './views/admin/Components/organizations/addCompany'
import AEditCompany from './views/admin/Components/organizations/editCompany'
import OwnerShip from './views/admin/Components/organizations/OwnerShip'

import withTracker from './Utility/withTracker'
import VerifyEmail from './components/VerifyEmail'
import RecruiterSubscription from './components/RecruiterSubscription'
import ResetPasswordOrg from './views/auth/ResetPasswordOrg'
import ConversationChat from './views/chat/index'

import AddEvent from '../src/views/admin/Components/events/addEvent'
import AddBlog from '../src/views/admin/Components/blogs/addBlog'
import ListBlog from '../src/views/admin/Components/blogs/index'
import ListEvent from '../src/views/admin/Components/events/index'
import AdminLeaderboard from '../src/views/admin/Components/leaderboard/index'
import Blogs from '../src/views/blogs/index'
import BlogDetails from '../src/views/blogs/blog'
import ArchiveEvents from '../src/views/admin/Components/events/archiveEvents'
import EventUsers from '../src/views/admin/Components/events/eventUsers'
import EventPage from '../src/views/events/index'
import EventDetails from '../src/views/events/eventDetails'
import ArchiveEmyployee from '../src/views/admin/Components/organizations/jobs/employees/ArchiveEmployee'
import { useDispatch } from 'react-redux'
import { socketEstablish } from './store/chat/index'
import PrivateRoute from './utils/private_route'
import Leaderboard from "./views/leaderboard/Leaderboard";
import DashboardNew from './views/Dashboard_new/DashboardNew'

function App() {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxThunk)),
  )

  // This forces a persistent authtentication on reload
  const token = localStorage.getItem('token')
  // If we have a token, consider the user to be signin in
  if (token) {
    // We need to update application state
    store.dispatch({ type: AUTH_USER })
    //@ socket-24/3/22
    store.dispatch(socketEstablish())
  }

  return (

    // <DashboardNew />

    // <Example />
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route
              path="/onboarding"
              component={withTracker(RequireAuth(OnBoarding))}
              exact
            />
            <Route path="/partners" component={withTracker(Partners)} exact />
            <Route path="/signup" component={withTracker(Signup)} exact />
            <Route path="/signin" component={withTracker(Signin)} exact />
            <Route
              path="/admin/signin"
              component={withTracker(AdminLogin)}
              exact
            />
            <Route path="/events" component={withTracker(EventPage)} exact />

            <Route
              path="/partnersSignup"
              component={withTracker(PartnersSignup)}
              exact
            />
            <Route
              path="/partnersSignin"
              component={withTracker(PartnersSignin)}
              exact
            />

            <Route
              path="/forgotpassword"
              component={withTracker(ForgotPassword)}
              exact
            />
            <Route
              path="/:orgId/forgotpassword/:resetID/:data"
              component={withTracker(ResetPasswordOrg)}
              exact
            />
            <Route
              path="/forgotpassword/:resetID"
              component={withTracker(ResetPassword)}
              exact
            />
            <Route
              path="/:pId/verifyEmail"
              component={withTracker(VerifyEmail)}
              exact
            />
            <Route path="/signout" component={withTracker(Signout)} exact />
            <Route
              path="/company"
              component={withTracker(RequireAuth(CompanyDashboard))}
              exact
            />
            <Route
              path="/company/:type"
              component={withTracker(RequireAuth(CompanyDashboard))}
              exact
            />
            <Route
              path="/companyProfile/:id"
              component={withTracker(Company)}
              exact
            />
            <Route
              path="/company/:id/edit"
              component={RequireAuth(EditCompany)}
              exact
            />
            <Route path="/jobs" component={withTracker(Jobs)} exact />
            <Route
              path="/jobs/new"
              component={withTracker(RequireAuth(CreateJob))}
              exact
            />
            <Route path="/jobs/:id" component={withTracker(Job)} exact />
            <Route
              path="/jobs/:id/edit"
              component={withTracker(RequireAuth(EditJob))}
              exact
            />
            {/* <Route path="/profiles/:id" component={Profile} exact /> */}
            <Route
              path="/profiles/:id"
              component={withTracker(Profile)}
              exact
            />
            <Route
              path="/applications/"
              component={withTracker(RequireAuth(Applications))}
              exact
            />
            <Route
              path="/applications/:id"
              component={withTracker(RequireAuth(Application))}
              exact
            />
            <Route
              path="/jobs/:id/new"
              component={withTracker(RequireAuth(NewApplication))}
              exact
            />
            <Route
              path="/jobs/:id/view"
              component={withTracker(RequireAuth(ViewJob))}
              exact
            />

            <Route 
              path="/leaderboard" 
              component={withTracker(RequireAuth(Leaderboard))} 
              exact 
            />

            <Route path="/dashboard" component={withTracker(RequireAuth(DashboardNew))} exact />
            <Route path="/privacypolicy" component={withTracker(PrivacyPolicy)} exact />
            <Route path="/termsofuse" component={withTracker(TermsOfUse)} exact />
            <Route
              path="/dashboard"
              component={withTracker(RequireAuth(DashboardNew))}
              exact
            />
            <Route
              path="/blogs"
              component={withTracker(RequireAuth(Blogs))}
              exact
            />
            <Route
              path="/privacypolicy"
              component={withTracker(PrivacyPolicy)}
              exact
            />
            <Route
              path="/termsofuse"
              component={withTracker(TermsOfUse)}
              exact
            />
            <Route path="/about" component={withTracker(About)} exact />
            <Route
              path="/skill/:id"
              component={withTracker(RequireAuth(Skill))}
              exact
            />
            <Route path="/" component={withTracker(Home)} exact />
            <Route
              path="/candidates"
              component={RequireAuth(Candidates)}
              exact
            />
            {/* // 1149 - Non admins are able to access Admin Dashboard - added protected route for restriction */}
            {/* org routes */}
            <PrivateRoute
              path="/admin/organization"
              component={RequireAuth(AdminDashboard)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute
              path="/admin/organization/:id/jobs"
              component={RequireAuth(JobListing)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute
              path="/admin/organization/:id/employee"
              component={RequireAuth(EmployeeListing)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute
              path="/admin/organization/:id/archiveEmployee"
              component={RequireAuth(ArchiveEmyployee)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute
              path="/admin/organization/:id/job/add"
              component={RequireAuth(AddJob)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute
              path="/admin/organization/job/:id/edit"
              component={RequireAuth(AdminEditJob)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute
              path="/admin/organization/add"
              component={RequireAuth(AddCompany)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute
              path="/admin/organization/:id/edit"
              component={RequireAuth(AEditCompany)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute
              path="/admin/organization/:id/ownerShip"
              component={RequireAuth(OwnerShip)}
              exact
              allowedRoles={["admin"]}
            />
            {/* blogs routes */}
            <PrivateRoute
              path="/admin/blog/add"
              component={RequireAuth(AddBlog)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute
              path="/admin/blog/:id/edit"
              component={RequireAuth(AddBlog)}
              exact
              allowedRoles={["admin"]}
            />
            <PrivateRoute path="/admin/blog" component={RequireAuth(ListBlog)} exact allowedRoles={["admin"]}/>
            <PrivateRoute path="/admin/leaderboard" component={RequireAuth(AdminLeaderboard)} exact allowedRoles={["admin"]}/>
            
            {/* // 1151 - Task - Remove Events capabilities in Stage - commented the route as per the story */}
            {/* events routes */}
            {/* <Route
              path="/admin/event"
              component={RequireAuth(ListEvent)}
              exact
            />
            <Route
              path="/admin/event/:id/users"
              component={RequireAuth(EventUsers)}
              exact
            />

            <Route
              path="/admin/event/archive"
              component={RequireAuth(ArchiveEvents)}
              exact
            />
            <Route
              path="/admin/event/:id/edit"
              component={RequireAuth(AddEvent)}
              exact
            />
            <Route
              path="/admin/event/add"
              component={RequireAuth(AddEvent)}
              exact
            />
            <Route
              path="/subscription/"
              component={RequireAuth(RecruiterSubscription)}
              exact
            /> */}
            {/* <Route path="/conversations" render={()=><ConversationChat socket={socket}/>}  exact />
             <Route path="/conversations/:id" render={()=><ConversationChat socket={socket}/>}  exact /> */}
            {/*//@ socket-24/3/22 */}
            <Route path="/conversations" component={ConversationChat} exact />
            <Route path="/blog/:id" component={BlogDetails} exact />
            <Route path="/event/:id" component={EventDetails} exact />
            {/*//@ socket-24/3/22*/}
            <Route
              path="/conversations/:id"
              component={ConversationChat}
              exact
            />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  )
}

export default App
