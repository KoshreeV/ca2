import { createContext, useContext, useReducer, useEffect } from "react";
import ActivityReducer from "../reducer/ActivityReducer";
import { getToken, getDataset } from "../api/api";

const initialState = {
  activities: [
    { activityId: 1, name: "Running", steps: 10000, caloriesBurned: 500, workoutMinutes: 60, goalAchieved: true, date: "2023-01-01" },
    { activityId: 2, name: "Walking", steps: 5000, caloriesBurned: 200, workoutMinutes: 30, goalAchieved: false, date: "2023-01-02" },
    { activityId: 3, name: "Cycling", steps: 8000, caloriesBurned: 400, workoutMinutes: 50, goalAchieved: true, date: "2023-01-03" }
  ],
  loading: false,
};

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const tokenRes = await getToken("E0123021", "240387", "setB");
        console.log("tokenRes:", tokenRes);
        const response = await getDataset(tokenRes.token, tokenRes.dataUrl);
        console.log("response:", response);
        console.log("response.data:", response?.data);
        console.log("response.data.data:", response?.data?.data);
        
        let activitiesData = response?.data?.data;
        
        console.log("Final activitiesData:", activitiesData);
        console.log("Is array?", Array.isArray(activitiesData));
        console.log("Length:", activitiesData?.length);
        
        if (Array.isArray(activitiesData) && activitiesData.length > 0) {
          console.log("Dispatching activities:", activitiesData);
          dispatch({ type: "SET_ACTIVITIES", payload: activitiesData });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchActivities();
  }, []);

  const toggleGoalAchieved = (id) => dispatch({ type: "TOGGLE_GOAL_ACHIEVED", payload: id });

  return (
    <ActivityContext.Provider value={{ ...state, toggleGoalAchieved }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);