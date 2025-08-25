import React from "react";

const WelcomeChat = () => {
  return (
    <div className="mx-auto flex w-full flex-col justify-center px-2 pb-2 transition-all duration-700 max-w-3xl flex-1">
      <div className="flex flex-col items-center justify-center pb-4 text-center">
        <h1 className="mb-6 text-3xl font-bold">What can I help with?</h1>
        <div className="grid w-full auto-rows-min gap-4 md:grid-cols-3">
          <div className="card bg-indigo-500/10 hover:bg-indigo-500/15 border-indigo-500/10 text-indigo-800 dark:text-indigo-200  cursor-pointer ">
            <div className="flex flex-row items-center gap-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <h1>Write an invitation</h1>
            </div>

            <p>Prepare an invitation for an event or a party</p>
          </div>
          <div className="card bg-red-500/10 hover:bg-red-500/15 border-red-500/10 text-red-800 dark:text-red-200  cursor-pointer ">
            <div className="flex flex-row items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>

              <h1>Suggest Study Plan</h1>
            </div>
            <p>Suggest a list of study plans for exam preparation</p>
          </div>
          <div className="card  bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/10 text-amber-800 dark:text-amber-200  cursor-pointer ">
            <div className="flex flex-row items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plane size-4"
                aria-label="Plane icon"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
              </svg>

              <h1>Plan a Trip</h1>
            </div>
            <p>Find the best time to travel to Japan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeChat;
