// File: components/PlatformResultCard.jsx

"use client";

import CopyButton from "./CopyButton";

export default function PlatformResultCard({
  data
}) {

  const titles = data?.titles || [];

  const hashtags =
    data?.hashtags || [];

  return (

    <div className="
      glass
      rounded-3xl
      p-8
      space-y-8
    ">

      {/* TITLES */}

      <div>

        <h2 className="
          text-2xl
          font-bold
          mb-5
        ">
          Viral Titles
        </h2>

        <div className="space-y-4">

          {titles.length > 0 ? (

            titles.map((item, i) => (

              <div
                key={i}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-4
                ">

                  <p className="
                    text-lg
                    font-medium
                  ">
                    {item.text}
                  </p>

                  <span className="
                    bg-green-500/20
                    text-green-300
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    whitespace-nowrap
                  ">
                    {item.score}
                  </span>

                </div>

              </div>

            ))

          ) : (

            <p className="text-gray-400">
              No titles generated yet.
            </p>

          )}

        </div>

      </div>

      {/* CAPTION */}

      <div>

        <div className="
          flex
          items-center
          justify-between
          mb-4
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            SEO Caption
          </h2>

          <CopyButton
            text={data?.caption || ""}
          />

        </div>

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-2xl
          p-6
          whitespace-pre-wrap
          leading-relaxed
        ">

          {data?.caption || "No caption generated."}

        </div>

      </div>

      {/* HASHTAGS */}

      <div>

        <h2 className="
          text-2xl
          font-bold
          mb-4
        ">
          Hashtags
        </h2>

        <div className="
          flex
          flex-wrap
          gap-3
        ">

          {hashtags.length > 0 ? (

            hashtags.map((tag, i) => (

              <span
                key={i}
                className="
                  bg-violet-500/20
                  border
                  border-violet-500/20
                  px-4
                  py-2
                  rounded-full
                "
              >
                {tag}
              </span>

            ))

          ) : (

            <p className="text-gray-400">
              No hashtags generated.
            </p>

          )}

        </div>

      </div>

      {/* TIMING */}

      <div className="
        bg-white/5
        border
        border-white/10
        rounded-2xl
        p-6
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-3
        ">
          Best Upload Timing
        </h2>

        <p className="
          text-violet-300
          text-lg
          font-medium
        ">
          {data?.bestTime || "Not available"}
        </p>

        <p className="
          text-gray-400
          mt-3
          leading-relaxed
        ">
          {data?.justification ||
            "No timing analysis available."}
        </p>

      </div>

    </div>

  );

}