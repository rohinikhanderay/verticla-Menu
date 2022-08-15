import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAllEvent, eventDelete } from '../../../../store/event/index'
import Pagination from 'react-js-pagination'
import Layout from '../Layout'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import defaultImage from '../../../../assets/images/de_images.png'
//require("bootstrap/less/bootstrap.less");
const CompanyList = (props) => {
  const dispatch = useDispatch()
  const blogData = useSelector((state) => state.event)
  const [pageNumber, setpageNumber] = useState(1)
  useEffect(() => {
    dispatch(getAdminAllEvent({ isDelete: true, page: pageNumber }))
  }, [])
  const pageChange = (num) => {
    setpageNumber(num)
    dispatch(getAdminAllEvent({ isDelete: true, page: num }))
  }
  // const stringToHTML = function (str, id) {
  //   if (str != undefined) {
  //     setTimeout(() => {
  //       document.getElementById(id).innerHTML = str
  //     }, 0)
  //   }
  // }
  const handleDelete = (id) => {
    // dispatch(eventDelete({ _id: id })).then((res) => {
    //   if (res) {
    //     dispatch(getAdminAllEvent({ page: pageNumber }))
    //   }
    // })
  }
  return (
    <Layout>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center	">
            <h3 className="text-gray-700 text-3xl font-medium">
              Archive Events
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
                        Image
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>

                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Summary
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Register Users
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        End Date
                      </th>

                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {blogData &&
                      blogData?.event?.data?.map((item, index) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={`${
                                      item.eventImg &&
                                      item.eventImg?.length != 0
                                        ? item.eventImg?.fullUrl
                                        : defaultImage
                                    }`}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.title}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.summary}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.userId?.streetAddress}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {item.registerUsers?.length}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                              <span className=" py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {new Date(item.endDate).toLocaleDateString()}
                              </span>
                            </td>

                            <td className="px-6 py-4 whitespace-no-wrap  border-b border-gray-200 text-sm leading-5 font-medium">
                              {/* <a href="#" className="text-teal-600 hover:text-teal-900">View</a> |  */}
                              <NavLink
                                to={`/admin/event/${item._id}/users`}
                                className="text-teal-600 hover:text-teal-900"
                              >
                                Uers{' '}
                              </NavLink>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
              {blogData && blogData?.event?.data?.length != 0 ? (
                <Pagination
                  activePage={pageNumber}
                  itemsCountPerPage={10}
                  totalItemsCount={blogData && blogData?.event?.total}
                  onChange={pageChange}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
export default CompanyList
