"use client";

import { useActionState, useEffect, useRef } from "react";
import { placeOrder } from "../app/actions";
import useCartStore from "../stores/cartStore";

const initialState = { status: "idle", message: "", fieldErrors: {} };
const areas = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

function FieldError({ id, message }) {
  return message ? <span className="field-error" id={id} role="alert">{message}</span> : null;
}

export default function CheckoutForm({ user, items, total }) {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const formRef = useRef(null);
  const clearCart = useCartStore((store) => store.clear);

  useEffect(() => {
    if (state.status === "success") clearCart();
  }, [state, clearCart]);

  useEffect(() => {
    const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]');
    firstInvalid?.focus();
  }, [state]);

  if (!user) {
    return (
      <form className="delivery-form sign-in-panel" action={formAction}>
        <input type="hidden" name="intent" value="sign-in" />
        <p className="eyebrow">Your checkout is protected</p>
        <h2>Continue with your name</h2>
        <p>This classroom demo uses a signed server session. Enter a name to continue to delivery details.</p>
        <label className="field" htmlFor="signin-name">Name
          <input id="signin-name" name="name" autoComplete="name" required />
        </label>
        {state.message && <p className="form-error" role="alert">{state.message}</p>}
        <button className="button button-dark" type="submit" disabled={pending}>{pending ? "Continuing..." : "Continue to checkout"}</button>
      </form>
    );
  }

  if (!items.length) {
    return <div className="status-panel"><h2>Your order is empty.</h2><p>Add something from the menu before checking out.</p><a className="text-link" href="/menu">Return to the menu</a></div>;
  }

  const errors = state.fieldErrors ?? {};
  return (
    <div className="checkout-layout">
      <form ref={formRef} className="delivery-form" action={formAction}>
        <input type="hidden" name="intent" value="place-order" />
        <input type="hidden" name="name" value={user.name} />
        <p className="eyebrow">Delivery details</p>
        <h2>Where should we bring it?</h2>
        <label className="field" htmlFor="checkout-name">Name
          <input id="checkout-name" value={user.name} readOnly autoComplete="name" aria-label="Signed-in name" />
        </label>
        <label className="field" htmlFor="checkout-phone">TeleBirr phone
          <input id="checkout-phone" name="phone" type="tel" autoComplete="tel" placeholder="0912345678" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "checkout-phone-error" : undefined} />
          <FieldError id="checkout-phone-error" message={errors.phone} />
        </label>
        <label className="field" htmlFor="checkout-area">Delivery area
          <select id="checkout-area" name="area" defaultValue="Bole" required aria-invalid={Boolean(errors.area)} aria-describedby={errors.area ? "checkout-area-error" : undefined}>
            {areas.map((area) => <option key={area} value={area}>{area}</option>)}
          </select>
          <FieldError id="checkout-area-error" message={errors.area} />
        </label>
        <label className="field" htmlFor="checkout-notes">Notes (optional)
          <textarea id="checkout-notes" name="notes" rows="3" aria-describedby="checkout-notes-help" />
        </label>
        <span className="field-help" id="checkout-notes-help">Optional delivery instructions.</span>
        {state.message && <p className={state.status === "success" ? "form-success" : "form-error"} role="status">{state.message}</p>}
        <button className="button button-dark" type="submit" disabled={pending}>{pending ? "Placing order..." : `Place order - ${total} ETB`}</button>
      </form>
      <aside className="order-summary">
        <h2>Your order</h2>
        {items.map((item) => <div className="order-summary-line" key={item.id}><span>{item.name} x {item.quantity}</span><strong>{item.lineTotal} ETB</strong></div>)}
        <div className="order-summary-total"><span>Total</span><span>{total} ETB</span></div>
      </aside>
    </div>
  );
}