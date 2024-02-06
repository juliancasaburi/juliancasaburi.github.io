import Image from "next/image";
import { Icons } from "../icons";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Project } from "@/types/project";
import { Badge } from "../ui/badge";

export default function ProjectCard({
  image,
  title,
  desc,
  repo,
  preview,
  tags,
}: Project) {
  return (
    <div className="group/card w-full max-w-[400px] overflow-hidden">
      <Link target="_blank" rel="noreferrer" href={preview ? preview : repo}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          priority
          className="w-400 h-400 rounded-md transition-all duration-500 hover:scale-[.99] hover:opacity-80"
        />
      </Link>

      <div className="p-2 pt-[2px]">
        <div className="flex w-full items-center justify-between">
          <div>
            <Link
              target="_blank"
              rel="noreferrer"
              href={preview ? preview : repo}
              className="link-hover text-base font-bold text-primary sm:text-lg"
            >
              {title}
            </Link>
            <div className="-mx-2 mt-2 flex flex-wrap">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="mx-1 my-1"
                  variant="secondary"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex">
            <Link
              target="_blank"
              rel="noreferrer"
              href={repo}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <Icons.githubOutline />
              <span className="sr-only">GitHub</span>
            </Link>

            {preview && (
              <Link
                target="_blank"
                rel="noreferrer"
                href={preview}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                <Icons.arrowUpRight />
                <span className="sr-only">Preview</span>
              </Link>
            )}
          </div>
        </div>

        <p className="mt-[2px] text-base">{desc}</p>
      </div>
    </div>
  );
}
