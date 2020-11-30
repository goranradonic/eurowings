import React from "react";


function useIntersectionObserver(props: {target:React.RefObject<HTMLDivElement>, onIntersect:any, threshold?:number | 2.5, rootMargin?:string | "0"}) {
    React.useEffect(() => {
        const observer = new IntersectionObserver(props.onIntersect, {
            rootMargin: props.rootMargin,
            threshold: props.threshold
        });

        const current = props.target.current;

        if(current) observer.observe(current);

        return () => {
            if(current) observer.unobserve(current);
        };
    });
};

export default useIntersectionObserver;