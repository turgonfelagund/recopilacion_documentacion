import React from "react";
import { Person } from "../models/person.model";
import { IonItem, IonLabel, IonAvatar } from "@ionic/react";

const EmployeeItem : React.FC<{person : Person}> = ({person})=>{


    return <IonItem>
        <IonAvatar slot="start">
            <img src={person.photo}/>
        </IonAvatar>
        <IonLabel>
            <h2>{person.name}</h2>
            <p>{person.position}</p>
        </IonLabel>
    </IonItem>

}

export default EmployeeItem