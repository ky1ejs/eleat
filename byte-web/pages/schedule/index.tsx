import { scheduleFirebaseCoder, schedulesForUser } from "@db";
import { Schedule } from "@models";
import { addDoc, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { ScheduleComponent } from "@components";
import { useUser } from "@contexts";

const PlanTable: NextPage = () => {
  const user = useUser()
  
  if (!user) return null

  const ref = schedulesForUser(user.uid);
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const {control, handleSubmit} = useForm<{name: string}>()

  useEffect(() => {
    return onSnapshot(ref, snapshot => {
      const docs = snapshot.docs.map(s => scheduleFirebaseCoder.fromFirestore(s))
      setSchedules(docs)
    })
  })

  const createNewPlan = (plan: {name: string}) => {
    if (plan.name.length > 0) {
      addDoc(ref, plan)
    }
  };

  return (
    <div>
      {schedules.map((schedule) => (
        <ScheduleComponent key={schedule.firebaseRef.id} schedule={schedule} />
      ))}
      <Form onSubmit={handleSubmit(createNewPlan)}>
      <Controller
        control={control}
        name="name"
        render={({field}) => ( 
          <>
            <Form.Group>
              <Form.Label>Name</Form.Label>{" "}
              <Form.Control {...field} type="text" />
            </Form.Group>{" "}
          </>
        )}
        />
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}

export default PlanTable;
