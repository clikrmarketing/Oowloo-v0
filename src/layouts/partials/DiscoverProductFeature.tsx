import type { IHomepageDiscoverProductFeature } from "@/pages/index.astro";
import React from "react";
import ImageMod from "@/components/ImageMod.astro";

const DiscoverProductFeature = ({
  discoverProductFeature,
}: {
  discoverProductFeature: IHomepageDiscoverProductFeature;
}) => {
  const { title, content, accordionList } = discoverProductFeature;
  const [activeImage, setActiveImage] = React.useState(accordionList[0].image);
  const [imageOpacity, setImageOpacity] = React.useState(1);

  const handleImageChange = (newImage: string) => {
    setImageOpacity(0);
    setTimeout(() => {
      setActiveImage(newImage);
      setImageOpacity(1);
    }, 0); // Match the duration of the opacity transition
  };

  const [openAccordionIndex, setOpenAccordionIndex] = React.useState(0);

  return (
    <section className="section who-can-benefit bg-secondary" id="features">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-10 p-7 ">
        <div className="mb-14">
              {title && (
                <h2 className="mb-5" data-aos="fade-up-sm" data-aos-delay="0">
                  {title}
                </h2>
              )}
            
            </div>
        </div>
      </div>
      <div className="container second-container">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-10 ">
          <div className="w-full md:w-[100%] mx-auto lg:w-[40%] xl:w-[50%]">
            <div className=" aspect-video lg:aspect-square">  
              
                  
              <img
                width={412}
                height={420}
                src={activeImage} 
                alt="Profile Image"
                className="rounded-3xl shadow-lg w-full h-full object-cover "
              />
            </div>
          </div>
          <div className="lg:w-[60%] xl:w-[50%]">
           
            <div data-aos="fade-up-sm" data-aos-delay="200" className="flex flex-col gap-2">
              {accordionList.map((item, index) => (
                <DiscoverProductAccordion
                  key={index}
                  currentNumber={index + 1}
                  item={item}
                  setActiveImage={handleImageChange}
                  isOpen={openAccordionIndex === index}
                  onClick={() => setOpenAccordionIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DiscoverProductAccordion = ({
  item,
  currentNumber,
  setActiveImage,
  isOpen,
  onClick,
}: {
  item: any;
  currentNumber: number;
  setActiveImage: (newImage: string) => void;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(isOpen ? "auto" : "0px");

  React.useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  const handleOnClick = () => {
    onClick();
    setActiveImage(item.image);
  };

  return (
    <div
      className={`p-6 transition-all duration-300 rounded-3xl ${isOpen ? "bg-theme-light active" : "bg-body cursor-pointer"}`}
      onClick={handleOnClick}
    >
      <div className="flex gap-4 justify-between">
        {/* <div className="mt-1">0{currentNumber}.</div> */}
        <div>
          <div className="flex justify-between items-center ">
            <h3 className="text-h5">{item.title}</h3>
          </div>
          <div ref={contentRef} style={{ height, overflow: "hidden", transition: "height 0.5s ease" }}>
            {isOpen && <p className={isOpen ? "mt-3" : "mt-0"}>{item.content}</p>}
          </div>
        </div>
        <div>
         

          <div className="accordion-icon min-w-[1.1em] min-h-[1.1em] relative bg-primary rounded-full">
          <div className={`w-[2px] h-[60%] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white opacity-100  accordion-icon-active`} ></div>
          <div className={`w-[2px] h-[60%] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rotate-90 `}></div> 
        </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverProductFeature;
