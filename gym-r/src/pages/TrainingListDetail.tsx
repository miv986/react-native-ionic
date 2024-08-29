import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { add, trash } from "ionicons/icons";

interface TrainingList {
  name: string;
  image: string;
  exercises: string[];
}
// Tipado de Props
interface TrainingListDetailProps {
  trainingLists: TrainingList[];
  setTrainingLists: React.Dispatch<React.SetStateAction<TrainingList[]>>;
}

// Tipado de parámetros
interface Params {
  index: string;
}

const TrainingListDetail: React.FC<TrainingListDetailProps> = ({
  trainingLists,
  setTrainingLists,
}) => {
  const { index } = useParams<Params>();
  console.log("Index recibido: " + index); // Obtener el índice de la lista desde la URL
  const listIndex = parseInt(index); // Convertir a número
  const history = useHistory(); // Para volver a la lista principal
  const [showModal, setShowModal] = useState(false); // Estado para el modal de añadir ejercicio
  const [newExercise, setNewExercise] = useState(""); // Estado para el nombre del nuevo ejercicio

  console.log("training lists: ", trainingLists);
  console.log("list index", listIndex);

  const handleAddExercise = () => {
    if (newExercise.trim() === "") return; // No añadir si está vacío
    const updatedLists = [...trainingLists]; // Copiar las listas
    updatedLists[listIndex].exercises.push(newExercise); // Añadir el nuevo ejercicio
    setTrainingLists(updatedLists); // Actualizar el estado
    setNewExercise(""); // Limpiar el campo
    setShowModal(false); // Cerrar el modal
  };

  const handleDeleteExercise = (exerciseIndex: number) => {
    const updatedLists = [...trainingLists]; // Copiar las listas
    updatedLists[listIndex].exercises.splice(exerciseIndex, 1); // Eliminar el ejercicio
    setTrainingLists(updatedLists); // Actualizar el estado
  };

  if (!trainingLists[listIndex]) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Lista no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>La lista de entrenamiento no existe.</p>
        </IonContent>
      </IonPage>
    );
  }

  const currentList = trainingLists[listIndex]; // Obtener la lista actual

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{currentList.name}</IonTitle>
          <IonButton slot="end" onClick={() => history.goBack()}>
            Volver
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {currentList.exercises.map((exercise, exerciseIndex) => (
            <IonItem key={exerciseIndex}>
              <IonLabel>{exercise}</IonLabel>
              <IonButton
                color="danger"
                onClick={() => handleDeleteExercise(exerciseIndex)}
              >
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonButton expand="full" onClick={() => setShowModal(true)}>
          <IonIcon icon={add} />
          Añadir Ejercicio
        </IonButton>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Añadir Ejercicio</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              placeholder="Nombre del ejercicio"
              value={newExercise}
              onIonChange={(e) => setNewExercise(e.detail.value!)}
            />
            <IonButton expand="full" onClick={handleAddExercise}>
              Añadir
            </IonButton>
            <IonButton
              expand="full"
              color="light"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TrainingListDetail;
