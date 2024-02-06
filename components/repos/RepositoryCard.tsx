import Link from "next/link";
import { Badge } from "../ui/badge";
import type { Repository } from "@/types/repository";
import { StarIcon, GitForkIcon } from "lucide-react";

export default function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <div className="group card w-full max-w-[400px] overflow-hidden rounded-lg bg-secondary p-2">
      <Link target="_blank" rel="noreferrer" href={repository.html_url}>
      </Link>

      <div className="p-2 pt-[2px]">
        <div className="flex w-full items-center justify-between">
          <div>
            <Link
              target="_blank"
              rel="noreferrer"
              href={repository.html_url}
              className="link-hover text-base font-bold text-primary sm:text-lg"
            >
              {repository.name}
            </Link>
            <div className="flex mt-2 gap-1">
                {repository.language && (
                  <Badge>
                    {repository.language}
                  </Badge>
                )}
                <Badge>
                  <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
                  {repository.stargazers_count}
                </Badge>
                <Badge>
                  <GitForkIcon className="mr-1 h-4 w-4" />
                  {repository.forks_count}
                </Badge>
            </div>
          </div>
        </div>
        <p className="mt-2 text-base">{repository.description}</p>
      </div>
    </div>
  );
}
