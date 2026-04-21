import React, { useEffect } from "react";
import { useActivity } from "../context/ActivityContext";

const Stats = () => {
  const { activities } = useActivity();

  const validActivities = activities.filter(
    (a) => a.activityId && a.name && typeof a.goalAchieved === "boolean"
  );

  const goalAchievedCount = validActivities.filter((a) => a.goalAchieved).length;
  const goalNotAchievedCount = validActivities.filter((a) => !a.goalAchieved).length;

  useEffect(() => {
    window.appState = {
      totalActivities: validActivities.length,
      goalAchievedCount,
      goalNotAchievedCount,
    };
  }, [validActivities.length, goalAchievedCount, goalNotAchievedCount]);

  return (
    <div>
      <h1>Stats</h1>
      <div data-testid="total-activities">Total Activities: {validActivities.length}</div>
      <div data-testid="goal-achieved">Goal Achieved: {goalAchievedCount}</div>
      <div data-testid="goal-not-achieved">Goal Not Achieved: {goalNotAchievedCount}</div>
    </div>
  );
};

export default Stats;