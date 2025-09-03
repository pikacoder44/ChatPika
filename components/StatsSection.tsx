import React from "react";

const Stats = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
        <h2 className="md:text-3xl text-2xl mt-2 text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Our service statistics
        </h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 mt-4">
          <div className="overflow-hidden cursor-pointer transition-all ease-in-out hover:-translate-y-1 shadow rounded-lg bg-gradient-to-bl from-[#A1C4FD] to-[#C2E9FB] md:bg-zinc-800 md:from-transparent md:to-transparent md:text-white">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-zinc-900 truncate md:text-white">
                  Total free servers
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-black md:text-white">
                  1.6M
                </dd>
              </dl>
            </div>
          </div>
          <div className="overflow-hidden hover:-translate-0.5 cursor-pointer transition-all ease-in-out shadow rounded-lg bg-gradient-to-bl from-[#A1C4FD] to-[#C2E9FB] md:bg-zinc-800 md:from-transparent md:to-transparent md:text-white">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-zinc-900 truncate md:text-white">
                  Servers a month
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-black md:text-white">
                  19.2K
                </dd>
              </dl>
            </div>
          </div>
          <div className="overflow-hidden hover:-translate-0.5 cursor-pointer transition-all ease-in-out shadow rounded-lg bg-gradient-to-bl from-[#A1C4FD] to-[#C2E9FB] md:bg-zinc-800 md:from-transparent md:to-transparent md:text-white">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-zinc-900 truncate md:text-white">
                  Servers a week
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-black md:text-white">
                  4.9K
                </dd>
              </dl>
            </div>
          </div>
          <div className="overflow-hidden hover:-translate-0.5 cursor-pointer transition-all ease-in-out shadow rounded-lg bg-gradient-to-bl from-[#A1C4FD] to-[#C2E9FB] md:bg-zinc-800 md:from-transparent md:to-transparent md:text-white">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-zinc-900 truncate md:text-white">
                  Total users
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-black md:text-white">
                  166.7K
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
