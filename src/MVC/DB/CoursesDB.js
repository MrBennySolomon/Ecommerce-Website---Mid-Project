import axios from "axios";

const CoursesDB = {
  courses: axios.create({
    baseURL:
      "https://courses-331d7-default-rtdb.europe-west1.firebasedatabase.app/courses", 
  }),

  async removeCourse(id) {
  this.courses
      .delete(`/${id}.json`)
      .then((response) => {
        console.log(`Course id ${id} was deleted seccesfully`);
        return "Course Was Deleted!";
      })
      .catch((error) => {
        return "Error while deleting course";
      });
  },

  async getCourse(id) {
    return this.getAllCourses().then((course) => course.find((item) => item.id === id));
  },

  async getAllCourses() {
    try {
      const response = await this.courses.get(".json");
      if (response.status !== 200) {
        console.error("cant get course from the api");
        return;
      }
      return response.data;
    } catch (error) {
      console.error("Error getting course", error);
    }
  },

  async addCourse(newCourse) {
    this.courses
      .post(".json", newCourse)
      .then((response) => {
        console.log("Course added successfully");
      })
      .catch((error) => {
        console.error("Error adding course", error);
      });
  },
  
  async editCourse(updatedData, id) {
    this.courses
      .put(`/${id}.json`, updatedData)
      .then((response) => {
        console.log("Course updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating course:", error);
      });
  },
};

  export default CoursesDB;