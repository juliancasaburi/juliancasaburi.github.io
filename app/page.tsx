import { About, Contact, Hero, Intro, Projects, Repos } from "@/components";

export default function IndexPage() {
  return (
    <>
      <Hero />
      <div className="container px-4 pb-4 xs:px-8">
        <Intro />
        <About />
        <Projects />
        <Repos />
        <Contact />
        <p className="mt-16 text-center text-xs text-muted-foreground xs:text-sm">
          &#169; {new Date().getFullYear()} Julián Casaburi. All Rights Reserved.
        </p>
      </div>
    </>
  );
}
