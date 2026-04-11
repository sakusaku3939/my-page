// Workaround: @splidejs/react-splide@0.7.x does not expose types in its
// package.json "exports" field, causing TypeScript (moduleResolution: bundler)
// to fail resolution when upgrading to Next.js 16.2+.
// This file manually re-declares the public API so builds continue to work.
declare module "@splidejs/react-splide" {
  import { ComponentConstructor, Options } from "@splidejs/splide";
  import React from "react";

  export interface SplideProps
    extends Partial<Omit<React.HTMLAttributes<HTMLElement>, keyof React.DOMAttributes<HTMLElement>>> {
    options?: Options;
    hasTrack?: boolean;
    tag?: "div" | "section" | "header" | "footer" | "nav";
    extensions?: Record<string, ComponentConstructor>;
    transition?: ComponentConstructor;
    children?: React.ReactNode;
  }

  export declare class Splide extends React.Component<SplideProps> {
    splide: InstanceType<typeof import("@splidejs/splide").Splide> | undefined;
    sync(splide: InstanceType<typeof import("@splidejs/splide").Splide>): void;
    go(control: number | string): void;
  }

  export declare const SplideSlide: React.FC<React.HTMLAttributes<HTMLLIElement>>;

  export declare const SplideTrack: React.FC<React.HTMLAttributes<HTMLElement>>;

  export type { Options };
}
