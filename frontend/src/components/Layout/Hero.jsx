import { Link } from "react-router-dom";
import heroImg from "../../assets/cover3.png";
const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Rabbit"
        className="w-full h-[500px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Harmony <br /> Digits
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Unlock the secrets of the stars — Guiding you to harmony and insight worldwide.
          </p>
          {/* <Link
            to="#"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg"
          >
            Shop Now
          </Link> */}
        </div>
      </div>
    </section>
  );
};
export default Hero;
