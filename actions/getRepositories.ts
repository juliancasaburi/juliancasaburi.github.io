import { siteConfig } from "@/config/site-config";

export const getRepositories = async () => {
    let allRepositories: any[] = [];
    let page = 1;

    while (true) {
        const response = await fetch(
            `https://api.github.com/users/${siteConfig.gitHubUser}/repos?page=${page}&per_page=100`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();

        if (data.length === 0) {
            // No more repositories, break out of the loop
            break;
        }

        // Concatenate the current page's repositories to the result array
        allRepositories = allRepositories.concat(data);

        // Check the Link header for pagination information
        const linkHeader = response.headers.get('Link');
        const nextPage = findNextPage(linkHeader);

        if (!nextPage) {
            // No more pages, break out of the loop
            break;
        }

        // Increment the page number for the next request
        page++;
    }

    return allRepositories;
};

// Helper function to extract the next page number from the Link header
const findNextPage = (linkHeader: string | null) => {
    if (!linkHeader) {
        return null;
    }

    const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
    return match ? new URL(match[1]).searchParams.get('page') : null;
};