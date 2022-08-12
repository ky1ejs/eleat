import React from 'react'
import {Plan} from '@models'
import { addDoc, deleteDoc, getFirestore } from '@firebase/firestore'
import { savePlan } from '@db'
import Link from 'next/link'
import { Form, Button } from 'react-bootstrap'
import {firebaseApp} from "@db"

export function PlanComponent({plan}: {plan: Plan}) {
  const db = getFirestore(firebaseApp)

  const deletePlan = async () => {
    await deleteDoc(plan.firebaseRef)
  };

  const duplicatePlan = () => {
    const name = plan.name + " Copy";
    addDoc(plan.firebaseRef.parent, {name: name, isPublic: false}).then((firebaseRef) => {
      savePlan({...plan, firebaseRef, name});
    });
  };

    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>{plan.name}</Form.Label>{" "}
          </Form.Group>{" "}
          <Button type="submit">
            <Link href={"plan/" + plan.firebaseRef.id}>View</Link>
          </Button>
          <Button onClick={deletePlan}> Delete </Button>
          <Button onClick={duplicatePlan}> Duplicate </Button>
        </Form>
      </div>
    );
}
