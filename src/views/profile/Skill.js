import React, { useEffect, useState } from "react";
import img_19 from "../../assets/images/2.gif";
import Navbar from "../../components/layouts/navbar";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/layouts/Footer.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  listUdemySkillTrending,
  listUdemySuggestion,
  viewProfile,
  updateUserDetails,
  recommandedCourses,
} from "../../store/profile/index";

const Skill = ({ match, profileId }) => {

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile);
  const [trendingPageSize, setTrendingPageSize] = useState(3);
  const [suggestionPageSize, setSuggestionPageSize] = useState(3);
  const [savePageSize, setSavePageSize] = useState(3);
  const [recetViewPageSize, setRecentViewPageSize] = useState(3);

  const [searchPageSize, setSearchPageSize] = useState(12);
  const [searchCourse, setSearchCourse] = useState();
  const [searchDataDisplay, setSerchDataDisplay] = useState(false);
  const [backState, setBackState] = useState(false);
  const [recentSeeMore, setRecentSeeMore] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const [resultVar, setResultVar] = useState("");

  const [skillArr, setSkillArr] = useState();
  const searchTextChange = (e) => {
    setSearchCourse(e.target.value);
  };

  useEffect(() => {
    dispatch(listUdemySkillTrending({ page: 1, size: trendingPageSize }));
  }, [trendingPageSize]);
  useEffect(() => {
    setSerchDataDisplay(false);
    // dispatch(viewProfile(match.params.id))
    dispatch(viewProfile(profileId))
      .then((res) => {
        setSkillArr(res.skills);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (skillArr) {
      //console.log(skillArr);
      dispatch(
        listUdemySuggestion({
          page: 1,
          size: suggestionPageSize,
          search: skillArr || profileData?.selectedProfile?.careerPath || [],
        })
      );
      setSavePageSize(3);
      setRecentViewPageSize(3);
    }
    dispatch(
      recommandedCourses({
        page: 1,
        size: 5,
        search: skillArr || profileData?.selectedProfile?.careerPath || [],
      })
    );
  }, [suggestionPageSize, skillArr, backState]);

  useEffect(() => {
    if (searchCourse) {
      dispatch(
        listUdemySuggestion({
          page: 1,
          size: searchPageSize,
          search: searchCourse,
        })
      );
    }
  }, [searchPageSize]);
  const handleSubmit = (e) => {
    if (e.key === "Enter" || e === "click") {
      setSpinnerState(true);
      dispatch(
        listUdemySuggestion({
          page: 1,
          size: searchPageSize,
          search: searchCourse,
        })
      )
        .then((res) => {
          setResultVar(searchCourse);
          setSerchDataDisplay(true);
          setSpinnerState(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const removeSaveJobs=async (item)=>{
   
    let dataObj= profileData?.selectedProfile?.savedCourses
    let finalObj=dataObj.filter((ib)=>ib._id!==item)
     await dispatch(
        updateUserDetails({
          role: profileData?.selectedProfile?.userRef.role,
          savedCourses: finalObj,
        })
      );
      await dispatch(viewProfile(profileId));
  }
  const saveCourse = async (e, data) => {
    let courseData = [...profileData?.selectedProfile?.savedCourses];

    let result = courseData.some((vendor) => vendor["courseId"] === data.id);

    if (result !== true) {
      courseData.unshift({
        courseId: data.id,
        title: data.title,
        image: data.image_480x270,
        url: data.url,
        duration: data.content_info_short,
        rating: data.avg_rating,
        provider: "Udemy",
      });
      await dispatch(
        updateUserDetails({
          role: profileData?.selectedProfile?.userRef.role,
          savedCourses: courseData,
        })
      );
      await dispatch(viewProfile(profileId));
    }
  };
  const recentlyViews = async (data) => {
    let courseData = [...profileData?.selectedProfile?.recentlyViwedCourses];
    let result = courseData.some((vendor) => vendor["courseId"] === data.id);

    if (result !== true) {
      courseData.unshift({
        courseId: data.id,
        title: data.title,
        image: data.image_480x270,
        url: data.url,
        duration: data.content_info_short,
        rating: data.avg_rating,
        provider: "Udemy",
      });
    } else {
      let indexArry = courseData.findIndex(
        ({ courseId }) => courseId === data.id
      );
      if (indexArry > -1) {
        courseData.splice(indexArry, 1);
        courseData.unshift({
          courseId: data.id,
          title: data.title,
          image: data.image_480x270,
          url: data.url,
          duration: data.content_info_short,
          rating: data.avg_rating,
          provider: "Udemy",
        });
      }
    }

    await dispatch(
      updateUserDetails({
        role: profileData?.selectedProfile?.userRef.role,
        recentlyViwedCourses: courseData,
      })
    );
    await dispatch(viewProfile(profileId));
  };

  const redirectCourse = (url, data) => {
    recentlyViews(data);
    window.open(`https://www.udemy.com${url}`);
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="p-10 sm:p-5">
        <div className="container m-auto">
          <div className="mb-24 mt-5 w-11/12 m-auto xs:mb-14">
            <h1 className="container m-auto lg:text-5xl md:text-4xl flex items-center text-3xl font-semibold xs:text-2xl hidden">
              <svg
                viewBox="0 0 32 32"
                className="inline mr-3"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setBackState(true);
                  setSerchDataDisplay(false);
                  setSearchCourse("");
                }}
                style={{
                  width: "40px",
                  fill: "#38acb8",
                  cursor: "pointer",
                  display: searchDataDisplay ? "block" : "none",
                }}
              >
                <title />
                <g data-name="Layer 2" id="Layer_2">
                  <path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z" />
                  <path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z" />
                </g>
              </svg>
              Skills & Certifications{" "}
            </h1>

            <div className="relative h-12 mt-7 sm:mt-5 flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="border-solid	 border-2	w-11/12 h-12 rounded-full pl-16 placeholder-gray-400 text-lg font-medium"
                style={{ borderColor: "#C4C4C4" }}
                onChange={(e) => {
                  searchTextChange(e);
                }}
                value={searchCourse}
                onKeyDown={(e) => {
                  handleSubmit(e);
                }}
              ></input>

              <svg
                className="absolute top-2/4 left-3"
                style={{
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleSubmit("click");
                }}
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M29.0797 18.9757C28.1619 22.517 27.7029 24.2877 27.9407 25.151C28.1785 26.0142 29.0164 26.8426 30.6921 28.4992L31.717 29.5124C32.0841 29.8754 32.1024 30.4459 31.7229 30.821L30.4296 32.0996C30.0657 32.4594 29.4888 32.4723 29.1059 32.0938L27.9854 30.9861C26.3278 29.3473 25.499 28.528 24.6381 28.2991C23.7772 28.0702 22.0573 28.5276 18.6175 29.4425C17.391 29.7687 16.1013 29.9427 14.7705 29.9427C6.613 29.9427 0 23.405 0 15.3403C0 7.27571 6.613 0.738037 14.7705 0.738037C22.9281 0.738037 29.5411 7.27571 29.5411 15.3403C29.5411 16.5954 29.3809 17.8135 29.0797 18.9757ZM14.7705 26.2921C20.8887 26.2921 25.8484 21.3888 25.8484 15.3403C25.8484 9.29187 20.8887 4.38861 14.7705 4.38861C8.65238 4.38861 3.69264 9.29187 3.69264 15.3403C3.69264 21.3888 8.65238 26.2921 14.7705 26.2921Z"
                  fill="#979797"
                />
              </svg>
              <img
                className="ml-5 w-10 sm:w-8"
                src={img_19}
                style={{ display: spinnerState ? "block" : "none" }}
              ></img>
            </div>
          </div>
          <div
            className="mb-16"
            style={{ display: searchDataDisplay ? "none" : "block" }}
          >
            <h1 className="container m-auto lg:text-4xl md:text-3xl font-semibold sm:text-2xl">
              Recommended courses{" "}
            </h1>
            <div
              className="bg-white home-slider rounded-3xl py-16 sm:py-10 xs:px-5 px-28 sm:px-14 md:px-14 lg:px-14 mt-7 relative w-11/12 sm:w-full m-auto"
              style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}
            >
              {/* <svg
                width="19"
                className="top-2/4 right-8 absolute"
                height="34"
                viewBox="0 0 19 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.01126 32.9489C0.891256 32.8299 0.796049 32.6884 0.731087 32.5327C0.666124 32.377 0.632685 32.2101 0.632685 32.0416C0.632685 31.873 0.666124 31.7061 0.731087 31.5504C0.796049 31.3947 0.891256 31.2532 1.01126 31.1342L15.5647 16.6624L1.01126 2.19066C0.769292 1.95001 0.633359 1.62362 0.633359 1.28329C0.633359 0.94296 0.769292 0.616571 1.01126 0.375921C1.25322 0.135271 1.5814 7.77804e-05 1.92359 7.77507e-05C2.26578 7.77209e-05 2.59395 0.135271 2.83592 0.375921L18.2992 15.7551C18.4192 15.8741 18.5144 16.0155 18.5793 16.1712C18.6443 16.3269 18.6777 16.4938 18.6777 16.6624C18.6777 16.831 18.6443 16.9979 18.5793 17.1536C18.5144 17.3093 18.4192 17.4507 18.2992 17.5698L2.83592 32.9489C2.71622 33.0683 2.57402 33.163 2.41747 33.2276C2.26092 33.2922 2.09309 33.3254 1.92359 33.3254C1.7541 33.3254 1.58627 33.2922 1.42971 33.2276C1.27316 33.163 1.13096 33.0683 1.01126 32.9489Z"
                  fill="#BEBEBE"
                />
              </svg> */}
              ​{" "}
              <Slider {...settings} className="slider-2">
                {/* <div>
                  <div className="flex -mx-4 flex-wrap sm:justify-center">
                    <div className="md:w-full lg:w-2/5  px-4 ">
                      <div className="recen-box px-4 py-4 mr-0 ml-auto text-center text-3xl font-semibold text-gray-400">
                        <h5 className="sm:text-2xl">Recently Viewed</h5>
                        <div className="bg-black w-52 h-52 md:w-44 md:h-44 lg:w-44 lg:h-44 xl:w-44 xl:h-44 sm:w-40 sm:h-40 lg:pt-10 md:pt-10 m-auto rounded-full mt-6"></div>
                      </div>
                    </div>
                    <div className="md:w-full lg:w-3/5 px-4  flex flex-col justify-between pl-14 md:pl-14 md:text-center lg:text-left md:mt-8 lg:mt-0 sm:pl-4 sm:mt-8">
                      <div className="">
                        <h1 className="text-4xl font-semibold mb-4">
                          Want to lear about CSS?
                        </h1>
                        <div className="px-4 text-lg py-1 border-solid border inline-block border-gray-500 rounded-full inline-flex items-center">
                          <svg
                            width="23"
                            height="22"
                            viewBox="0 0 23 22"
                            fill="none"
                            className="inline-block  mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.6634 11.4333C22.6634 10.1897 22.4187 8.99745 21.9701 7.8944C21.6635 11.1444 19.7484 12.8138 17.7474 12.0364C15.873 11.3079 17.1362 8.46794 17.2295 7.1128C17.3868 4.81565 17.2215 2.18619 12.6095 0C14.5259 3.31698 12.8315 5.37772 11.0544 5.50316C9.08267 5.64248 7.27694 3.97012 7.94351 1.25623C5.78516 2.69519 5.7225 5.11719 6.3884 6.68401C7.08297 8.31717 6.3604 9.67411 4.66665 9.82488C2.7736 9.99375 1.72175 7.9909 2.69161 4.79936C1.01319 6.58751 0 8.90337 0 11.4333C0 17.0957 5.07326 21.6858 11.3317 21.6858C17.5901 21.6858 22.6634 17.0957 22.6634 11.4333Z"
                              fill="#F4900C"
                            />
                          </svg>
                          90% Match
                        </div>
                      </div>
                      <div className="mt-15 md:mt-10">
                        <button className="w-72 bg-teal-600 py-4 rounded-xl text-lg text-white block lg:mx-0 lg:mb-6 md:mb-3 md:mx-auto">
                          View Course
                        </button>
                        <button className="text-lg w-72 py-4 rounded-xl text-lg border border-gray-500 border-solid block lg:mx-0 md:mx-auto">
                          Save for later
                        </button>
                      </div>
                    </div>
                    ​
                  </div>
                </div> */}
                {profileData &&
                  profileData?.recommandedSkill?.map((item) => {
                    return (
                      <div>
                        <div className="flex -mx-4 flex-wrap sm:justify-center">
                          <div className="md:w-full lg:w-2/5  px-4 ">
                            <div className="recen-box px-4 py-4 mr-0 ml-auto text-center flex  items-center text-3xl font-semibold text-gray-400">
                              <h5 className="sm:text-2xl"></h5>
                              <div
                                className=" w-52 h-52 sm:w-28 sm:h-28 md:w-44 md:h-44 lg:w-44 lg:h-44 xl:w-44 xl:h-44 lg:pt-10 md:pt-10 m-auto rounded-full"
                                style={{
                                  backgroundImage: `url('${item.image_480x270}')`,
                                  backgroundPosition: 'center',
                                  backgroundSize: 'cover',
                                  backgroundRepeat: 'no-repeat'
                                                              }}
                              ></div>
                            </div>
                          </div>
                          <div className="md:w-full lg:w-3/5 px-4  flex flex-col justify-between pl-14 md:pl-14 md:text-center lg:text-left md:mt-8 lg:mt-0 sm:pl-4 sm:mt-8">
                            <div className="">
                              <h1 className="text-4xl sm:text-2xl font-semibold mb-4 sm:text-center">
                                {item?.title}
                              </h1>
                              {/* <div className="px-4 text-lg py-1 border-solid border inline-block border-gray-500 rounded-full inline-flex items-center">
                                <svg
                                  width="23"
                                  height="22"
                                  viewBox="0 0 23 22"
                                  fill="none"
                                  className="inline-block  mr-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M22.6634 11.4333C22.6634 10.1897 22.4187 8.99745 21.9701 7.8944C21.6635 11.1444 19.7484 12.8138 17.7474 12.0364C15.873 11.3079 17.1362 8.46794 17.2295 7.1128C17.3868 4.81565 17.2215 2.18619 12.6095 0C14.5259 3.31698 12.8315 5.37772 11.0544 5.50316C9.08267 5.64248 7.27694 3.97012 7.94351 1.25623C5.78516 2.69519 5.7225 5.11719 6.3884 6.68401C7.08297 8.31717 6.3604 9.67411 4.66665 9.82488C2.7736 9.99375 1.72175 7.9909 2.69161 4.79936C1.01319 6.58751 0 8.90337 0 11.4333C0 17.0957 5.07326 21.6858 11.3317 21.6858C17.5901 21.6858 22.6634 17.0957 22.6634 11.4333Z"
                                    fill="#F4900C"
                                  />
                                </svg>
                                90% Match
                              </div> */}
                            </div>
                            <div className="mt-15 md:mt-10">
                              <button
                                onClick={() => {
                                  //  window.open(`https://www.udemy.com${item.url}`);
                                  redirectCourse(item.url, item);
                                }}
                                className="w-72 sm:w-56 sm:m-auto sm:mb-5 xs:w-full bg-teal-600 py-4 sm:py-3 rounded-xl text-lg text-white block lg:mx-0 lg:mb-6 md:mb-3 md:mx-auto"
                              >
                                View Course
                              </button>
                              <button
                                onClick={(e) => {
                                  saveCourse(e, item);
                                }}
                                className="text-lg w-72 sm:w-56 xs:w-full py-4 sm:m-auto  sm:py-3 rounded-xl text-lg border border-gray-500 border-solid block lg:mx-0 md:mx-auto"
                              >
                                Save for later
                              </button>
                            </div>
                          </div>
                          ​
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
          <div
            className=""
            style={{ display: searchDataDisplay ? "block" : "none" }}
          >
            <div className="flex justify-between">
              <h1 className="lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-10/12">
                Results for {resultVar}
              </h1>
            </div>
            <div className="flex -mx-3.5 mb-10 flex-wrap">
              {profileData &&
                profileData?.suggestionSkill?.map((item) => {
                  return (
                    <div
                      className="w-4/12 px-3.5 md:w-6/12 lg:w-4/12 sm:w-6/12 xs:w-full md:mb-8 sm:mb-8"
                      
                    >
                      <div className="vid-box relative group" style={{ cursor: "pointer" }}>
                        <img
                          src={item?.image_480x270}
                          className="lg:h-60 md:h-52 w-full object-cover rounded-3xl sm:h-60"
                        ></img>
                        <div
                          className="absolute top-0 w-full h-full opacity-25 group-hover:opacity-60"
                          style={{ backgroundColor: "#dadada" }}
                          onClick={() => {
                            //  window.open(`https://www.udemy.com${item.url}`);
                            redirectCourse(item.url, item);
                          }}
                        ></div>
                        <svg
                          onClick={() => {
                            //  window.open(`https://www.udemy.com${item.url}`);
                            redirectCourse(item.url, item);
                          }}
                          className="absolute top-2/4 left-1/2 right-0 transform -translate-x-2/4 -translate-y-1/2"
                          width="71"
                          height="71"
                          viewBox="0 0 71 71"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M35.5 0C28.4788 0 21.6152 2.08204 15.7773 5.98283C9.93932 9.88362 5.3892 15.428 2.70229 21.9147C0.0153816 28.4015 -0.687637 35.5394 0.682138 42.4257C2.05191 49.312 5.43296 55.6375 10.3977 60.6023C15.3625 65.567 21.688 68.9481 28.5743 70.3179C35.4606 71.6876 42.5985 70.9846 49.0853 68.2977C55.572 65.6108 61.1164 61.0607 65.0172 55.2227C68.918 49.3848 71 42.5212 71 35.5C71 26.0848 67.2598 17.0552 60.6023 10.3977C53.9447 3.74017 44.9152 0 35.5 0ZM54.3835 37.7695L23.9549 52.9837C23.5682 53.177 23.1386 53.2681 22.7067 53.2486C22.2749 53.229 21.8552 53.0994 21.4876 52.872C21.1199 52.6446 20.8165 52.327 20.6062 51.9494C20.3958 51.5717 20.2855 51.1465 20.2857 50.7143V20.2857C20.286 19.8536 20.3966 19.4288 20.6071 19.0515C20.8176 18.6742 21.1211 18.357 21.4887 18.1299C21.8562 17.9028 22.2757 17.7734 22.7073 17.7539C23.139 17.7345 23.5684 17.8256 23.9549 18.0188L54.3835 33.2331C54.8041 33.4439 55.1578 33.7676 55.4049 34.1679C55.6521 34.5683 55.783 35.0295 55.783 35.5C55.783 35.9705 55.6521 36.4317 55.4049 36.8321C55.1578 37.2324 54.8041 37.5561 54.3835 37.7669V37.7695Z"
                            fill="#4D4D4D"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          className="absolute top-5 right-5 opacity-0 group-hover:opacity-100"
                          viewBox="0 0 24 24"
                          onClick={(e) => {
                            saveCourse(e, item);
                          }}
                        >
                          <path
                            fill="#000"
                            d="M6 0v24l6-5.269 6 5.269v-24h-12zm8.473 13.8l-2.473-1.321-2.472 1.321.494-2.759-2.022-1.943 2.777-.383 1.223-2.523 1.223 2.522 2.777.384-2.021 1.943.494 2.759z"
                          />
                        </svg>
                        <span className="absolute bg-white bottom-5 left-5 px-2 rounded-full text-sm">
                          {item?.content_info_short}
                        </span>
                      </div>

                      <div className="mt-3">
                        <h3 className="lg:text-2xl font-medium md:text-xl">
                          {item?.title}
                        </h3>
                        <div className="flex items-end ">
                          <h1 className="text-lg font-bold">
                            {item?.discount_price != null
                              ? item?.discount_price.price_string
                              : ""}
                          </h1>
                          {item?.discount_price != null ? (
                            <strike className="text-sm text-gray-400 ml-2">
                              {item?.price_detail.price_string}
                            </strike>
                          ) : (
                            <h1 className="text-lg font-bold">
                              {(item?.price_detail &&
                                item?.price_detail.price_string) ||
                                item.price}
                            </h1>
                          )}
                        </div>
                        <p className="textp" style={{ lineClamp: "3" }}>
                          {item?.description.replace(
                            /(&nbsp;|<([^>]+)>)/gi,
                            ""
                          )}
                        </p>

                        <div className="flex items-center">
                          <span className="font-bold">
                            {item?.avg_rating.toFixed(1)}
                          </span>
                          &nbsp; &nbsp;
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="mr-2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
                              fill="#FDCC0D"
                            />
                          </svg>
                        </div>
                        <p className="lg:text-2xl font-light md:text-xl">
                          Udemy
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <center>
              <a
                href="javascript:void(0)"
                className="lg:text-2xl md:text-xl   font-semibold text-gray-500 underline sm:w-3/12 text-right"
                onClick={() => {
                  setSearchPageSize(searchPageSize + 12);
                }}
              >
                See More{" "}
              </a>{" "}
            </center>
          </div>
          <div style={{ display: searchDataDisplay ? "none" : "block" }}>
            <div className="" style={{ display: true ? "none" : "block" }}>
              <div className="flex justify-between">
                <h1 className="lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-10/12">
                  Recommended courses
                </h1>
                <a
                  href="javascript:void(0)"
                  className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
                  onClick={() => {
                    setSuggestionPageSize(suggestionPageSize + 3);
                  }}
                >
                  See More{" "}
                </a>
              </div>
              <div className="flex -mx-3.5 mb-10 flex-wrap">
                {profileData?.suggestionSkill?.map((item) => {
                  return (
                    <div
                      className="w-4/12 px-3.5 md:w-6/12 lg:w-4/12 sm:w-6/12 xs:w-full md:mb-8 sm:mb-8"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="vid-box relative  group">
                        <img
                          src={item?.image_480x270}
                          className="lg:h-60 md:h-52 w-full object-cover rounded-3xl sm:h-60"
                        ></img>
                        <div
                          className="absolute top-0 w-full h-full opacity-25 group-hover:opacity-60"
                          style={{ backgroundColor: "#dadada" }}
                          onClick={() => {
                            //  window.open(`https://www.udemy.com${item.url}`);
                            redirectCourse(item.url, item);
                          }}
                        ></div>

                        <svg
                          className="absolute top-2/4 left-1/2 right-0 transform -translate-x-2/4 -translate-y-1/2"
                          width="71"
                          height="71"
                          onClick={() => {
                            redirectCourse(item.url, item);
                          }}
                          viewBox="0 0 71 71"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M35.5 0C28.4788 0 21.6152 2.08204 15.7773 5.98283C9.93932 9.88362 5.3892 15.428 2.70229 21.9147C0.0153816 28.4015 -0.687637 35.5394 0.682138 42.4257C2.05191 49.312 5.43296 55.6375 10.3977 60.6023C15.3625 65.567 21.688 68.9481 28.5743 70.3179C35.4606 71.6876 42.5985 70.9846 49.0853 68.2977C55.572 65.6108 61.1164 61.0607 65.0172 55.2227C68.918 49.3848 71 42.5212 71 35.5C71 26.0848 67.2598 17.0552 60.6023 10.3977C53.9447 3.74017 44.9152 0 35.5 0ZM54.3835 37.7695L23.9549 52.9837C23.5682 53.177 23.1386 53.2681 22.7067 53.2486C22.2749 53.229 21.8552 53.0994 21.4876 52.872C21.1199 52.6446 20.8165 52.327 20.6062 51.9494C20.3958 51.5717 20.2855 51.1465 20.2857 50.7143V20.2857C20.286 19.8536 20.3966 19.4288 20.6071 19.0515C20.8176 18.6742 21.1211 18.357 21.4887 18.1299C21.8562 17.9028 22.2757 17.7734 22.7073 17.7539C23.139 17.7345 23.5684 17.8256 23.9549 18.0188L54.3835 33.2331C54.8041 33.4439 55.1578 33.7676 55.4049 34.1679C55.6521 34.5683 55.783 35.0295 55.783 35.5C55.783 35.9705 55.6521 36.4317 55.4049 36.8321C55.1578 37.2324 54.8041 37.5561 54.3835 37.7669V37.7695Z"
                            fill="#4D4D4D"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          className="absolute top-5 right-5 opacity-0 group-hover:opacity-100"
                          viewBox="0 0 24 24"
                          onClick={(e) => {
                            saveCourse(e, item);
                          }}
                        >
                          <path
                            fill="#000"
                            d="M6 0v24l6-5.269 6 5.269v-24h-12zm8.473 13.8l-2.473-1.321-2.472 1.321.494-2.759-2.022-1.943 2.777-.383 1.223-2.523 1.223 2.522 2.777.384-2.021 1.943.494 2.759z"
                          />
                        </svg>
                        <div className="absolute flex bottom-5 left-5">
                          <span className="bg-white  px-2 rounded-full text-sm">
                            {item?.content_info_short}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <h3 className="lg:text-2xl font-medium md:text-xl">
                          {item?.title}
                        </h3>
                        {/* <div
                          className="truncate"
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        /> */}

                        <p className="lg:text-2xl font-light md:text-xl">
                          Udemy
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className=""
              style={{
                display:
                  profileData &&
                  profileData?.selectedProfile?.savedCourses?.length != 0
                    ? "block"
                    : "none",
              }}
            >
              <div className="flex justify-between">
                <h1 className=" lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-10/12">
                  Saved courses
                </h1>
                <a
                  href="javascript:void(0)"
                  style={{
                    display:
                      profileData &&
                      profileData?.selectedProfile?.savedCourses &&
                      profileData &&
                      profileData?.selectedProfile?.savedCourses?.length > 3 &&
                      profileData?.selectedProfile?.savedCourses?.slice(
                        0,
                        savePageSize
                      ).length !==
                        profileData?.selectedProfile?.savedCourses?.length
                        ? "block"
                        : "none",
                  }}
                  className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
                  onClick={() => {
                    setSavePageSize(savePageSize + 3);
                  }}
                >
                  See More{" "}
                </a>
              </div>
              <div className="flex -mx-3.5 mb-10 flex-wrap">
                {profileData &&
                  profileData?.selectedProfile?.savedCourses
                    .sort((a, b) => (a > b ? -1 : 1))
                    ?.slice(0, savePageSize)
                    .map((item) => {
                      return (
                        <div className="w-4/12 px-3.5 md:w-6/12 lg:w-4/12 sm:w-6/12 xs:w-full md:mb-8 sm:mb-8 relative">
                            <svg
                                onClick={()=>{removeSaveJobs(item._id)}}
                                style={{ cursor: "pointer" }}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                version="1.1"
                                fill="#2e9488"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute -top-5 right-0"
                              >
                                <line
                                  x1="1"
                                  y1="20"
                                  x2="20"
                                  y2="1"
                                  stroke="#2e9488"
                                  stroke-width="2"
                                />
                                <line
                                  x1="1"
                                  y1="1"
                                  x2="20"
                                  y2="20"
                                  stroke="#2e9488"
                                  stroke-width="2"
                                />
                              </svg>

                        <div
                          className=""
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            // window.open(`https://www.udemy.com${item.url}`);

                            redirectCourse(item.url, {
                              id: item.courseId,
                              title: item.title,
                              image_480x270: item.image,
                              url: item.url,
                              content_info_short: item.duration,
                              avg_rating: item.rating,
                              provider: "Udemy",
                            });
                          }}
                        >
                          <div className="vid-box relative">
                            
                            <img
                              src={item?.image}
                              className="lg:h-60 md:h-52 w-full object-cover rounded-3xl sm:h-60"
                            ></img>
                            <div
                              className="absolute top-0 w-full h-full opacity-25"
                              style={{ backgroundColor: "#dadada" }}
                            ></div>
                            <svg
                              className="absolute top-2/4 left-1/2 right-0 transform -translate-x-2/4 -translate-y-1/2"
                              width="71"
                              height="71"
                              onClick={() => {
                                redirectCourse(item?.url, item);
                              }}
                              viewBox="0 0 71 71"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M35.5 0C28.4788 0 21.6152 2.08204 15.7773 5.98283C9.93932 9.88362 5.3892 15.428 2.70229 21.9147C0.0153816 28.4015 -0.687637 35.5394 0.682138 42.4257C2.05191 49.312 5.43296 55.6375 10.3977 60.6023C15.3625 65.567 21.688 68.9481 28.5743 70.3179C35.4606 71.6876 42.5985 70.9846 49.0853 68.2977C55.572 65.6108 61.1164 61.0607 65.0172 55.2227C68.918 49.3848 71 42.5212 71 35.5C71 26.0848 67.2598 17.0552 60.6023 10.3977C53.9447 3.74017 44.9152 0 35.5 0ZM54.3835 37.7695L23.9549 52.9837C23.5682 53.177 23.1386 53.2681 22.7067 53.2486C22.2749 53.229 21.8552 53.0994 21.4876 52.872C21.1199 52.6446 20.8165 52.327 20.6062 51.9494C20.3958 51.5717 20.2855 51.1465 20.2857 50.7143V20.2857C20.286 19.8536 20.3966 19.4288 20.6071 19.0515C20.8176 18.6742 21.1211 18.357 21.4887 18.1299C21.8562 17.9028 22.2757 17.7734 22.7073 17.7539C23.139 17.7345 23.5684 17.8256 23.9549 18.0188L54.3835 33.2331C54.8041 33.4439 55.1578 33.7676 55.4049 34.1679C55.6521 34.5683 55.783 35.0295 55.783 35.5C55.783 35.9705 55.6521 36.4317 55.4049 36.8321C55.1578 37.2324 54.8041 37.5561 54.3835 37.7669V37.7695Z"
                                fill="#4D4D4D"
                              />
                            </svg>

                            <span className="absolute bg-white bottom-5 left-5 px-2 rounded-full text-sm">
                              {item?.duration}
                            </span>
                          </div>

                          <div className="mt-3">
                            <h3 className="lg:text-2xl font-medium md:text-xl">
                              {item?.title}
                            </h3>
                            <p className="lg:text-2xl font-light md:text-xl">
                              {item?.provider}
                            </p>
                          </div>
                        </div>
                        </div>
                      );
                    })}
              </div>
            </div>

            <div
              className=""
              style={{
                display:
                  profileData &&
                  profileData?.selectedProfile?.recentlyViwedCourses?.length !=
                    0
                    ? "block"
                    : "none",
              }}
            >
              <div className="flex justify-between">
                <h1 className=" lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-10/12">
                  Recently viewed
                </h1>
                <a
                  style={{
                    display:
                      profileData &&
                      profileData?.selectedProfile?.recentlyViwedCourses &&
                      profileData &&
                      profileData?.selectedProfile?.recentlyViwedCourses
                        ?.length > 3 &&
                      profileData &&
                      !recentSeeMore
                        ? "block"
                        : "none",
                  }}
                  href="javascript:void(0)"
                  className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
                  onClick={() => {
                    setRecentViewPageSize(recetViewPageSize + 3);
                    if (
                      profileData?.selectedProfile?.recentlyViwedCourses
                        ?.length <=
                      recetViewPageSize + 3
                    ) {
                      setRecentSeeMore(true);
                    }
                  }}
                >
                  See More{" "}
                </a>
              </div>
              <div className="flex -mx-3.5 mb-10 flex-wrap">
                {profileData &&
                  profileData?.selectedProfile?.recentlyViwedCourses
                    ?.slice(0, recetViewPageSize)
                    .map((item) => {
                      return (
                        <div
                          className="w-4/12 px-3.5 md:w-6/12 lg:w-4/12 sm:w-6/12 xs:w-full md:mb-8 sm:mb-8"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.open(`https://www.udemy.com${item.url}`);
                          }}
                        >
                          <div className="vid-box relative">
                            <img
                              src={item?.image}
                              className="lg:h-60 md:h-52 w-full object-cover rounded-3xl sm:h-60"
                            ></img>
                            <div
                              className="absolute top-0 w-full h-full opacity-25"
                              style={{ backgroundColor: "#dadada" }}
                            ></div>
                            <svg
                              className="absolute top-2/4 left-1/2 right-0 transform -translate-x-2/4 -translate-y-1/2"
                              width="71"
                              height="71"
                              onClick={() => {
                                redirectCourse(item?.url, item);
                              }}
                              viewBox="0 0 71 71"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M35.5 0C28.4788 0 21.6152 2.08204 15.7773 5.98283C9.93932 9.88362 5.3892 15.428 2.70229 21.9147C0.0153816 28.4015 -0.687637 35.5394 0.682138 42.4257C2.05191 49.312 5.43296 55.6375 10.3977 60.6023C15.3625 65.567 21.688 68.9481 28.5743 70.3179C35.4606 71.6876 42.5985 70.9846 49.0853 68.2977C55.572 65.6108 61.1164 61.0607 65.0172 55.2227C68.918 49.3848 71 42.5212 71 35.5C71 26.0848 67.2598 17.0552 60.6023 10.3977C53.9447 3.74017 44.9152 0 35.5 0ZM54.3835 37.7695L23.9549 52.9837C23.5682 53.177 23.1386 53.2681 22.7067 53.2486C22.2749 53.229 21.8552 53.0994 21.4876 52.872C21.1199 52.6446 20.8165 52.327 20.6062 51.9494C20.3958 51.5717 20.2855 51.1465 20.2857 50.7143V20.2857C20.286 19.8536 20.3966 19.4288 20.6071 19.0515C20.8176 18.6742 21.1211 18.357 21.4887 18.1299C21.8562 17.9028 22.2757 17.7734 22.7073 17.7539C23.139 17.7345 23.5684 17.8256 23.9549 18.0188L54.3835 33.2331C54.8041 33.4439 55.1578 33.7676 55.4049 34.1679C55.6521 34.5683 55.783 35.0295 55.783 35.5C55.783 35.9705 55.6521 36.4317 55.4049 36.8321C55.1578 37.2324 54.8041 37.5561 54.3835 37.7669V37.7695Z"
                                fill="#4D4D4D"
                              />
                            </svg>

                            <span className="absolute bg-white bottom-5 left-5 px-2 rounded-full text-sm">
                              {item?.duration}
                            </span>
                          </div>

                          <div className="mt-3">
                            <h3 className="lg:text-2xl font-medium md:text-xl">
                              {item?.title}
                            </h3>
                            <p className="lg:text-2xl font-light md:text-xl">
                              {item?.provider}
                            </p>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>

            <div className="">
              <div className="flex justify-between">
                <h1 className=" lg:text-4xl md:text-3xl font-semibold mb-6 sm:text-xl sm:w-9/12">
                  Explore trending courses
                </h1>
                <a
                  href="javascript:void(0)"
                  className="lg:text-2xl md:text-xl font-semibold text-gray-500 underline sm:w-3/12 text-right"
                  onClick={() => {
                    setTrendingPageSize(trendingPageSize + 3);
                  }}
                >
                  See More{" "}
                </a>
              </div>
              <div className="flex -mx-3.5  mb-10 flex-wrap">
                {profileData &&
                  profileData?.trendingSkill?.map((item) => {
                    return (
                      <div
                        className="w-4/12 px-3.5 md:w-6/12 lg:w-4/12 sm:w-6/12 xs:w-full md:mb-8 sm:mb-8"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="vid-box relative group">
                          <img
                            src={item?.image_480x270}
                            className="lg:h-60 md:h-52 w-full object-cover rounded-3xl sm:h-60"
                          ></img>
                          <div
                            className="absolute top-0 w-full h-full opacity-25 group-hover:opacity-60"
                            style={{ backgroundColor: "#dadada" }}
                            onClick={() => {
                              //  window.open(`https://www.udemy.com${item.url}`);
                              redirectCourse(item?.url, item);
                            }}
                          ></div>

                          <svg
                            className="absolute top-2/4 left-1/2 right-0 transform -translate-x-2/4 -translate-y-1/2"
                            width="71"
                            height="71"
                            onClick={() => {
                              redirectCourse(item?.url, item);
                            }}
                            viewBox="0 0 71 71"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M35.5 0C28.4788 0 21.6152 2.08204 15.7773 5.98283C9.93932 9.88362 5.3892 15.428 2.70229 21.9147C0.0153816 28.4015 -0.687637 35.5394 0.682138 42.4257C2.05191 49.312 5.43296 55.6375 10.3977 60.6023C15.3625 65.567 21.688 68.9481 28.5743 70.3179C35.4606 71.6876 42.5985 70.9846 49.0853 68.2977C55.572 65.6108 61.1164 61.0607 65.0172 55.2227C68.918 49.3848 71 42.5212 71 35.5C71 26.0848 67.2598 17.0552 60.6023 10.3977C53.9447 3.74017 44.9152 0 35.5 0ZM54.3835 37.7695L23.9549 52.9837C23.5682 53.177 23.1386 53.2681 22.7067 53.2486C22.2749 53.229 21.8552 53.0994 21.4876 52.872C21.1199 52.6446 20.8165 52.327 20.6062 51.9494C20.3958 51.5717 20.2855 51.1465 20.2857 50.7143V20.2857C20.286 19.8536 20.3966 19.4288 20.6071 19.0515C20.8176 18.6742 21.1211 18.357 21.4887 18.1299C21.8562 17.9028 22.2757 17.7734 22.7073 17.7539C23.139 17.7345 23.5684 17.8256 23.9549 18.0188L54.3835 33.2331C54.8041 33.4439 55.1578 33.7676 55.4049 34.1679C55.6521 34.5683 55.783 35.0295 55.783 35.5C55.783 35.9705 55.6521 36.4317 55.4049 36.8321C55.1578 37.2324 54.8041 37.5561 54.3835 37.7669V37.7695Z"
                              fill="#4D4D4D"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            className="absolute top-5 right-5 opacity-0 group-hover:opacity-100"
                            viewBox="0 0 24 24"
                            onClick={(e) => {
                              saveCourse(e, item);
                            }}
                          >
                            <path
                              fill="#000"
                              d="M6 0v24l6-5.269 6 5.269v-24h-12zm8.473 13.8l-2.473-1.321-2.472 1.321.494-2.759-2.022-1.943 2.777-.383 1.223-2.523 1.223 2.522 2.777.384-2.021 1.943.494 2.759z"
                            />
                          </svg>

                          <span className="absolute bg-white bottom-5 left-5 px-2 rounded-full text-sm">
                            {item?.content_info_short}
                          </span>
                        </div>

                        <div className="mt-3">
                          <h3 className="lg:text-2xl font-medium md:text-xl">
                            {item?.title}
                          </h3>
                          <p className="lg:text-2xl font-light md:text-xl">
                            Udemy
                          </p>
                        </div>
                      </div>
                    );
                  })}
                {/* <div className="mt-3">
                  <h3 className="lg:text-2xl font-medium md:text-xl">
                    Digital Photography
                  </h3>
                  <p className="lg:text-2xl font-light md:text-xl">Adobe</p>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default Skill;
