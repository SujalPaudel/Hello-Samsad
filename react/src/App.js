import React from "react";
import { Route } from "react-router-dom";

import useInitialize from "./components/utils/initialize";

import routes from "./routes";

function App() {
  useInitialize();

  return (
    <div>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </div>
  );
}

export default App;