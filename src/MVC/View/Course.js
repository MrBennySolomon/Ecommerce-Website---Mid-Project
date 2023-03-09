/* eslint-disable react-hooks/exhaustive-deps */
import vid from "../../mp4/vid.mp4";
import vid2 from "../../mp4/vid2.mp4";
import vid3 from "../../mp4/vid3.mp4";
import "../../styles/Course.modules.css";
import React, { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import constants from "../../utils/constants";

const Course = () => {
  const {
    controller,
    updateCount,
    updateTotal,
    showEditFields,
    setShowEditFields,
    setIsLoading,
    updateArrayIds
  } = useGlobalContext();
  const params = useParams();
  const navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const videoRef = useRef();

  const courses = controller.model.getLocal(constants.COURSES);
  const selectedCourse = courses[params.id];

  const loggedInUser = controller.model.getLocal(constants.LOGGED_IN_USER);
  const isAdmin = loggedInUser?.type === constants.ADMIN;
  
  const isPurchased =
    loggedInUser?.courses?.length > 0 &&
    loggedInUser?.courses?.find(
      (course) => course.name === selectedCourse.name
    );

  const addToCartHandler = () => {
    controller.addCourseToCart(
      updateCount,
      updateTotal,
      params,
      loggedInUser,
      navigate
    );
  };

  const deleteHandler = () => {
    controller.deleteSpecificCourse(params.id, setIsLoading, updateArrayIds);
    navigate(constants.COURSES_PAGE);
  };

  const addHandler = () => {
    controller.coursesAddSame(selectedCourse, updateArrayIds, setIsLoading);
    navigate(constants.COURSES_PAGE);
  };

  useEffect(() => {
    setShowEditFields(false);
  }, []);

  const showHandler = () => {
    setShowEditFields(true);
    setTimeout(() => {
      editHandler();
    }, 0.1);
  };

  const editHandler = () => {
    nameRef.current.value = selectedCourse.name;
    priceRef.current.value = selectedCourse.price;
    imageRef.current.value = selectedCourse.imgUrl;
    videoRef.current.value = JSON.stringify(selectedCourse.videos);
  };

  const doneHandler = () => {
    controller.editSpecificCourse(
      nameRef,
      priceRef,
      imageRef,
      videoRef,
      params.id,
      setIsLoading,
      updateArrayIds
    );
    setShowEditFields(false);
    navigate("/courses");
  };

  return isPurchased && !isAdmin ? (
    <div className="course">
      <video
        ref={videoRef}
        width="60%"
        height="80%"
        controls
        controlsList="nodownload"
      >
        <source src={vid} type="video/mp4" />
      </video>

      <div className="course-video-items">
        {/* {loggedInUser.courses[0].videos.map ((vid) => {
          return <button key={vid.name} onClick={() => videoRef.current.src = vid.url}>{vid.name}</button>
        })}         */}
        <button
          onClick={() =>
            (videoRef.current.src =
              "https://v-cg.etsystatic.com/video/upload/s--i2SL9cBi--/ac_none,c_crop,du_15,h_720,q_auto:good,w_960,x_160,y_0/IMG_5633_moezom")
          }
        >
          nails art 1
        </button>
        <button onClick={() => (videoRef.current.src = vid2)}>
          nails art 2
        </button>
        <button onClick={() => (videoRef.current.src = vid3)}>
          nails art 3
        </button>
      </div>
    </div>
  ) : (
    <div className="course">
      <div className="course-img-container">
        <img alt={selectedCourse.name} src={selectedCourse.imgUrl} width="100%" height="100%" />
      </div>
      <div className="course-description-container">
        <h1>{selectedCourse.name}</h1>
        <h2>{selectedCourse.price}</h2>
        <button onClick={addToCartHandler} className="add-to-cart-btn">
          Add to Cart
        </button>
        {isAdmin && (
          <button className="labels">
            <label onClick={deleteHandler}>
              <i className="fa-solid fa-trash-can fa-2x"></i>
            </label>
            <label onClick={addHandler}>
              <i className="fa-solid fa-plus fa-2x"></i>
            </label>
            <label onClick={showHandler}>
              <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </label>
          </button>
        )}
        {showEditFields && (
          <>
            <input
              ref={nameRef}
              type="text"
              width="100%"
              placeholder="Product Name"
            />
            <input
              ref={priceRef}
              type="text"
              width="100%"
              placeholder="Product Price"
            />
            <input
              ref={imageRef}
              type="text"
              width="100%"
              placeholder="Product Image Url"
            />
            <input
              ref={videoRef}
              type="text"
              width="100%"
              placeholder={`Video seperate with ','`}
            />
            <button onClick={doneHandler}>Done</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Course;
