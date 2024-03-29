import Link from "next/link";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import { siteConfig } from "@/config/site-config";

export default function Contact() {
  return (
    <section id="contact" className="pt-20 text-muted-foreground">
      <div className="group">
        <h1 className="title-bottom-line inline-flex items-center">
          On the web <Icons.web className="ml-2 h-5 w-5" />
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "secondary" })}
          >
            <Icons.gitHub className="mr-2 h-6 w-6" /> @juliancasaburi
          </Link>
        </div>

        <p className="mt-10">
          If you have opportunities for collaboration or want to build something amazing, don&apos;t
          hesitate to contact me!
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Link
            target="_blank"
            href={siteConfig.links.mail}
            className={buttonVariants({ variant: "secondary" })}
          >
            <Icons.mail className="mr-2 h-5 w-5" /> Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
