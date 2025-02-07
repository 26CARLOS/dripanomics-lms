import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, GraduationCap } from "lucide-react"
import Flip from "../animated/flip"
import studentsLearning from "@/assets/students-learning.jpg"
import { useNavigate,Link } from "react-router-dom"

export function Hero() {

  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-foreground ">
      <div className="absolute inset-0">
        <img
          src={studentsLearning}
          alt="Students learning"
          className="h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-gray-500 to-primary-foreground mix-blend-multiply" />
      </div>
      <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <Flip/>
        <div className="mt-10 flex items-center md:justify-center gap-x-6">
          <Button size="lg" 
          className="bg-white text-primary hover:bg-primary-foreground"
          onClick={() => navigate("/courses")}
          >
            Explore Courses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Link to="https://www.dripanomicstutorials.com">
            <Button variant="outline" size="lg" 
            className="bg-transparent text-white border-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </Link>
          
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-8 md:flex md:justify-center md:gap-x-8">
          {[
            { icon: BookOpen, label: "Courses", value: "1,000+" },
            { icon: Users, label: "Students", value: "50,000+" },
            { icon: GraduationCap, label: "Instructors", value: "200+" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-primary-foreground/80">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

