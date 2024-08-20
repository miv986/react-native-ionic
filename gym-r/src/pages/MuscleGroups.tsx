import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import GymItem from "../components/ItemGym";
import { home, book, person } from "ionicons/icons";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { ExerciseList } from "./ExerciseList";

interface MuscleGroup {
  descripcion: string;
  nombre: string;
  imagen: string;
  grupoMuscular: string;
}

export function MuscleGroups() {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);

  useEffect(() => {
    api
      .get<MuscleGroup[]>("/grupos-musculares")
      .then((response) => {
        console.log(response);
        setMuscleGroups(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los grupos musculares:", error);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Grupos musculares</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            display: "block",
            height: "100%",
          }}
        >
          <IonList>
            {muscleGroups.map((group, index) => (
              <GymItem
                key={group.grupoMuscular}
                imagen={group.imagen}
                texto={group.nombre}
                ruta={`/exerciselist/${group.grupoMuscular}`}
              ></GymItem>
            ))}
          </IonList>
          Los grupos musculares
        </div>
      </IonContent>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/traininglists">
          <IonIcon icon={home} />
          <IonLabel>Lists</IonLabel>
        </IonTabButton>

        <IonTabButton tab="book" href="/musclegroups">
          <IonIcon icon={book} />
          <IonLabel>Muscle groups</IonLabel>
        </IonTabButton>

        <IonTabButton tab="account" href="/accountdetails">
          <IonIcon icon={person} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
}
