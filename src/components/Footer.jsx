export default function Footer() {
  return (
    // =================== Main Footer Container ===================
    <footer className="bg-[#232F3E] text-gray-300 mt-10">
      
      {/* =================== “Back to Top” Section ===================
          - Amazon-style slim bar at the top of the footer.
          - Encourages users to scroll back to the top of the page.
          - Slight hover color change for better UX feedback.
      */}
      <div className="bg-[#37475A] py-3 text-center text-sm font-medium hover:bg-[#485769] transition cursor-pointer">
        Back to top
      </div>

      {/* =================== Main Footer Content ===================
          - Divided into 4 responsive columns using Tailwind grid.
          - Each column contains a heading and related links.
          - Styled in Amazon’s dark footer color scheme.
      */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 px-6">
        
        {/* ---------- Column 1: Company Info ---------- */}
        <div>
          <h3 className="text-white font-semibold mb-3">Get to Know Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:underline hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:underline hover:text-white">Press Releases</a></li>
            <li><a href="#" className="hover:underline hover:text-white">Shoppy Globe Science</a></li>
          </ul>
        </div>

        {/* ---------- Column 2: Social Links ---------- */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect with Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.linkedin.com/in/sravan-kumar-gaddamedhi-89976019a/"
                className="hover:underline hover:text-white"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sravanKumar1211"
                className="hover:underline hover:text-white"
              >
                Git-Hub
              </a>
            </li>
            <li><a href="#" className="hover:underline hover:text-white">Instagram</a></li>
          </ul>
        </div>

        {/* ---------- Column 3: Business Opportunities ---------- */}
        <div>
          <h3 className="text-white font-semibold mb-3">Make Money with Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline hover:text-white">Sell on Shoppy Globe</a></li>
            <li><a href="#" className="hover:underline hover:text-white">Affiliate Program</a></li>
            <li><a href="#" className="hover:underline hover:text-white">Advertise Your Products</a></li>
            <li><a href="#" className="hover:underline hover:text-white">Fulfilment Services</a></li>
          </ul>
        </div>

        {/* ---------- Column 4: Customer Support ---------- */}
        <div>
          <h3 className="text-white font-semibold mb-3">Let Us Help You</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline hover:text-white">Your Account</a></li>
            <li><a href="#" className="hover:underline hover:text-white">Returns Centre</a></li>
            <li><a href="#" className="hover:underline hover:text-white">Help</a></li>
            <li><a href="#" className="hover:underline hover:text-white">Customer Support</a></li>
          </ul>
        </div>
      </div>

      {/* =================== Divider Line ===================
          - Thin border separating main content and bottom bar.
      */}
      <div className="border-t border-gray-700"></div>

      {/* =================== Bottom Footer Bar ===================
          - Darker background, centered text.
          - Displays copyright.
          - Contains quick navigation and branding.
      */}
      <div className="bg-[#131A22] text-center py-4 text-sm">
        <p className="text-gray-400">
          &copy; 2025 <span className="text-white font-medium">Shoppy Globe</span>. All rights reserved.
        </p>

        {/* Developer & Legal Links */}
        <div className="mt-2 space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">G SravanKumar</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}
