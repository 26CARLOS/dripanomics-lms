import { Link } from "react-router-dom"
import { GraduationCap, Facebook, Twitter, Instagram, Mail } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16 md:mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Dripanomics</span>
            </div>
            <p className="text-gray-400">
              Transform your learning journey with expert-led online courses
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-gray-400 hover:text-white">Courses</Link></li>
              <li><Link to="/my-courses" className="text-gray-400 hover:text-white">My Learning</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-white">Cart</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="help-center" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link to="terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/dripanomics.tutorials" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="mailto:dripanomicstutorials@gmail.com" className="text-gray-400 hover:text-white">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dripanomics Tutorials. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer