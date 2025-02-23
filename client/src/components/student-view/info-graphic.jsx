import { Book, BookCopy, Zap, PiggyBank, LibraryBig, Tally4 } from "lucide-react"
import { Link } from "react-router-dom"
export default function OnlineLearningInfographic() {
  return (
    <div className="bg-[#F8F8F8] p-4 md:p-8 mx-auto font-sans">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Dripanomics Bundles</h1>
      <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-4 md:gap-6">
        {/* Single Module */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm flex-1 min-w-[280px] flex flex-col justify-between hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="flex items-center">
                <Book className="w-6 h-6 md:w-8 md:h-8 mr-2 flex-shrink-0" />
                <span className="text-base md:text-lg font-semibold">Single Module</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-[#333333]">R250</span>
            </div>
            <p className="text-xs md:text-sm text-gray-600">Start with one module and expand your knowledge.</p>
          </div>
        </div>

        {/* Two Modules */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm flex-1 min-w-[280px] flex flex-col justify-between hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-2">
                  <BookCopy className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-base md:text-lg font-semibold">Two Modules</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-[#333333]">R450</span>
            </div>
            <p className="text-xs md:text-sm text-gray-600">Bundle two modules and start saving!</p>
          </div>
          <div className="flex items-center justify-end mt-2 text-[#F5A623]">
            <PiggyBank className="w-4 h-4 md:w-5 md:h-5 mr-1" />
            <span className="text-xs md:text-sm font-semibold">Save R50</span>
          </div>
        </div>

        {/* Three Modules */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm flex-1 min-w-[280px] flex flex-col justify-between hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="flex items-center">
                <div className="flex space-x-1 mr-2">
                  <LibraryBig className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-base md:text-lg font-semibold">Three Modules</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-[#333333]">R565</span>
            </div>
            <p className="text-xs md:text-sm text-gray-600">Triple your learning, triple your savings!</p>
          </div>
          <div className="flex items-center justify-end mt-2 text-[#F5A623]">
            <PiggyBank className="w-4 h-4 md:w-5 md:h-5 mr-1" />
            <span className="text-xs md:text-sm font-semibold">Save R185</span>
          </div>
        </div>

        {/* Four Modules */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border-2 border-[#50E3C2] flex-1 min-w-[280px] flex flex-col justify-between hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="flex items-center">
                <div className="flex -space-x-4 mr-2">
                  <Tally4 className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-base md:text-lg font-semibold">Four Modules</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-[#333333]">R700</span>
            </div>
            <p className="text-xs md:text-sm text-gray-600">Our best value! Maximize your learning potential.</p>
          </div>
          <div className="flex items-center justify-end mt-2 text-[#F5A623]">
            <PiggyBank className="w-4 h-4 md:w-5 md:h-5 mr-1" />
            <span className="text-xs md:text-sm font-semibold">Save R300</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <Link to="/courses">
        <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center mx-auto">
          <Zap className="w-5 h-5 mr-2" />
          Start Learning Now
        </button>
        </Link>
      </div>
    </div>
  )
}

