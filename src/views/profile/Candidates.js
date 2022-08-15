import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/navbar";
import Footer from "../../components/layouts/Footer.js";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import img_19 from "../../assets/images/2.gif";
import SlideToggle from "react-slide-toggle";
import TagsInput from "react-tagsinput";
import {searchCandidate} from '../../store/profile/index'
import {useHistory} from 'react-router-dom'
const Candidates=()=>{
const [searchJobInput, setSearchJobInput] = useState();
const [spinnerState, setSpinnerState] = useState(false);
const [myStorySkill, setMyStorySkill] = useState([]);
  const profileData = useSelector((state) => state.profile);
const dispatch=useDispatch();
const history=useHistory()
      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 useEffect(()=>{
 //  dispatch(searchCandidate())
 },[])
  const onSubmit = (data) => {

     dispatch(searchCandidate({ ...data, name: searchJobInput,skills:myStorySkill }));
  };
  const handleSubmit1 = (e) => {
    if (e.key === "Enter" || e === "click") {
      
 
      setSpinnerState(true);
      dispatch(searchCandidate({ name: searchJobInput.trim() }))
        .then((res) => {
          setSpinnerState(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
    return(<div><Navbar/>
    <div className="container m-auto px-5" >
        <div className="mb-3 mt-5 w-11/12 m-auto xs:mb-14">
          <h1 className="container m-auto lg:text-5xl md:text-4xl flex items-center text-3xl font-semibold xs:text-2xl">
            <svg
              viewBox="0 0 32 32"
              className="inline mr-3"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "40px",
                fill: "#38acb8",
                cursor: "pointer",
                display: "none",
              }}
            >
              <title />
              <g data-name="Layer 2" id="Layer_2">
                <path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z" />
                <path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z" />
              </g>
            </svg>
           Candidates{" "}
          </h1>
           <div className="relative w-full flex items-center mt-10" >
                    <input
                      type="text"
                      value={searchJobInput}
                      onKeyDown={(e) => {
                        handleSubmit1(e);
                      }}
                      placeholder="Search"
                      className="border-solid border-2 h-12 rounded-full pl-16 placeholder-gray-400 text-lg w-10/12 font-medium"
                      style={{ borderColor: "#C4C4C4" }}
                      onChange={(e) => {
                        setSearchJobInput(e.target.value);
                      }}
                    ></input>
                    <img
                      className="ml-5 w-10 sm:w-8"
                      src={img_19}
                      style={{ display: spinnerState ? "block" : "none" }}
                    ></img>
                    <svg
                      className="absolute top-2/4 left-3"
                      style={{
                        transform: "translateY(-50%)",
                        cursor: "pointer",
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
                  </div>
        </div></div>
       <div style={{display:'none'}}> 
        <SlideToggle
          duration={2000}
          collapsed={true}
          whenReversedUseBackwardEase={false}
          render={({ toggle, setCollapsibleElement }) => (
            <>
              <div className="relative h-12 mt-7 sm:mt-5">
                <div className="w-11/12 m-auto" style={{ display: "flex" }}>
                  <div className="">
                    <button
                      onClick={toggle}
                      className="flex px-4 py-1 font-medium font-bold  border h-11 border-solid border-black	 rounded mr-4 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        className="mr-2"
                        fill="#16acb2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z" />
                      </svg>
                      Filter
                    </button>
                  </div>
                 
                </div>
              </div>
              <div
                className=" border-t border-slate-400	border-solid py-4 mt-5 w-11/12 m-auto"
                ref={setCollapsibleElement}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block">Location</label>
                  <div className="flex flex-wrap -mx-2">
                    <div className=" px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                    
                      {/* <input
                        className="w-full rounded"
                        type="text"
                        {...register("location")}
                      ></input> */}
                      <div className="flex">
                          <div className="px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                              <label className="block">City</label>
                              <input
                                className="w-full rounded"
                                type="text"
                                {...register("city")}
                              ></input>
                          </div>
                     
                      <div className="px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                          <label className="block">Zip code</label>
                          <input
                            className="w-full rounded"
                            type="text"
                            {...register("zip")}
                          ></input>
                       </div>
                        </div>
                    </div>
                    <div className="px-2  mb-2 w-1/4 md:w-1/2 sm:w-1/2 xs:w-full">
                      <label className="block">Company</label>
                      <input
                        className="w-full rounded"
                        type="text"
                        {...register("company")}
                      ></input>
                    </div>
                  </div>
                  <div className="flex mt-3 -mx-2 flex-wrap">
                    <div className="w-3/12 px-2 sm:w-1/2 xs:w-full">
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: "rgba(0,0,0,.03)" }}
                      >
                        <h1>Skills</h1>
                      </div>
                      <div className="px-0 py-4">
                   <TagsInput
                value={myStorySkill}
                onChange={(tags) => {
                  setMyStorySkill(tags);
                }}
               
                maxTags={3}
                onlyUnique={true}
                inputProps={{ placeholder: "Add Skill" }}
                //  disabled={myStorySkill.length == 3 ? true : false}
              />
                      </div>
                    </div>
                    {/* <div className="w-4/12 px-2 sm:w-1/2 xs:w-full">
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: "rgba(0,0,0,.03)" }}
                      >
                        <h1>Salary</h1>
                      </div>
                      <div className="px-5 py-4 flex flex-wrap items-center lg:justify-between md:justify-center sm:justify-center">
                       
                        <input
                          type="number"
                          min="0"
                          className="lg:w-5/12 h-8 p-0 px-3 text-sm md:w-full sm:w-full"
                          placeholder={0}
                          {...register("minSalary")}
                        ></input>
                        <p className="lg:m-0 md:text-center md:my-3 sm:text-center sm:my-1">
                          To
                        </p>
                        <input
                          type="number"
                          min="0"
                          placeholder={100}
                          className="lg:w-5/12 h-8 p-0 px-3 text-sm md:w-full sm:w-full"
                          {...register("maxSalary")}
                        ></input>
                       
                      </div>
                    </div>
                    <div className="w-2/12 px-2 sm:w-1/2 xs:w-full">
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: "rgba(0,0,0,.03)" }}
                      >
                        <h1>Compensation</h1>
                      </div>
                      <div className="px-5 py-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3"
                            {...register("compensation[]")}
                            value="Hourly"
                          ></input>
                          Hourly
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register("compensation[]")}
                            className="mr-3"
                            value="Salary"
                          ></input>
                          Salary
                        </label>
                      
                      </div>
                    </div>
                    <div className="w-2/12 px-2 sm:w-1/2 xs:w-full">
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: "rgba(0,0,0,.03)" }}
                      >
                        <h1>Job Type</h1>
                      </div>
                      <div className="px-5 py-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3"
                            {...register("jobType[]")}
                            value="Full Time"
                          ></input>
                          Full Time
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register("jobType[]")}
                            className="mr-3"
                            value="Part Time"
                          ></input>
                          Part Time
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register("jobType[]")}
                            value="Contract"
                            className="mr-3"
                          ></input>
                          Contract
                        </label>
                      </div>
                    </div>
                    <div className="w-2/12 px-2 sm:w-1/2 xs:w-full">
                      <div
                        className="border-b border-slate-400	border-solid px-4 py-3"
                        style={{ backgroundColor: "rgba(0,0,0,.03)" }}
                      >
                        <h1>Experience</h1>
                      </div>
                      <div className="px-5 py-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-3"
                            {...register("experience[]")}
                            value="entry level"
                          ></input>
                       Entry level
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register("experience[]")}
                            className="mr-3"
                            value="Intermediate"
                          ></input>
                         Intermediate
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            {...register("experience[]")}
                            value="Expert"
                            className="mr-3"
                          ></input>
                          Expert
                        </label>
                      </div>
                    </div> */}
                  </div>
                  <div className="text-right">
                    <button className="px-8 py-2 bg-red-500 rounded text-white">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        /></div>
          
        {profileData&&profileData?.getCandidates?.data?.data.length !=0 ? profileData&&profileData?.getCandidates?.data?.data?.map((item)=>{return(
                // 1177 - clicked on search candidates worked on beyond components -moved the click to 353 line  and changed the classes
                <div className="relative mt-7 sm:mt-5 mb-5">
                 <div className="w-9/12 m-auto flex">
                  <button className="xs:hidden md:hidden lg:hidden flex px-4 py-1 invisible font-medium font-bold  border h-11 border-solid border-black rounded mr-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="mr-2" fill="#16acb2" viewBox="0 0 24 24"><path d="M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z"></path>
                    </svg>Filter</button>
                    <div className="relative w-full flex items-center" style={{cursor:'pointer'}} onClick={()=>{history.push(`/profiles/${item.id}`)}}>
                        {/* // 1177 - clicked on search candidates worked on beyond components */}
                       <div className="w-10/12 xs:w-full sm:text-center">
                         <div className="border  border-gray-400 p-4">
                            <div className=" w-full md:max-w-full md:flex m-auto  items-center">
                              <div className="h-36 w-36  sm:justify-center md:w-36 flex-none bg-cover   sm:m-auto  rounded-full  text-center overflow-hidden"
                              title="Mountain" style={{  backgroundImage:`url(${item.image !='' ? item.image:'https://www.w3schools.com/howto/img_avatar.png'})`, backgroundPosition: "center",
                  backgroundSize: "9rem",
                  backgroundRepeat: "no-repeat",}}>
                              </div>
                              <div className="bg-white  rounded-b md:rounded-b-none lg:rounded-r pl-4 flex flex-col justify-between leading-normal">
                                <div className="mb-8 sm:my-4">
                                  {/* <p className="text-sm text-gray-600 flex items-center">
                                    <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                      <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                    </svg>
                                    Members only
                                  </p> */}
                                  <div className="text-gray-900 font-bold text-xl mb-2">{item.fullName}</div>
                                  {/* <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.</p> */}
                                </div>
                                <div className="flex items-center sm:justify-center">
                                  {/* <img className="w-40 h-10 rounded-full mr-4" src="/ben.png" alt="Avatar of Writer" /> */}
                                  <div className="text-sm">
                                    {/* <p className="text-gray-900 leading-none">John Smith</p>
                                    <p className="text-gray-600">Aug 18</p> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>)
        }):<div className="container m-auto my-5  text-center text-4xl font-semibold" style={{fontSize:"20px !important"}}>No record found!</div>}

    <Footer/></div>) 
}
export default Candidates