import { chakra, forwardRef } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

const MotionBox = motion(
    forwardRef((props, ref) => {
        const chakraProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
        );
        return <chakra.div ref={ref} {...chakraProps} />;
    }),
);

export default MotionBox;
