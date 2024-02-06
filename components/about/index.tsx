import { siteConfig } from "@/config/site-config";
import { Icons } from "../icons";
import Link from "next/link";
import { Fragment } from "react";

export default function About() {
  return (
    <section id="about" className="pt-16 text-muted-foreground sm:text-lg">
      {/* about me */}
      <div className="group">
        <h1 className="title-bottom-line">About me</h1>
        <p>
          {`I'm a Computer Science Student 📚 (99%) @`}
          <Link
            href="https://www.info.unlp.edu.ar/"
            target="_blank"
            className="ml-1 mr-1 text-primary underline-offset-4 hover:underline"
          >
            Facultad de Informática - UNLP (Universidad Nacional de La Plata)
          </Link>
          and a proud graduate 🎓 with a degree in Analista Programador
          Universitario. Currently, the only milestone left in my academic
          journey is the completion of my thesis.
          </p>
          <p className="mt-6">My academic pursuits have
          honed my passion for backend topics, system architecture, and
          cybersecurity. I find joy in developing robust systems.</p>
          <p className="mt-6">
            Beyond the realms of backend development, I&apos;m also on a journey to expand my knowledge of frontend
          technologies.
        </p>
      </div>

      {/* tech
      <div className="group">
        <h1 className="title-bottom-line mt-14">Tech I have worked with</h1>

        <div className="flex flex-wrap gap-2">
          {siteConfig.skillIcons.map((icon, idx) => (
            <Fragment key={idx}>
              <icon.Icon key={idx} className="h-11 w-11" />
              <span className="sr-only">{icon.title}</span>
            </Fragment>
          ))}
        </div>
      </div>
      */}

      <div className="group">
        <h1 className="title-bottom-line mb-5 mt-14 inline-flex items-center">
          I <Icons.heart className="ml-2 h-5 w-5" />
        </h1>

        <p>
          Coding, competitive gaming (e-sports), reading and learning new
          things.
        </p>
      </div>
    </section>
  );
}
