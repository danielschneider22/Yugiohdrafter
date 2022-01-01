import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

interface ParentParams {
  id: string;
  label: string;
  options: AutocompleteOption[];
  setActiveOption: React.Dispatch<React.SetStateAction<AutocompleteOption | null>>
  activeOption: AutocompleteOption | null
}

export type AutocompleteOption = {
  label: string,
  id: string
}

export default function CardAutocomplete(params: ParentParams) {
  const { id, label, options, setActiveOption, activeOption } = { ...params };

  function onChange(event: React.SyntheticEvent, option: AutocompleteOption){
    setActiveOption(option)
  }

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={options}
      blurOnSelect={true}
      onChange={(onChange as any)}
      value={activeOption}
      sx={{
        display: "inline-flex",
        width: "30%",
        color: "white",
        "& .MuiButtonBase-root,.MuiSvgIcon-root": {
          color: "white",
        },
        "& .MuiOutlinedInput-input": {
          color: "white",
          backgroundColor: "rgba(0,0,0,0.75)",
        },
        "& .MuiInputLabel-root": {
          color: "lightgrey",
        },
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