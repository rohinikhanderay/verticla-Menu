import { useState, useEffect } from 'react'
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'
const BetaSignage = () => {
  const [advShow, setAdvShow] = useState(true)
  useEffect(() => {
    console.log(localStorage.getItem('adBanner'))
    if (localStorage.getItem('adBanner')) {
      setAdvShow(localStorage.getItem('adBanner') == 'true' ? true : false)
    } else {
      setAdvShow(true)
      localStorage.setItem('adBanner', true)
    }
  }, [])
  return (
    <>
      {advShow ? (
        // rounded-tl-md rounded-tr-md
        <div className="inset-x-0  z-50 cursor-pointer">
          <div className="bg-teal-600 relative">
            <div className="container mx-auto xs:px-2 sm:px-6 py-2">
              <div className="xs:p-2 rounded-lg  p-1">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="w-0 flex-1 justify-center flex items-center">
                    <p className="ml-3 font-medium text-white ">
                      {/* <span className="md:hidden">
                       
                      </span> */}
                      <span className="md:inline">
                        Welcome to Nuleep! We're in Beta mode which means we are
                        improving our product with your feedback. You'll be
                        seeing new updates every month. Thanks for joining our
                        Nuleep community!
                      </span>
                    </p>
                  </div>
                  {/* <div className="xs:order-3 xs:mt-2 flex-shrink-0 xs:w-full order-2 mt-0 w-auto">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm 
                    text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Learn more
                </a>
              </div> */}
                </div>
              </div>
            </div>
            <div
              className="xs:order-2 flex-shrink-0 order-3 ml-2 absolute top-2/4 right-4"
              style={{ transform: 'translateY(-50%' }}
            >
              <button
                type="button"
                onClick={() => {
                  setAdvShow(false)
                  localStorage.setItem('adBanner', false)
                }}
                className="-mr-1 flex p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
export default BetaSignage
