// GitHub API service
export class GitHubApiService {
  constructor(username) {
    this.username = username
  }

  async fetchRepositories() {
    try {
      // Check if we have cached data (valid for 10 minutes)
      const cacheKey = `github_repos_${this.username}`
      const cachedData = this.getCachedData(cacheKey)
      
      if (cachedData) {
        return cachedData
      }

      let allRepos = []
      let page = 1
      let hasMore = true

      while (hasMore) {
        const response = await fetch(
          `https://api.github.com/users/${this.username}/repos?page=${page}&per_page=100&sort=updated`,
          {
            headers: {
              'User-Agent': 'juliancasaburi-portfolio'
            }
          }
        )
        
        if (!response.ok) {
          throw new Error(`Failed to fetch repositories: ${response.status}`)
        }

        const repos = await response.json()
        
        if (repos.length === 0) {
          hasMore = false
        } else {
          allRepos = [...allRepos, ...repos]
          page++
        }
      }

      // Sort by stars (descending)
      const sortedRepos = allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)
      
      // Cache the data
      this.setCachedData(cacheKey, sortedRepos)
      
      return sortedRepos
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error)
      throw error
    }
  }

  getCachedData(key) {
    try {
      const cached = localStorage.getItem(key)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        const now = Date.now()
        const tenMinutes = 10 * 60 * 1000
        
        if (now - timestamp < tenMinutes) {
          return data
        } else {
          localStorage.removeItem(key)
        }
      }
    } catch (error) {
      console.warn('Error reading cache:', error)
    }
    return null
  }

  setCachedData(key, data) {
    try {
      const cacheObject = {
        data,
        timestamp: Date.now()
      }
      localStorage.setItem(key, JSON.stringify(cacheObject))
    } catch (error) {
      console.warn('Error setting cache:', error)
    }
  }
}

// Repository card renderer
export class RepoCardRenderer {
  static formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  static getLanguageColor(language) {
    const colors = {
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

  static createCard(repo) {
    const topicsHtml = repo.topics && repo.topics.length > 0 
      ? `<div class="flex flex-wrap gap-1 mt-3">
          ${repo.topics.slice(0, 3).map(topic => 
            `<span class="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">${topic}</span>`
          ).join('')}
          ${repo.topics.length > 3 ? 
            `<span class="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">+${repo.topics.length - 3}</span>` 
            : ''}
         </div>`
      : ''
    
    return `
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-repo-card group flex flex-col p-4 sm:p-6 rounded-2xl border bg-card hover:bg-card/80 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer min-h-[280px] min-w-[280px] w-full">
        <div class="flex items-start justify-between mb-3 gap-3">
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <h3 class="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors duration-200 break-words leading-tight line-clamp-2">
              ${repo.name}
            </h3>
          </div>
          <div class="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-shrink-0">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span>${repo.stargazers_count}</span>
            </div>
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                <circle cx="12" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="18" cy="6" r="3"></circle>
                <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
                <path d="M12 12v3"></path>
              </svg>
              <span>${repo.forks_count}</span>
            </div>
          </div>
        </div>
        
        <div class="flex-1 flex flex-col min-h-0">
          <p class="text-muted-foreground text-sm mb-3 leading-relaxed break-words">
            ${repo.description || 'No description available'}
          </p>
          
          ${topicsHtml ? `<div class="mb-3">${topicsHtml.replace('<div class="flex flex-wrap gap-1 mt-3">', '<div class="flex flex-wrap gap-1">').replace('</div>', '</div>')}</div>` : ''}
        </div>

        
        <div class="flex items-center justify-between text-xs text-muted-foreground pt-3">
          <div class="flex items-center gap-3 overflow-hidden">
            ${repo.language ? `
              <div class="flex items-center gap-1 flex-shrink-0">
                <div class="w-3 h-3 rounded-full" style="background-color: ${this.getLanguageColor(repo.language)}"></div>
                <span class="truncate">${repo.language}</span>
              </div>
            ` : ''}
            <span class="truncate">Updated ${this.formatDate(repo.updated_at)}</span>
          </div>
          
        </div>
                <div class="mt-auto pt-3 flex items-center text-xs text-muted-foreground/80">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          View Repo
        </div>
      </a>
    `
  }
}

// Pagination manager
export class PaginationManager {
  constructor(reposPerPage, onPageChange) {
    this.reposPerPage = reposPerPage
    this.currentPage = 1
    this.totalRepos = 0
    this.totalPages = 0
    this.onPageChange = onPageChange
    
    this.bindEvents()
  }

  bindEvents() {
    const prevButton = document.getElementById('prev-page')
    const nextButton = document.getElementById('next-page')
    
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--
          this.onPageChange(this.currentPage)
          this.updateUI()
        }
      })
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
          this.onPageChange(this.currentPage)
          this.updateUI()
        }
      })
    }
  }

  setTotalRepos(total) {
    this.totalRepos = total
    this.totalPages = Math.ceil(total / this.reposPerPage)
    this.updateUI()
  }

  updateUI() {
    const prevButton = document.getElementById('prev-page')
    const nextButton = document.getElementById('next-page')
    const pageInfo = document.getElementById('page-info')
    const reposCount = document.getElementById('repos-count')
    
    if (prevButton) {
      prevButton.disabled = this.currentPage === 1
    }
    
    if (nextButton) {
      nextButton.disabled = this.currentPage === this.totalPages
    }
    
    if (pageInfo) {
      pageInfo.textContent = `Page ${this.currentPage} of ${this.totalPages}`
    }
    
    if (reposCount) {
      const start = (this.currentPage - 1) * this.reposPerPage + 1
      const end = Math.min(this.currentPage * this.reposPerPage, this.totalRepos)
      reposCount.textContent = `Showing ${start}-${end} of ${this.totalRepos} repositories`
    }
  }

  getCurrentPageData(repos) {
    const startIndex = (this.currentPage - 1) * this.reposPerPage
    const endIndex = startIndex + this.reposPerPage
    return repos.slice(startIndex, endIndex)
  }
}

// Main GitHub repositories manager
export class GitHubReposManager {
  constructor(username, reposPerPage = 4) {
    this.username = username
    this.reposPerPage = reposPerPage
    this.repos = []
    
    this.apiService = new GitHubApiService(username)
    this.pagination = new PaginationManager(reposPerPage, (page) => this.renderCurrentPage())
    
    this.bindRetryButton()
  }

  bindRetryButton() {
    const retryButton = document.getElementById('retry-button')
    if (retryButton) {
      retryButton.addEventListener('click', () => {
        this.loadRepositories()
      })
    }
  }

  async initialize() {
    await this.loadRepositories()
  }

  async loadRepositories() {
    try {
      this.showLoading()
      
      this.repos = await this.apiService.fetchRepositories()
      this.pagination.setTotalRepos(this.repos.length)
      
      if (this.repos.length > 0) {
        this.showRepos()
        this.renderCurrentPage()
      } else {
        this.showError()
      }
    } catch (error) {
      console.error('Failed to load repositories:', error)
      this.showError()
    }
  }

  renderCurrentPage() {
    const container = document.getElementById('github-repos-container')
    if (!container) return
    
    const currentRepos = this.pagination.getCurrentPageData(this.repos)
    
    container.innerHTML = currentRepos.map(repo => 
      RepoCardRenderer.createCard(repo)
    ).join('')
  }

  showLoading() {
    document.getElementById('github-repos-loading')?.classList.remove('hidden')
    document.getElementById('github-repos-error')?.classList.add('hidden')
    document.getElementById('github-repos-container')?.classList.add('hidden')
    document.getElementById('github-repos-pagination')?.classList.add('hidden')
  }

  showError() {
    document.getElementById('github-repos-loading')?.classList.add('hidden')
    document.getElementById('github-repos-error')?.classList.remove('hidden')
    document.getElementById('github-repos-container')?.classList.add('hidden')
    document.getElementById('github-repos-pagination')?.classList.add('hidden')
  }

  showRepos() {
    document.getElementById('github-repos-loading')?.remove()
    document.getElementById('github-repos-error')?.classList.add('hidden')
    document.getElementById('github-repos-container')?.classList.remove('hidden')
    
    // Update description text
    const description = document.getElementById('github-repos-description')
    if (description) {
      description.textContent = `Feel free to explore my repositories and reach out if you’d like to connect, collaborate, or
    simply have a chat about anything tech-related!`
    }
    
    if (this.pagination.totalPages > 1) {
      document.getElementById('github-repos-pagination')?.classList.remove('hidden')
    }
  }
}
