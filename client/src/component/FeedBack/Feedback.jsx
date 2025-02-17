import React from "react";
import { useAuth } from "../../store/auth";
import { cn } from "@/lib/utils";
import { Marquee } from "../../components/magicui/marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ fullname, message }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <figcaption className="text-lg font-semibold text-black capitalize">{fullname}</figcaption>
        <blockquote className="mt-2 text-sm text-black text-center">
          <FontAwesomeIcon icon={faQuoteLeft} className="text-lg text-black" />
          {` ${message} `}
          <FontAwesomeIcon icon={faQuoteRight} className="text-lg text-black" />
        </blockquote>
      </div>
    </figure>
  );
};

const Feedback = () => {
  const { feedBackdata } = useAuth();

  const firstRow = feedBackdata.slice(0, feedBackdata.length / 3);
  const secondRow = feedBackdata.slice(
    Math.ceil(feedBackdata.length / 3),
    Math.ceil((2 * feedBackdata.length) / 3)
  );
  const thirdRow = feedBackdata.slice(Math.ceil((2 * feedBackdata.length) / 3));

  return (
    <div className="h-full flex flex-col justify-center items-center bg-white pt-20">
      <h1 className="text-4xl font-semibold text-cyan-950 mb-5">Feedback</h1>
      <h2 className="text-2xl font-semibold text-cyan-950 mb-10">Some of our user's words</h2>

      <div className="relative flex h-[50vh] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
        {!feedBackdata || feedBackdata.length === 0?
        <div className="h-full flex justify-center items-center text-2xl text-white">
        No feedback available.
      </div>
      :
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
}
      </div>
    </div>
  );
};

export default Feedback;
