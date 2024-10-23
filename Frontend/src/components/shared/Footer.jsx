import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0fa3b1] to-[#3a86ff] text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-xl font-bold mb-4 hover:underline transition duration-300">CareerCanvas</h2>
            <p className="text-sm mb-2">📍 Address: 123 Job Avenue, Career City, CA 12345</p>
            <p className="text-sm mb-2">📞 Phone: (123) 456-7890</p>
            <p className="text-sm mb-2">✉️ Email: support@CareerCanvas.com</p>
            <p className="text-sm">🕒 Office Hours: Mon - Fri, 9 AM - 5 PM</p>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-xl font-bold mb-4 hover:underline transition duration-300">Customer Service</h2>
            <ul>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Help Center</a></li>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Terms of Use</a></li>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Return Policy</a></li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h2 className="text-xl font-bold mb-4 hover:underline transition duration-300">Job Categories</h2>
            <ul>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Technology</a></li>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Healthcare</a></li>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Finance</a></li>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Education</a></li>
              <li><a href="#" className="text-sm hover:underline transition duration-300">Marketing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-xl font-bold mb-4 hover:underline transition duration-300">Resources</h2>
            <ul>
              <li><a href="https://techcrunch.com/" className="text-sm hover:underline transition duration-300">Blog</a></li>
              <li><a href="https://www.ambitionbox.com/salaries" className="text-sm hover:underline transition duration-300">Salary Insights</a></li>
              <li><a href="https://resume.io/" className="text-sm hover:underline transition duration-300">Resume Tips</a></li>
              <li><a href="https://www.sydney.edu.au/careers/students/applying-for-jobs/interview-tips.html" className="text-sm hover:underline transition duration-300">Interview Tips</a></li>
              <li><a href="www.careercompass.com" className="text-sm hover:underline transition duration-300">Career Development</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="https://linkedin.com" aria-label="LinkedIn" className="transition-transform transform hover:scale-125">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
          </a>
          <a href="https://instagram.com" className="hover:text-gray-400 transition-transform transform hover:scale-110" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.736 0 8.258.011 7.057.053c-1.205.046-2.03.187-2.747.394a5.426 5.426 0 00-1.97.874 5.426 5.426 0 00-1.029 1.113 5.426 5.426 0 00-.874 1.97c-.207.718-.348 1.542-.394 2.747C.011 8.258 0 8.736 0 12c0 3.264.011 3.742.053 4.943.046 1.205.187 2.03.394 2.747a5.426 5.426 0 00.874 1.97 5.426 5.426 0 001.113 1.029c.718.207 1.542.348 2.747.394C8.258 23.989 8.736 24 12 24c3.264 0 3.742-.011 4.943-.053 1.205-.046 2.03-.187 2.747-.394a5.426 5.426 0 001.97-.874 5.426 5.426 0 001.029-1.113 5.426 5.426 0 00.874-1.97c.207-.718.348-1.542.394-2.747C23.989 15.742 24 15.264 24 12c0-3.264-.011-3.742-.053-4.943-.046-1.205-.187-2.03-.394-2.747a5.426 5.426 0 00-.874-1.97 5.426 5.426 0 00-1.113-1.029c-.718-.207-1.542-.348-2.747-.394C15.742.011 15.264 0 12 0zm0 2c3.015 0 3.378.011 4.55.051 1.18.04 1.865.186 2.283.31a3.426 3.426 0 011.181.682c.5.5.644 1.077.682 2.283.04 1.171.051 1.535.051 4.55 0 3.015-.011 3.378-.051 4.55-.038 1.18-.186 1.865-.31 2.283a3.426 3.426 0 01-.682 1.181c-.5.5-1.077.644-2.283.682-1.171.038-1.535.051-4.55.051-3.015 0-3.378-.011-4.55-.051-1.18-.038-1.865-.186-2.283-.682a3.426 3.426 0 01-.682-1.181c-.124-.418-.271-1.103-.311-2.283-.038-1.171-.051-1.535-.051-4.55 0-3.015.011-3.378.051-4.55.04-1.18.186-1.865.31-2.283a3.426 3.426 0 01.682-1.181c.5-.5 1.077-.644 2.283-.682 1.171-.04 1.535-.051 4.55-.051zm0 6.064a5.936 5.936 0 00-5.935 5.935A5.936 5.936 0 0012 19.935a5.936 5.936 0 005.935-5.935A5.936 5.936 0 0012 8.064zm0 9.09a3.154 3.154 0 01-3.155-3.155A3.154 3.154 0 0112 10.998a3.154 3.154 0 013.155 3.155A3.154 3.154 0 0112 17.154zM17.749 6.256a1.75 1.75 0 11-3.501 0 1.75 1.75 0 013.501 0z" />
              </svg>
            </a>
            <a href="https://youtube.com" className="hover:text-gray-400 transition-transform transform hover:scale-110" aria-label="YouTube">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.004 3.004 0 00-2.113-2.113C19.87 4.0 12 4.0 12 4.0s-7.87 0-9.386.073A3.004 3.004 0 00.502 6.186 33.919 33.919 0 000 12c0 1.657.247 3.282.714 4.814a3.004 3.004 0 002.113 2.113C4.13 20.0 12 20.0 12 20.0s7.87 0 9.386-.073a3.004 3.004 0 002.113-2.113C23.753 15.282 24 13.657 24 12c0-1.657-.247-3.282-.502-4.814zM10 15.766V8.236l6.339 3.766L10 15.766z" />
              </svg>
            </a>
          <a href="https://facebook.com" aria-label="Facebook" className="transition-transform transform hover:scale-125">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook.png" alt="Facebook" className="w-8 h-8" />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="transition-transform transform hover:scale-125">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" className="w-8 h-8" />
          </a>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm">© 2024 CareerCanvas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
