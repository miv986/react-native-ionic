import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonList,
  IonLabel,
} from "@ionic/react";
import { add, book, home, person } from "ionicons/icons";
import { ImageUpload } from "../components/ImageUpload";
import { TrainingListItem } from "../components/TrainingListItem";
import { useHistory } from "react-router-dom";
import { api } from "../utils/api";

// Tipado para la lista de entrenamiento
interface TrainingList {
  created_at: Date;
  usuario_id: number; // ID del usuario
  entrenamiento: string;
  observaciones: string;
  image: string;
  exercises: string[];
}

export const TrainingLists: React.FC = () => {
  const [trainingLists, setTrainingLists] = useState<TrainingList[]>([]); // Estado para las listas
  const [selectedImage, setSelectedImage] = useState(
    "https://ionicframework.com/docs/img/demos/thumbnail.svg"
  ); // Imagen seleccionada
  const [showModal, setShowModal] = useState(false); // Estado para el modal de imagen
  const [showAlert, setShowAlert] = useState(false); // Estado para el alert de nueva lista
  const [trainingName, setTrainingName] = useState(""); // Estado para el nombre de la nueva lista
  const history = useHistory(); // Para la navegación

  const handleImageSelected = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setShowModal(false);
  };

  const getUserIdFromLocalStorage = (): number | null => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");
    return user.usuario_id;
  };

  const handleAddTrainingList = async (
    trainingName: string,
    observaciones: string
  ) => {
    const userId = getUserIdFromLocalStorage();
    console.log(userId + "ID USUARIO");

    if (!userId) {
      console.error("Id usuario no encontrado");
      return;
    }
    if (trainingName.trim() === "") {
      console.log("Nombre de lista vacío");
      return;
    }

    const newList = {
      created_at: new Date(),
      usuario_id: userId,
      entrenamiento: trainingName,
      observaciones: observaciones,
      image: selectedImage,
      exercises: [],
    };

    try {
      const response = await api.post(`/entrenamientos`, newList);
      console.log("Entrenamiento guardado: " + response.data);
      setTrainingLists([...trainingLists, newList]);
      setTrainingName(""); // Limpiar el nombre de la lista
      setSelectedImage(
        "https://ionicframework.com/docs/img/demos/thumbnail.svg"
      ); // Restablecer imagen por defecto
      setShowAlert(false);
    } catch (error) {
      console.error("Error guardando entrenamiento");
    }
  };

  const handleDeleteTrainingList = (index: number) => {
    setTrainingLists(trainingLists.filter((_, i) => i !== index));
    console.log("Borrando lista");
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleListClick = (index: number) => {
    history.push(`/traininglists/${index}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis entrenamientos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {trainingLists.map((list, index) => (
            <TrainingListItem
              key={index}
              listName={list.entrenamiento}
              imageSrc={list.image}
              onClick={() => handleListClick(index)} // Navegar a la vista detallada
              onImageClick={handleImageClick}
              onDeleteList={() => handleDeleteTrainingList(index)}
              exercises={list.exercises}
              listIndex={index}
            />
          ))}
        </IonList>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Seleccionar Imagen</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <ImageUpload onImageSelected={handleImageSelected} />
            <IonButton onClick={() => setShowModal(false)}>Cancelar</IonButton>
          </IonContent>
        </IonModal>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Nueva Lista de Entrenamiento"}
          inputs={[
            {
              name: "listName",
              type: "text",
              placeholder: "Nombre de la lista",
            },
            {
              name: "observations",
              type: "text",
              placeholder: "Observaciones lista",
            },
          ]}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "Agregar",
              handler: (alertData) => {
                const name = alertData.listName;
                const observaciones = alertData.observations;
                handleAddTrainingList(name, observaciones);
              },
            },
          ]}
        />

        <IonFab
          vertical="bottom"
          horizontal="end"
          style={{ marginBottom: "200px", marginRight: "20px" }}
        >
          <IonFabButton size="small" onClick={() => setShowAlert(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
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
};
