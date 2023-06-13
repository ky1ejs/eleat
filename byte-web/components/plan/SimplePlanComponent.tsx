import { DocumentReference, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Plan } from '@models'
import { planFromSnapshot } from '@db'

export const SimplePlanComponent = ({ planRef }: { planRef: DocumentReference }) => {
  const [plan, setPlan] = useState<Plan | undefined>()

  useEffect(() => {
    return onSnapshot(planRef, (snapshot) => {
      setPlan(planFromSnapshot(snapshot))
    })
  })

  if (!plan) return null

  return (
    <div>
      <h3>{plan.name}</h3>
    </div>
  );
}
