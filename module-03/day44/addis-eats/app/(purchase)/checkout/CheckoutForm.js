"use client";

import { useActionState } from "react";
import Link from "next/link";
import { cancelOrder, placeOrder } from "../../actions";
import { areas } from "../../data/orderValidation";

const initialState = { status: 0, fieldErrors: {}, message: "" };

export default function CheckoutForm() {
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
        <input id="order-name" name="name" placeholder="Your name" required />
        {state.fieldErrors.name && (
          <p role="alert">{state.fieldErrors.name}</p>
        )}

        <label htmlFor="order-phone">TeleBirr phone number</label>
        <input
          id="order-phone"
          name="phone"
          type="tel"
          placeholder="09... or +2519..."
          required
        />
        {state.fieldErrors.phone && (
          <p role="alert">{state.fieldErrors.phone}</p>
        )}

        <label htmlFor="order-area">Delivery area</label>
        <select id="order-area" name="area" defaultValue="" required>
          <option value="" disabled>
            Choose an area
          </option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        {state.fieldErrors.area && (
          <p role="alert">{state.fieldErrors.area}</p>
        )}

        <label htmlFor="order-notes">Notes (optional)</label>
        <textarea
          id="order-notes"
          name="notes"
          placeholder="Add delivery notes"
          rows="3"
        />

        {state.status === 422 && <p role="alert">{state.message}</p>}
        <button type="submit" disabled={pending}>
          {pending ? "Placing order..." : "Place order"}
        </button>
      </form>

      {state.status === 201 && (
        <>
          <p aria-live="polite">{state.message}</p>
          <p>
            <Link href={`/orders/${state.orderId}`}>Track your order</Link>
          </p>
          {cancelState.status !== 200 && (
            <form action={cancelAction}>
              <input type="hidden" name="orderId" value={state.orderId} />
              <button type="submit" disabled={cancelling}>
                {cancelling ? "Cancelling..." : "Cancel this order"}
              </button>
            </form>
          )}
          {cancelState.message && (
            <p aria-live="polite">{cancelState.message}</p>
          )}
        </>
      )}
    </section>
  );
}
