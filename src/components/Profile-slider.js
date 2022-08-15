import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { uploadProjectImages, viewProfile,updateUserDetails, updateProfile } from "../store/profile/index";
import { useDispatch, useSelector } from "react-redux";
const  Proslider=(props)=> {

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
        
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
        
      },
    ],
  };
  const dispatch = useDispatch();
  const profileData=useSelector(state=>state.profile)

  const uploadFile = (e) => {
    //  console.log(e.target.files);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    //   data.append("pid", match.params.id);

    if (e.target.files.length !== 0) {
      dispatch(uploadProjectImages(data));
      setTimeout(() => {
        dispatch(viewProfile(props.id));
      }, 2000);
    }
  };

     const editImage = (e,datas) => {
     
    const data = new FormData();
    data.append("file", e.target.files[0]);
       data.append("removeName", datas);

    if (e.target.files.length !== 0) {
      dispatch(uploadProjectImages(data)).then((res)=>{
  dispatch(viewProfile(props.id));
      });
   
    }
  };
  const deleteImage=(data)=>{

   let imageArr= props?.data;
    let objData = imageArr.filter((item, index) => {
      return item._id !== data._id;
    });
  
    dispatch(updateUserDetails({projectImg:objData,role:profileData.profile.type}))
     setTimeout(() => {
      dispatch(viewProfile(props.id));
    }, 1000);
  }

  return (
    <div >
      <Slider {...settings} className="slick-slide1">
        {/* <div className="slider-img pl-2 pr-2">
          <img src={slider_1_img} className="rounded-3xl h-full"></img>
        </div>
        <div className="slider-img pl-2 pr-2">
          <img src={slider_2_img} className="rounded-3xl h-full"></img>
        </div>
        <div className="slider-img pl-2 pr-2">
          <img src={slider_2_img} className="rounded-3xl h-full"></img>
        </div> */}
        {props &&
          props?.data?.map((item,index) => {
            return (
              <div className="slider-img pl-2 pr-2">

                <div className="rounded-3xl h-full relative" style={{backgroundImage:`url('${item.fullUrl}')`, backgroundSize:'cover', backgroundPosition:'center'}}>
                  <span className="pr-3 absolute right-5 -top-8">
                                       <input
                  type="file"
                  accept="image/*"
                  id={`file-input-3${index}`}
                  className={`${index} absolute w-px h-px overflow-hidden	opacity-0	z-0	`}
                  onChange={(e)=>{console.log('--',index)
                     editImage(e,index)}}
                />
                             <label style={{display:props.val?'none':'block'}} for={`file-input-3${index}`}> 
                              <svg
                                
                                style={{ cursor: "pointer" }}
                                
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="#2e9488"
                                className="text-base"
                              >
                                <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"></path>
                              </svg>
                              </label>
                            </span>
           
                            <span className="absolute right-0 -top-8"   style={{display:props.val?'none':'block'}}>
                              <svg
                            
                                onClick={()=>{ deleteImage(item)}}
                                style={{ cursor: "pointer" }}
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                version="1.1"
                                fill="#2e9488"
                                xmlns="http://www.w3.org/2000/svg"
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

                            </span>
                </div>
              </div>
            );
          })}

        <div className="slider-img pl-2 pr-2 h-full">
          <div
            className="bg-white h-full rounded-3xl"
            style={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
              display: props.val === true ? "none" : "block",
            }}
          >
            <div className="plus-exp flex w-full">
              <button className="text-7xl text-gray-400 cursor-pointer z-10 w-full h-full">
                <label
                  class="file-label data1 m-0 cursor-pointer  items-center justify-center  h-full flex  text-center block"
                  for="file-input-1"
                >
                  +
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="file-input-1"
                  className="file-input-1 absolute w-px h-px overflow-hidden	opacity-0	z-0	"
                  onChange={uploadFile}
                />
              </button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
export default Proslider;
