import { BiMoon, BiSun } from "react-icons/bi";

import { useThemeContext } from "../provider/ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useThemeContext();

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <button
        // style={{ opacity: 0.1 }}
        className={`${className} flex relative justify-center flex-col items-center cursor-pointer rounded-md overflow-hidden dark:hover:bg-[#252938] hover:bg-[#ccccd6] p-[20px]`}
        onClick={handleChange}>
        <motion.div
          className="absolute"
          initial={{ y: 0 }}
          animate={{
            y: theme === "light" ? -27 : 0,
          }}>
          <BiMoon className="text-text" />
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ y: 0 }}
          animate={{
            y: theme === "light" ? 0 : 27,
          }}>
          <BiSun className="text-text" />
        </motion.div>
      </button>
    </>
  );
}
