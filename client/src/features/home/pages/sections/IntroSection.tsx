import { motion } from "framer-motion";

export const IntroSection = ({ onFinish = () => {} }) => {
  return (
    <motion.div
      className="intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 4.5, duration: 0.6 }}
      onAnimationComplete={onFinish}
      style={{
        position: "fixed",
        inset: 0,
        background: "#fff",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          background: "#00c300",
          height: "120px",
          width: "60%",
          transformOrigin: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "40px",
        }}
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0],
          x: ["0%", "0%", "0%", "100%"],
        }}
        transition={{
          duration: 4,
          times: [0, 0.3, 0.6, 1],
          ease: [0.77, 0, 0.175, 1], // giống LINE hơn
        }}
      >
        <motion.h1
          style={{ color: "white" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Life on LINE
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};
