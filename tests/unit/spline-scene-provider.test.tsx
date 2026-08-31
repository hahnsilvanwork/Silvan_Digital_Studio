import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  SplineSceneProvider,
  useSplineSceneLease,
} from "../../src/components/products/SplineSceneProvider";

const reporters = new Map<string, (near: boolean, distance: number) => void>();

function Candidate({ id }: { readonly id: string }) {
  const lease = useSplineSceneLease(id);
  reporters.set(id, lease.reportProximity);

  return <output data-testid={id}>{String(lease.isActive)}</output>;
}

describe("SplineSceneProvider", () => {
  it("grants the lease only to the nearest eligible scene", () => {
    render(
      <SplineSceneProvider>
        <Candidate id="hero" />
        <Candidate id="products" />
      </SplineSceneProvider>,
    );

    act(() => reporters.get("products")?.(true, 900));
    act(() => reporters.get("hero")?.(true, 40));

    expect(screen.getByTestId("hero")).toHaveTextContent("true");
    expect(screen.getByTestId("products")).toHaveTextContent("false");

    act(() =>
      reporters.get("hero")?.(false, Number.POSITIVE_INFINITY),
    );

    expect(screen.getByTestId("products")).toHaveTextContent("true");
  });
});
