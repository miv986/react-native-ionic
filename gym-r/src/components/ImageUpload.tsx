import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export const ImageUpload = ({ onImageSelected }) => {
  const selectImage = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // Esto abre la galería de fotos
      });

      if (image.webPath) {
        onImageSelected(image.webPath);
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  return <IonButton onClick={selectImage}>Seleccionar imagen</IonButton>;
};
