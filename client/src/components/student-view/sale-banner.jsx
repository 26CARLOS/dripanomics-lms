import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import saleBanner from "@/assets/sale-background.jpg"
function SaleBanner() {
  const [isVisible, setIsVisible] = useState(true)
  if (!isVisible) return null

  return (
    <div className="relative overflow-hidden mt-2">
      <img
        src={saleBanner}
        alt="Decorative background for sale banner"
        width={1600}
        height={400}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative bg-gradient-to-r from-primary/90 to-primary/90 text-primary-foreground p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex-1 text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold">New Year Sale! Bundle your courses and get a discount</h2>
            <p className="mt-1 text-sm sm:text-base">
              Unlock your potential with our biggest discount ever. Limited time offer!
            </p>
          </div>
          
          <div className="flex-1 text-center sm:text-right mt-4 sm:mt-0">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-primary-foreground hover:text-primary-foreground"
            >
              Claim Offer Now
            </Button>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-primary-foreground hover:text-white"
          aria-label="Close banner"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default SaleBanner
