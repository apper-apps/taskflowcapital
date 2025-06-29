import React from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-gray-900">ProofLander</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
              <Link 
                to="/dashboard" 
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Transform Your
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Productivity</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the ultimate task management solution that adapts to your workflow. 
              Boost productivity, meet deadlines, and achieve your goals with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/dashboard"
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                <ApperIcon name="Play" size={20} />
                <span className="font-medium">Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage tasks, collaborate effectively, and deliver exceptional results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ApperIcon name="Zap" size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Smart Automation</h3>
              <p className="text-gray-600">Automate repetitive tasks and focus on what matters most with intelligent workflow automation.</p>
            </div>

            <div className="group bg-gradient-to-br from-secondary-50 to-secondary-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-secondary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ApperIcon name="Users" size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600">Seamlessly collaborate with your team members in real-time with advanced sharing capabilities.</p>
            </div>

            <div className="group bg-gradient-to-br from-accent-50 to-accent-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ApperIcon name="BarChart3" size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">Gain insights into your productivity patterns with comprehensive analytics and reporting.</p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ApperIcon name="Shield" size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-600">Bank-level security with end-to-end encryption to keep your data safe and compliant.</p>
            </div>

            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-warning rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ApperIcon name="Smartphone" size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Mobile First</h3>
              <p className="text-gray-600">Access your tasks from anywhere with our responsive design and native mobile apps.</p>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-info rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ApperIcon name="Puzzle" size={24} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3">Integrations</h3>
              <p className="text-gray-600">Connect with 100+ popular tools and services to streamline your entire workflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of teams who have transformed their productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "ProofLander has completely revolutionized how our team manages projects. The automation features alone have saved us 20+ hours per week."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">SJ</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-500 text-sm">Product Manager, TechCorp</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "The analytics dashboard gives us incredible insights into our team's performance. We've increased productivity by 40% since switching."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">MC</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Michael Chen</p>
                  <p className="text-gray-500 text-sm">CEO, StartupXYZ</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Finally, a task management tool that doesn't get in the way. The user experience is phenomenal and our team adoption was instant."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">EW</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emily Wilson</p>
                  <p className="text-gray-500 text-sm">Operations Director, GlobalCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your team's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-6">Perfect for individuals and small teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$9</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-gray-700">Up to 5 team members</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-gray-700">Basic task management</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-gray-700">Mobile app access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Start Free Trial
              </button>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-8 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Professional</h3>
              <p className="text-primary-100 mb-6">Best for growing teams and businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-primary-200">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-white" />
                  <span>Up to 25 team members</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-white" />
                  <span>Advanced automation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-white" />
                  <span>Analytics & reporting</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-white" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-white" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <button className="w-full bg-white text-primary-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Start Free Trial
              </button>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">For large organizations with advanced needs</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-gray-700">Unlimited team members</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-gray-700">Enterprise security</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-gray-700">Custom onboarding</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ApperIcon name="Check" size={16} className="text-success" />
                  <span className="text-gray-700">SLA guarantee</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of teams who have already revolutionized their workflow with ProofLander.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/dashboard"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Your Free Trial
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Schedule Demo
            </button>
          </div>
          <p className="text-primary-200 text-sm mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <ApperIcon name="CheckSquare" size={20} className="text-white" />
                </div>
                <span className="font-display font-bold text-xl">ProofLander</span>
              </div>
              <p className="text-gray-400 mb-6">
                The ultimate task management solution for modern teams.
              </p>
              <div className="flex space-x-4">
                <ApperIcon name="Twitter" size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <ApperIcon name="Linkedin" size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <ApperIcon name="Github" size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProofLander. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage