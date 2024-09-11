import hero from "../assets/hero.png";
/**
 * Returns a div containing the image for the website
 * @returns {JSX.Element}
 */
const Hero = () => {
  return(
    <div>
        <img src={hero} className="w-full max-h-[600px] object-cover" alt="" />
    </div>
  )
}

export default Hero;