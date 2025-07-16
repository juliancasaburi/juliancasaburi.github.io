// QR Code functionality
let qrCodeGenerated = false

function toggleQRCode() {
  ('QR Code button clicked via client script!')
  
  const qrContainer = document.getElementById('qr-container')
  const qrDisplay = document.getElementById('qrcode-display')
  
  if (!qrContainer || !qrDisplay) {
    console.error('QR elements not found')
    return
  }
  
  const isExpanded = qrContainer.getAttribute('aria-expanded') === 'true'
  ('Current expanded state:', isExpanded)
  
  if (isExpanded) {
    ('Closing QR container')
    qrContainer.setAttribute('aria-expanded', 'false')
  } else {
    ('Opening QR container')
    qrContainer.setAttribute('aria-expanded', 'true')
    
    // Generate QR code only once using API service
    if (!qrCodeGenerated) {
      ('Generating QR code using API...')
      const currentUrl = window.location.href
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(currentUrl)}`
      
      const img = document.createElement('img')
      img.src = qrUrl
      img.alt = 'QR Code for ' + currentUrl
      img.className = 'rounded border'
      img.style.width = '128px'
      img.style.height = '128px'
      img.onload = () => ('QR code image loaded successfully')
      img.onerror = () => console.error('Failed to load QR code image')
      
      qrDisplay.innerHTML = '' // Clear any existing content
      qrDisplay.appendChild(img)
      qrCodeGenerated = true
      ('QR code generated and added to DOM')
    }
  }
}

function copyLink() {
  ('Copy link clicked via client script!')
  navigator.clipboard.writeText(window.location.href)
  
  // Simple toast notification
  const event = new CustomEvent('toast', {
    detail: { message: 'Link copied!' }
  })
  document.dispatchEvent(event)
}

// Make functions globally available
window.toggleQRCode = toggleQRCode
window.copyLink = copyLink
