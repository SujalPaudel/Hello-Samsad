import { useState, useEffect } from "react";

export default function useScroll() {
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );
  const [scrollY, setScrollY] = useState(bodyOffset.top);

  const listener = e => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return{scrollY};
}