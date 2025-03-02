import React, { useContext } from "react";
import { useAuth } from "../../store/auth";
import { cn } from "@/lib/utils";
import { Marquee } from "../../components/magicui/marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

const ReviewCard = ({ fullname, message }) => {
  const { darkMode } = useContext(ThemeContext); // Access darkMode

  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
        darkMode
          ? "border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]"
          : "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]"
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <figcaption
          className={cn(
            "text-lg font-semibold capitalize",
            darkMode ? "text-white" : "text-black"
          )}
        >
          {fullname}
        </figcaption>
        <blockquote
          className={cn(
            "mt-2 text-sm text-center",
            darkMode ? "text-white" : "text-black"
          )}
        >
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className={cn("text-lg", darkMode ? "text-white" : "text-black")}
          />
          {` ${message} `}
          <FontAwesomeIcon
            icon={faQuoteRight}
            className={cn("text-lg", darkMode ? "text-white" : "text-black")}
          />
        </blockquote>
      </div>
    </figure>
  );
};

const Feedback = () => {
  const { feedBackdata } = useAuth();
  const { darkMode } = useContext(ThemeContext); // Access darkMode

  const firstRow = feedBackdata.slice(0, feedBackdata.length / 3);
  const secondRow = feedBackdata.slice(
    Math.ceil(feedBackdata.length / 3),
    Math.ceil((2 * feedBackdata.length) / 3)
  );
  const thirdRow = feedBackdata.slice(Math.ceil((2 * feedBackdata.length) / 3));

  return (
    <div
      className={cn(
        "h-full flex flex-col justify-center items-center pt-20",
        darkMode ? "bg-[#070707]" : "bg-gradient-to-b from-white to-cyan-100"
      )}
    >
      <h1
        className={cn(
          "text-4xl font-semibold mb-20 text-center md:px-0 px-4",
          darkMode ? " text-cyan-500" : "text-cyan-500"
        )}
      >
        Some of our user's words
      </h1>
      

      <div className="relative flex h-[50vh] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
        {!feedBackdata || feedBackdata.length === 0 ? (
          <div className="h-full flex justify-center items-center text-2xl text-white">
            No feedback available.
          </div>
        ) : (
          <div
            className="flex flex-row items-center gap-4"
            style={{
              transform:
                "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
            }}
          >
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstRow.map((feed) => (
                <ReviewCard key={feed._id} {...feed} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
              {secondRow.map((feed) => (
                <ReviewCard key={feed._id} {...feed} />
              ))}
            </Marquee>
            <Marquee pauseOnHover vertical className="[--duration:24s]">
              {thirdRow.map((feed) => (
                <ReviewCard key={feed._id} {...feed} />
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
