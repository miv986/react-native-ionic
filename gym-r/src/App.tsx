import { Route, Redirect } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import ExerciseDetails from "./pages/ExerciseDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MuscleGroups } from "./pages/MuscleGroups";
import { AccountDetails } from "./pages/AccountDetails";
import { TrainingLists } from "./pages/TrainingLists";
import { ExerciseList } from "./pages/ExerciseList";
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/traininglists">
          <TrainingLists />
        </Route>
        <Route
          exact
          path="/exerciselist/:grupoMuscular"
          component={ExerciseList}
        ></Route>
        <Route exact path="/exercise/:exerciseId">
          <ExerciseDetails />
        </Route>
        <Route exact path="/musclegroups">
          <MuscleGroups />
        </Route>
        <Route exact path="/accountdetails">
          <AccountDetails />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
