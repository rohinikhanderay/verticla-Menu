import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import * as actions from '../../store/profile'
import { Redirect, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Wizard from './Wizard'
import NuleepLogo from '../../assets/landingPages/nuleepLogo.png'
import Welcome from './steps/welcome'
import JSPersonalInformation from './steps/jobSeeker.personalInformation'
import JSEducation from './steps/jobSeeker.education'
import JSExperience from './steps/jobSeeker.experience'
import JSSkillsResume from './steps/jobSeeker.skillsResume'
import JSSubmit from './steps/jobSeeker.submit'
import RecruiterPersonal from './steps/recruiter.personalInformation'
import RecruiterCreateJoin from './steps/recruiter.createJoin'
import RecruiterSubmit from './steps/recruiter.submit'
import Subscription from './steps/jobSeeker.subscription'
import { useLocation, useHistory } from 'react-router-dom'
import AlertModel from './steps/alertModel'
import { claimCompRquest } from '../../store/auth/index'

const OnBoarding = ({
  profile,
  getProfile,
  createProfile,
  history,
  stripePayament,
}) => {
  const [role, setRole] = useState(null)
  const [showWizard, setShowWizard] = useState(false)
  const [loading, setLoading] = useState(false)
  const [joinOrCreate, setJoinOrCreate] = useState(null)
  const [isShow, setIsShow] = useState(false)
  const search = useLocation().search
  const h = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    if (h.location.state) {
      setRole(h.location.state.type)
      setShowWizard(h.location.state.status)
    }
  }, [])
  useEffect(() => {
    getProfile()
  }, [getProfile])
  useEffect(() => {
    if (new URLSearchParams(search).get('success')) {
      let data = JSON.parse(localStorage.getItem('formData'))

      setShowWizard(true)
      // localStorage.removeItem("formData");
      return <RecruiterSubmit />
    }
  }, [])
  useEffect(() => {
  }, [isShow])
  // if (profile.profile) {
  //   return <Redirect to="/dashboard" />;
  // }

  const closeAlert = () => {
    setIsShow(false)
  }
  const sendEmail = async () => {
    const dataz = JSON.parse(localStorage.getItem('formData'))

    await dispatch(
      claimCompRquest({
        orgId: localStorage.getItem('orgId'),
        fName: dataz.formData.firstName,
        lName: dataz.formData.lastName,
        reqEmail: localStorage.getItem('email'),
        compName: localStorage.getItem('orgname'),
      }),
    ).then((res) => {
      return (window.location.href = '/onboarding?success=true')
    })
  }

  const onSubmit = async (values) => {
    let formData
    let companyResults
    if (role === 'jobSeeker') {
      // Remove Resume property from results so that it does not add in a blank resume ID key in when posting
      const objectWithoutKey = (object, key) => {
        const { [key]: deletedKey, ...otherKeys } = object
        return otherKeys
      }
      formData = objectWithoutKey(values, 'resume')
      createProfile(
        formData,
        history,
        values.resume,
        companyResults,
        values.companyCode,
        joinOrCreate,
      )
    }

    if (role === 'recruiter') {
      joinOrCreate === 'create' &&
        (companyResults = {
          name: values.companyName,
          about: values.companyAbout,
          streetAddress: values.companyStreet,
          countryRegion: values.companyCountryRegion,
          stateProvince: values.companyStateProvince,
          zipPostal: values.companyZipPostal,
          city: values.companyCity,
          email: values.companyEmail,
          culture: values.companyCulture,
          mission: values.companyMission,
          benefits: values.companyBenefits,
          perks: values.companyPerks,
        })
      formData = values

      localStorage.setItem(
        'formData',
        JSON.stringify({
          formData: formData,
          history: history,
          resume: values.resume,
          companyResults: companyResults,
          companyCode: values.companyCode,
          joinOrCreate: joinOrCreate,
        }),
      )
      if (localStorage.getItem('companyName') !== '') {
        let data = await stripePayament({
          email: localStorage.getItem('email'),
          productId: localStorage.getItem('productId'),
        })
        window.location.href = data.url
      } else {
        // 1152 - Task - Remove Claim company
        // if (localStorage.getItem('compVerify') == 'false') {
        //   setIsShow(true)
        // } else {
          return (window.location.href = '/onboarding?success=true')
        // }
      }
    }
  }

  return (
    <div className="">
      {/* // 1152 - Task - Remove Claim company 
      {isShow ? (
        <AlertModel isShow={isShow} isHide={closeAlert} sendEmail={sendEmail} />
      ) : (
        ''
      )} */}
      {/* <header>
        <div className="flex justify-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Link to="/">
            <img
              className="block w-auto h-8 "
              src={NuleepLogo}
              alt="nuleep logo"
            ></img>
          </Link>
        </div>
      </header> */}

      {/* Welcome screen | Select Role */}
      {/* {!showWizard && (
        <Welcome role={role} setRole={setRole} setShowWizard={false} />
      )} */}
      {new URLSearchParams(search).get('success') && <RecruiterSubmit />}

      {/* If Job Seeker is selected render job seeker wizard form */}
      {role === 'jobSeeker' && showWizard && (
        <Wizard
          initialValues={{
            role: 'jobSeeker',
            education: [
              {
                schoolOrOrganization: '',
              },
            ],
            experience: [
              {
                title: '',
                description: [''],
              },
            ],
          }}
          onSubmit={onSubmit}
        >
          <Wizard.Page setShowWizard={setShowWizard}>
            {/* <button
              className="mb-4 text-red-300"
              onClick={() => setShowWizard(false)}
            >
              Back
            </button> */}
            <JSPersonalInformation />
          </Wizard.Page>

          <Wizard.Page>
            <JSEducation />
          </Wizard.Page>

          <Wizard.Page>
            <JSExperience />
          </Wizard.Page>

          <Wizard.Page>
            <JSSkillsResume />
          </Wizard.Page>

          <Wizard.Page>
            <JSSubmit />
          </Wizard.Page>
        </Wizard>
      )}

      {/* If Recruiter` is selected render job seeker wizard form */}
      {role === 'recruiter' && showWizard && (
        <Wizard
          initialValues={{ role: 'recruiter' }}
          history={h}
          onSubmit={onSubmit}
        >
          <Wizard.Page setShowWizard={setShowWizard}>
            {/* <button
              className="mb-4 text-red-300"
              onClick={() => setShowWizard(false)}
            >
              Back
            </button> */}
            <RecruiterPersonal />
          </Wizard.Page>

          {/* <Wizard.Page>
            <RecruiterCreateJoin
              joinOrCreate={joinOrCreate}
              setJoinOrCreate={setJoinOrCreate}
            />
          </Wizard.Page> */}

          <Wizard.Page>
            <Subscription />
          </Wizard.Page>
          {/* <Wizard.Page>
            <RecruiterSubmit />
          </Wizard.Page> */}
        </Wizard>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default withRouter(connect(mapStateToProps, actions)(OnBoarding))
