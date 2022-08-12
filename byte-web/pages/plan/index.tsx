import React, {FormEvent, useEffect, useState} from "react";
import {Form, Button} from "react-bootstrap";
import {Plan} from "@models";
import {firebaseApp, planFromSnapshot} from '@db';
import { NextPage } from "next";
import {addDoc, collection, getFirestore, onSnapshot, QuerySnapshot, setDoc} from 'firebase/firestore'
import { PlanComponent } from "@components";
import { getAuth } from "firebase/auth";

const PlanPage: NextPage<{userId: string}> = ({ userId }) => {
  const auth = getAuth(firebaseApp)
  if (!auth.currentUser?.uid) {
    
  }

  const db = getFirestore(firebaseApp)
  const ref = collection(db, "users", userId, "plans");
  
  const [plans, setPlans] = useState<Plan[]>([])
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");

  const onUpdate = (snapshot: QuerySnapshot) => {
    setPlans(snapshot.docs.map(planFromSnapshot));
  }
  useEffect(() => {
    return onSnapshot(ref, onUpdate);
  })

  const addClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSaving) return;
    setIsSaving(true)

    if (name.length > 0) {
      const isPublic = false;
      addDoc(ref, {name, isPublic}).then(() => setIsSaving(false))
    }
  };

  return (
    <div>
      {plans.map((plan) => (
        <PlanComponent key={plan.firebaseRef.id} plan={plan} />
      ))}
      <Form onSubmit={addClick}>
        <Form.Group>
          <Form.Label>Name</Form.Label>{" "}
          <Form.Control onChange={(e) => setName(e.target.value)} type="text" />
        </Form.Group>{" "}
        <Button type="submit">Save</Button>
      </Form>
    </div>
  )
}

export default PlanPage;