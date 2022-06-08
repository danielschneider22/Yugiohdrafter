import React, { useEffect, useRef } from "react";
import { scrollToggleNavVisibility } from "../NavBar/ScrollBGColorChange";

const withScroll = (
  WrappedComponent: React.FunctionComponent<any>
) => {
  return (props: JSX.IntrinsicAttributes & { children?: React.ReactNode } & {[key: string]: any}) => {
    const scrollCardsRef = useRef(null as unknown as HTMLDivElement)

    useEffect(() => {
      if(scrollCardsRef) {
          scrollCardsRef.current.addEventListener('scroll', scrollToggleNavVisibility as unknown as (this: HTMLDivElement, ev: Event) => any)
      }
    }, [scrollCardsRef])

    return (
      <>
        <WrappedComponent scrollCardsRef={scrollCardsRef} {...props} />
      </>
    );
  };
};

export default withScroll;