import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[hsl(var(--color-background))]">
      {/* Centered Card */}
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg border border-[hsl(var(--color-border))]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-lg flex items-center justify-center border-2 border-red-200/50">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-[hsl(var(--color-primary-dark-black))] text-2xl font-bold mb-3 text-center">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-[hsl(var(--color-primary-text))] text-lg mb-6 text-center leading-relaxed">
          You need proper permissions
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Link
            href="/auth/login-type"
            className="block w-full btn-primary py-3 px-6 text-center font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            🔄 Choose Role
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-[hsl(var(--color-primary-light-black))] hover:bg-[hsl(var(--color-primary-dark-black))] text-[hsl(var(--color-secondary-white))] py-3 px-6 text-center font-semibold border border-[hsl(var(--color-border))] rounded-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            🏠 Home
          </Link>
        </div>

        {/* Yellow accent line */}
        <div className="w-full h-1 bg-[hsl(var(--color-secondary-yellow))]/80 rounded-full mx-auto shadow-sm mb-4" />

        {/* Hint */}
        <p className="text-xs text-[hsl(var(--color-primary-light-black))] text-center opacity-80">
          💡 Select matching role credentials
        </p>
      </div>
    </div>
  );
}
