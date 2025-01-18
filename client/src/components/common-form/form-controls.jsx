import { Input } from "../ui/input";
import { Label } from"../ui/label";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";


function FormControls({formControls =[], formData, setFormData}){
    function renderComponentByType(getControlItem){
        let element = null;
        const currentControlItemValue = formData[getControlItem.name];

        switch(getControlItem.componentType){

            case "input":
                element = <Input
                id={getControlItem.name}
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                type={getControlItem.type}
                value={currentControlItemValue}
                onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
                />
                break;
            case 'select':
                element = <Select
                onValueChange={(value) => setFormData({...formData, [getControlItem.name]: value})}
                value={currentControlItemValue}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={getControlItem.label}/>
                    </SelectTrigger>
                    <SelectContent>
                        {getControlItem.options && getControlItem.options.length > 0 
                        ? getControlItem.options.map(option =>
                            (<SelectItem key={option.id} value={option.id}>
                                {option.label}
                            </SelectItem>)) 
                            : null}
                    </SelectContent>
                </Select>
                break;  

            case "textarea":
                element = <Textarea
                    id={getControlItem.name}
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    value={currentControlItemValue}
                onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
                />;
                break;

            default:
                element = <Input
                id={getControlItem.name}
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                type={getControlItem.type}
                value={currentControlItemValue}
                onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
                />;
                break;

        }
        return element;
    }

    return(
        <div className="flex flex-col gap-3">
            {
                formControls.map((controlItem) =>(
                    <div key={controlItem.name}>
                        <Label className="ml-1" htmlFor={controlItem.name}>{controlItem.label}</Label>
                        {renderComponentByType(controlItem)}
                    </div>
                ))
            }
        </div>
    );
}

export default FormControls;