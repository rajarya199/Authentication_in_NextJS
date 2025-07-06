'use client';

import Image from 'next/image';

const Accordian = () => {
  const animation = (e) => {
    const items = document.querySelectorAll('.item');
    const reset = () =>
      items.forEach((item) => item.classList.remove('animation'));

    if (!e.target.closest('.item')) return;
    reset();

    e.target.parentElement.classList.add('animation');
  };

  return (
    <div  >
      <div className="pt-2 w-full  flex items-center justify-center text-white">
<h1 className='text-2xl'>ACCORDION
    </h1>
      </div>
      <div className="h-[100vh] grid place-items-center ">
        <div className="flex gap-[0.15rem] p-[0.15rem]">
          <div
            onClick={animation}
            className="item flex-1 h-[70vmin] cursor-pointer overflow-hidden transition delay-700"
          >
            <Image
              // src="/r1.jpeg"
              src="/Assets/image/aa.jpg"
              alt="Accordian1"
              width={500}
              height={500}
              className="w-[100%] h-[100%] object-cover "
            />
          </div>
          <div
            onClick={animation}
            className="item flex-1 h-[70vmin] cursor-pointer overflow-hidden transition delay-700"
          >
            <Image
                          src="/Assets/image/bb.jpg"

              alt="Accordian1"
              width={500}
              height={500}
              className="w-[100%] h-[100%] object-cover "
            />
          </div>
          <div
            onClick={animation}
            className="item flex-1 h-[70vmin] cursor-pointer overflow-hidden transition delay-700"
          >
            <Image
              src="/Assets/image/cc.jpg"
              alt="Accordian1"
              width={500}
              height={500}
              className="w-[100%] h-[100%] object-cover "
            />
          </div>
          <div
            onClick={animation}
            className="item flex-1 h-[70vmin] cursor-pointer overflow-hidden transition delay-700"
          >
            <Image
              src="/Assets/image/dd.jpg"
              alt="Accordian1"
              width={500}
              height={500}
              className="w-[100%] h-[100%] object-cover "
            />
          </div>
          <div
            onClick={animation}
            className="item flex-1 h-[70vmin] cursor-pointer overflow-hidden transition delay-700"
          >
            <Image
              src="/Assets/image/aa.jpg"
              alt="Accordian1"
              width={500}
              height={500}
              className="w-[100%] h-[100%] object-cover "
            />
          </div>
          <div
            onClick={animation}
            className="item flex-1 h-[70vmin] cursor-pointer overflow-hidden transition delay-700"
          >
            <Image
                          src="/Assets/image/ee.jpg"

              alt="/Accordion"
              width={500}
              height={500}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordian;