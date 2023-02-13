// Description: This is the main component of the application. It is the parent of all other components.

// Import Components
import { Routes, Route } from "react-router-dom";

import ActionButton from "./app/actionbutton";
import AppRoutes from "./Routes";

function App() {

  return (
    <>
    <Routes>
      {
        AppRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))
      }
    </Routes>
    <ActionButton/>
    </>
  );
}

export default App;
