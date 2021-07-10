// pages/404.js
import Head from "next/head";
import Fade from "react-reveal/Fade";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Zinger | Page Not Found</title>
      </Head>

      <div className="heightFix flex items-center justify-center text-center ">
        <div className="max-w-screen-xl mx-auto flex-col items-center justify-center">
          <div className="sm:mb-10 mb-6 overflow-hidden">
            <Fade bottom>
              <h1 className="font-extrabold sm:text-9xl text-8xl text-primary-light">
                404
              </h1>
              <p className="sm:mt-6 mt-4 uppercase font-medium sm:text-2xl text-xl">
                Page Not Found
              </p>
            </Fade>
          </div>
          <button className="button py-2 px-10 lg:text-lg text-base">
            HomePage
          </button>
        </div>
      </div>
    </>
  );
}
