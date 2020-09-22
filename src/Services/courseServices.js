import configs from "../Configs/Configs.json";
import http from "./httpServices";

//this method takes in a course and sends an api call to penn labs to retrive data about that course.

export async function getCourse(course) {
    const searchString = `${course.dept}-${course.number}`
  const apiPoint = configs.apiEndPoint + searchString;
  try {
    const result = await http.get(apiPoint);
    return result.data;

  } catch (error) {
    console.log(error);
  }
}


