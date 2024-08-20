import React, { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import "./Register.css";
import { registerUser } from "../services/userService";
import { useEffect } from "react";
import { useHistory } from "react-router";

export function Register() {
  useEffect(() => {}, []);

  // Estados para los inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);

  const [present] = useIonToast();

  //inicializar el hook de historial
  const history = useHistory();

  // validar correo electronico
  const isWellFormedEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    //limpiar localStorage antes de nuevo registro
    localStorage.removeItem("user");
    //Validar correo electronico bien formado
    if (!isWellFormedEmail(email)) {
      present({
        message: "Please enter a valid email address",
        duration: 2000,
        color: "danger",
      });
      return;
    }

    // Validar que las contraseñas coinciden
    console.log("Password:", password, "Repeat Password:", repeatPassword); // Agrega esta línea
    if (password !== repeatPassword) {
      present({
        message: "Passwords don't match",
        duration: 2000,
        color: "danger",
      });
      return;
    }

    try {
      // Llamada a la función de registro
      const userData = await registerUser(email, password, name);
      console.log(userData);
      present({
        message: "Registro existoso. Bienvenido/a " + userData.usuario,
        duration: 3000,
        color: "light",
      });

      // Guardar los datos del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      // Redirigir o realizar alguna acción después del registro exitoso
      history.push("/login");
      // Limpiar campos después del registro exitoso
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setName("");
    } catch (error: any) {
      present({
        message: error.message || "Ocurrió un error durante el registro.",
        duration: 3000,
        color: "danger",
      });
    }
  };

  const handleInputChange = (value: string) => {
    setCreateAccountVisible(value.length > 0);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login"></IonBackButton>
          </IonButtons>
          <IonTitle>Create new account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="register-page">
        <div className="containerRegister">
          <IonList>
            <IonInput
              label="Name"
              type="text"
              placeholder="Enter name"
              value={name}
              onIonInput={(e) => {
                setName(e.detail.value!);
                handleInputChange(e.detail.value!);
              }}
            ></IonInput>

            <IonInput
              label="Email input"
              type="email"
              placeholder="email@domain.com"
              value={email}
              onIonInput={(e) => {
                setEmail(e.detail.value!);
                handleInputChange(e.detail.value!);
              }}
            ></IonInput>
            <IonInput
              label="Password input"
              type="password"
              placeholder="Enter password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
            ></IonInput>

            <IonInput
              label="Repeat password"
              type="password"
              placeholder="Repeat password"
              value={repeatPassword}
              onIonInput={(e) => {
                setRepeatPassword(e.detail.value!);
              }}
            ></IonInput>

            {isCreateAccountVisible && (
              <IonButton
                className="registerButton"
                onClick={handleRegister}
                color="medium"
                size="large"
                style={{
                  width: "100%",
                  margin: "0px",
                  padding: "10px",
                }}
              >
                Create account
              </IonButton>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
