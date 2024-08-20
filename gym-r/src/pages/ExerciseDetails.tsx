import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { useParams } from "react-router";

const exercises = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: `Exercise ${index + 1}`,
  img: `assets/img${index + 1}.jpg`,
  description: `Description for Exercise ${index + 1}`,
}));

function ExerciseDetails() {
  const { exerciseId } = useParams<{ exerciseId?: string }>();
  const exercise = exercises.find((ex) => ex.id === Number(exerciseId));

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Exercise Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Details for exercise {exerciseId}</p>
        <h1>{exercise.name}</h1>
        <img src={exercise.img} alt={exercise.name} />
        <p>{exercise.description}</p>
      </IonContent>
    </IonPage>
  );
}

export default ExerciseDetails;
