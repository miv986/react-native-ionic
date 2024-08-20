import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
} from "@ionic/react";
import { api } from "../utils/api";

interface Exercise {
  id: number;
  nombre: string;
  imagen: string[];
}

interface ExerciseListParams {
  grupoMuscular: string;
}

export function ExerciseList() {
  const { grupoMuscular } = useParams<ExerciseListParams>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!grupoMuscular) {
      setError("Grupo muscular no definido");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    api
      .get<Exercise[]>(`/ejercicio_data/grupoMuscular/${grupoMuscular}`)
      .then((response) => {
        setExercises(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los ejercicios:", error);
        setError("No se pudieron cargar los ejercicios.");
        setLoading(false);
      });
  }, [grupoMuscular]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Exercise List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <IonList>
            {exercises.map((exercise) => (
              <IonItem key={exercise.id}>
                {exercise.imagen && exercise.imagen.length > 0 && (
                  <IonImg
                    src={exercise.imagen[0]}
                    style={{
                      width: "100px",
                      height: "100px",
                      marginRight: "10px",
                    }}
                  />
                )}
                <IonLabel>{exercise.nombre}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
