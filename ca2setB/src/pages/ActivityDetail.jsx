import React from "react";
import { useParams } from "react-router-dom";
import { useActivity } from "../context/ActivityContext";

const ActivityDetail = () => {
  const { id } = useParams();
  const { activities } = useActivity();

  const activity = activities.find((a) => a.activityid === id);

  if (!activity) return <div>Activity not found</div>;

  const efficiencyScore = activity.caloriesBurned / activity.workoutMinutes;

  return (
    <div>
      <h1>Activity Detail</h1>
      <h2>{activity.name}</h2>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Efficiency Score: {efficiencyScore.toFixed(2)}</p>
      <p>Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}</p>
      <p>Date: {activity.date}</p>
    </div>
  );
};

export default ActivityDetail;