import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Alert } from "./components/Alert";
import { AlertState } from "./context/alert/AlertState";
import { FirebaseState } from "./context/firebase/FirebaseState";

function App() {
  return (
    <FirebaseState>
      <AlertState>
        <BrowserRouter>
          <Navbar />
          <div className="container pt-4">
            <Alert />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </FirebaseState>
  );
}

export default App;
