import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/Footer.js'
import { useState, useEffect, useRef } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getAllBlogs, likeBlog, fetchDetails } from '../../store/blog/index'
import { useSelector, useDispatch } from 'react-redux'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import noImage from '../../assets/images/No-Image.png'
import parse from 'html-react-parser'
const BlogDetails = (props) => {
  const dispatch = useDispatch()
  const blogData = useSelector((state) => state.blog)
  const profileData = useSelector((state) => state.profile)
  const [isLiked, setIsLiked] = useState(false)
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

  useEffect(() => {
    dispatch(fetchDetails({ _id: props.match.params.id }))
  }, [])

  // const stringToHTML = function (str, id) {
  //   if (str != undefined) {
  //     setTimeout(() => {
  //       document.getElementById(id).innerHTML = str
  //     }, 200)
  //   }
  // }

  const likeHandler = (id) => {
    dispatch(likeBlog(id, { userId: profileData.profile._id })).then((res) => {
      if (res) {
        dispatch(fetchDetails({ _id: props.match.params.id }))
      }
    })

    setIsLiked(!isLiked)
  }
  return (
    <>
      <Navbar />
      <div className="container m-auto px-5">
        <div className="mb-3 mt-5 w-11/12 m-auto xs:mb-14">
          {/* <h1 className="container m-auto lg:text-5xl md:text-4xl flex items-center text-3xl font-semibold xs:text-2xl">
            <svg
              viewBox="0 0 32 32"
              className="inline mr-3"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '40px',
                fill: '#38acb8',
                cursor: 'pointer',
                display: 'none',
              }}
            >
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z" />
                <path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z" />
              </g>
            </svg>
            Blogs
          </h1> */}
        </div>
        <>
          <div className="mx-auto my-auto flex -mx-4 mt-10 justify-center">
            {blogData &&
              blogData?.blogDetails?.map((item, index) => {
                return (
                  <div className="rounded-lg mb-6 cus-width w-full px-4">
                    <div className="p-4">
                      <h2 className="font-bold mb-2 md:mt-4 text-5xl text-gray-800 tracking-normal ">
                        {item.title}
                      </h2>
                    </div>
                    <a target="_blank" rel="noreferrer noopener" href="#">
                      <div className="md:flex-shrink-0 blog-img">
                        <img
                          src={item?.blogImg ? item?.blogImg?.fullUrl : noImage}
                          className="object-cover w-full h-auto rounded-lg rounded-b-none"
                        />
                      </div>
                    </a>
                    <div className="py-1">
                      <div className="p-4">
                        {/* <h2 className="truncate font-bold mb-2 md:mt-4 text-2xl text-gray-800 tracking-normal ">
                          {item.title}
                        </h2> */}
                        <p
                          className="break-words text-lg text-gray-700 textPrintClass"
                          id={`text-${index}`}
                        >
                          {parse(item.content)}
                          {/* {stringToHTML(item.content, `text-${index}`)} */}
                          {}
                        </p>
                      </div>
                      <div className="flex items-center justify-between md:mx-4 pb-4">
                        <a rel="noreferrer noopener" href="javascript:void(0)">
                          <div className="flex items-center">
                            <div className="text-sm">
                              {/* <p className="text-black leading-none">
                                vcxvcxvcxvcxvcxvc
                              </p> */}
                              <p className="text-gray-700 text-lg">
                                {timeAgo.format(new Date(item.createdAt))}
                              </p>
                            </div>
                          </div>
                        </a>
                        <div className="flex items-center">
                          {/* <a
                            rel="noreferrer noopener"
                            href="#"
                            className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 py-2" 
                          >
                            Read More
                          </a> */}
                          {/* <Link
                            key={index}
                            to={`/blog/${item._id}`}
                            className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 py-2"
                          >
                            Read More
                          </Link> */}
                          <span className="ml-3 flex cursor-pointer">
                            {item?.likes?.includes(
                              profileData?.profile?._id,
                            ) ? (
                              <svg
                                onClick={() => likeHandler(item._id)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="teal"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" />
                              </svg>
                            ) : (
                              <svg
                                onClick={() => likeHandler(item._id)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                fill="teal"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path d="M17.516 3c2.382 0 4.487 1.564 4.487 4.712 0 4.963-6.528 8.297-10.003 11.935-3.475-3.638-10.002-6.971-10.002-11.934 0-3.055 2.008-4.713 4.487-4.713 3.18 0 4.846 3.644 5.515 5.312.667-1.666 2.333-5.312 5.516-5.312zm0-2c-2.174 0-4.346 1.062-5.516 3.419-1.17-2.357-3.342-3.419-5.515-3.419-3.403 0-6.484 2.39-6.484 6.689 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-4.586-3.414-6.689-6.484-6.689z" />
                              </svg>
                            )}{' '}
                            <div className="ml-2">{item?.likes.length}</div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </>
      </div>
      <Footer />
    </>
  )
}
export default BlogDetails
