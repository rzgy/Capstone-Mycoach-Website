import instance from "./index";
import { storeToken } from "./Storage";

const loginCoach = async (coachInfo) => {
  console.log("first");
  const { data } = await instance.post("/coaches/login", coachInfo);
  console.log("data");
  storeToken(data.token, "coach");
  return data;
};

const registerCoach = async (coachInfo) => {
  const formData = new FormData();
  for (const key in coachInfo) formData.append(key, coachInfo[key]);

  const { data } = await instance.post("/coaches/register", formData);
  storeToken(data.token, "coach");
  return data;
};

export { loginCoach, registerCoach };
