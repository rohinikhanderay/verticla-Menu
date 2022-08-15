import React from "react";
import { Link } from "react-router-dom";
import Footer_logo from "../../assets/images/footer-logo.png";

function Footer() {
  return (
    <div>
      <div
        className="footer-sec pt-16 pb-10 mt-10"
        style={{ backgroundColor: "#333" }}
      >
        <div className="container m-auto lg:w-10/12 2xl:w-9/12 xl:w-9/12 md:w-auto  pr-3.5 pl-3.5">
          <div className="flex flex-wrap">
            <div className="footer-left lg:w-6/12 md:mb-10 sm:mb-10">
              <div className="logo-footer">
                <img src={Footer_logo} className=""></img>
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-1 gap-4 w-8/12 xs:w-full">
                <div className="footer-col-1">
                  <ul className="mt-4">
                    <li>
                      <a
                        href="/about"
                        className="text-lg font-normal text-white"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="/privacypolicy"
                        className="text-lg font-normal text-white"
                      >
                        Privacy policy
                      </a>
                    </li>
                    {/* <li>
                      <a href="#" className="text-lg font-normal text-white">
                        Policy
                      </a>
                    </li> */}
                    <li>
                      <a
                        href="/termsofuse"
                        className="text-lg font-normal text-white"
                      >
                        Terms
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:info@nuleep.com"
                        className="text-lg font-normal text-white"
                      >
                        Contact Us
                      </a>
                    </li>
                    {/* <li>
                      <a href="#" className="text-lg font-normal text-white">
                        Help
                      </a>
                    </li> */}
                  </ul>
                </div>
                <div className="footer-col-1 address-footer">
                  <h1 className="text-lg font-normal text-white mb-5 mt-4">
                    Address
                  </h1>
                  <p className="text-lg font-normal text-white">
                    800 Wilshire Blvd. Los Angeles, CA 90017
                  </p>
                </div>
              </div>
            </div>

            <div className="footer-right lg:w-6/12 xs:text-center xs:w-full" style={{visibility:'hidden'}}>
              <div className="emil-footer mb-5 flex xs:flex-wrap xs:justify-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Email Address"
                  className="w-8/12 xs:w-full rounded-xl h-12 xs:mb-4"
                ></input>
                <span
                  className="pl-3 inline-block w-full xs:pl-0"
                  style={{ maxWidth: "12rem" }}
                >
                  <button className="rounded-xl text-xl text-white font-medium bg-teal-600 h-12 w-full">
                    Join Today!
                  </button>
                </span>
              </div>
              <p className="text-lg font-normal text-white">
                Join the Nuleep Community!
              </p>
              <p className="text-lg font-normal text-white">
                Get updates, connect with mentors, and behind the scenes access
                by joining us.
              </p>
            </div>
          </div>
          <div className="footer-rights mt-14">
            <div className="grid grid-cols-2 sm:grid-cols-1 sm:text-center gap-4">
              <div className="social-media-logo">
                <div className="media-icon">
                  <a
                    href="https://www.facebook.com/nuleep1"
                    className="inline-block mr-4"
                    target="_blank"
                  >
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M29.5576 3.98123H5.00126C4.41071 3.98123 3.93359 4.45061 3.93359 5.0316V29.1901C3.93359 29.771 4.41071 30.2404 5.00126 30.2404H29.5576C30.1482 30.2404 30.6253 29.771 30.6253 29.1901V5.0316C30.6253 4.45061 30.1482 3.98123 29.5576 3.98123ZM26.4747 11.6456H24.3427C22.6712 11.6456 22.3475 12.4268 22.3475 13.5757V16.1064H26.3379L25.8174 20.0683H22.3475V30.2404H18.187V20.0716H14.707V16.1064H18.187V13.1851C18.187 9.79436 20.2923 7.94637 23.3685 7.94637C24.8432 7.94637 26.1077 8.05469 26.4781 8.10393V11.6456H26.4747Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/nuleep/"
                    className="inline-block"
                    target="_blank"
                  >
                    <svg
                      width="36"
                      height="35"
                      viewBox="0 0 36 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M18.2014 12.6855C15.7241 12.6855 13.7025 14.6743 13.7025 17.1114C13.7025 19.5486 15.7241 21.5374 18.2014 21.5374C20.6786 21.5374 22.7002 19.5486 22.7002 17.1114C22.7002 14.6743 20.6786 12.6855 18.2014 12.6855ZM31.6946 17.1114C31.6946 15.2786 31.7115 13.4624 31.6069 11.6329C31.5022 9.50793 31.0095 7.62199 29.43 6.06809C27.8471 4.51086 25.9335 4.02941 23.7735 3.92648C21.9105 3.82355 20.0644 3.84016 18.2047 3.84016C16.3417 3.84016 14.4956 3.82355 12.636 3.92648C10.476 4.02941 8.559 4.51418 6.9795 6.06809C5.39662 7.62531 4.90725 9.50793 4.80262 11.6329C4.698 13.4657 4.71487 15.2819 4.71487 17.1114C4.71487 18.9409 4.698 20.7605 4.80262 22.59C4.90725 24.715 5.4 26.6009 6.9795 28.1548C8.56237 29.712 10.476 30.1935 12.636 30.2964C14.499 30.3993 16.3451 30.3827 18.2047 30.3827C20.0677 30.3827 21.9139 30.3993 23.7735 30.2964C25.9335 30.1935 27.8505 29.7087 29.43 28.1548C31.0129 26.5976 31.5022 24.715 31.6069 22.59C31.7149 20.7605 31.6946 18.9443 31.6946 17.1114ZM18.2014 23.9214C14.3707 23.9214 11.2792 20.88 11.2792 17.1114C11.2792 13.3429 14.3707 10.3015 18.2014 10.3015C22.032 10.3015 25.1235 13.3429 25.1235 17.1114C25.1235 20.88 22.032 23.9214 18.2014 23.9214ZM25.407 11.613C24.5126 11.613 23.7904 10.9025 23.7904 10.0226C23.7904 9.14269 24.5126 8.43215 25.407 8.43215C26.3014 8.43215 27.0236 9.14269 27.0236 10.0226C27.0239 10.2315 26.9823 10.4384 26.9011 10.6315C26.82 10.8246 26.7009 11 26.5507 11.1478C26.4005 11.2955 26.2222 11.4126 26.026 11.4925C25.8297 11.5723 25.6194 11.6133 25.407 11.613Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="footer-copyrights text-right sm:text-center">
                <p className="text-lg font-normal text-white text-opacity-60">
                  Copyright © 2021 Nuleep Inc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
