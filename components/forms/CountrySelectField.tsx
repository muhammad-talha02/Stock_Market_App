import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import countryList from "react-select-country-list";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false,
}: Omit<SelectFieldProps, "options">) => {
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
          <CountryListPopover value={field?.value} onChange={field.onChange} />
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      <p className="text-xs text-gray-500">
        Helps us show market data and news relevant to you.
      </p>{" "}
    </div>
  );
};

export default CountrySelectField;

const CountryListPopover = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  // Get country options with flags
  const countriesObj = countryList();
  const countriesData = countriesObj.getData();

  // Helper function to get flag emoji
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="country-select-trigger"
        >
          {value ? (
            <span className="flex items-center gap-2">
              <span>{getFlagEmoji(value)}</span>
              <span>{countriesObj.getLabel(value)}</span>
            </span>
          ) : (
            "Select your country..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full border-gray-600 p-0">
        <Command className="bg-gray-800">
          <CommandInput placeholder="Search Country" className="" />
          <CommandList className="max-h-60 bg-gray-800 scrollbar-hide-default">
            <CommandEmpty>No results found.</CommandEmpty>
            {countriesData?.map((country) => (
              <CommandItem
                key={country.value}
                onSelect={() => {
                  onChange(country.value);
                  setOpen(false);
                }}
                className="country-select-item"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-yellow-500",
                    value === country.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="flex items-center gap-2">
                  <span>{getFlagEmoji(country.value)}</span>
                  <span>{country.label}</span>
                </span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
