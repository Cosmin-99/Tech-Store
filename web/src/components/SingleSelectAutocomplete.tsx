import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Autocomplete, { AutocompleteProps } from "@material-ui/lab/Autocomplete";

export function SingleSelectAutocomplete<
    T,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>(props: {
    // autoFocus?: boolean;
    initalValue?: T;
    options: T[];
    value?: T;
    AutoCompleteProps?: AutocompleteProps<T, false, DisableClearable, FreeSolo>,
    InputProps?: TextFieldProps,
    required?: boolean;
    renderOption: (option: T) => string;
    onChange: (value: T | null) => void;
}) {
    const {
        required,
        onChange,
        value,
        initalValue,
        renderOption,
        AutoCompleteProps,
        InputProps
    } = props;

    // this is here just to have a controlled state over the open tab
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState(props.options);
    const [fieldValue, setFieldValue] = React.useState<T | null>(
        initalValue ?? null,
    );

    React.useEffect(() => {
        setFieldValue(null);
        setOptions(props.options);
    }, [props.options]);

    React.useEffect(() => {
        setFieldValue(value ?? null);
    }, [value]);

    return (
        <Autocomplete<T>
            // dunno why this line keeps erroring
            {...AutoCompleteProps as any}

            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(change, val) => {
                setFieldValue(val);
                onChange(val);
            }}
            value={fieldValue}
            getOptionLabel={(option) => renderOption(option)}
            renderOption={(option) => (
                <div>{renderOption(option)}</div>
            )}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...InputProps}
                    fullWidth
                    
                    required={required ?? false}
                    autoComplete="off"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>{params.InputProps.endAdornment}</>
                        ),
                    }}
                />
            )}
        />
    );
}
/*  */
