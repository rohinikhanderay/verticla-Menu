import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/Footer.js'
import { useState, useEffect, useRef } from 'react'
import {
  fetchDetails,
  EventRegister,
  EventUnRegister,
  eventRegisterStripePayment,
  eventRefund,
} from '../../store/event/index'
import { useSelector, useDispatch } from 'react-redux'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import noImage from '../../assets/images/No-Image.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory, Link } from 'react-router-dom'
import moment from 'moment'
import { numberWithCommas } from '../../components/common/commonHelper'
const EventDetails = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [detaDetails, setDataDetails] = useState([])
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')
  const profileData = useSelector((state) => state.profile)

  useEffect(() => {
    initData()
  }, [])
  const initData = () => {
    if (new URLSearchParams(props?.location?.search).get('success')) {
      setTimeout(() => {
        toast.success('Event successfully registered')
        history.replace(`/event/${props?.match?.params?.id}`)
      }, 1)
    }
    dispatch(fetchDetails({ _id: props?.match?.params?.id })).then((res) => {
      if (res) {
        setDataDetails(res?.data[0])
      }
    })
  }
  const eventRegister = (id) => {
    if (detaDetails.price) {
      dispatch(
        eventRegisterStripePayment({
          eventName: detaDetails.title,
          imageUrl: detaDetails?.eventImg?.fullUrl,
          description: detaDetails.description,
          amount: detaDetails.price,
          eventId: detaDetails._id,
          userId: profileData?.profile?._id,
          email: profileData?.profile?.email,
        }),
      ).then((res) => {
        if (res) {
          window.location.href = res.url
        }
      })
    } else {
      dispatch(
        EventRegister({
          userId: profileData?.profile?._id,
          eventId: id,
        }),
      ).then((res) => {
        if (res) {
          toast.success('Event successfully registered')
          initData()
        }
      })
    }
  }
  // const numberWithCommas = (x) => {
  //   if (x != null) {
  //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //   } else {
  //     return ''
  //   }
  // }
  const eventUnRegister = (eventId, pId) => {
    if (eventId && pId) {
      dispatch(eventRefund({ pid: pId })).then((res) => {
        if (res.status) {
          dispatch(
            EventUnRegister({
              userId: profileData && profileData?.profile?._id,
              eventId: eventId,
            }),
          ).then((res) => {
            if (res) {
              toast.success('Event successfully unregistered')
              initData()
            }
          })
        }
      })
    } else {
      dispatch(
        EventUnRegister({
          userId: profileData && profileData?.profile?._id,
          eventId: eventId,
        }),
      ).then((res) => {
        if (res) {
          toast.success('Event successfully unregistered')
          initData()
        }
      })
    }
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container m-auto px-5">
        <div className="mb-3 mt-5 w-11/12 m-auto xs:mb-14"></div>

        <div className="mx-auto my-auto flex -mx-4 mt-10 justify-center">
          <div className="rounded-lg mb-6 cus-width w-full px-4">
            <div className="">
              <h2 className="font-bold mb-2 md:mt-4 text-5xl text-gray-800 tracking-normal ">
                {detaDetails.title}
              </h2>
            </div>
            <div className="my-5">
              <p className="break-words text-lg text-gray-700 textPrintClass">
                {detaDetails.summary}
              </p>
            </div>
            <a target="_blank" rel="noreferrer noopener" href="#">
              <div className="md:flex-shrink-0 blog-img">
                <img
                  src={
                    detaDetails?.eventImg
                      ? detaDetails?.eventImg?.fullUrl
                      : noImage
                  }
                  className="object-cover w-full h-auto rounded-lg rounded-b-none"
                />
              </div>
            </a>
            <div className="py-1">
              <div className="">
                <h2 className="mt-6 mb-2">
                  <b>Description</b>
                </h2>
                <p className="mb-6 break-words text-lg text-gray-700 textPrintClass">
                  {detaDetails.description}
                </p>
              </div>

              <div className="flex justify-between mb-6">
                <div className="">
                  <h3>
                    <b>Start Date</b>
                  </h3>
                  <p className="break-words text-lg text-gray-700">
                    {moment(detaDetails.startDate).format(
                      'MMMM Do YYYY, h:mm:ss a',
                    )}
                  </p>
                </div>
                <div className="">
                  <h3>
                    <b>End Date</b>
                  </h3>
                  <p className="break-words text-lg text-gray-700 ">
                    {moment(detaDetails.endDate).format(
                      'MMMM Do YYYY, h:mm:ss a',
                    )}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h3>
                  <b>Location</b>
                </h3>
                <p className="break-words text-lg text-gray-700">
                  {detaDetails.location}
                </p>
              </div>
              <div className="mb-6">
                <h3>
                  <b>Venue</b>
                </h3>
                <p className="break-words text-lg text-gray-700">
                  {detaDetails.eventPhycialAddress}
                </p>
              </div>
              <div className="mb-6">
                <h3>
                  <b>Teleconference Link</b>
                </h3>
                <p className="break-words text-lg text-gray-700">
                  <span
                    className="text-blue-400"
                    onClick={() => {
                      window.open(detaDetails.teleconferenceLink)
                    }}
                  >
                    {detaDetails.teleconferenceLink}
                  </span>
                </p>
              </div>
              <div className="mb-6">
                <h3>
                  <b>Tags </b>
                </h3>

                <div className="lg:mb-0 md:mb-0">
                  <span>
                    {detaDetails.eventTags?.map((j) => {
                      return (
                        <button className="bg-teal-500 text-sm  text-white font-bold sm:py-2 mt-2 md:py-2 md:mr-3 lg:py-3 px-5 rounded-full mb-0 mr-3">
                          {j}
                        </button>
                      )
                    })}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <h3>
                  <b>Fees </b>
                </h3>
                <p className="break-words text-lg text-gray-700">
                  {detaDetails.price != '' && detaDetails.price !== undefined
                    ? `$ ${numberWithCommas(detaDetails.price)}`
                    : 'Free'}
                </p>
              </div>
              <div className="flex justify-between">
                {detaDetails &&
                detaDetails?.registerUsers?.some(
                  (item) =>
                    item.userId._id == profileData?.profile?._id &&
                    item.isRefunded == false,
                ) ? (
                  <button
                    onClick={() => {
                      eventUnRegister(
                        detaDetails._id,
                        detaDetails?.registerUsers?.find(
                          (item) =>
                            item.userId._id == profileData?.profile?._id,
                        ).paymentId,
                      )
                    }}
                    className="rounded-md	bg-teal-500 text-md hover:bg-teal-600 text-white px-8 py-2 sm:px-4 sm:text-sm"
                  >
                    Unregister
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      eventRegister(detaDetails._id)
                    }}
                    className="rounded-md	bg-teal-500 text-md hover:bg-teal-600 text-white px-8 py-2 sm:px-4 sm:text-sm"
                  >
                    Register
                  </button>
                )}

                {/* <p className="text-gray-700 text-lg">
                  {timeAgo.format(new Date())}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default EventDetails
