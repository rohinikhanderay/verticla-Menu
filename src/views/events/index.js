import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/Footer.js'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getJobSeekarAllEvent, getEventTags } from '../../store/event/index'
import noImage from '../../assets/images/No-Image.png'
const EventPage = () => {
  const dispatch = useDispatch()
  const eventState = useSelector((state) => state.event)
  const [tagArr, setTagArr] = useState([])
  const [slectIndex, setSelectIndex] = useState()
  useEffect(() => {
    dispatch(getJobSeekarAllEvent())
    dispatch(getEventTags()).then((res) => {
      setTagArr(res?.data)
    })
  }, [])
  // useEffect(() => {
  //   if (eventState) {
  //     let a = []
  //     eventState &&
  //       eventState?.seekarEvents?.data?.forEach((element) => {
  //         if (element?.eventTags) {
  //           a.push(element?.eventTags)
  //         }
  //       })

  //     setTagArr(a)
  //   }
  // }, [eventState])

  return (
    <>
      <Navbar />
      <div className="mb-3 mt-5 w-11/12 m-auto xs:mb-14">
        <h1 className="container m-auto lg:text-5xl md:text-4xl flex items-center text-3xl font-semibold xs:text-2xl">
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
          Events
        </h1>
      </div>
      {/* <main className="max-w-5xl px-4 mx-auto md:px-0">
        <div className="">
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 ">
            <a
              className=" border border-gray-100 shadow-md relative img-main"
              href="/applications/621ef15b0841cb38709d5dd2"
            >
              <div className="">
                <img
                  className="rounded-2xl"
                  src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
                ></img>
              </div>
              <div className="absolute bottom-4 right-0 left-0 px-5">
                <p className="p-2 py-5 mt-4 rounded-xl text-center bg-green-100">
                  Applied on 02/03/2022
                </p>
              </div>
            </a>
            <a
              className="border border-gray-100 shadow-md relative img-main"
              href="/applications/621dc48d1d574656a318dd7f"
            >
              <div className="">
                <img
                  className="rounded-2xl"
                  src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
                ></img>
              </div>
              <div className="absolute bottom-4 right-0 left-0 px-5">
                <p className="p-2 py-5 mt-4 rounded-xl text-center bg-green-100">
                  Applied on 02/03/2022
                </p>
              </div>
            </a>
            <a
              className="border border-gray-100  shadow-md relative img-main"
              href="/applications/6215f519cb7178097ee405b1"
            >
              <div className="">
                <img
                  className="rounded-2xl"
                  src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
                ></img>
              </div>
              <div className="absolute bottom-4 right-0 left-0 px-5">
                <p className="p-2 py-5 mt-4 rounded-xl text-center bg-green-100">
                  Applied on 02/03/2022
                </p>
              </div>
            </a>
          </div>
        </div>
      </main> */}

      <div className="xl:px-44 mt-28 lg:px-0 md:px-5 lg:max-w-5xl sm:px-4 lg:mx-auto xl:max-w-none">
        <div className="md:block xs:block xl:flex">
          <div className="xl:w-48 lg:w-full">
            <div className="">
              <h1 className="text-2xl font-bold text-gray-600 mb-6">Tags</h1>
              <div className="lg:flex lg:flex-wrap xl:block md:mb-12 sm:mb-10">
                {/* <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold sm:py-2 md:py-2 md:mr-3 lg:py-3 px-5 sm:mr-3 rounded-full mb-4 sm:text-sm">
                  Most Recent
                </button> */}
                {tagArr?.filter(Boolean)?.map((i, index) => {
                  return (
                    <button
                      onClick={() => {
                        setSelectIndex(index)
                        dispatch(
                          getJobSeekarAllEvent({
                            eventTags: [i],
                          }),
                        )
                      }}
                      className={`bg-teal-${
                        slectIndex === index ? '600' : '500'
                      }  text-white font-bold sm:py-2 md:py-2 md:mr-3 lg:py-3 px-5 sm:mr-3 rounded-full mb-4 sm:text-sm`}
                    >
                      {i}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="md:w-11/12 sm:w-full">
            {eventState &&
              eventState?.seekarEvents?.data?.map((i) => {
                return (
                  <div className="md:flex mb-16 sm:block">
                    <div className="md:w-3/12 sm:w-full">
                      <img
                        className="lg:h-56 w-full md:h-40 sm:h-52 object-cover"
                        src={`${i.eventImg ? i.eventImg?.fullUrl : noImage}`}
                      ></img>
                    </div>
                    <div className="md:w-9/12 sm:w-full">
                      <div className="pl-10 sm:pl-0 sm:mt-5">
                        <div className="lg:mb-5 md:mb-3">
                          <span>
                            {i.eventTags?.map((j) => {
                              return (
                                <button className="bg-teal-500 text-sm  text-white font-bold sm:py-2 md:py-2 md:mr-3 lg:py-3 px-5 rounded-full mb-4 mr-3">
                                  {j}
                                </button>
                              )
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between sm:block">
                          <h3 className="font-bold lg:text-2xl md:text-xl text-gray-800">
                            {i.title}
                          </h3>
                          <p className="text-gray-500 font-medium lg:text-lg md:text-md">
                            {new Date(i.startDate).toDateString()}
                          </p>
                        </div>
                        <div className="mt-3">
                          <p className="break-words md:text-md lg:text-lg md:leading-6 lg:leading-7 text-gray-700 truncate line-cap  des-text">
                            {i.description}
                          </p>
                        </div>
                        <div>
                          <Link
                            to={`/event/${i._id}`}
                            className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 py-2 sm:px-4 sm:text-sm"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default EventPage
