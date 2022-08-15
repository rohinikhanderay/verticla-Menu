import { useEffect } from 'react'
// import { Link } from "react-router-dom"
import Navbar from '../../components/layouts/defaultNavbar'
import Footer from '../../components/layouts/Footer'
import whyNuleep from '../../assets/landingPages/WhyNuleep.png'
import welcomeToNuleep from '../../assets/landingPages/WelcomeToNuleep.png'
import jamesCo from '../../assets/landingPages/JamesCo1.png'
import compass from '../../assets/landingPages/compass.png'
import learn from '../../assets/landingPages/learn.png'
import shuttle from '../../assets/landingPages/shuttle.png'
import group from '../../assets/landingPages/group.png'
import att from '../../assets/landingPages/att.png'
import disney from '../../assets/landingPages/disney.png'
import amazon from '../../assets/landingPages/amazon.png'
import facebook from '../../assets/landingPages/facebook.png'
import hero2 from '../../assets/landingPages/hero1.png'
import { useHistory } from 'react-router-dom'
import JoinCommunity from '../../components/JoinCommunity'
import {
  UserIcon,
  AdjustmentsIcon,
  UserGroupIcon,
  MapIcon,
  LightBulbIcon,
  GlobeIcon,
} from '@heroicons/react/outline'
import BetaSignage from '../../components/layouts/betaSignage'

const Home = () => {
  let history = useHistory()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/dashboard')
    }
  }, [])
  const pageCall = (type) => {
    history.push({
      pathname: '/signup',
    })
  }
  return (
    <div>
      <Navbar />
      <BetaSignage />
      <div className="max-w-sm mx-auto sm:max-w-xl md:max-w-full font-nunito">
        {/* Welcome to Nuleep section */}
        <section className="px-4 mx-auto lg:px-0 max-w-7xl">
          <div className="items-center mt-12 md:flex sm:my-28">
            {/* Text */}
            <div className="md:w-1/2">
              <div className="mx-auto text-center md:max-w-lg md:text-left">
                <p className="text-xl font-bold tracking-wider text-yellow-500">
                  Welcome to Nuleep
                </p>
                <h2 className="mt-3 text-4xl leading-normal text-gray-600 font-baskerville">
                  Create a career journey with mentors.{' '}
                </h2>
                <p className="mt-3 text-xl leading-normal text-gray-600">
                  Discover diverse careers that you never imagined with mentors
                  and feedback along your journey. Nuleep isn't just another job
                  platform but a GPS that shares how you get to your next career
                  destination.{' '}
                </p>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    pageCall('jobSeeker')
                    // history.push({
                    //   pathName: "/signup",
                    //   state: { type: "jobSeeker", status: true },
                    // });
                  }}
                  style={{ backgroundColor: '#16ACB2' }}
                  className="inline-block px-16 py-4 mt-5 text-xl font-bold tracking-wider text-white rounded-full"
                >
                  Get Started
                </a>
              </div>
            </div>
            {/* Image */}
            <div className="mt-12 md:mt-0 md:w-1/2 md:ml-8">
              <img
                src={welcomeToNuleep}
                className="max-w-sm mx-auto sm:max-w-md md:max-w-full xs:w-full"
                alt=""
              ></img>
            </div>
          </div>
        </section>

        {/* <section className="px-4 mx-auto lg:px-0 max-w-7xl">
          <div className="items-center mt-12 md:flex sm:my-28">
        
            <div
              className="max-w-xs mx-auto mt-12 md:ml-24 md:w-1/2 md:max-w-max"
              style={{ backgroundColor: "#10ACB766" }}
            >
              <div className="m-auto h-1/4">
                <img src={hero2} className="p-4 md:-ml-14 py-14" alt="hero" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="mx-auto text-center md:max-w-lg md:text-left">
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
                    pageCall("recruiter");
                  }}
                  style={{ backgroundColor: "#16ACB2" }}
                  className="inline-block px-16 py-4 mt-5 text-xl font-bold tracking-wider text-white rounded-full"
                >
                  Signup nuleep
                </a>
              </div>
            </div>
          </div>
        </section> */}

        {/* Why Nuleep section */}
        <section className="px-4 mx-auto md:px-0 max-w-7xl">
          <div className="flex-row-reverse items-center w-full mx-auto my-20 md:flex md:my-28">
            <div className="max-w-md mx-auto md:w-1/2 sm:ml-8">
              <p className="pt-3 text-xl font-bold tracking-wider text-yellow-500">
                Why Nuleep
              </p>
              <h2 className="flex mt-3 text-3xl leading-normal text-gray-600 font-baskerville">
                Access career developing experiences and jobs.
              </h2>
              <p className="mt-3 text-xl leading-normal text-gray-600 ">
                Build skills and experiences as a cohort. Meet peers and mentors
                that champion your voice at work.
              </p>
              <a
                href="/about"
                className="inline-block pb-2 text-xl text-teal-500 border-b-2 border-teal-500 mt-9"
              >
                Learn more about nuleep
              </a>
            </div>
            <div className="max-w-xs mx-auto mt-12 md:w-1/2 md:mt-0">
              <img src={whyNuleep} alt=""></img>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="px-4 mx-auto lg:px-0 mt-36 max-w-7xl">
          <p className="max-w-3xl mx-auto text-3xl tracking-wider text-center text-gray-400">
            Our Partnerships and Collaborations with the most innovative
            companies and employees
          </p>
          <div className="items-center mt-12 md:flex">
            <img
              className="block mx-auto mt-12 md:mt-0"
              src={facebook}
              alt=""
            ></img>
            <img
              className="block mx-auto mt-12 md:mt-0"
              src={amazon}
              alt=""
            ></img>
            <img
              className="block mx-auto mt-12 md:mt-0"
              src={disney}
              alt=""
            ></img>
            <img className="block mx-auto mt-12 md:mt-0" src={att} alt=""></img>
          </div>
        </section>

        {/* Commmunity */}
        <section className="px-4 mt-40 lg:px-0">
          <div
            style={{ height: '530px' }}
            className="max-w-full mx-auto bg-blue-50"
          >
            <div className="max-w-lg px-4 mx-auto md:px-0">
              <p className="pt-16 text-xl font-bold tracking-wider text-center text-yellow-500">
                Community
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-normal text-center text-gray-600 font-baskerville">
                Connect and build relationships with the Nuleep Community
              </h2>
              <p className="mt-3 text-xl leading-normal text-center text-gray-600 ">
                Network, socialize, and build relationships with top peers,
                friends, and mentors. Access VIP events and job openings before
                they hit the public.{' '}
              </p>
              <img src={group} className="mx-auto mt-10" alt=""></img>
            </div>
          </div>
        </section>

        {/*Button  */}
        <section>
          <button
            style={{ backgroundColor: '#A7F3D0' }}
            className="block py-4 mx-auto mt-48 text-xl font-bold tracking-wider text-green-900 rounded-full sm:mt-36 mt-11 px-11"
          >
            Join Connect@Nuleep
          </button>
        </section>

        {/* How does it work */}
        <section className="px-4 mx-auto mt-32 md:px-4 max-w-7xl">
          <p className="text-xl font-bold tracking-wider text-center text-yellow-500">
            How does it work
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-normal text-center text-gray-600 font-baskerville">
            How we get you from today to your first day
          </h2>
          <div className="mt-10 md:flex">
            <div className="max-w-sm px-8 py-12 mx-4 mx-auto bg-red-100 rounded-md h-90 md:w-1/3">
              <img className="absolute mx-auto" src={compass} alt=""></img>
              <h2 className="pt-10 mt-8 text-4xl font-bold text-gray-500 font-baskerville">
                Learn
              </h2>
              <p className="mt-1 text-gray-600">
                Share what's important to you and what you need help with to get
                started. We have mentors, guides, classes, and more to support
                your journey.
              </p>
            </div>
            <div className="flex-auto max-w-sm px-8 py-12 mx-4 mx-auto mt-4 bg-green-100 rounded-md h-90 md:mt-0 md:w-1/3">
              <img
                className="absolute mx-auto opacity-10"
                src={learn}
                alt=""
              ></img>
              <h2 className="pt-10 mt-8 text-4xl font-bold text-gray-500 font-baskerville">
                Discover
              </h2>
              <p className="mt-1 text-gray-600">
                Surf our jobs and classes to see how you want to grow your
                career. Check out tips, tricks, and VIP sessions where you learn
                to be the best!
              </p>
            </div>
            <div className="flex-auto max-w-sm px-8 py-12 mx-4 mx-auto mt-4 bg-teal-100 rounded-md h-00 md:mt-0 md:w-1/3">
              <img className="absolute mx-auto" src={shuttle} alt=""></img>
              <h2 className="pt-10 mt-8 text-4xl font-bold text-gray-500 font-baskerville">
                Explore
              </h2>
              <p className="mt-1 text-gray-600">
                Be creative and adventurous as you explore Nuleep's community.
                Meet peers, mentors, and Navigators. Try diverse jobs and find
                inclusive companies that care about impact.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              history.push('/signup')
            }}
            style={{ backgroundColor: '#16ACB2' }}
            className="block px-16 py-4 mx-auto mt-12 text-xl font-bold tracking-wider text-white rounded-full"
          >
            Get Started
          </button>
        </section>

        {/* Features*/}
        <section className="px-4 mx-auto mt-40 max-w-7xl">
          <p className="text-xl font-bold tracking-wider text-yellow-500">
            Features
          </p>
          <h2 className="max-w-lg mt-3 mt-5 text-3xl font-bold leading-normal text-left text-gray-600 font-baskerville">
            Getting the job you want should be easier. Here is how we help.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-11">
            <div className="relative mt-8 text-center bg-gray-50">
              <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                <UserIcon className="w-8 h-8 text-teal-500" />
              </div>
              <div className="pt-12 mb-12">
                <h3 className="text-xl font-bold text-center text-gray-700">
                  What Matters to You
                </h3>
                <p className="px-6 mt-2 md:px-8">
                  Access the purpose of the Company, the vision and mission of
                  what you'll get to work on.
                </p>
              </div>
            </div>
            <div className="relative mt-8 text-center bg-gray-50">
              <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                <AdjustmentsIcon className="w-8 h-8 text-teal-500" />
              </div>
              <div className="pt-12 mb-12">
                <h3 className="text-xl font-bold text-center text-gray-700">
                  Decision Making Benefits{' '}
                </h3>
                <p className="px-6 mt-2 md:px-8">
                  Salary, perks, benefits, and more defined. How is leadership
                  vs. team? Gain insider knowledge before you even start work.
                </p>
              </div>
            </div>
            <div className="relative mt-8 text-center bg-gray-50">
              <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                <UserGroupIcon className="w-8 h-8 text-teal-500" />
              </div>
              <div className="pt-12 mb-12">
                <h3 className="text-xl font-bold text-center text-gray-700">
                  People, your community
                </h3>
                <p className="px-6 mt-2 md:px-8">
                  Whether at work or outside of work, Nuleep's community is here
                  for you. Build a network of friends and colleagues at work and
                  through Nuleep. Access real time mentors and support from
                  experts.
                </p>
              </div>
            </div>
            <div className="relative mt-8 text-center bg-gray-50">
              <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                <MapIcon className="w-8 h-8 text-teal-500" />
              </div>
              <div className="pt-12 mb-12">
                <h3 className="text-xl font-bold text-center text-gray-700">
                  Roadmap A-Z{' '}
                </h3>
                <p className="px-6 mt-2 md:px-8">
                  Build a career journey map with Nuleep. Take it with you to
                  every job and promotion. This guide will support you from
                  getting your first internship to new jobs to promotions.
                </p>
              </div>
            </div>
            <div className="relative mt-8 text-center bg-gray-50">
              <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                <LightBulbIcon className="w-8 h-8 text-teal-500" />
              </div>
              <div className="pt-12 mb-12">
                <h3 className="text-xl font-bold text-center text-gray-700">
                  Mentors, Experts, & Navigators
                </h3>
                <p className="px-6 mt-2 md:px-8">
                  Access mentors, experts, and peers from Disney, FB, Apple,
                  KPMG, EY, startups, and companies that care about impact.
                  Nuleep Navigators build relationships with their mentees.
                </p>
              </div>
            </div>
            <div className="relative mt-8 text-center bg-gray-50">
              <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                <GlobeIcon className="w-8 h-8 text-teal-500" />
              </div>
              <div className="pt-12 mb-12">
                <h3 className="text-xl font-bold text-center text-gray-700">
                  Feedback & AMAs
                </h3>
                <p className="px-6 mt-2 md:px-8">
                  We encourage our companies to provide feedback and stay in the
                  conversation. You ask questions and connect with real people.
                  We're championing learning, growth, and opportunity with each
                  of the companies. Join the Nuleep Community today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 mx-auto max-w-7xl">
          <p className="mt-24 text-xl font-bold tracking-wider text-yellow-500">
            Testimonials
          </p>
          <h2 className="max-w-lg mt-3 mt-5 text-3xl font-bold leading-normal text-left text-gray-600 font-baskerville">
            Hear from some of Nuleep's members
          </h2>
          <div className="items-center justify-around max-w-5xl mx-auto mt-16 md:flex">
            <img className="max-w-md xs:w-full" src={jamesCo} alt=""></img>
            <div className="mt-4 text-center md:max-w-lg md:text-left">
              <p className="text-2xl leading-loose text-gray-600">
                The best part is being able to interact & engage with
                professionals about different companies for work during
                Connect@Nuleep!
              </p>
              <p className="mt-6 text-gray-600">
                James, Nuleep Community+ Member
              </p>
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
export default Home
// class Home extends Component {
//   componentDidMount = () => {
//     const history = this.props.history;
//     if (localStorage.getItem("token")) {
//       history.push("/dashboard");
//     }
//   };
//   render() {
//     return (
//       <div>
//         <Navbar />
//         <div className="max-w-sm mx-auto sm:max-w-xl md:max-w-full font-nunito">
//           {/* Welcome to Nuleep section */}
//           <section className="px-4 mx-auto lg:px-0 max-w-7xl">
//             <div className="items-center mt-12 md:flex sm:my-28">
//               {/* Text */}
//               <div className="md:w-1/2">
//                 <div className="mx-auto text-center md:max-w-lg md:text-left">
//                   <p className="text-xl font-bold tracking-wider text-yellow-500">
//                     Welcome to Nuleep
//                   </p>
//                   <h2 className="mt-3 text-4xl leading-normal text-gray-600 font-baskerville">
//                     Create a career journey with mentors.
//                   </h2>
//                   <p className="mt-3 text-xl leading-normal text-gray-600">
//                     Discover diverse careers that you never imagined with
//                     mentors and feedback along your journey. Nuleep isn't just
//                     another job platform but a GPS that shares how you get to
//                     your next career destination.{" "}
//                   </p>
//                   <a
//                     href="javascript:void(0)"
//                     onClick={() => {
//                       let history = this.props.history;
//                       history.push({
//                         pathName: "/signup",
//                         state: { type: "jobSeeker", status: true },
//                       });
//                     }}
//                     style={{ backgroundColor: "#16ACB2" }}
//                     className="inline-block px-16 py-4 mt-5 text-xl font-bold tracking-wider text-white rounded-full"
//                   >
//                     Get Started
//                   </a>
//                 </div>
//               </div>
//               {/* Image */}
//               <div className="mt-12 md:mt-0 md:w-1/2 md:ml-8">
//                 <img
//                   src={welcomeToNuleep}
//                   className="max-w-sm mx-auto sm:max-w-md md:max-w-full"
//                   alt=""
//                 ></img>
//               </div>
//             </div>
//           </section>

//           <section className="px-4 mx-auto lg:px-0 max-w-7xl">
//             <div className="items-center mt-12 md:flex sm:my-28">
//               {/* Text */}
//               <div className="md:w-1/2">
//                 <div className="mx-auto text-center md:max-w-lg md:text-left">
//                   <p className="text-xl font-bold tracking-wider text-yellow-500">
//                     Welcome to Nuleep
//                   </p>
//                   <h2 className="mt-3 text-4xl leading-normal text-gray-600 font-baskerville">
//                     Create a career journey with mentors.
//                   </h2>
//                   <p className="mt-3 text-xl leading-normal text-gray-600">
//                     Discover diverse careers that you never imagined with
//                     mentors and feedback along your journey. Nuleep isn't just
//                     another job platform but a GPS that shares how you get to
//                     your next career destination.{" "}
//                   </p>
//                   <a
//                     href="javascript:void(0)"
//                     onClick={() => {
//                       this.props.history.push({
//                         pathName: "/signup",
//                         state: { type: "recruiter", status: true },
//                       });
//                     }}
//                     style={{ backgroundColor: "#16ACB2" }}
//                     className="inline-block px-16 py-4 mt-5 text-xl font-bold tracking-wider text-white rounded-full"
//                   >
//                     Get Started
//                   </a>
//                 </div>
//               </div>
//               {/* Image */}
//               <div className="mt-12 md:mt-0 md:w-1/2 md:ml-8">
//                 <img
//                   src={welcomeToNuleep}
//                   className="max-w-sm mx-auto sm:max-w-md md:max-w-full"
//                   alt=""
//                 ></img>
//               </div>
//             </div>
//           </section>

//           {/* Why Nuleep section */}
//           <section className="px-4 mx-auto md:px-0 max-w-7xl">
//             <div className="flex-row-reverse items-center w-full mx-auto my-20 md:flex md:my-28">
//               <div className="max-w-md mx-auto md:w-1/2 sm:ml-8">
//                 <p className="pt-3 text-xl font-bold tracking-wider text-yellow-500">
//                   Why Nuleep
//                 </p>
//                 <h2 className="flex mt-3 text-3xl leading-normal text-gray-600 font-baskerville">
//                   Access career developing experiences and jobs.
//                 </h2>
//                 <p className="mt-3 text-xl leading-normal text-gray-600 ">
//                   Build skills and experiences as a cohort. Meet peers and
//                   mentors that champion your voice at work.
//                 </p>
//                 <p className="inline-block pb-2 text-xl text-teal-500 border-b-2 border-teal-500 mt-9">
//                   Learn more about nuleep
//                 </p>
//               </div>
//               <div className="max-w-xs mx-auto mt-12 md:w-1/2 md:mt-0">
//                 <img src={whyNuleep} alt=""></img>
//               </div>
//             </div>
//           </section>

//           {/* Partners */}
//           <section className="px-4 mx-auto lg:px-0 mt-36 max-w-7xl">
//             <p className="max-w-3xl mx-auto text-3xl tracking-wider text-center text-gray-400">
//               Our Partnerships and Collaborations with the most innovative
//               companies and employees
//             </p>
//             <div className="items-center mt-12 md:flex">
//               <img
//                 className="block mx-auto mt-12 md:mt-0"
//                 src={facebook}
//                 alt=""
//               ></img>
//               <img
//                 className="block mx-auto mt-12 md:mt-0"
//                 src={amazon}
//                 alt=""
//               ></img>
//               <img
//                 className="block mx-auto mt-12 md:mt-0"
//                 src={disney}
//                 alt=""
//               ></img>
//               <img
//                 className="block mx-auto mt-12 md:mt-0"
//                 src={att}
//                 alt=""
//               ></img>
//             </div>
//           </section>

//           {/* Commmunity */}
//           <section className="px-4 mt-40 lg:px-0">
//             <div
//               style={{ height: "530px" }}
//               className="max-w-full mx-auto bg-blue-50"
//             >
//               <div className="max-w-lg px-4 mx-auto md:px-0">
//                 <p className="pt-16 text-xl font-bold tracking-wider text-center text-yellow-500">
//                   Community
//                 </p>
//                 <h2 className="mt-3 text-3xl font-bold leading-normal text-center text-gray-600 font-baskerville">
//                   Connect and build relationships with the Nuleep Community
//                 </h2>
//                 <p className="mt-3 text-xl leading-normal text-center text-gray-600 ">
//                   Network, socialize, and build relationships with top peers,
//                   friends, and mentors. Access VIP events and job openings
//                   before they hit the public.{" "}
//                 </p>
//                 <img src={group} className="mx-auto mt-10" alt=""></img>
//               </div>
//             </div>
//           </section>

//           {/*Button  */}
//           <section>
//             <button
//               style={{ backgroundColor: "#A7F3D0" }}
//               className="block py-4 mx-auto mt-48 text-xl font-bold tracking-wider text-green-900 rounded-full sm:mt-36 mt-11 px-11"
//             >
//               Join Connect@Nuleep
//             </button>
//           </section>

//           {/* How does it work */}
//           <section className="px-4 mx-auto mt-32 md:px-4 max-w-7xl">
//             <p className="text-xl font-bold tracking-wider text-center text-yellow-500">
//               How does it work
//             </p>
//             <h2 className="mt-3 text-3xl font-bold leading-normal text-center text-gray-600 font-baskerville">
//               How we get you from today to your first day
//             </h2>
//             <div className="mt-10 md:flex">
//               <div className="max-w-sm px-8 py-12 mx-4 mx-auto bg-red-100 rounded-md h-90 md:w-1/3">
//                 <img className="absolute mx-auto" src={compass} alt=""></img>
//                 <h2 className="pt-10 mt-8 text-4xl font-bold text-gray-500 font-baskerville">
//                   Learn
//                 </h2>
//                 <p className="mt-1 text-gray-600">
//                   Share what's important to you and what you need help with to
//                   get started. We have mentors, guides, classes, and more to
//                   support your journey.
//                 </p>
//               </div>
//               <div className="flex-auto max-w-sm px-8 py-12 mx-4 mx-auto mt-4 bg-green-100 rounded-md h-90 md:mt-0 md:w-1/3">
//                 <img
//                   className="absolute mx-auto opacity-10"
//                   src={learn}
//                   alt=""
//                 ></img>
//                 <h2 className="pt-10 mt-8 text-4xl font-bold text-gray-500 font-baskerville">
//                   Discover
//                 </h2>
//                 <p className="mt-1 text-gray-600">
//                   Surf our jobs and classes to see how you want to grow your
//                   career. Check out tips, tricks, and VIP sessions where you
//                   learn to be the best!
//                 </p>
//               </div>
//               <div className="flex-auto max-w-sm px-8 py-12 mx-4 mx-auto mt-4 bg-teal-100 rounded-md h-00 md:mt-0 md:w-1/3">
//                 <img className="absolute mx-auto" src={shuttle} alt=""></img>
//                 <h2 className="pt-10 mt-8 text-4xl font-bold text-gray-500 font-baskerville">
//                   Explore
//                 </h2>
//                 <p className="mt-1 text-gray-600">
//                   Be creative and adventurous as you explore Nuleep's community.
//                   Meet peers, mentors, and Navigators. Try diverse jobs and find
//                   inclusive companies that care about impact.
//                 </p>
//               </div>
//             </div>
//             <button
//               style={{ backgroundColor: "#16ACB2" }}
//               className="block px-16 py-4 mx-auto mt-12 text-xl font-bold tracking-wider text-white rounded-full"
//             >
//               Get Started
//             </button>
//           </section>

//           {/* Features*/}
//           <section className="px-4 mx-auto mt-40 max-w-7xl">
//             <p className="text-xl font-bold tracking-wider text-yellow-500">
//               Features
//             </p>
//             <h2 className="max-w-lg mt-3 mt-5 text-3xl font-bold leading-normal text-left text-gray-600 font-baskerville">
//               Getting the job you want should be easier. Here is how we help.
//             </h2>
//             <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-11">
//               <div className="relative mt-8 text-center bg-gray-50">
//                 <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
//                   <UserIcon className="w-8 h-8 text-teal-500" />
//                 </div>
//                 <div className="pt-12 mb-12">
//                   <h3 className="text-xl font-bold text-center text-gray-700">
//                     What Matters to You
//                   </h3>
//                   <p className="px-6 mt-2 md:px-8">
//                     Access the purpose of the Company, the vision and mission of
//                     what you'll get to work on.
//                   </p>
//                 </div>
//               </div>
//               <div className="relative mt-8 text-center bg-gray-50">
//                 <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
//                   <AdjustmentsIcon className="w-8 h-8 text-teal-500" />
//                 </div>
//                 <div className="pt-12 mb-12">
//                   <h3 className="text-xl font-bold text-center text-gray-700">
//                     Decision Making Benefits{" "}
//                   </h3>
//                   <p className="px-6 mt-2 md:px-8">
//                     Salary, perks, benefits, and more defined. How is leadership
//                     vs. team? Gain insider knowledge before you even start work.
//                   </p>
//                 </div>
//               </div>
//               <div className="relative mt-8 text-center bg-gray-50">
//                 <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
//                   <UserGroupIcon className="w-8 h-8 text-teal-500" />
//                 </div>
//                 <div className="pt-12 mb-12">
//                   <h3 className="text-xl font-bold text-center text-gray-700">
//                     People, your community
//                   </h3>
//                   <p className="px-6 mt-2 md:px-8">
//                     Whether at work or outside of work, Nuleep's community is
//                     here for you. Build a network of friends and colleagues at
//                     work and through Nuleep. Access real time mentors and
//                     support from experts.
//                   </p>
//                 </div>
//               </div>
//               <div className="relative mt-8 text-center bg-gray-50">
//                 <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
//                   <MapIcon className="w-8 h-8 text-teal-500" />
//                 </div>
//                 <div className="pt-12 mb-12">
//                   <h3 className="text-xl font-bold text-center text-gray-700">
//                     Roadmap A-Z{" "}
//                   </h3>
//                   <p className="px-6 mt-2 md:px-8">
//                     Build a career journey map with Nuleep. Take it with you to
//                     every job and promotion. This guide will support you from
//                     getting your first internship to new jobs to promotions.
//                   </p>
//                 </div>
//               </div>
//               <div className="relative mt-8 text-center bg-gray-50">
//                 <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
//                   <LightBulbIcon className="w-8 h-8 text-teal-500" />
//                 </div>
//                 <div className="pt-12 mb-12">
//                   <h3 className="text-xl font-bold text-center text-gray-700">
//                     Mentors, Experts, & Navigators
//                   </h3>
//                   <p className="px-6 mt-2 md:px-8">
//                     Access mentors, experts, and peers from Disney, FB, Apple,
//                     KPMG, EY, startups, and companies that care about impact.
//                     Nuleep Navigators build relationships with their mentees.
//                   </p>
//                 </div>
//               </div>
//               <div className="relative mt-8 text-center bg-gray-50">
//                 <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
//                   <GlobeIcon className="w-8 h-8 text-teal-500" />
//                 </div>
//                 <div className="pt-12 mb-12">
//                   <h3 className="text-xl font-bold text-center text-gray-700">
//                     Feedback & AMAs
//                   </h3>
//                   <p className="px-6 mt-2 md:px-8">
//                     We encourage our companies to provide feedback and stay in
//                     the conversation. You ask questions and connect with real
//                     people. We're championing learning, growth, and opportunity
//                     with each of the companies. Join the Nuleep Community today.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Testimonials */}
//           <section className="px-4 mx-auto max-w-7xl">
//             <p className="mt-24 text-xl font-bold tracking-wider text-yellow-500">
//               Testimonials
//             </p>
//             <h2 className="max-w-lg mt-3 mt-5 text-3xl font-bold leading-normal text-left text-gray-600 font-baskerville">
//               Hear from some of Nuleep's members
//             </h2>
//             <div className="items-center justify-around max-w-5xl mx-auto mt-16 md:flex">
//               <img className="max-w-md" src={jamesCo} alt=""></img>
//               <div className="mt-4 text-center md:max-w-lg md:text-left">
//                 <p className="text-2xl leading-loose text-gray-600">
//                   The best part is being able to interact & engage with
//                   professionals about different companies for work during
//                   Connect@Nuleep!
//                 </p>
//                 <p className="mt-6 text-gray-600">
//                   James, Nuleep Community+ Member
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Newsletter */}
//           <section className="mx-auto mt-16 max-w-7xl">
//             <div className="bg-white">
//               <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
//                 <div className="px-6 py-10 bg-teal-700 rounded-3xl sm:py-16 sm:px-12 lg:p-20 lg:flex lg:items-center">
//                   <div className="text-center lg:w-0 lg:flex-1 md:text-left">
//                     <h2 className="text-2xl font-extrabold leading-relaxed tracking-wide font-baskerville text-teal-50">
//                       Join our Nuleep Community newsletter!
//                     </h2>
//                     <p className="max-w-3xl mt-4 text-md text-teal-50">
//                       Get updates on upcoming events, workshops and more!
//                     </p>
//                   </div>
//                   <div className="mt-12 text-center sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
//                     <form className="sm:flex">
//                       <label htmlFor="emailAddress" className="sr-only">
//                         Email address
//                       </label>
//                       <input
//                         id="emailAddress"
//                         name="emailAddress"
//                         type="email"
//                         autoComplete="email"
//                         required
//                         className="w-full px-5 py-3 text-center placeholder-gray-500 border-white rounded-md md:text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-700 focus:ring-white"
//                         placeholder="Enter your email"
//                       />
//                       <button
//                         type="submit"
//                         className="flex items-center justify-center w-full px-5 py-3 mt-3 text-base font-medium text-white bg-teal-500 border border-transparent rounded-md hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
//                       >
//                         Notify me
//                       </button>
//                     </form>
//                     <p className="mt-3 text-sm text-teal-100">
//                       We care about the protection of your data. Read our{" "}
//                       <a
//                         href="/"
//                         className="font-medium underline text-teal-50"
//                       >
//                         Privacy Policy.
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//         <Footer />
//       </div>
//     );
//   }
// }
// export default Home;
