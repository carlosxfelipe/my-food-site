declare global {
  namespace preact.JSX {
    interface IntrinsicElements {
      "ion-icon": preact.JSX.HTMLAttributes<HTMLElement> & {
        name?: string;
      };
    }
  }
}

export {};
