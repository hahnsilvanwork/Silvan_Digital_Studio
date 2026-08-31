"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

interface SceneContextValue {
  readonly activeId: string | null;
  readonly reportProximity: (
    id: string,
    near: boolean,
    distance: number,
  ) => void;
}

const SceneContext = createContext<SceneContextValue | null>(null);

export function SplineSceneProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const candidates = useRef(new Map<string, number>());
  const [activeId, setActiveId] = useState<string | null>(null);

  const reportProximity = useCallback(
    (id: string, near: boolean, distance: number) => {
      if (near) candidates.current.set(id, distance);
      else candidates.current.delete(id);

      let nearestId: string | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const [candidateId, candidateDistance] of candidates.current) {
        if (candidateDistance < nearestDistance) {
          nearestId = candidateId;
          nearestDistance = candidateDistance;
        }
      }

      setActiveId(nearestId);
    },
    [],
  );

  const value = useMemo(
    () => ({ activeId, reportProximity }),
    [activeId, reportProximity],
  );

  return (
    <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
  );
}

export function useSplineSceneLease(id: string) {
  const context = useContext(SceneContext);
  const reportToProvider = context?.reportProximity;
  const reportProximity = useCallback(
    (near: boolean, distance: number) => {
      if (!reportToProvider) {
        throw new Error(
          "SplineProduct must be inside SplineSceneProvider",
        );
      }

      reportToProvider(id, near, distance);
    },
    [id, reportToProvider],
  );

  if (!context) {
    throw new Error("SplineProduct must be inside SplineSceneProvider");
  }

  return {
    isActive: context.activeId === id,
    reportProximity,
  };
}
