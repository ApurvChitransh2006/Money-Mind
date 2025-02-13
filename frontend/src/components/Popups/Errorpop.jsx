import gsap from "gsap";
import React, { useRef, useEffect } from "react";

const ErrorPop = ({ msg }) => {
    const popupRef = useRef(null);
    const progressBarRef = useRef(null);

    useEffect(() => {
        if (!msg) return; // Prevent animation if no message

        const tl = gsap.timeline();
        tl.fromTo(popupRef.current,
            { x: 200, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 }
        )
            .fromTo(progressBarRef.current,
                { width: 0 },
                { width: "100%", duration: 5 }
            )
            .to(popupRef.current,
                { x: 200, opacity: 0, duration: 0.5 }
            );

    }, [msg]); // Runs animation every time `msg` updates

    return msg ? (
        <div ref={popupRef} className="bg-red-300 fixed w-3/4 md:w-1/4 z-50 top-5 right-[2px] p-4 rounded-md shadow-lg">
            <div className="text-red-900 font-bold">Error</div>
            <div className="text-black">{msg}</div>
            <div ref={progressBarRef} className="absolute bottom-0 left-0 h-1 w-full bg-red-900"></div>
        </div>
    ) : null; // Hide component if no error message
};

export default ErrorPop;
