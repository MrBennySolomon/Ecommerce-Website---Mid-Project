/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/Courses.modules.css";
import React, { useEffect } from "react";
import Card from "../../components/Card";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import constants from "../../utils/constants";

const Courses = () => {
  const { controller, arrayIds, updateArrayIds, isLoading, setIsLoading } =
    useGlobalContext();
  const navigate = useNavigate();

  const loggedInUser = controller.model.getLocal(constants.LOGGED_IN_USER);
  let courses = controller.model.getLocal(constants.COURSES);

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
