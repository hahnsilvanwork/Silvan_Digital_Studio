import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  SplineSceneProvider,
  useSplineSceneSlot,
} from "../../src/components/products/SplineSceneProvider";

const requests = new Map<string, (distance: number) => void>();
const completions = new Map<string, () => void>();

function Candidate({ id }: { readonly id: string }) {
  const slot = useSplineSceneSlot(id);
  requests.set(id, slot.requestStart);
  completions.set(id, slot.finishStart);

  return <output data-testid={id}>{String(slot.hasStarted)}</output>;
}

function subject() {
  return render(
    <SplineSceneProvider>
      <Candidate id="hero" />
      <Candidate id="products" />
    </SplineSceneProvider>,
  );
}

function expectStarted(hero: boolean, products: boolean) {
  expect(screen.getByTestId("hero")).toHaveTextContent(String(hero));
  expect(screen.getByTestId("products")).toHaveTextContent(String(products));
}

describe("SplineSceneProvider", () => {
  it("starts the first scene that reaches the viewport", () => {
    subject();

    act(() => requests.get("hero")?.(40));
    expectStarted(true, false);
  });

  it("never starts two scenes at the same time", () => {
    subject();

    act(() => requests.get("hero")?.(40));
    act(() => requests.get("products")?.(900));

    // The second scene has to wait for the slot: two simultaneous WebGPU
    // start-ups are what stalls a phone.
    expectStarted(true, false);

    act(() => completions.get("hero")?.());
    expectStarted(true, true);
  });

  it("keeps a started scene started so it is never torn down", () => {
    subject();

    act(() => requests.get("hero")?.(40));
    act(() => completions.get("hero")?.());
    act(() => requests.get("products")?.(900));

    expectStarted(true, true);
  });
});
