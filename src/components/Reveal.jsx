import { motion } from "motion/react";
import { EASE } from "../lib/motion";

/**
 * Reveal
 * One consistent scroll-triggered entrance animation used across the whole
 * site, so every heading / paragraph / card animates the same way instead
 * of each section rolling its own timing, easing and distance.
 *
 * - `as`      element/component to render (default "div")
 * - `delay`   stagger offset in seconds
 * - `y`       distance to travel in px
 * - `once`    only animate the first time it enters (default true)
 */

export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  y = 28,
  duration = 0.7,
  once = true,
  amount = 0.3,
  ...rest
}) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * RevealGroup
 * Wrap a list of children (cards, tags, links) to have them stagger in
 * together with the same easing/duration language as <Reveal>.
 */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.2,
  ...rest
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "", y = 20, ...rest }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
