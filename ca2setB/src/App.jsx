import React from "react";
import { ActivityProvider } from "./context/ActivityContext";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <ActivityProvider>
      <AppRouter />
    </ActivityProvider>
  );
}

export default App;