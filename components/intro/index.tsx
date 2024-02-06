import Image from "next/image";

export default function Intro() {
  return (
    <div className="w-full">
      <div className="flex items-center">
      <h1 className="mt-16 text-3xl font-semibold text-muted-foreground xs:text-3xl">
        Hi
      </h1>
      <Image className="mb-2 pt-14" src="/images/waving-hand.png" width={44} height={44} alt=""/>
      <h1 className="mt-16 text-3xl font-semibold text-muted-foreground xs:text-3xl">
        , my name is
      </h1>
      </div>

      <div className="mt-2 flex items-center xs:mt-3">
        <h1 className="whitespace-nowrap text-4xl font-bold text-foreground xs:text-5xl">
          Julián Casaburi
        </h1>

        <div className="l:ml-6 sm:ml-2 md:ml-4 select-none">
          <Image src="/images/rocket.png" width={128} height={128} alt=""/>
        </div>
      </div>

      <h2 className="gradient-text mt-2 text-2xl font-bold xs:mt-3 xs:text-4xl sm:mt-4">
        A programming enjoyer above all things!
      </h2>
    </div>
  );
}
