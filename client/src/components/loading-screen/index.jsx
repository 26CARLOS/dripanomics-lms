import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

 function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      <Card className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-800 shadow-xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex justify-center mt-8">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-t-gray-800 dark:border-t-white rounded-full animate-spin"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoadingScreen
