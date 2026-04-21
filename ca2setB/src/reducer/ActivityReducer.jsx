const ActivityReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case "TOGGLE_GOAL_ACHIEVED":
      return {
        ...state,
        activities: state.activities.map((a) =>
          a.activityid === action.payload ? { ...a, goalAchieved: !a.goalAchieved } : a
        ),
      };

    default:
      return state;
  }
};

export default ActivityReducer;