import React from "react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  book,
  home,
  library,
  person,
  playCircle,
  radio,
  search,
  share,
  trash,
} from "ionicons/icons";
import "./TrainingLists.css";
import { ImageUpload } from "../components/ImageUpload";
import { useState } from "react";

export const TrainingLists: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://ionicframework.com/docs/img/demos/thumbnail.svg"
  );
  const [showModal, setShowModal] = useState(false);

  const handleImageSelected = (imageSrc: React.SetStateAction<string>) => {
    setSelectedImage(imageSrc);
    setShowModal(false);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis entrenamientos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList
          style={{
            marginTop: "0px",
            padding: "0px",
          }}
        >
          <div className="trainingListsDiv">
            <IonList>
              <IonItemSliding>
                <IonItem button={true}>
                  <IonThumbnail slot="start">
                    <img
                      alt="Silhouette of mountains"
                      src={selectedImage}
                      onClick={handleImageClick}
                      style={{ cursor: "pointer" }}
                    />
                  </IonThumbnail>
                  <IonLabel>List 1</IonLabel>
                </IonItem>

                <IonModal
                  isOpen={showModal}
                  onDidDismiss={() => setShowModal(false)}
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Seleccionar Imagen</IonTitle>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent className="ion-padding">
                    <ImageUpload onImageSelected={handleImageSelected} />
                    <IonButton onClick={() => setShowModal(false)}>
                      Cancelar
                    </IonButton>
                  </IonContent>
                </IonModal>

                <IonItemOptions slot="end">
                  <IonItemOption color="tertiary">
                    <IonIcon slot="icon-only" icon={share}></IonIcon>
                  </IonItemOption>
                  <IonItemOption color="danger" expandable={true}>
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>

              <IonItemSliding>
                <IonItem button={true}>
                  <IonThumbnail slot="start">
                    <img
                      alt="Silhouette of mountains"
                      src={selectedImage}
                      onClick={handleImageClick}
                      style={{ cursor: "pointer" }}
                    />
                  </IonThumbnail>
                  <IonLabel>List 1</IonLabel>
                </IonItem>

                <IonModal
                  isOpen={showModal}
                  onDidDismiss={() => setShowModal(false)}
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Seleccionar Imagen</IonTitle>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent className="ion-padding">
                    <ImageUpload onImageSelected={handleImageSelected} />
                    <IonButton onClick={() => setShowModal(false)}>
                      Cancelar
                    </IonButton>
                  </IonContent>
                </IonModal>

                <IonItemOptions slot="end">
                  <IonItemOption color="tertiary">
                    <IonIcon slot="icon-only" icon={share}></IonIcon>
                  </IonItemOption>
                  <IonItemOption color="danger" expandable={true}>
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>

              <IonItemSliding>
                <IonItem button={true}>
                  <IonThumbnail slot="start">
                    <img
                      alt="Silhouette of mountains"
                      src={selectedImage}
                      onClick={handleImageClick}
                      style={{ cursor: "pointer" }}
                    />
                  </IonThumbnail>
                  <IonLabel>List 1</IonLabel>
                </IonItem>

                <IonModal
                  isOpen={showModal}
                  onDidDismiss={() => setShowModal(false)}
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Seleccionar Imagen</IonTitle>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent className="ion-padding">
                    <ImageUpload onImageSelected={handleImageSelected} />
                    <IonButton onClick={() => setShowModal(false)}>
                      Cancelar
                    </IonButton>
                  </IonContent>
                </IonModal>

                <IonItemOptions slot="end">
                  <IonItemOption color="tertiary">
                    <IonIcon slot="icon-only" icon={share}></IonIcon>
                  </IonItemOption>
                  <IonItemOption color="danger" expandable={true}>
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            </IonList>
          </div>
        </IonList>
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
      </IonTabBar>{" "}
      <IonFab
        vertical="bottom"
        horizontal="end"
        style={{ marginBottom: "200px", marginRight: "20px" }}
      >
        <IonFabButton size="small">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};
