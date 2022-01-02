import React from 'react';

export default function useBeforeUnload(listener) {
  const [browser, setBrowser] = React.useState(null);
  const listenerRef = React.useRef();

  const detectBrowser = function () {
    if (
      (navigator.userAgent.indexOf("Opera") ||
        navigator.userAgent.indexOf("OPR")) !== -1
    ) {
      setBrowser("Opera");
    } else if (navigator.userAgent.indexOf("Edg") !== -1) {
      setBrowser("Edge");
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      setBrowser("Chrome");
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      setBrowser("Safari");
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      setBrowser("Firefox");
    } else if (
      navigator.userAgent.indexOf("MSIE") !== -1 ||
      !!document.documentMode === true
    ) {
      //IF IE > 10
      setBrowser("IE");
    } else {
      setBrowser("unknown");
    }
  };

  useEffect(() => {
    listenerRef.current = (event) => {
      const returnValue = listener?.(event);

      if (typeof returnValue === "string") {
        return (event.returnValue = returnValue);
      }

      if (event.defaultPrevented) {
        return (event.returnValue = "");
      }
    };
  }, [listener]);

  /* kiểm tra trình duyệt nào */
  useEffect(() => {
    detectBrowser();
    const eventListener = (event) => listenerRef.current(event);
    if (browser === "Safari") {
      window.addEventListener("unload", eventListener, false);
    } else {
      window.addEventListener("beforeunload", eventListener, false);
    }

    return () => {
      if (browser === "Safari") {
        window.removeEventListener("unload", eventListener);
      } else {
        window.removeEventListener("beforeunload", eventListener);
      }
    };
  }, []);
}