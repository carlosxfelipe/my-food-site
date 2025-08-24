import { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

export default function ToggleSwitch({ on }: { on: Signal<boolean> }) {
  return (
    <div class="flex items-center gap-4 mt-4">
      <p>
        Status:{" "}
        <span class={on.value ? "text-green-600" : "text-red-600"}>
          {on.value ? "ON" : "OFF"}
        </span>
      </p>
      <Button onClick={() => on.value = !on.value}>
        Toggle
      </Button>
    </div>
  );
}
