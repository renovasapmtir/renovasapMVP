import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of paths that require authentication
const protectedPaths = [
  '/profile',
  '/reservation',
  '/historique',
  '/abonnements',
]

// List of paths that are public
const publicPaths = [
  '/',
  '/login',
]

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user')
  const pathname = request.nextUrl.pathname

  // Create base response
  const response = NextResponse.next()

  // Add security headers
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com *.stripe.com",
      "style-src 'self' 'unsafe-inline' *.googleapis.com",
      "img-src 'self' blob: data: *.stripe.com",
      "font-src 'self' data: *.googleapis.com *.gstatic.com",
      "frame-src 'self' *.stripe.com",
      "connect-src 'self' *.stripe.com"
    ].join('; ')
  }

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return response
  }

  // Check if path requires authentication
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    // If user is not authenticated, redirect to home page
    if (!user) {
      const url = new URL('/', request.url)
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
