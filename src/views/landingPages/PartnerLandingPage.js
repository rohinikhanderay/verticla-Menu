import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layouts/defaultNavbar'
import Footer from '../../components/layouts/Footer'
import compass1 from '../../assets/landingPages/compass1.png'
import computer1 from '../../assets/landingPages/computer1.png'
import shuttle1 from '../../assets/landingPages/shuttle1.png'
// import image6 from '../../assets/landingPages/image6.png';
// import netflix from '../../assets/landingPages/netflix.png';
import amazon from '../../assets/landingPages/amazon.png'
import disney from '../../assets/landingPages/disney.png'
import att from '../../assets/landingPages/att.png'
import facebook from '../../assets/landingPages/facebook.png'
import hero2 from '../../assets/landingPages/hero2.png'
import hero1 from '../../assets/landingPages/hero1.png'
import { mailChimpApi } from '../../store/auth/index'
import { useDispatch } from 'react-redux'
import JoinCommunity from '../../components/JoinCommunity'
import {
  UserGroupIcon,
  MapIcon,
  BeakerIcon,
  CalculatorIcon,
  TrendingUpIcon,
  ShareIcon,
} from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BetaSignage from '../../components/layouts/betaSignage'
const PartnersLandingPage = () => {
  let history = useHistory()

  const pageCall = (type) => {
    history.push({
      pathname: '/partnersSignup',
    })
  }

  return (
    <div>
      <Navbar />

      <ToastContainer />
      <BetaSignage />
      <div className="font-nunito">
        {/* Hero section:  */}
        <section className="mx-4 mt-12 ">
          <div className="items-center m-12 mx-auto md:flex max-w-7xl">
            {/* text */}
            <div className="md:w-1/2">
              <div className="max-w-md mx-auto text-center md:max-w-lg md:text-left">
                <h2 className="mt-3 text-5xl font-bold leading-normal text-gray-600 font-baskerville">
                  <span className="text-yellow-600">Find and hire </span>
                  the talent of tomorrow.
                </h2>
                <p className="mt-3 text-xl leading-normal text-gray-600">
                  Engage and train with the best teams with the top learning
                  resources. Match skills, build experiences, and create growth
                  opportunities with impact and community.
                </p>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    pageCall('recruiter')
                    // history.push({
                    //   pathName: "/signup",
                    //   state: { type: "jobSeeker", status: true },
                    // });
                  }}
                  style={{ backgroundColor: '#16ACB2' }}
                  className="inline-block px-16 py-4 mt-5 text-xl font-bold tracking-wider text-white rounded-full"
                >
                  Start free trial
                </a>
                {/* <Link
                  to="/signup"
                  style={{ backgroundColor: "#16ACB2" }}
                  className="inline-block px-16 py-4 mt-5 text-xl font-bold tracking-wider text-white rounded-full"
                >
                  Sign up today
                </Link> */}
              </div>
            </div>
            {/* Image */}
            <div
              className="max-w-xs mx-auto mt-12 md:ml-24 md:w-1/2 md:max-w-max"
              style={{ backgroundColor: '#10ACB766' }}
            >
              <div className="m-auto h-1/4">
                <img src={hero1} className="p-4 md:-ml-14 py-14" alt="hero" />
              </div>
            </div>
          </div>
        </section>

        {/* what we do */}
        <section>
          <div className="flex-row-reverse items-center max-w-md px-6 mx-auto text-center md:flex md:max-w-7xl mt-36">
            {/* text */}
            <div className="max-w-lg py-6 mx-auto -mt-16 text-center md:w-1/2 md:text-left ">
              <h3 style={{ color: '#155E75' }} className="text-2xl">
                What we do{' '}
              </h3>
              <h2 className="mt-2 text-3xl leading-relaxed text-gray-600 font-baskerville">
                A jobs platform that navigates GEN Z in building skills and
                experiences.
              </h2>
              <p className="mt-3 text-xl leading-normal text-gray-600">
                GEN Z and Millennials will be 70% of the workforce by 2030. Are
                you ready to engage, build, and promote the newest generations?
              </p>
              <a
                href="/about"
                style={{ color: '#0891B2' }}
                className="inline-block pb-2 text-xl underline mt-9 font-cyan"
              >
                Learn more about us
              </a>
            </div>
            {/* image2 */}
            <div className="mr-6 lg:mr-0 md:w-1/2 md:max-w-7xl">
              <img src={hero2} className="lg:max-w-3xl" alt="hero" />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section>
          <div
            style={{ backgroundColor: '#ECFEFF' }}
            className="mt-20 text-center md:mt-32"
          >
            <div className="max-w-sm mx-auto -mb-10 text-lg md:max-w-3xl">
              <h3
                style={{ color: '#155E75' }}
                className="pt-16 mx-auto text-2xl"
              >
                How it works
              </h3>
              <h2 className="mt-2 text-3xl leading-relaxed text-gray-600 font-baskerville">
                How we get you experienced top talent ready to hit the ground
                running
              </h2>
            </div>
            <div className="flex-wrap items-center gap-4 px-4 py-20 mx-auto mt-3 md:flex md:flex-nowrap md:justify-between max-w-7xl">
              <div className="max-w-sm py-10 mx-auto mt-8 bg-white rounded-md shadow">
                <img
                  className="block mx-auto"
                  src={compass1}
                  alt="compass icon"
                />
                <h3 className="mt-4 text-2xl text-center text-gray-600 font-baskerville">
                  Innovate
                </h3>
                <p className="px-8 mt-3 text-xl text-gray-600">
                  Build teams that innovate and create impact. Leadership starts
                  on Day 1. Provide Inclusion, Belonging, and Culture together
                  with top experts and technology.
                </p>
              </div>
              <div className="max-w-sm py-10 mx-auto mt-8 bg-white rounded-md shadow">
                <img
                  className="block mx-auto"
                  src={computer1}
                  alt="computer icon"
                />
                <h3 className="mt-4 text-2xl text-center text-gray-600 font-baskerville">
                  Create
                </h3>
                <p className="px-8 mt-3 text-xl text-gray-600">
                  Bring experiential learning and resources to your teams.
                  Customize the experience to explore opportunities and diverse
                  pathways at work.
                </p>
              </div>
              <div className="max-w-sm py-10 mx-auto mt-8 bg-white rounded-md shadow">
                <img
                  className="block mx-auto"
                  src={shuttle1}
                  alt="shuttle icon"
                />
                <h3 className="mt-4 text-2xl text-center text-gray-600 font-baskerville">
                  Explore
                </h3>
                <p className="px-8 mt-3 text-xl text-gray-600">
                  Be a part of our community and create connections that matter
                  for your teams, company, and communities. P2P programs to
                  mentorships to Navigators.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features*/}
        <section>
          <div className="px-4 mx-auto mt-24 max-w-7xl">
            <div className="max-w-3xl text-center md:text-left">
              <h3 style={{ color: '#155E75' }} className="pt-16 text-2xl">
                Features
              </h3>
              <h2 className="mt-3 text-3xl leading-normal text-gray-600 font-baskerville">
                Getting the job you want should be easier. Here is how we help.
              </h2>
            </div>
            {/* UserGroupIcon, MapIcon, BeakerIcon, CalculatorIcon,
                            TrendingUpIcon, ShareIcon, */}
            <div className="grid gap-4 px-4 lg:px-0 sm:grid-cols-2 md:grid-cols-3 mt-11">
              <div className="relative mt-8 text-center bg-gray-50">
                <div
                  style={{ backgroundColor: '#10ACB7' }}
                  className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 rounded-md shadow-lg"
                >
                  <UserGroupIcon className="w-8 h-8 text-teal-100" />
                </div>
                <div className="pt-12 mb-12">
                  <h3 className="text-xl font-bold text-center text-gray-700 font-baskerville">
                    Team Building Platform
                  </h3>
                </div>
              </div>
              <div className="relative mt-8 text-center bg-gray-50">
                <div
                  style={{ backgroundColor: '#10ACB7' }}
                  className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 rounded-md shadow-lg"
                >
                  <MapIcon className="w-8 h-8 text-teal-100" />
                </div>
                <div className="pt-12 mb-12">
                  <h3 className="text-xl font-bold text-center text-gray-700 font-baskerville">
                    Career Journey Map
                  </h3>
                </div>
              </div>
              <div className="relative mt-8 text-center bg-gray-50">
                <div
                  style={{ backgroundColor: '#10ACB7' }}
                  className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 rounded-md shadow-lg"
                >
                  <BeakerIcon className="w-8 h-8 text-teal-100" />
                </div>
                <div className="pt-12 mb-12">
                  <h3 className="text-xl font-bold text-center text-gray-700 font-baskerville">
                    Experiential Learning
                  </h3>
                </div>
              </div>
              <div className="relative mt-8 text-center bg-gray-50">
                <div
                  style={{ backgroundColor: '#10ACB7' }}
                  className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 rounded-md shadow-lg"
                >
                  <CalculatorIcon className="w-8 h-8 text-teal-100" />
                </div>
                <div className="pt-12 mb-12">
                  <h3 className="text-xl font-bold text-center text-gray-700 font-baskerville">
                    Data Driven Reports
                  </h3>
                </div>
              </div>
              <div className="relative mt-8 text-center bg-gray-50">
                <div
                  style={{ backgroundColor: '#10ACB7' }}
                  className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 rounded-md shadow-lg"
                >
                  <TrendingUpIcon className="w-8 h-8 text-teal-100" />{' '}
                </div>
                <div className="pt-12 mb-12">
                  <h3 className="text-xl font-bold text-center text-gray-700 font-baskerville">
                    Leadership, Culture, and Impact
                  </h3>
                </div>
              </div>
              <div className="relative mt-8 text-center bg-gray-50">
                <div
                  style={{ backgroundColor: '#10ACB7' }}
                  className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 rounded-md shadow-lg"
                >
                  <ShareIcon className="w-8 h-8 text-teal-100" />
                </div>
                <div className="pt-12 mb-12">
                  <h3 className="text-xl font-bold text-center text-gray-700 font-baskerville">
                    Human Relationships
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Netflix Testinominal */}
        {/* <section>
                        <div className="px-4 mx-auto mt-48 xl:px-0 max-w-7xl ">
                            <img
                                src={image6}
                                className="object-cover w-full mx-auto h-96 rounded-xl"
                                alt="testimonial bg"
                            />
                            <div className="max-w-3xl p-6 px-12 text-left shadow -mt-80 md:-mt-80 ">
                                <img src={netflix} alt="netflix logo" />
                                <h2 className="py-4 text-xl tracking-normal text-white md:text-3xl">
                                    Nuleep has completely changed the direction
                                    of my career. I have never felt more in
                                    control of where I am and where I need to
                                    go.
                                </h2>
                                <h3 className="text-lg tracking-wider text-white md:text-xl">
                                    Devin Johnson
                                </h3>
                                <h3 className="text-lg tracking-wider text-white md:text-xl">
                                    Marketing Manager, Netflix
                                </h3>
                            </div>
                        </div>
                    </section> */}

        {/* patners logos */}
        <section>
          <div className="items-center h-full px-4 py-10 mx-auto mt-20 xl:px-0 md:flex md:max-w-6xl">
            <div className="mx-10 text-center md:text-left md:w-1/2 md:mx-auto">
              <h2 className="text-3xl leading-relaxed text-gray-600 font-baskerville">
                Trusted by the most innovative and impactful companies and
                employees
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 mx-auto mt-12 md:ml-12 md:grid-cols-2 md:mt-0 md:w-1/2">
              <div className="flex items-center justify-center py-4 bg-gray-50">
                <img
                  className="block mx-auto mt-4"
                  src={amazon}
                  alt="amazon logo"
                />
              </div>
              <div className="flex items-center justify-center py-4 bg-gray-50">
                <img
                  className="block mx-auto mt-4"
                  src={disney}
                  alt="disney logo"
                />
              </div>
              <div className="flex items-center justify-center py-4 bg-gray-50">
                <img
                  className="block mx-auto mt-4"
                  src={facebook}
                  alt="facebook logo"
                />
              </div>
              <div className="flex items-center justify-center py-4 bg-gray-50">
                <img className="block mx-auto mt-4" src={att} alt="att logo" />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <JoinCommunity />
      </div>
      <Footer />
    </div>
  )
}

export default PartnersLandingPage
