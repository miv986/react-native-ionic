import React, { useState } from "react";
import {
  IonBreadcrumb,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import "./Login.css";
import { loginUser } from "../services/userService";
import { useHistory } from "react-router";

export function Login() {
  localStorage.clear;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [present] = useIonToast();

  const history = useHistory();

  // validar correo electronico
  const isWellFormedEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isWellFormedEmail(email)) {
      present({
        message: "Please enter a valid email address",
        duration: 2000,
        color: "danger",
      });
      return;
    }
    if (!password) {
      present({
        message: "Por favor, introduce tu contraseña",
        duration: 2000,
        color: "danger",
      });
      return;
    }

    try {
      const userData = await loginUser(email, password);
      //guardar el token en el localStorage
      present({
        message: "Login existoso. Bienvenido/a " + userData.usuario,
        duration: 3000,
        color: "light",
      });

      setTimeout(() => {
        history.push("/traininglists");
      }, 3000);
      // setEmail("");
      // setPassword("");
    } catch (error: any) {
      if (
        error.message.includes("correo no existe") ||
        error.message.includes("contraseña incorrecta")
      ) {
        present({
          message: "Correo o contraseña incorrectos. Inténtalo de nuevo.",
          duration: 2000,
          color: "danger",
        });
      } else {
        present({
          message: "Ocurrió un error inesperado. Inténtalo más tarde.",
          duration: 2000,
          color: "danger",
        });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="center-content">
          <IonInput
            id="email-input"
            className="input-field"
            label="Email"
            type="email"
            placeholder="email@domain.com"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value!)}
          ></IonInput>

          <IonInput
            id="password-input"
            className="input-field"
            label="Password"
            type="password"
            placeholder="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
          ></IonInput>

          <IonButton
            onClick={handleLogin}
            className="login-button"
            size="large"
          >
            Iniciar sesión
          </IonButton>

          <IonBreadcrumb className="create-account" routerLink="/register">
            <p>Crear cuenta</p>
          </IonBreadcrumb>
        </div>
      </IonContent>
    </IonPage>
  );
}
