import { Button } from "../ui/button";
import FormControls from "./form-controls";
import { useContext } from "react";
import {AuthContext} from '@/context/auth-context';

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = true,
}) 
{
  const {startLoad} = useContext(AuthContext);
  console.log(startLoad, "loading state")
  return (
    <form onSubmit={handleSubmit}>
      <FormControls
       formControls={formControls} 
       formData={formData} 
       setFormData={setFormData} 
       />
      <Button disabled={isButtonDisabled} className="mt-5 w-full" type="submit">
        {startLoad ? <span className="relative flex size-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-gray-500"></span>
      </span> : buttonText || "Submit"
      }
        </Button>
    </form>
  );
}

export default CommonForm;