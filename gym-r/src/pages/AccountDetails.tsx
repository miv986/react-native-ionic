import React from "react";
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonTextarea,
  IonToggle,
  IonToolbar,
  IonTitle,
  IonPage,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonButton,
} from "@ionic/react";
import { home, book, person, exit } from "ionicons/icons";
import "./AccountDetails.css";
import { useEffect, useState } from "react";

//)***** Detalles cuenta (NOMBRE, CORREO, PESO, ALTURA, CERRAR SESIÓN)*****

export function AccountDetails() {
  const [userData, setUserData] = useState({
    usuario: "",
    email: "",
    weight: "",
    height: "",
    comments: "",
    allowNotifications: false,
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData({
        usuario: parsedData.usuario || "",
        email: parsedData.email || "",
        weight: parsedData.weight || "",
        height: parsedData.height || "",
        comments: parsedData.comments || "",
        allowNotifications: parsedData.allowNotifications || false,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirigir a la página de login
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList inset={true}>
          <IonItem>
            <IonInput label="Email:" value={userData.email} readonly></IonInput>
          </IonItem>
          <IonItem>
            <IonInput label="Name" value={userData.usuario} readonly></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Weight"
              value=""
              placeholder="Enter your weight"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Height"
              value=""
              placeholder="Enter your height"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonToggle>
              <IonLabel>Allow Notifications</IonLabel>
              <IonNote color="medium">Unsubscribe at any time</IonNote>
            </IonToggle>
          </IonItem>
        </IonList>

        <IonList inset={true}>
          <IonItem>
            <IonTextarea
              label="Comments"
              label-placement="floating"
              rows={5}
              placeholder="Add your comments here"
            ></IonTextarea>
          </IonItem>
        </IonList>
        <IonNote color="medium" className="ion-margin-horizontal">
          Your comments will be kept anonymous and will only be used to improve
          the reliability of our products.
        </IonNote>
        <br />
        <div className="closeSesionBottonDiv">
          <IonButton
            size="large"
            style={{ width: "300px" }}
            onClick={handleLogout}
          >
            <IonIcon icon={exit} />
            Close session
          </IonButton>
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
