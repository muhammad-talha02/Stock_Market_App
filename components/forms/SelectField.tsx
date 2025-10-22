import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const SelectField = ({
  name,
  label,
  placeholder,
  options,
  control,
  error,
  required = false,
}: SelectFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-white">
              {options?.map((x) => (
                <SelectItem key={x.value} value={x.value} className="focus:bg-gray-600">
                  {x.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
            {error && <p className="text-sm text-red-500">{error.message}</p> }

    </div>
  );
};

export default SelectField;
