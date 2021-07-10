import { useSession } from "next-auth/client";
import Head from "next/head";
import Fade from "react-reveal/Fade";

function Profile() {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Zinger | Profile</title>
      </Head>
      <div className="heightFix px-6">
        <div className="max-w-screen-xl mx-auto md:py-20 py-12 space-y-10 pb-20">
          <h3 className="sm:text-2xl text-xl font-semibold border-b-2 border-gray-200 pb-4 text-gray-700">
            Profile
          </h3>
          <div className="sm:space-y-4 space-y-3 font-medium overflow-hidden sm:text-base text-sm">
            <Fade top>
              <img
                src={session?.user?.image || "/img/profile_pic.svg"}
                loading="lazy"
                alt=""
                width="80"
                height="80"
                className="object-contain sm:w-24 sm:h-24 w-20 h-20 rounded-full hover:shadow-md"
              />
              <p>
                <span className="font-medium sm:text-lg text-base mr-1">
                  Name -
                </span>
                {session?.user?.name}
              </p>
              <p className="whitespace-nowrap overflow-auto hideScrollBar">
                <span className="font-medium sm:text-lg text-base mr-1">
                  Email -
                </span>
                {session?.user?.email}
              </p>
              <p className="font-medium lg:text-xl md:text-lg text-base  pt-8 text-primary-light">
                "Whoever said money can't buy happiness didn't know where to
                shop".
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
}

Profile.auth = true;

export default Profile;
