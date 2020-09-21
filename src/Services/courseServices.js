import configs from "../Configs/Configs.json";
import http from "./httpServices";

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


