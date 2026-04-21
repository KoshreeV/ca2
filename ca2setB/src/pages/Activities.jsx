import React from "react";
import { Link } from "react-router-dom";
import { useActivity } from "../context/ActivityContext";

const Activities = () => {
  const { activities, toggleGoalAchieved } = useActivity();

  const validActivities = activities.filter(
    (a) => a.steps > 0 && a.caloriesBurned > 0 && a.workoutMinutes > 0 && typeof a.goalAchieved === "boolean"
  );

  const handleToggle = (id, steps) => {
    if (steps >= 8000) {
      toggleGoalAchieved(id);
    }
  };

  return (
    <div>
      <h1>Activities</h1>
      <div data-testid="total-activities">{validActivities.length}</div>
      {validActivities.length === 0 && <p>Loading or no valid data...</p>}
      {validActivities.map((activity) => (
        <div key={activity.activityid} data-testid="activity-item">
          <Link to={`/activities/${activity.activityid}`}>
            <h3>{activity.name}</h3>
          </Link>
          <p>Steps: {activity.steps}</p>
          <p>Calories: {activity.caloriesBurned}</p>
          <p>Minutes: {activity.workoutMinutes}</p>
          <p>Date: {activity.date}</p>
          <p>Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}</p>
          <button onClick={() => handleToggle(activity.activityid, activity.steps)}>Toggle Goal</button>
        </div>
      ))}
    </div>
  );
};

export default Activities;