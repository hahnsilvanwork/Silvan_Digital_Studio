import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          readonly url: string;
          readonly background?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
