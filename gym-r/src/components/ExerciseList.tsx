import "./ExerciseList.css";
import React from "react";
import { IonItem, IonLabel, IonList, IonImg } from "@ionic/react";
import myimg from "../assets/myimage.jpg";

function ExerciseList() {
  return (
    <IonList>
      <IonItem>
        <IonImg className="imagen" src={myimg} alt="Just to try"></IonImg>
        <IonLabel>Pokémon Yellow</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Mega Man X</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>The Legend of Zelda</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Pac-Man</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Super Mario World</IonLabel>
      </IonItem>
    </IonList>
  );
}
export default ExerciseList;
