/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/Courses.modules.css";
import React, { useEffect, useRef } from "react";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import constants from "../../utils/constants";

const Courses = () => {
  const { controller, arrayIds, updateArrayIds, isLoading, setIsLoading } =
    useGlobalContext();
  const navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const videoRef = useRef();

  const loggedInUser = controller.model.getLocal(constants.LOGGED_IN_USER);
  let courses = controller.model.getLocal(constants.COURSES);
  const isAdmin = loggedInUser?.type === constants.ADMIN;

  const deleteClickHandler = () => {
    if (nameRef.current.value.length > 0) {
      controller.deleteCourseFromDB(
        arrayIds,
        courses,
        nameRef,
        navigate,
        updateArrayIds,
        setIsLoading
      );
      resetInputFields();
    }
  };

  const addClickHandler = () => {
    controller.addCourseToDB(
      nameRef,
      priceRef,
      imageRef,
      videoRef,
      navigate,
      updateArrayIds,
      setIsLoading
    );
    resetInputFields();
  };

  const editClickHandler = () => {
    controller.editCourseFromDB(
      arrayIds,
      courses,
      nameRef,
      priceRef,
      imageRef,
      videoRef,
      navigate,
      updateArrayIds,
      setIsLoading
    );
    resetInputFields();
  };

  const resetInputFields = () => {
    nameRef.current.value = '';
    priceRef.current.value = '';
    imageRef.current.value = '';
  };

  useEffect(() => {
    controller.checkDB(
      courses,
      updateArrayIds,
      loggedInUser,
      setIsLoading,
      navigate
    );
    setIsLoading(false);
  }, []);

  return (
    <div className="courses">
      {isAdmin && <h1>Admin Area</h1>}
      {isAdmin && (
        <div className="admin-container">
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
          <button onClick={deleteClickHandler} className="btn-delete-admin">
            DELETE
          </button>
          <button onClick={addClickHandler} className="btn-add-admin">
            ADD
          </button>
          <button onClick={editClickHandler} className="btn-edit-admin">
            EDIT
          </button>
        </div>
      )}
      <h1>Online Courses</h1>
      <div className="courses-container">
        {isLoading && (
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {!isLoading &&
          courses &&
          arrayIds.map((id) => (
            <Link key={id} to={`/courses/${id}`}>
              <Card
                name={courses[id]?.name}
                price={courses[id]?.price}
                src={courses[id]?.imgUrl}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Courses;
