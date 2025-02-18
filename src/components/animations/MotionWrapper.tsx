import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  variants?: Variants; // Framer Motion animation variants
  initial?: string; // Initial animation state
  animate?: string; // Animation state when in view
  once?: boolean; // Trigger animation only once
  margin?: string; // Margin for intersection observer
  className?: string; // Optional className for styling
}

const MotionWrapper = ({
  children,
  variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.8 },
    },
  },
  initial = "hidden",
  animate = "visible",
  once = true,
  //   margin = '0px',
  className = "",
}: MotionWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null); // Ref to the DOM element
  const isInView = useInView(ref, { once }); // Determine if the element is in view
  //   const isInView = useInView(ref, { once, margin }); // Determine if the element is in view

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
