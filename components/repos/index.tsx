"use client";

import { getRepositories } from "@/actions/getRepositories";
import { useEffect, useState } from "react";
import RepositoryCard from "./RepositoryCard";
import { Repository } from "@/types/repository";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function Repos() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [displayedRepositories, setDisplayedRepositories] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRepositories();
        const sortedData = data
          .sort((a, b) => {
            if (b.stargazers_count === a.stargazers_count) {
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            }
            return b.stargazers_count - a.stargazers_count;
          })
          .map((repo: Repository) => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
          }));

        setRepositories(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setDisplayedRepositories(displayedRepositories + 8);
  };

  return (
    <section id="work" className="pt-20 text-muted-foreground sm:text-lg">
      <div className="group">
        <h1 className="title-bottom-line mb-5">GitHub Repos</h1>
        <p>{`Talk is cheap. Show me the code!`}</p>

        <div className="mt-10 grid place-content-center gap-y-8 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5">
          {loading
            ? Array.from({ length: displayedRepositories }).map((_, idx) => (
                <Skeleton key={idx} className="w-100 h-40 bg-gray-300" />
              ))
            : repositories
                .slice(0, displayedRepositories)
                .map((repo, idx) => (
                  <RepositoryCard key={idx} repository={repo} />
                ))}
        </div>

        {displayedRepositories < repositories.length && (
          <Button onClick={handleLoadMore} className="mt-8" variant="outline">
            Load more repos
          </Button>
        )}
      </div>
    </section>
  );
}
