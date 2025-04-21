import { useEffect } from "react";
import { useRef } from "react";

export function useOutsideClick(handler, listenCpture = true) {
  const ref = useRef();

  //closing the modal window when clicked outside the modal region
  useEffect(
    function () {
      function handleClick(e) {
        // console.log(e.target);
        // console.log(ref.current);
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener("click", handleClick, listenCpture);

      return () =>
        document.removeEventListener("click", handleClick, listenCpture);
    },
    [handler, listenCpture]
  );

  return ref;
}
