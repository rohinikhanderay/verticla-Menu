import { useState } from 'react'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminAddCompany } from '../../../../store/company/index'
import { LocationSearchInputAddress } from '../../../test-locations/LocationSearchInputAddress'

const AddCompany = (props) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    companyName: '',
    companyAbout: '',
    companyCulture: '',
    companyMission: '',
    companyBenefits: '',
    companyPerks: '',
    companyEmail: '',
    companyStreet: '',
    zipPostal: '',
  })
  const submit = (e) => {
    e.preventDefault()
    console.log(e.target[7].value)
    if (
      e.target[0].value === '' ||
      e.target[6].value === '' ||
      e.target[8].value === ''
    ) {
      setForm({
        ...form,
        showRequired: true,
      })
      return
    }

    dispatch(adminAddCompany(form, props.history))
    //props.createJob(form, props.history);
  }
  const handleRequirementsChange = (e, requirementIndex) => {
    const { value } = e.target
    const list = form.requirements
    list[requirementIndex] = value
    setForm({ ...form }, (form.requirements = list))
  }
  return (
    <>
      <Layout>
        {' '}
        <div>
          <div className="max-w-4xl px-8 mx-auto mt-12 mb-24 sm:px-2 md:px-4 font-inter">
            <main className="">
              <h1 className="text-3xl font-bold leading-tight tracking-wide text-gray-700 font-baskerville">
                Create Company
              </h1>
              <p className="mt-2 text-gray-500 text-md">
                Register a new company.
              </p>
              <form onSubmit={submit} className="mt-12 ">
                <div className="px-4 py-5 bg-white border-t-8 border-teal-600 shadow sm:rounded-lg sm:p-6">
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                      <h3 className="text-lg font-bold leading-6 text-gray-700">
                        Company Information
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">
                        Enter in your position details here. This will be seen
                        by the applicant when applying to this position.
                      </p>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <div>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6">
                            {form.showRequired ? (
                              <p className="block text-sm font-medium text-red-500">
                                {' '}
                                Required{' '}
                              </p>
                            ) : (
                              ''
                            )}
                            <label
                              htmlFor="positionTitle"
                              className="block text-sm font-medium text-gray-700"
                            >
                              * Organization / Company Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="positionTitle"
                              //placeholder="What are you hiring for? (Software Developer, Finance Intern, etc)"
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  name: e.target.value,
                                })
                              }
                              value={form.name}
                            />
                          </div>

                          <div className="col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              About
                            </label>
                            <div className="mt-1">
                              <textarea
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    about: e.target.value,
                                  })
                                }
                                value={form.about}
                                id="description"
                                name="about"
                                rows={3}
                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                              />
                            </div>
                          </div>

                          <div className="col-span-6">
                            <label
                              htmlFor="description"
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
                                id="description"
                                name="culture"
                                rows={3}
                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                              />
                            </div>
                          </div>

                          <div className="col-span-6">
                            <label
                              htmlFor="description"
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
                                id="description"
                                name="mission"
                                rows={3}
                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                              />
                            </div>
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="description"
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
                                id="description"
                                name="benefits"
                                rows={3}
                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                              />
                            </div>
                          </div>

                          <div className="col-span-6">
                            <label
                              htmlFor="description"
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
                                id="description"
                                name="perks"
                                rows={3}
                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-md"
                              />
                            </div>
                          </div>

                          <div className="col-span-6">
                            {form.showRequired ? (
                              <p className="block text-sm font-medium text-red-500">
                                {' '}
                                Required{' '}
                              </p>
                            ) : (
                              ''
                            )}
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Public Email address
                            </label>
                            <div className="mt-1">
                              <input
                                type="email"
                                name="email"
                                id="positionTitle"
                                placeholder="What are you hiring for? (Software Developer, Finance Intern, etc)"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    email: e.target.value,
                                  })
                                }
                                value={form.email}
                              />
                            </div>
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Street address
                            </label>
                            <div className="mt-1">
                              {/* <input
                                                    type="text"
                                                    name="street"
                                                    id="positionTitle"
                                                    placeholder="What are you hiring for? (Software Developer, Finance Intern, etc)"
                                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            street:
                                                                e.target.value,
                                                        })
                                                    }
                                                    value={form.street}
                                                /> */}
                              <LocationSearchInputAddress
                                {...props.input}
                                id="location"
                                name="city"
                                autoComplete="address-level2"
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    city: e,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-span-6">
                            {form.showRequired ? (
                              <p className="block text-sm font-medium text-red-500">
                                {' '}
                                Required{' '}
                              </p>
                            ) : (
                              ''
                            )}
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              ZIP / Postal Code *
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="zipPostal"
                                //  placeholder="What are you hiring for? (Software Developer, Finance Intern, etc)"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    zipPostal: e.target.value,
                                  })
                                }
                                value={form.zipPostal}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <Link
                      to="/admin/organization"
                      className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm text-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </div>
      </Layout>
    </>
  )
}
export default AddCompany
