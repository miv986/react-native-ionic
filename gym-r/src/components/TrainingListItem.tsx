import React from "react";
import {
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail,
  IonIcon,
} from "@ionic/react";
import { add, trash } from "ionicons/icons";

interface TrainingListItemProps {
  listName: string;
  imageSrc: string;
  exercises: string[];
  listIndex: number;
  onImageClick: () => void;
  onClick: () => void; // Nueva propiedad para manejar el clic en la lista
  onDeleteList: () => void;
}

export const TrainingListItem: React.FC<TrainingListItemProps> = ({
  listName,
  imageSrc,
  exercises,
  listIndex,
  onImageClick,
  onClick,
  onDeleteList,
}) => {
  return (
    <IonItemSliding>
      <IonItem button={true} onClick={onClick}>
        <IonThumbnail slot="start">
          <img
            alt={`Imagen de ${listName}`}
            src={imageSrc}
            onClick={onImageClick}
            style={{ cursor: "pointer" }}
          />
        </IonThumbnail>
        <IonLabel>
          <h2>{listName}</h2>
          <p>{exercises.length} ejercicios</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions slot="end">
        <IonItemOption color="danger" expandable={true} onClick={onDeleteList}>
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
