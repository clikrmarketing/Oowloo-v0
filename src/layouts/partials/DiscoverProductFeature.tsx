import type { IHomepageDiscoverProductFeature } from "@/pages/index.astro";
import React from "react";

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
    <section className="section">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
          <div className="md:w-[70%] mx-auto lg:w-[40%] xl:w-[50%]">
            <div className="bg-quaternary/80 p-5 xl:p-20 rounded-3xl">
              <img
                width={412}
                height={577}
                src={activeImage}
                alt="Profile Image"
                className="rounded-3xl shadow-lg w-full"
              />
            </div>
          </div>
          <div className="lg:w-[60%] xl:w-[50%]">
            <div className="mb-14">
              {title && (
                <h2 className="mb-5" data-aos="fade-up-sm" data-aos-delay="0">
                  {title}
                </h2>
              )}
              {content && (
                <p data-aos="fade-up-sm" data-aos-delay="100">
                  {content}
                </p>
              )}
            </div>
            <div data-aos="fade-up-sm" data-aos-delay="200">
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
      className={`p-6 border-b border-border transition-all duration-300 ${isOpen ? "bg-theme-light" : "bg-body cursor-pointer"}`}
      onClick={handleOnClick}
    >
      <div className="flex gap-4">
        <div className="mt-1">0{currentNumber}.</div>
        <div>
          <div className="flex justify-between items-center ">
            <h3 className="text-h5">{item.title}</h3>
          </div>
          <div ref={contentRef} style={{ height, overflow: "hidden", transition: "height 0.5s ease" }}>
            {isOpen && <p className={isOpen ? "mt-3" : "mt-0"}>{item.content}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverProductFeature;
