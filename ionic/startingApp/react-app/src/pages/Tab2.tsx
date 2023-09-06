import { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonList } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

import { Person } from "../models/person.model";
import EmployeeItem from "../components/EmployeeItem";

const Tab2: React.FC = () => {

  const [people, setPeople] = useState<Person[]>([]);

  //lleva a cabo la carga cuando el contenido ha sido renderizado
  useIonViewDidEnter(async () => {
    const result = await fetch("https://uifaces.co/api?limit=25", {
      headers: { "x-API-KEY": "873771d7760b846d51d025ac5804ab" }
    });

    const data = await result.json();
    setPeople(data);
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {people.map((person, index)=><EmployeeItem key={index} person={person}></EmployeeItem>)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
