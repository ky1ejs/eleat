import { DocumentReference, DocumentSnapshot, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Plan, Schedule, ShoppingListItem } from "@models";
import { planFromSnapshot, plansForUser, saveSchedule, scheduleFirebaseCoder } from "@db";
import { getAndGenerateShoppingListForPlans } from "@byte";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { SimplePlanComponent } from "@components";

interface ScheduleDetailState {
  schedule?: Schedule;
  plansById: Map<string, Plan>;
  shoppingList: ShoppingListItem[];
}

const ScheduleDetailPage: NextPage<{ scheduleRef: DocumentReference, uid: string }> = ({ scheduleRef, uid }) => {
  const { control, handleSubmit } = useForm<{ planId: string }>()
  const [state, setState] = useState<ScheduleDetailState>({
    plansById: new Map(),
    shoppingList: []
  })

  const onScheduleUpdate = (snapshot: DocumentSnapshot<Schedule>) => {
    const schedule = snapshot.data()
    if (!schedule) return

    setState({ ...state, schedule });

    getAndGenerateShoppingListForPlans(schedule.plans).then((shoppingList) => {
      setState({ ...state, shoppingList });
    });
  }

  const onPlansUpdate = (querySnapshot: QuerySnapshot) => {
    const plans = querySnapshot.docs.map(planFromSnapshot);
    const plansById = new Map(plans.map(p => [p.firebaseRef.id, p]));
    setState({ ...state, plansById });
  };

  useEffect(() => {
    const scheduleUnsubscribe = onSnapshot(scheduleRef.withConverter(scheduleFirebaseCoder), onScheduleUpdate);
    const plansUnsubscribe = onSnapshot(plansForUser(uid), onPlansUpdate);
    return () => {
      scheduleUnsubscribe()
      plansUnsubscribe()
    }
  })

  const addPlan = ({planId}: {planId: string}) => {
    const plan = state.plansById.get(planId)
    if (state.schedule && plan) {
      state.schedule.plans.push(plan.firebaseRef);
      saveSchedule(state.schedule);
    }
  };

  return (
    <div>
      {state.schedule && (
        state.schedule.plans.map(ref => <SimplePlanComponent key={`${ref}`} planRef={ref} />)
      )}
      <Form onSubmit={handleSubmit(addPlan)}>
        <Form.Group>
          <Form.Label>Select</Form.Label>
          <Controller
            control={control}
            name="planId"
            render={({ field }) => (
              <Form.Control {...field} placeholder="select">
                 {Array.from(state.plansById.values()).map((plan) => (
                   <option key={plan.firebaseRef.id} value={plan.firebaseRef.path}>
                     {plan.name}
                   </option>
               ))}
               </Form.Control>
            )} />
        </Form.Group>{" "}
        <Button type="submit">Save</Button>
      </Form>
      <br />
      <br />
      <div>
        <h3>Shopping List</h3>
        <table>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
          {state.shoppingList.map((item) => (
            <tr key={`${item.item.name}-row`}>
              <td key={item.item.name}>{item.item.name}</td>
              <td key={`${item.item.name}-data`}>
                {item.grams} {item.item.measure_name}
                {item.grams > 1 ? "s" : ""}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default ScheduleDetailPage;
