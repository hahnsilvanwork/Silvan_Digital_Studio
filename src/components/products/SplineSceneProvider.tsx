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

const MISSING_PROVIDER = "SplineProduct must be inside SplineSceneProvider";

interface SceneContextValue {
  readonly startedIds: ReadonlySet<string>;
  readonly requestStart: (id: string, distance: number) => void;
  readonly finishStart: (id: string) => void;
}

const SceneContext = createContext<SceneContextValue | null>(null);

/**
 * Serialises the start-up of the Spline scenes on a page. A scene that has
 * started keeps running: tearing a WebGPU context down on scroll is what makes
 * a viewer reload itself over and over.
 */
export function SplineSceneProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const waiting = useRef(new Map<string, number>());
  const started = useRef(new Set<string>());
  const startingId = useRef<string | null>(null);
  const [startedIds, setStartedIds] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  );

  const grantFreeSlot = useCallback(() => {
    if (startingId.current !== null) return;

    let nearestId: string | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const [id, distance] of waiting.current) {
      if (distance < nearestDistance) {
        nearestId = id;
        nearestDistance = distance;
      }
    }

    if (nearestId === null) return;

    const granted = nearestId;
    startingId.current = granted;
    waiting.current.delete(granted);
    started.current.add(granted);
    setStartedIds(new Set(started.current));
  }, []);

  const requestStart = useCallback(
    (id: string, distance: number) => {
      // The observer stays connected to drive pause and resume, so it keeps
      // reporting. A scene that already started must not claim a slot again.
      if (started.current.has(id)) return;

      waiting.current.set(id, distance);
      grantFreeSlot();
    },
    [grantFreeSlot],
  );

  const finishStart = useCallback(
    (id: string) => {
      if (startingId.current === id) startingId.current = null;
      waiting.current.delete(id);
      grantFreeSlot();
    },
    [grantFreeSlot],
  );

  const value = useMemo(
    () => ({ startedIds, requestStart, finishStart }),
    [finishStart, requestStart, startedIds],
  );

  return (
    <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
  );
}

export function useSplineSceneSlot(id: string) {
  const context = useContext(SceneContext);
  const start = context?.requestStart;
  const finish = context?.finishStart;

  const requestStart = useCallback(
    (distance: number) => {
      if (!start) throw new Error(MISSING_PROVIDER);

      start(id, distance);
    },
    [id, start],
  );

  const finishStart = useCallback(() => {
    if (!finish) throw new Error(MISSING_PROVIDER);

    finish(id);
  }, [finish, id]);

  if (!context) throw new Error(MISSING_PROVIDER);

  return {
    hasStarted: context.startedIds.has(id),
    requestStart,
    finishStart,
  };
}
