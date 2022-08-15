import React from 'react';
import Navbar from '../../components/layouts/defaultNavbar';
import Footer from '../../components/layouts/Footer';
//Images
import MissionPicture from '../../assets/landingPages/AboutMission.png';
import Grace from '../../assets/landingPages/GraceHeadshot.png';
import Luis from '../../assets/landingPages/LuisHeadshot.png';
import Mitchell from '../../assets/landingPages/MitchellHeadshot.png';
import JoinCommunity from '../../components/JoinCommunity'
import {
    UserIcon,
    AdjustmentsIcon,
    UserGroupIcon,
    MapIcon,
    LightBulbIcon,
    GlobeIcon,
} from '@heroicons/react/outline';

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-sm mx-auto sm:max-w-xl md:max-w-full font-nunito">
                {/* Mission Section */}
                <section className="px-4 mx-auto max-w-7xl">
                    <div className="items-center mt-12 md:flex sm:my-20">
                        {/* Image */}
                        <div className="md:w-1/2">
                            <img
                                src={MissionPicture}
                                className="mx-auto max-w-m max-w-md md:max-w-full sm:max-w-full	"
                                alt=""
                            ></img>
                        </div>
                        {/* Text */}
                        <div className="mt-5 md:w-1/2 md:ml-8">
                            <div className="mx-auto text-center md:max-w-lg md:text-left">
                                <p className="text-xl font-bold tracking-wider text-yellow-500">
                                    Our Purpose
                                </p>
                                <h2 className="mt-3 text-4xl leading-normal text-gray-600 font-baskerville">
                                    Provide opportunities for millions together.
                                </h2>
                                <p className="mt-3 text-xl leading-normal text-gray-600">
                                    If you’re dropping by Nuleep, you’re
                                    probably wondering how to gain experience or
                                    a job in today’s world. Our Nuleep community
                                    is here to help you when you don’t know{' '}
                                    <b> what, when and how</b>. From building
                                    skills you can use at work to making
                                    professional relationships with recruiters
                                    and mentors, develop your own{' '}
                                    <b>
                                        toolkit to navigate your career at
                                        Nuleep
                                    </b>
                                    .
                                    <br />
                                    <br />
                                    Our companies focus on growth, inclusion,
                                    and impact. Leadership and recruiters
                                    utilize best practices and top frameworks
                                    developed from experiences from EY, Disney
                                    and other top organizations.{' '}
                                    <b>
                                        You’re at the right place if you create
                                        futures for your teams
                                    </b>
                                    .{' '}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="px-4 mx-auto mt-20 max-w-7xl">
                    <p className="text-xl font-bold tracking-wider text-center text-yellow-500">
                        Values
                    </p>
                    <h2 className="mt-3 text-4xl leading-normal text-center text-gray-600 font-baskerville">
                        Grow together with the Nuleep Community:
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-11">
                        <div className="relative mt-8 text-center bg-gray-50">
                            <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                                <UserIcon className="w-8 h-8 text-teal-500" />
                            </div>
                            <div className="pt-12 mb-12">
                                <h3 className="text-xl font-bold text-center text-gray-700">
                                    Teamwork
                                </h3>
                            </div>
                        </div>
                        <div className="relative mt-8 text-center bg-gray-50">
                            <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                                <AdjustmentsIcon className="w-8 h-8 text-teal-500" />
                            </div>
                            <div className="pt-12 mb-12">
                                <h3 className="text-xl font-bold text-center text-gray-700">
                                    Leadership
                                </h3>
                            </div>
                        </div>
                        <div className="relative mt-8 text-center bg-gray-50">
                            <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                                <UserGroupIcon className="w-8 h-8 text-teal-500" />
                            </div>
                            <div className="pt-12 mb-12">
                                <h3 className="text-xl font-bold text-center text-gray-700">
                                    Skills Growth
                                </h3>
                            </div>
                        </div>
                        <div className="relative mt-8 text-center bg-gray-50">
                            <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                                <MapIcon className="w-8 h-8 text-teal-500" />
                            </div>
                            <div className="pt-12 mb-12">
                                <h3 className="text-xl font-bold text-center text-gray-700">
                                    Mentorship
                                </h3>
                            </div>
                        </div>
                        <div className="relative mt-8 text-center bg-gray-50">
                            <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                                <LightBulbIcon className="w-8 h-8 text-teal-500" />
                            </div>
                            <div className="pt-12 mb-12">
                                <h3 className="text-xl font-bold text-center text-gray-700">
                                    Community
                                </h3>
                            </div>
                        </div>
                        <div className="relative mt-8 text-center bg-gray-50">
                            <div className="absolute inset-x-0 flex items-center justify-center w-16 h-16 mx-auto -mt-8 bg-white rounded-full shadow-lg ">
                                <GlobeIcon className="w-8 h-8 text-teal-500" />
                            </div>
                            <div className="pt-12 mb-12">
                                <h3 className="text-xl font-bold text-center text-gray-700">
                                    Inclusion & Impact
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Meet our team */}
                <section className="px-4 mx-auto mt-20 max-w-7xl">
                    <div class="mx-auto py-12 px-4 max-w-7xl sm:px-0 lg:px-8 ">
                        <div class="space-y-12">
                            {/* Text */}
                            <div className="md:max-w-lg md:text-left">
                                <p className="text-xl font-bold tracking-wider text-yellow-500">
                                    Our Team
                                </p>
                                <h2 className="mt-3 text-4xl leading-normal text-gray-600 font-baskerville">
                                    Leadership @ Nuleep
                                </h2>
                            </div>

                            <ul class="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-3 grid" >
                                {/* Grace */}
                                <li>
                                    <div class="space-y-4">
                                        <img
                                            class="mx-auto h-80 w-80 rounded-full xl:w-auto xl:h-50"
                                            src={Grace}
                                            alt=""
                                        />
                                        <div class="space-y-2">
                                            <h3 class="text-lg font-medium flex justify-center space-x-5">
                                                Grace Park
                                            </h3>
                                            <p class="text-teal-600 text-lg font-medium flex justify-center space-x-5">
                                                CEO
                                            </p>
                                        </div>
                                    </div>
                                </li>

                                {/* Luis */}
                                <li>
                                    <div class="space-y-4">
                                        <img
                                            class="mx-auto h-80 w-80 rounded-full xl:w-auto xl:h-50"
                                            src={Luis}
                                            alt=""
                                        />
                                        <div class="space-y-2">
                                            <h3 class="text-lg font-medium flex justify-center space-x-5">
                                                Luis Reyes
                                            </h3>
                                            <p class="text-teal-600 text-lg font-medium flex justify-center space-x-5">
                                                CTO
                                            </p>
                                        </div>
                                    </div>
                                </li>

                                {/* Mitchell */}
                                <li>
                                    <div class="space-y-4">
                                        <img
                                            class="mx-auto h-80 w-80 rounded-full xl:w-auto xl:h-50"
                                            src={Mitchell}
                                            alt=""
                                        />
                                        <div class="space-y-2">
                                            <h3 class="text-lg font-medium flex justify-center space-x-5">
                                                Mitchell Sekiya
                                            </h3>
                                            <p class="text-teal-600 text-lg font-medium flex justify-center space-x-5">
                                                CDO
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Contact us*/}
                <section className="px-4 mx-auto mt-10 max-w-7xl">
                    <div className="sm:max-w-md sm:px-4 mx-auto max-w-3xl px-6 lg:max-w-7xl lg:px-8">
                        <div className="items-center md:flex lg:grid lg:grid-cols-3 lg:gap-8">
                            <div>
                                <p className="text-xl font-bold tracking-wider text-yellow-500">
                                    Join our team!
                                </p>
                                <h2 className="mt-3 text-4xl leading-normal text-gray-600 font-baskerville">
                                    Contact us.
                                </h2>
                            </div>
                            <div class="grid sm:grid-cols-1 grid-cols-2 gap-x-10 gap-y-12 lg:mt-0 lg:col-span-2">
                                {/* Join our team */}
                                <div className="ml-20 sm:ml-0">
                                    <h3 class="text-lg font-bold font-medium text-gray-600">
                                        Join our team
                                    </h3>
                                    <dl class="mt-2 text-base text-gray-600 sm:ml-0">
                                        <div>
                                            <dt class="sr-only">Email</dt>
                                            <dd>jane@nuleep.com</dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Say hello */}
                                <div className="ml-20 sm:ml-0">
                                    <h3 class="text-lg font-bold font-medium text-gray-600">
                                        Partnerships & Media Inquiries
                                    </h3>
                                    <dl class="mt-2 text-base text-gray-600">
                                        <div>
                                            <dt class="sr-only">Email</dt>
                                            <dd>info@nuleep.com</dd>
                                        </div>
                                        <div class="mt-1">
                                            <dt class="sr-only">
                                                Phone number
                                            </dt>
                                            <dd>+1 (213) 528-8030</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
       <JoinCommunity/>
            </div>
            <Footer />
        </div>
    );
};

export default About;
