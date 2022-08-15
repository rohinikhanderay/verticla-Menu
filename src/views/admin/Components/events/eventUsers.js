import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetails } from '../../../../store/event/index'
import Pagination from 'react-js-pagination'
import Layout from '../Layout'
import { useHistory } from 'react-router-dom'
import defaultImage from '../../../../assets/images/de_images.png'
//require("bootstrap/less/bootstrap.less");
const CompanyList = (props) => {
  const dispatch = useDispatch()
  const [eventUser, setEventUsers] = useState([])
  useEffect(() => {
    dispatch(fetchDetails({ _id: props?.match?.params?.id })).then((res) => {
      if (res) {
        setEventUsers(res?.data[0])
      }
    })
  }, [])

  return (
    <Layout>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center	">
            <h3 className="text-gray-700 text-3xl font-medium">
              {eventUser?.title &&
                eventUser?.title?.charAt(0).toUpperCase() +
                  eventUser?.title?.slice(1)}{' '}
              Event Users
            </h3>
          </div>
          <div className="mt-8"></div>
          <div className="flex flex-col mt-8">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      {/* <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th> */}
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Payment Id
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {eventUser &&
                      eventUser?.registerUsers?.map((item, index) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {index + 1}
                              </span>
                            </td>

                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.userId.fullName}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.userId.email}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.userId.jobTitle}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.userId.streetAddress}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.paymentId}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.isRefunded == true
                                  ? 'Refunded'
                                  : 'Registered'}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
export default CompanyList
