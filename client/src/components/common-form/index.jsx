import { Button } from "../ui/button";
import FormControls from "./form-controls";
import { useContext } from "react";
import AuthContext from '@/context/auth-context';

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = true,
}) 
{
  const {loading} = useContext(AuthContext);

  return (
    <form onSubmit={handleSubmit}>
      <FormControls
       formControls={formControls} 
       formData={formData} 
       setFormData={setFormData} 
       />
      <Button disabled={isButtonDisabled} className="mt-5 w-full" type="submit">
        {loading ? <span class="relative flex size-3">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
      </span>:null}
        {buttonText || "Submit"}</Button>
    </form>
  );
}

export default CommonForm;