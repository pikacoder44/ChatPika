import React from "react";

const Stats = () => {
  return (
    <div className="w-full  flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
        <h2 className="text-3xl text-center font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Our service statistics
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
          <div className="bg-white overflow-hidden hover:-translate-0.5 cursor-pointer transition-all ease-in-out shadow sm:rounded-lg dark:bg-card-bg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-card-fg">
                  Total free servers
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-white">
                  1.6M
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden hover:-translate-0.5 cursor-pointer transition-all ease-in-out shadow sm:rounded-lg dark:bg-card-bg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-card-fg">
                  Servers a month
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-white">
                  19.2K
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden hover:-translate-0.5 cursor-pointer transition-all ease-in-out shadow sm:rounded-lg dark:bg-card-bg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-card-fg">
                  Servers a week
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-white">
                  4.9K
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden hover:-translate-0.5 cursor-pointer transition-all ease-in-out shadow sm:rounded-lg dark:bg-card-bg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-card-fg">
                  Total users
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-white">
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
