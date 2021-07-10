import Image from "next/image";

function Banner() {
  return (
    <div className=" px-6 relative heightFix">
       <div className="absolute -bottom-60 -left-44">
       <Image  
          src="/img/circles/circle.svg"
          alt=""
          width={400}
          height={400}
        />
       </div>
       
       <div className="absolute top-16 left-72">
       <Image  
          src="/img/circles/circle.svg"
          alt=""
          width={80}
          height={80}
        />
       </div>
      <div className="max-w-screen-xl mx-auto py-10">
        <div className="flex justify-between items-center">
          <div className="">
            <h3 className="font-medium text-xl mb-3">Are you hungry?</h3>
            <h1 className="font-medium text-7xl">
              Don't <span>Wait!</span>
            </h1>
            <div className="flex items-center mt-12 gap-4">
              <a className="button text-base px-16" href="#">
                Order Now
              </a>
              <a className="px-16 text-base button-ghost" href="#">
                View More
              </a>
            </div>
          </div>
          <div className="self-end">
            <Image
              className="max-w-xl"
              src="/img/eating_together.svg"
              alt="Eating together"
              width={600}
              height={600}
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
