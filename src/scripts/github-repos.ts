interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
}

class GitHubRepoViewer {
  private username: string
  private repos: GitHubRepo[] = []
  private currentPage = 1
  private reposPerPage = 4
  private totalPages = 0
  private container: HTMLElement | null = null
  private loadingElement: HTMLElement | null = null
  private errorElement: HTMLElement | null = null
  private paginationElement: HTMLElement | null = null

  constructor(username: string) {
    this.username = username
    this.init()
  }

  private async init() {
    this.container = document.getElementById('github-repos-container')
    this.loadingElement = document.getElementById('github-repos-loading')
    this.errorElement = document.getElementById('github-repos-error')
    this.paginationElement = document.getElementById('github-repos-pagination')

    await this.fetchRepos()
    this.render()
  }

  private async fetchRepos() {
    try {
      this.showLoading()
      
      // Fetch all repos with pagination from GitHub API
      let allRepos: GitHubRepo[] = []
      let page = 1
      let hasMore = true

      while (hasMore) {
        const response = await fetch(
          `https://api.github.com/users/${this.username}/repos?page=${page}&per_page=100&sort=updated`
        )
        
        if (!response.ok) {
          throw new Error(`Failed to fetch repositories: ${response.status}`)
        }

        const repos: GitHubRepo[] = await response.json()
        
        if (repos.length === 0) {
          hasMore = false
        } else {
          allRepos = [...allRepos, ...repos]
          page++
        }
      }

      // Sort by stars (descending)
      this.repos = allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)
      this.totalPages = Math.ceil(this.repos.length / this.reposPerPage)
      
      this.hideLoading()
    } catch (error) {
      this.hideLoading()
      this.showError(error instanceof Error ? error.message : 'Unknown error occurred')
    }
  }

  private getCurrentPageRepos(): GitHubRepo[] {
    const startIndex = (this.currentPage - 1) * this.reposPerPage
    const endIndex = startIndex + this.reposPerPage
    return this.repos.slice(startIndex, endIndex)
  }

  private render() {
    if (!this.container) return

    const currentRepos = this.getCurrentPageRepos()
    
    this.container.innerHTML = currentRepos.map(repo => this.createRepoCard(repo)).join('')
    this.renderPagination()
  }

  private createRepoCard(repo: GitHubRepo): string {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const getLanguageColor = (language: string | null) => {
      const colors: Record<string, string> = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C#': '#239120',
        'C++': '#f34b7d',
        'C': '#555555',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Swift': '#fa7343',
        'Kotlin': '#A97BFF',
        'Dart': '#00B4AB',
        'Shell': '#89e051',
        'HTML': '#e34c26',
        'CSS': '#1572B6',
        'Vue': '#4FC08D',
        'React': '#61DAFB',
        'Astro': '#FF5D01'
      }
      return colors[language || ''] || '#6b7280'
    }

    const topicsHtml = repo.topics && repo.topics.length > 0 ? `
      <div class="flex flex-wrap gap-1 mt-3">
        ${repo.topics.slice(0, 3).map(topic => 
          `<span class="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">${topic}</span>`
        ).join('')}
        ${repo.topics.length > 3 ? 
          `<span class="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">+${repo.topics.length - 3}</span>` 
          : ''
        }
      </div>
    ` : ''

    return `
      <a
        href="${repo.html_url}"
        target="_blank"
        rel="noopener noreferrer"
        class="github-repo-card group block p-6 rounded-2xl border bg-card hover:bg-card/80 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
      >          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                ${repo.name}
              </h3>
            </div>
            <div class="flex items-center gap-3 text-sm text-muted-foreground">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span>${repo.stargazers_count}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>${repo.forks_count}</span>
              </div>
            </div>
          </div>

        <p class="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          ${repo.description || 'No description available'}
        </p>

        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <div class="flex items-center gap-4">
            ${repo.language ? `
              <div class="flex items-center gap-1">
                <div 
                  class="w-3 h-3 rounded-full" 
                  style="background-color: ${getLanguageColor(repo.language)}"
                ></div>
                <span>${repo.language}</span>
              </div>
            ` : ''}
            <span>Updated ${formatDate(repo.updated_at)}</span>
          </div>
        </div>

        ${topicsHtml}
      </a>
    `
  }

  private renderPagination() {
    if (!this.paginationElement || this.totalPages <= 1) {
      if (this.paginationElement) {
        this.paginationElement.style.display = 'none'
      }
      return
    }

    this.paginationElement.style.display = 'flex'
    
    const prevDisabled = this.currentPage === 1
    const nextDisabled = this.currentPage === this.totalPages

    this.paginationElement.innerHTML = `
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <button 
            id="prev-page" 
            ${prevDisabled ? 'disabled' : ''}
            class="px-4 py-2 text-sm font-medium text-muted-foreground bg-background border border-border rounded-lg hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span class="text-sm text-muted-foreground">
            Page ${this.currentPage} of ${this.totalPages}
          </span>
          <button 
            id="next-page" 
            ${nextDisabled ? 'disabled' : ''}
            class="px-4 py-2 text-sm font-medium text-muted-foreground bg-background border border-border rounded-lg hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
        <div class="text-sm text-muted-foreground">
          Showing ${((this.currentPage - 1) * this.reposPerPage) + 1}-${Math.min(this.currentPage * this.reposPerPage, this.repos.length)} of ${this.repos.length} repositories
        </div>
      </div>
    `

    // Add event listeners
    const prevButton = document.getElementById('prev-page')
    const nextButton = document.getElementById('next-page')

    if (prevButton && !prevDisabled) {
      prevButton.addEventListener('click', () => {
        this.currentPage--
        this.render()
      })
    }

    if (nextButton && !nextDisabled) {
      nextButton.addEventListener('click', () => {
        this.currentPage++
        this.render()
      })
    }
  }

  private showLoading() {
    if (this.loadingElement) {
      this.loadingElement.style.display = 'block'
    }
    if (this.errorElement) {
      this.errorElement.style.display = 'none'
    }
  }

  private hideLoading() {
    if (this.loadingElement) {
      this.loadingElement.style.display = 'none'
    }
  }

  private showError(message: string) {
    if (this.errorElement) {
      this.errorElement.textContent = `Error loading repositories: ${message}`
      this.errorElement.style.display = 'block'
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GitHubRepoViewer('juliancasaburi')
})

// Export for potential reuse
if (typeof window !== 'undefined') {
  (window as unknown as { GitHubRepoViewer: typeof GitHubRepoViewer }).GitHubRepoViewer = GitHubRepoViewer
}
