import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import ExerciseList from "../components/ExerciseList";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Grupos musculares</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Grupos musculares</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <ExerciseList />
      </IonContent>
    </IonPage>
  );
};

export default Home;
