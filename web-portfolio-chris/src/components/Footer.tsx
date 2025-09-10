export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 border-t border-gray-700 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Contact Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6">Get In Touch</h3>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects, and creative ideas.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* Email Card */}
          <a 
            href="mailto:vito186cm@gmail.com" 
            className="block"
          >
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 ease-out transform hover:shadow-lg hover:shadow-purple-500/20 h-full flex flex-col">
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Email</h4>
                <p className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium">
                  vito186cm@gmail.com
                </p>
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a 
            href="https://www.linkedin.com/in/chrisdavis2025/" 
            target="_blank" 
            rel="noreferrer" 
            className="block"
          >
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 ease-out transform hover:shadow-lg hover:shadow-purple-500/20 h-full flex flex-col">
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.856-3.047-1.856 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">LinkedIn</h4>
                <p className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium">
                  Chris Zhang
                </p>
              </div>
            </div>
          </a>

          {/* GitHub Card */}
          <a 
            href="https://github.com/vitoHermes/" 
            target="_blank" 
            rel="noreferrer" 
            className="block"
          >
           
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-700">
          <div className="text-sm text-gray-300">
            © {new Date().getFullYear()} Chris Zhang. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}


