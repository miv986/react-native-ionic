import { IonImg, IonItem, IonLabel } from "@ionic/react";
import "./ExploreContainer.css";

interface GymItemProps {
  imagen: string;
  texto: string;
  ruta: string;
}

const GymItem: React.FC<GymItemProps> = (props: GymItemProps) => {
  return (
    <IonItem routerLink={props.ruta}>
      <IonImg className="imagen" src={props.imagen} />
      <IonLabel>{props.texto}</IonLabel>
    </IonItem>
  );
};

export default GymItem;
