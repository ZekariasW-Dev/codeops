"use client";

import { useActionState } from "react";
import Link from "next/link";
import { cancelOrder, placeOrder } from "../actions";
import { areas } from "../data/orderValidation";

const initialState = { status: 0, fieldErrors: {}, message: "" };

export default function OrderForm() {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const [cancelState, cancelAction, cancelling] = useActionState(
    cancelOrder,
    initialState,
  );

  return (
    <section>
      <form action={formAction}>
        <h2>Delivery details</h2>

        <label htmlFor="order-name">Name</label>
        <input id="order-name" name="name" required />
        {state.fieldErrors.name && <p role="alert">{state.fieldErrors.name}</p>}

        <label htmlFor="order-phone">TeleBirr phone</label>
        <input id="order-phone" name="phone" type="tel" required />
        {state.fieldErrors.phone && <p role="alert">{state.fieldErrors.phone}</p>}

        <label htmlFor="order-area">Delivery area</label>
        <select id="order-area" name="area" defaultValue="Bole" required>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        {state.fieldErrors.area && <p role="alert">{state.fieldErrors.area}</p>}

        <label htmlFor="order-notes">Notes (optional)</label>
        <textarea id="order-notes" name="notes" rows="3" />

        <button type="submit" disabled={pending}>
          {pending ? "Placing order..." : "Place order"}
        </button>
        {state.status === 422 && <p role="alert">{state.message}</p>}
        {state.status === 401 && <p role="alert">{state.message}</p>}
        {state.status === 201 && (
          <p aria-live="polite">{state.message}</p>
        )}
      </form>

      {state.status === 201 && (
        <>
          <p>
            <Link href={`/main?orderId=${encodeURIComponent(state.orderId)}`}>
              Track your order
            </Link>
          </p>
          {cancelState.status !== 200 && (
            <form action={cancelAction}>
              <input type="hidden" name="orderId" value={state.orderId} />
              <button type="submit" disabled={cancelling}>
                {cancelling ? "Cancelling..." : "Cancel this order"}
              </button>
            </form>
          )}
          <p aria-live="polite">{cancelState.message}</p>
        </>
      )}
    </section>
  );
}
