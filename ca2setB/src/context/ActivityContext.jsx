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
        const tokenRes = await getToken("E0123021", "240387", "SetB");
        const activities = await getDataset(tokenRes.token, tokenRes.dataUrl);        
        console.log("Fetched activities:", activities);        
        dispatch({ type: "SET_ACTIVITIES", payload: activities });
      } catch (err) {
        console.error("Error fetching data:", err.message);
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