import React, { useState, useEffect } from 'react'
import { createProfile, getProfile } from '../../../store/profile/index'
import { createOrganization } from '../../../store/company/index'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Spinner from '../../../components/spinner'
import EdiText from 'react-editext'
import Progress from 'react-progressbar'
const Submit = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [localData, setLocalData] = useState()
  const dataz = JSON.parse(localStorage.getItem('formData'))
  useEffect(() => {
    let a = JSON.parse(localStorage.getItem('formData')).formData
    a.companyName = localStorage.getItem('companyName')
    setLocalData(a)
  }, [])
  const dataSave = (data) => {
    let a = { ...localData }
    a.firstName = data
    setLocalData(a)
  }
  const dataSave1 = (data) => {
    let a = { ...localData }
    a.lastName = data
    setLocalData(a)
  }
  const dataSave2 = (data) => {
    let a = { ...localData }
    localStorage.setItem('companyName', data)
    a.companyName = data
    setLocalData(a)
  }
  useEffect(() => {
    dataz.formData = { ...localData }
    localStorage.setItem('formData', JSON.stringify(dataz))
  }, [localData])

  const h = useHistory()
  const data = () => {
    setLoading(true)
    let data = JSON.parse(localStorage.getItem('formData'))
    data.joinOrCreate =
      localStorage.getItem('orgcode') != '' ? 'join' : 'create'
    if (localStorage.getItem('companyName') != '') {
      data.companyResults = {
        name: localStorage.getItem('companyName'),
        email: localStorage.getItem('email'),
      }
    } else {
      data.companyResults = {}
    }

    dispatch(
      createProfile(
        data.formData,
        data.history,
        data.resume,
        data.companyResults,
        (data.companyCode = localStorage.getItem('orgcode')),
        data.joinOrCreate,
      ),
    )
    //dispatch(createOrganization({name: data.formData.companyName,email:localStorage.getItem('email'),role:''}))
    setTimeout(async () => {
      await dispatch(getProfile())
      setLoading(false)
      localStorage.removeItem('formData')
      localStorage.removeItem('email')
      localStorage.removeItem('href')
      h.push({ pathname: '/dashboard', state: { status: true } })
    }, 3000)
  }
  return (
    <div>
      <div style={{ display: loading ? 'block' : 'none' }}>
        <Spinner />
      </div>
      <form class="max-w-xl p-8 mx-auto bg-white rounded">
        <div className="text-base text-gray-700 mb-2">
          Step{' '}
          {localStorage.getItem('companyName') != '' ? ' 3 of 3' : ' 2 of 2'}
        </div>
        <Progress className="cm-progress" completed={75} />
        <h2 className="mt-6 text-3xl font-bold text-gray-700 font-baskerville">
          Review
        </h2>
        <div className="mt-6">
          <label className="font-bold text-base text-gray-700">
            First name
          </label>
          <EdiText
            //hideIcons={publicProfile}
            className="edit-btn cm-edit-btn"
            type="text"
            onSave={dataSave}
            value={localData?.firstName}
          />
          <label className="font-bold text-base text-gray-700">Last name</label>
          <EdiText
            //hideIcons={publicProfile}
            className="edit-btn"
            type="text"
            onSave={dataSave1}
            value={localData?.lastName}
          />
          <label className="font-bold text-base text-gray-700">Company</label>
          {localStorage.getItem('companyName') != '' ? (
            <EdiText
              //hideIcons={publicProfile}
              className="edit-btn"
              type="text"
              onSave={dataSave2}
              value={localData?.companyName}
            />
          ) : (
            <>
              <br />{' '}
              <label className="text-base mt-2 pb-5 text-gray-700">
                {localStorage.getItem('orgname')}
              </label>
            </>
          )}

          <div className="grid">
            <label className="font-bold text-base text-gray-700">Plan</label>
            <label className="text-base mt-2 text-gray-700">
              {localStorage.getItem('productLabel')}
            </label>
          </div>
        </div>
        <div class="flex justify-between max-w-xl mx-auto mt-4">
          <button
            onClick={data}
            class="px-14 py-3 text-white bg-teal-600 rounded-3xl"
            type="button"
          >
            Start free trial
          </button>
        </div>
      </form>
    </div>
  )
}

export default Submit
