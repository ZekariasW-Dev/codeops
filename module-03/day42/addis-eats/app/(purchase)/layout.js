import FilterShell from "./FilterShell";
import Providers from "../Providers";

export default function PurchaseLayout({ children }) {
  return (
    <Providers>
      <FilterShell>{children}</FilterShell>
    </Providers>
  );
}