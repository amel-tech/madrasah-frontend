import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-brand-primary">Madrasah</span>
            <span>Platform</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-brand-primary transition-colors">Features</Link>
            <Link href="#about" className="hover:text-brand-primary transition-colors">About</Link>
            <Link href="#contact" className="hover:text-brand-primary transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
             <Link
              href="/login"
              className="text-sm font-medium hover:underline"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
             <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-6 bg-slate-50 dark:bg-slate-900">
              <span className="flex h-2 w-2 rounded-full bg-brand-primary mr-2"></span>
              <span>v1.0 is now live</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Transforming Education for the Modern Era
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 text-gray-600 dark:text-gray-300">
              A comprehensive platform designed to streamline management, enhance learning, and connect the educational community seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/signup"
                className="rounded-full bg-brand-primary text-white h-12 px-8 flex items-center justify-center text-base font-medium hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20"
              >
                Start Free Trial
              </Link>
              <Link
                href="#features"
                className="rounded-full border border-gray-200 dark:border-gray-700 bg-transparent h-12 px-8 flex items-center justify-center text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Abstract Background Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] opacity-10 dark:opacity-5 pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-purple-500 rounded-full blur-[100px]" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to run your institution</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Powerful tools tailored for administrators, teachers, and students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background rounded-2xl p-8 border hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.216 50.552 50.552 0 00-2.658.814m-15.482 0A50.55 50.55 0 0112 13.489a50.55 50.55 0 0112-4.017M6.75 18a3 3 0 00-3-3h-.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Academic Management</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Effortlessly manage curriculum, schedules, and grading systems with our intuitive academic tools.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background rounded-2xl p-8 border hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Student & Staff Portal</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Dedicated portals for students and staff to access resources, check performance, and communicate.
                </p>
              </div>

               {/* Feature 3 */}
              <div className="bg-background rounded-2xl p-8 border hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m1 14.5a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Insightful Reporting</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Data-driven insights to track progress, attendance, and financial health of your madrasah.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="rounded-3xl bg-foreground text-background p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to modernize your institution?</h2>
              <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">
                Join hundreds of madrasahs already using our platform to improve their education delivery.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-brand-primary text-white h-12 px-8 text-base font-medium hover:bg-brand-primary/90 transition-colors"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
             <span className="font-bold text-xl block mb-4">Madrasah</span>
             <p className="text-sm text-gray-500">
               Empowering the next generation of learners with cutting-edge technology.
             </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-foreground">Features</Link></li>
              <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="#" className="hover:text-foreground">Updates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
               <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
               <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
               <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
               <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
               <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-8 mt-12 pt-8 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Madrasah Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
