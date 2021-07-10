import Image from "next/image";
import Fade from "react-reveal/Fade";

function Banner() {
  const orderNow = () => {
    window.scrollTo({top:document.getElementById("menu").offsetTop - 90, behavior: 'smooth'});
    //window.location.href='#products-feed'
  };

  const viewMore =()=>{
    window.scrollTo({top:document.getElementById("about").offsetTop - 90, behavior: 'smooth'});
    //window.location.href='#products-feed'
  }
  return (
    <div className=" px-6 relative heightFix mb-24">
      <div className="absolute lg:-bottom-60 -bottom-72 lg:-left-44 -left-80  object-contain overflow-hidden">
        <Fade left>
        <Image src="/img/circle.svg" alt="" width={400} height={400} />
        </Fade>
      </div>

      <div className="absolute top-16 lg:left-72 left-60 lg:w-auto sm:w-10 w-8 object-contain overflow-hidden">
        <Fade top>
        <Image src="/img/circle.svg" alt="" width={80} height={80} />
        </Fade>
      </div>
      <div className="max-w-screen-xl mx-auto lg:py-10  sm:pt-32 pt-20">
        <div className="flex lg:justify-between lg:items-center overflow-hidden p-0.5 lg:flex-row flex-col lg:gap-4 gap-8">
          <Fade left>
            <div className="main_heading">
              <h3 className="font-medium sm:text-xl mb-3 text-base ">Are you hungry?</h3>
              <h1 className="font-semibold xl:text-7xl sm:text-6xl xxs:text-5xl text-4xl">
                Don't <span>Wait!</span>
              </h1>
              <div className="flex items-center xl:mt-12 lg:mt-10  sm:mt-8 mt-6 gap-4 flex-wrap">
                <button className="button lg:text-base xl:px-16 px-14" onClick={orderNow}>
                  Order Now
                </button>
                <button className="xl:px-16 lg:text-base button-ghost px-14" onClick={viewMore}>
                  View More
                </button>
              </div>
            </div>
          </Fade>
          <Fade right>
            <div className="lg:w-1/2 lg:m-0 lg:max-w-none sm:max-w-lg  max-w-xs  mx-auto">
              <Image
                src="/img/eating_together.svg"
                alt=""
                width={600}
                height={600}
                objectFit="contain"
              />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default Banner;
