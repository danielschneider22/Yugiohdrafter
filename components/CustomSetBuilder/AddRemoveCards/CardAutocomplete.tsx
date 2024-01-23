import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

interface ParentParams {
  id: string;
  label: string;
  options: AutocompleteOption[];
  setActiveOption: React.Dispatch<React.SetStateAction<AutocompleteOption | null>>
  activeOption: AutocompleteOption | null
  setCurrInputVal?: React.Dispatch<React.SetStateAction<string>>
  margin?: string
}

export type AutocompleteOption = {
  label: string,
  id: string
}

export default function CardAutocomplete(params: ParentParams) {
  const { id, label, options, setActiveOption, activeOption, margin, setCurrInputVal } = { ...params };

  function onChange(event: React.SyntheticEvent, option: AutocompleteOption){
    setActiveOption(option)
  }

  function onInputChange(event: React.SyntheticEvent<Element, Event>, value: string){
    if(setCurrInputVal)
      setCurrInputVal(value)
  }

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={options}
      blurOnSelect={true}
      onChange={(onChange as any)}
      onInputChange={onInputChange}
      value={activeOption}
      style={{marginTop: 10}}
      sx={{
        display: "inline-flex",
        width: "30%",
        color: "white",
        margin,
        "& .MuiButtonBase-root,.MuiSvgIcon-root": {
          color: "white",
          border: "none",
        },
        "& .MuiOutlinedInput-input": {
          color: "white",
          backgroundColor: "rgba(0,0,0,0.75)",
        },
        "& .MuiInputLabel-root": {
          color: "lightgrey",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "none"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "none"
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={label}
        />
      )}
    />
  );
}