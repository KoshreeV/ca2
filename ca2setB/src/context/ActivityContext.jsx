import { createContext, useContext, useReducer, useEffect } from "react";
import ActivityReducer from "../reducer/ActivityReducer";
import { getToken, getDataset } from "../api/api";

const initialState = {
  activities: [],
  loading: true,
};

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const tokenRes = await getToken("E0123021", "240387", "Set B");
        const activities = await getDataset(tokenRes.token, tokenRes.dataUrl);
        dispatch({ type: "SET_ACTIVITIES", payload: activities });
      } catch (err) {
        console.error("Error fetching data:", err.message);
        const sampleData = [
          { activityid: 1, name: "Running", steps: 10000, caloriesBurned: 500, workoutMinutes: 60, goalAchieved: true, date: "2023-01-01" },
          { activityid: 2, name: "Walking", steps: 5000, caloriesBurned: 200, workoutMinutes: 30, goalAchieved: false, date: "2023-01-02" }
        ];
        dispatch({ type: "SET_ACTIVITIES", payload: sampleData });
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