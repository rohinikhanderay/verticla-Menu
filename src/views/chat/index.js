import Navbar from '../../components/layouts/navbar'
import Footer from '../../components/layouts/Footer.js'
import { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMessage, addMessage } from '../../store/chat/index'
import {
  addNotification,
  getNotification,
  readNotification,
} from '../../store/notifications/index'
import typingGif from '../../assets/images/typing.gif'
import io from 'socket.io-client'
import InfiniteScroll from 'react-infinite-scroll-component'

var socket
var noti = []
const ChatroomPage = ({ match }) => {
  const dispatch = useDispatch()
  const profileData = useSelector((state) => state.profile)
  const sockets = useSelector((state) => state.chat)
  const messagesEndRef = useRef(null)
  const [chatData, setChatData] = useState([])
  const [receiverIntro, setReceiverIntro] = useState()
  const [messageText, setMessageText] = useState()
  const [typing, setTyping] = useState(false)
  const [selectChat, setSelectChat] = useState()
  const [isTyping, setIsTyping] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)
  const [chatRoomID, setRoomId] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const lastMessageRef = useRef()
  const [isMore, setIsMore] = useState(true)
  const [fetchUserData, setFetchUserData] = useState([])

  const notifications = useSelector((state) => state.notifications)
  useEffect(() => {
    console.log('sockets----------------page', sockets && sockets.socket)
  }, [sockets])

  useEffect(() => {
    socket = sockets && sockets.socket
    localStorage.setItem('chatId', '')
    socket.emit('setup', localStorage.getItem('uuid'))
    socket.on('connected', () => setSocketConnected(true))
    socket.on('connect_error', (err) => {
      console.log('WebSocket error: ', err.message) // prints the message associated with the error
    })
    socket?.on('typing', (e) => {
      if (
        localStorage.getItem('chatId') == e?.chatId &&
        e.resId == localStorage.getItem('uuid')
      ) {
        setIsTyping(true)
      }
    })
    socket?.on('stop typing', () => {
      setTimeout(() => {
        setIsTyping(false)
      }, 2000)
    })
  }, [])

  // const scrollToBottom = () => {
  //   receiverIntro &&
  //     messagesEndRef.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'end',
  //     })
  // }

  const sendMessageClick = (e) => {
    if ((e.key === 'Enter' || e === 'click') && messageText != '') {
      socket.emit('stop typing', receiverIntro)
      setTyping(false)

      dispatch(
        addMessage({
          room: chatRoomID,
          message: e.target.value,
          userId: profileData?.profile._id,
        }),
      ).then((res) => {
        socket.emit('chatroomMessage', {
          room: chatRoomID,
          message: e.target.value,
          userId: profileData?.profile._id,
          name: profileData?.profile?.fullName,
          msgId: res.data._id,
          recId: receiverIntro._id,
        })

        setChatData([res.data, ...chatData])
        setMessageText('')
        //  scrollToBottom()
      })
    }
  }

  const getMessages = (item, id, user, pages) => {
    setFetchUserData([{ item: item }, { id: id }, { user: user }])
    setSelectChat(id)
    localStorage.setItem('chatId', item)
    socket?.emit('joinRoom', {
      chatroomId: item,
    })
    if (pages != 1) {
      dispatch(getMessage({ roomId: item, page: pages })).then((res) => {
        let page = pages + 1
        setPageNumber(page)
        let data = chatData.concat(res.data)
        setChatData(data)
        setIsMore(res.data.length != 0 ? true : false)
      })
    } else {
      dispatch(getMessage({ roomId: item, page: pages })).then((res) => {
        setChatData(res.data)
        let page = pages + 1
        setPageNumber(page)
        setIsMore(res.data.length != 0 ? true : false)
      })
    }
    setRoomId(item)
    setReceiverIntro(user)
  }

  useEffect(() => {
    const res =
      profileData &&
      profileData?.profile?.chatRooms?.filter(
        (item) => item._id == match?.params?.id,
      )
    const indexData =
      profileData &&
      profileData?.profile?.chatRooms?.findIndex(function (object) {
        return object.roomId === match?.params?.id
      })

    if (res && res.length != 0) {
      const chatUser = res[0].users?.filter(
        (i) => i._id != profileData?.profile._id,
      )

      getMessages(res[0]._id, indexData, chatUser[0], 1)
    }

    dispatch(
      getNotification({
        userId: profileData && profileData?.profile?._id,
        isRead: false,
        notificationType: 'CHAT',
      }),
    )
  }, [match, profileData])

  useEffect(() => {
    socket &&
      socket.on('push', (message) => {
        if (message) {
          if (
            localStorage.getItem('chatId') == '' ||
            localStorage.getItem('chatId') !== message?.room
          ) {
          } else {
            setChatData([message, ...chatData])
            /// setChatData(chatData.concat(message))
          }
        }
      })
    return () => {
      socket.off('push')
    }
    //scrollToBottom()
  })

  const handleInputMessage = (e) => {
    let isType = false
    if (!socketConnected) return
    if (!typing) {
      isType = true
      setTyping(true)

      socket?.emit('typing', {
        resId: receiverIntro._id,
        usId: profileData && profileData?.profile?._id,
        chatId: localStorage.getItem('chatId'),
      })
    }

    setTimeout(() => {
      if (isType) {
        socket?.emit('stop typing', receiverIntro._id)
        socket?.emit('typingId', receiverIntro._id)
        setTyping(false)
      }
    }, 2000)
    setMessageText(e.target.value)
  }

  return (
    <>
      {' '}
      <Navbar />
      <div className="container mx-auto ">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-4 md:border-none	">
          <div className="border-r  text-white border-gray-300 lg:col-span-1 md:border">
            <ul className="overflow-auto h-[32rem]">
              <h2 className="flex items-center  bg-blue-100 p-3 text-lg bg-teal-600 border-b border-gray-300 h-16">
                Chats
              </h2>
              <li>
                {profileData &&
                  profileData?.profile?.chatRooms?.map((item, index) =>
                    item?.users?.map((i, ix) => {
                      if (profileData?.profile._id != i._id) {
                        return (
                          <a
                            onClick={async () => {
                              setPageNumber(1)
                              setChatData([])
                              getMessages(item._id, index, i, 1)

                              setIsMore(true)
                              if (
                                notifications?.notifications?.filter(
                                  (m) =>
                                    m.userId != i._id && m.roomId == item._id,
                                ).length > 0
                              ) {
                                dispatch(
                                  readNotification({
                                    roomId: item._id,
                                    userId: profileData?.profile._id,
                                    notificationType: 'CHAT',
                                  }),
                                )
                              }
                            }}
                            className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none ${
                              selectChat === index ? 'chat-active' : ''
                            }`}
                          >
                            {io && i?.profileImg?.length != 0 ? (
                              <img
                                className="object-cover w-10 h-10 rounded-full"
                                src={i.profileImg[0].fullUrl}
                                alt="username"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-blue-100 rounded-full">
                                <p className="p-2 font-bold text-center text-blue-900 font-nunito">
                                  {i?.firstName.charAt(0).toUpperCase() +
                                    i?.lastName.charAt(0).toUpperCase()}
                                </p>
                              </div>
                            )}

                            <div className="w-11/12 ">
                              <div className="flex justify-between">
                                <span className="block ml-2 font-semibold text-gray-600">
                                  {i?.firstName + ' ' + i?.lastName}
                                </span>

                                {notifications?.notifications?.filter(
                                  (m) =>
                                    m.userId != i._id && m.roomId == item._id,
                                ).length > 0 ? (
                                  <span class=" inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform bg-red-600 rounded-full">
                                    {
                                      notifications?.notifications?.filter(
                                        (m) =>
                                          m.userId != i._id &&
                                          m.roomId == item._id,
                                      ).length
                                    }
                                  </span>
                                ) : (
                                  ''
                                )}
                              </div>
                            </div>
                          </a>
                        )
                      }
                    }),
                  )}
              </li>
            </ul>
          </div>
          {receiverIntro && (
            <div className="lg:col-span-3 md:mt-10 sm:mt-10 lg:mt-0">
              <div className="w-full md:border">
                <div className="relative flex items-center p-3 border-b border-gray-300  bg-chatt">
                  {receiverIntro && receiverIntro?.profileImg?.length != 0 ? (
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={receiverIntro.profileImg[0].fullUrl}
                      alt="username"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-100 rounded-full">
                      <p className="p-2 font-bold text-center text-blue-900 font-nunito">
                        {receiverIntro?.firstName.charAt(0).toUpperCase() +
                          receiverIntro?.lastName.charAt(0).toUpperCase()}
                      </p>
                    </div>
                  )}
                  <span className="block ml-2 font-bold text-gray-600">
                    {receiverIntro?.firstName + ' ' + receiverIntro?.lastName}
                  </span>
                  <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3 hidden"></span>
                </div>
                <div
                  id="scrollableParent"
                  style={{
                    display: 'flex',
                    overflow: 'auto',
                    flexDirection: 'column-reverse',
                    height: '200px',
                  }}
                >
                  <InfiniteScroll
                    hasMore={isMore}
                    next={() => {
                      getMessages(
                        fetchUserData[0].item,
                        fetchUserData[1].id,
                        fetchUserData[2].user,
                        pageNumber,
                      )
                    }}
                    dataLength={chatData && chatData.length * pageNumber}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    inverse={true}
                    loader={
                      <div>
                        <center>Loading...</center>
                      </div>
                    }
                    scrollableTarget="scrollableParent"
                  >
                    {chatData &&
                      chatData?.map((item, index) => {
                        return (
                          <div
                            ref={
                              index === chatData.length - 1
                                ? lastMessageRef
                                : null
                            }
                            className={`flex justify-${
                              item.editedBy == profileData?.profile?._id
                                ? 'end'
                                : 'start '
                            }`}
                          >
                            <div
                              className={`relative max-w-xl px-4 py-2 m-2 text-gray-700 rounded shadow ${
                                item.editedBy == profileData?.profile?._id
                                  ? 'sender'
                                  : 'reciver '
                              }`}
                            >
                              <span className="block">{item.message}</span>
                            </div>
                          </div>
                        )
                      })}
                  </InfiniteScroll>
                </div>
                {isTyping ? (
                  <div>
                    <img src={typingGif} height="25" width="25" />
                  </div>
                ) : (
                  ''
                )}
                {/* // </div> */}

                <div
                  className="flex items-center justify-between w-full p-3 border-t border-gray-300 bg-chat"
                  style={{
                    display: receiverIntro && receiverIntro ? 'flex' : 'none',
                  }}
                >
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      sendMessageClick(e)
                    }}
                    onChange={(e) => {
                      handleInputMessage(e)
                    }}
                    placeholder="Message"
                    className="block w-full py-2 pl-4 mx-3 rounded-full outline-none focus:text-gray-700 "
                    name="message"
                    value={messageText}
                  />

                  <button
                    type="submit"
                    onClick={(e) => {
                      sendMessageClick(e)
                    }}
                  >
                    <svg
                      className="w-5 h-5  origin-center transform rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default withRouter(ChatroomPage)
