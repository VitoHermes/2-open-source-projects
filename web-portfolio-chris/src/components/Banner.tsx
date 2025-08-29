import Image from "next/image";
import { ButtonOutline, ButtonPrimary, RingGradient } from "@/components/util";

export default function Banner() {
  return (
    <section id="home" className="pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase text-xs tracking-widest text-gray-500">Senior Software Developer</p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient">Chris Zhang</h1>
            <p className="text-base sm:text-lg mt-5 sm:mt-6 text-gray-600 dark:text-gray-300">
              Frontend engineer specializing in React/TypeScript. Web3 payments, AI-assisted UX, and large-scale e-commerce platform experience.
            </p>
            <div className="flex gap-3 mt-6">
              <ButtonPrimary href="#work">View Work</ButtonPrimary>
              <ButtonOutline href="#contact">Contact</ButtonOutline>
            </div>
          </div>
          <RingGradient className="relative rounded-xl overflow-hidden mx-auto w-[260px] h-[260px] min-w-[260px] min-h-[260px] sm:w-[320px] sm:h-[320px] sm:min-w-[320px] sm:min-h-[320px] md:w-[380px] md:h-[380px] md:min-w-[380px] md:min-h-[380px]">
            <Image
              src="/logo.png"
              alt="Hero"
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 260px"
              className="object-cover"
              priority
            />
          </RingGradient>
        </div>
      </div>
    </section>
  );
}


