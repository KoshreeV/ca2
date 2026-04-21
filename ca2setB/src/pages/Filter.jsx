import React, { useState } from "react";
import { useActivity } from "../context/ActivityContext";

const Filter = () => {
  const { activities } = useActivity();
  const [filter, setFilter] = useState("all");

  const validActivities = activities.filter(
    (a) => a.activityId && a.name && typeof a.goalAchieved === "boolean"
  );

  const filteredActivities = validActivities.filter((a) => {
    if (filter === "achieved") return a.goalAchieved;
    if (filter === "not-achieved") return !a.goalAchieved;
    return true;
  });

  return (
    <div>
      <h1>Filter Activities</h1>
      <select name="activity-filter" onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="all">All</option>
        <option value="achieved">Goal Achieved</option>
        <option value="not-achieved">Goal Not Achieved</option>
      </select>
      {filteredActivities.map((activity) => (
        <div key={activity.activityId} data-testid="activity-item">
          <h3>{activity.name}</h3>
          <p>Steps: {activity.steps}</p>
          <p>Calories: {activity.caloriesBurned}</p>
          <p>Minutes: {activity.workoutMinutes}</p>
          <p>Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default Filter;