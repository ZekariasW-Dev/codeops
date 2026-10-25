"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import Link from "next/link";
import { cancelOrder, placeOrder } from "../../actions";
import { areas } from "../../data/orderValidation";
import SubmitButton from "../../SubmitButton";

const initialState = { status: 0, fieldErrors: {}, message: "" };

export default function CheckoutForm() {
  const [state, formAction] = useActionState(placeOrder, initialState);
  const [cancelState, cancelAction, cancelling] = useActionState(
    cancelOrder,
    initialState,
  );
  const orderToken = useId();
  const submitted = useRef(false);

  useEffect(() => {
    if (state.status !== 0) submitted.current = false;
  }, [state.status]);

  function handleSubmit(event) {
    if (submitted.current) {
      event.preventDefault();
      return;
    }
    submitted.current = true;
  }

  return (
    <section>
      <form action={formAction} onSubmit={handleSubmit}>
        <h2>Delivery details</h2>
        <input type="hidden" name="orderToken" value={orderToken} />

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
        <SubmitButton pendingLabel="Placing order...">Place order</SubmitButton>
      </form>

      {state.status === 201 && (
        <>
          <p aria-live="polite">{state.message}</p>
          <p>
            <Link href={`/orders/${state.orderId}`}>Track your order</Link>
          </p>
          {cancelState.status !== 200 && (
            <form action={cancelAction} onSubmit={(event) => { if (cancelling) event.preventDefault(); }}>
              <input type="hidden" name="orderId" value={state.orderId} />
              <SubmitButton pendingLabel="Cancelling...">Cancel this order</SubmitButton>
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




