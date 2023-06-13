import React from "react";
import { deleteDoc } from "firebase/firestore";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { Schedule } from "@models";

export const ScheduleComponent = ({schedule}: {schedule: Schedule}) => {
  const deleteSchedule = () => {
    deleteDoc(schedule.firebaseRef)
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>{schedule.name}</Form.Label>{" "}
      </Form.Group>{" "}
      <Button type="submit">
        <Link href={"schedule/" + schedule.firebaseRef.id}>View</Link>
      </Button>
      <Button onClick={deleteSchedule}> Delete </Button>
    </Form>
  );
}
