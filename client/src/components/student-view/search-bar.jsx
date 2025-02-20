import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchCoursesService } from "@/services";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        try {
          const response = await searchCoursesService(query);
          if (response.success) {
            setResults(response.data);
            setIsOpen(true);
          }
        } catch (error) {
          console.error('Search error:', error);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-700" />
          <Input
            placeholder="Search for anything..."
            className="pl-8 pr-8 lg:w-[600px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <Button
              variant="ghost"
              className="absolute right-0 top-0 h-full px-2"
              onClick={() => {
                setQuery("");
                setResults([]);
                setIsOpen(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute mt-1 w-full max-h-[400px] overflow-auto z-50 shadow-lg">
          <ul className="py-2">
            {results.map((course) => (
              <li
                key={course._id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate(`/course/details/${course._id}`);
                  setIsOpen(false);
                  setQuery("");
                }}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.category}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

export default SearchBar;