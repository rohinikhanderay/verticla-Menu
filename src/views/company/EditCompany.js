import Navbar from '../../components/layouts/navbar'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import {
  viewOrganization,
  editOrganization,
  updateCompanyProfile,
  deleteCompanyImage,
} from '../../store/company/index'

import { Link, withRouter, Redirect } from 'react-router-dom'

const initialState = {
  about: '',
  benefits: [],
  culture: '',
  email: '',
  mission: '',
  name: '',
  perks: [],
  city: '',
}

const EditCompany = ({ match, history }) => {
  const [form, setForm] = useState(initialState)
  const [fileUploadProcess, setFileUploadProcess] = useState(false)
  const dispatch = useDispatch()

  const companyData = useSelector((state) => state.company)

  useEffect(() => {
    if (companyData.selectedCompany !== null) {
      let company = companyData.selectedCompany?.organization
      setForm({
        ...form,
        name: company.name,
        about: company.about,
        benefits: company.benefits,
        culture: company.culture,
        email: company.email,
        mission: company.mission,
        perks: company.perks,
        city: company.city,
        orgImage: company.orgImage,
      })
    }
  }, [companyData])

  useEffect(() => {
    dispatch(viewOrganization(match.params.id))
  }, [])

  const submit = (e) => {
    e.preventDefault()
    dispatch(editOrganization(form, match.params.id, history))
  }
  const blogImageUploadHandle = (e) => {
    if (e.target?.files?.length !== 0) {
      setFileUploadProcess(true)
      const data = new FormData()
      data.append('file', e.target?.files[0])
      data.append('orgID', match.params.id)
      dispatch(updateCompanyProfile(data)).then((res) => {
        if (res) {
          setFileUploadProcess(false)
          console.log(res.data)
          setForm({
            ...form,
            orgImage: res.data.orgImage,
          })
        }
      })
    }
  }

  const deleteCompany = (e) => {
    // See if we want this feature to be in here or somewhere else
    // deleteJob(match.params.id, history);
  }
  const deleteImage = () => {
    dispatch(
      deleteCompanyImage({
        orgID: match.params.id,
        file: form?.orgImage?.blobName,
      }),
    ).then((res) => {
      dispatch(viewOrganization(match.params.id))
    })
    return false
  }

  return (
    <>
      {' '}
      <div>
        <Navbar />
        <img
          className="object-cover object-center w-full h-48 border-t-2"
          src="https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt="office"
        />

        <div className="max-w-4xl px-8 mx-auto mt-12 mb-24 sm:px-2 md:px-4 font-inter">
          <h1 className="text-3xl font-bold leading-tight tracking-wide text-gray-700 font-baskerville">
            Edit Company
          </h1>
          <p className="mt-2 text-gray-500 text-md">
            Edit or update your company information below.
          </p>
          <main>
            <form onSubmit={(e) => submit(e)} className="mt-12 ">
              <div className="px-4 py-5 bg-white border-t-8 border-teal-600 shadow sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-bold leading-6 text-gray-700">
                      Company Information
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">
                      Edit your company details here. This will be seen by
                      everyone when viewing your organization.
                    </p>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label htmlFor="companyName">
                            Organization / Company Name
                          </label>
                          <input
                            onChange={(e) =>
                              setForm({
                                ...form,
                                name: e.target.value,
                              })
                            }
                            readOnly={true}
                            value={form.name}
                            type="text"
                            name="companyName"
                            id="companyName"
                            className="block w-full border  opacity-50 cursor-not-allowed border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="positionTitle"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Image
                          </label>
                          <div className="mt-1 mb-3">
                            {' '}
                            <input
                              onChange={(e) => blogImageUploadHandle(e)}
                              type="file"
                              className="block w-full mt-1 border-gray-300 pb-3 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                          </div>
                          <div className="relative inline-block hover-class-btn">
                            <div className="img-box">
                              {form && form?.orgImage ? (
                                <img
                                  src={form?.orgImage?.fullUrl}
                                  height="250"
                                  width="250"
                                />
                              ) : (
                                ''
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => deleteImage()}
                              className="absolute top-2/4 left-2/4 z-20  p-1 text-sm delet-btn rounded-md bg-teal-600 p-2 text-white"
                              style={{ transform: 'translate(-50%, -50%)' }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700"
                          >
                            About
                          </label>
                          <div className="mt-2">
                            <textarea
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  about: e.target.value,
                                })
                              }
                              value={form.about}
                              type="text"
                              id="companyAbout"
                              rows={3}
                              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                            />
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="culture"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Culture
                          </label>
                          <div className="mt-1">
                            <textarea
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  culture: e.target.value,
                                })
                              }
                              value={form.culture}
                              type="text"
                              id="companyCulture"
                              rows={3}
                              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                            />
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="mission"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mission
                          </label>
                          <div className="mt-1">
                            <textarea
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  mission: e.target.value,
                                })
                              }
                              value={form.mission}
                              type="text"
                              id="companyMission"
                              rows={3}
                              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                            />
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="benefits"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Benefits
                          </label>
                          <div className="mt-1">
                            <textarea
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  benefits: e.target.value,
                                })
                              }
                              value={form.benefits}
                              type="text"
                              id="companyBenefits"
                              rows={3}
                              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                            />
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="perks"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Perks
                          </label>
                          <div className="mt-1">
                            <textarea
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  perks: e.target.value,
                                })
                              }
                              value={form.perks}
                              type="text"
                              id="companyPerks"
                              rows={3}
                              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                            />
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="companyEmail"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Public Email Address
                          </label>
                          <div className="mt-1">
                            <input
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  email: e.target.value,
                                })
                              }
                              value={form.email}
                              type="email"
                              readOnly={true}
                              id="companyEmail"
                              className="block w-full opacity-50 cursor-not-allowed	 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                          >
                            City
                          </label>
                          <input
                            onChange={(e) =>
                              setForm({
                                ...form,
                                city: e.target.value,
                              })
                            }
                            value={form.city}
                            type="text"
                            name="city"
                            id="city"
                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex items-center justify-between">
                  <p
                    onClick={(e) => deleteCompany(e)}
                    className="px-4 py-2 text-red-300 border border-red-300 rounded cursor-pointer"
                  >
                    Delete Company
                  </p>
                  <div className="flex justify-end">
                    <Link
                      to="/company/${match.params.id}"
                      className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm text-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  )
}
export default EditCompany
