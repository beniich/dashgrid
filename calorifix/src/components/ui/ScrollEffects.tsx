import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
}

export const ScrollReveal = ({ children, width = "fit-content" }: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const ParallaxSections = ({ children }: { children: React.ReactNode }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-2 bg-primary z-50 origin-left"
                style={{ scaleX }}
            />
            {children}
        </>
    );
}

export const GlassEffect = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`glass-card p-6 ${className || ''}`}>
            {children}
        </div>
    )
}
