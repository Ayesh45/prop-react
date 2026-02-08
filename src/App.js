import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import letterFront from "./assets/front.jpg";
import letterBack from "./assets/back.jpg";
import letterOpened from "./assets/in.png";

const FloatingHearts = () => {
  const colors = ["#ff1493", "#ff69b4", "#ffa500", "#8b4789", "#e6b3e0", "#ff0000", "#ff6b9d", "#c71585"];
  
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-heart"
          initial={{
            x: Math.random() * window.innerWidth - window.innerWidth / 2,
            y: window.innerHeight + 50,
            opacity: 0,
            rotate: Math.random() * 360
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 1, 0],
            rotate: Math.random() * 720
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            delay: i * 0.2,
            ease: "easeOut"
          }}
          style={{ color: colors[Math.floor(Math.random() * colors.length)] }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );
};

export default function App() {
  const [page, setPage] = useState("cover");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const dodgeNo = () => {
    setNoPos({
      x: Math.random() * 240 - 120,
      y: Math.random() * 140 - 70
    });
  };

  return (
    <div className="app">
      <FloatingHearts />
      <AnimatePresence mode="wait">

        {/* OPENING PAGE */}
        {page === "cover" && (
          <motion.div
            key="cover"
            className="center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="title">💍 Happy Proposal Day 💍</h1>

            <motion.div
              className="letter"
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.8 }}
              onClick={() => setPage("letter")}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="letter-front"
                style={{ backfaceVisibility: "hidden" }}
              >
                <img src={letterFront} alt="Letter Front" />
              </motion.div>
              <motion.div
                className="letter-back"
                style={{ backfaceVisibility: "hidden", rotateY: 180 }}
              >
                <img src={letterBack} alt="Letter Back" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* LETTER PAGE */}
        {page === "letter" && (
          <motion.div
            key="letter"
            className="letter-page"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="letter-opened-image">
              <img src={letterOpened} alt="Opened Letter" />
            </div>

            <p className="letter-text">
              My Dearest Sunshine,
              <br /><br />
              This letter unfolds with every heartbeat, every smile,
              and all the courage I gathered to ask you this…
            </p>

            <p className="question">
              Do you, <b>Mr. Sunshine</b>, be <b>Ms. Twilight's</b>{" "}
              "NON-annoying", "sweet", "romantic" and "dramatic" Valentine?
            </p>

            <div className="buttons">
              <button
                className="yes"
                onClick={() => setPage("yes")}
              >
                Yes, my Angel 💖
              </button>

              <motion.button
                className="no"
                style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                onMouseEnter={dodgeNo}
              >
                No 😈
              </motion.button>
            </div>

            <p className="note">No is always an option 😈</p>
          </motion.div>
        )}

        {/* YES PAGE */}
        {page === "yes" && (
          <motion.div
            key="yes"
            className="yes-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="floral-archway">
              <div className="archway-image">
                <div className="rose-petals">
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
