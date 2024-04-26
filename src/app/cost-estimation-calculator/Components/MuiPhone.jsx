import 'react-international-phone/style.css';

import {
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import {
    defaultCountries,
    FlagImage,
    parseCountry,
    usePhoneInput,
} from 'react-international-phone';
import { alpha, styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
    marginBottom: "1em",
    borderRadius: "2em",
    width: "100%",
    marginBottom: "0px",
    "&.MuiFormControl-root .MuiFormHelperText-root": {
        marginLeft: "0px"
    },
    "& .MuiFilledInput-root": {
        backgroundColor: "white"
    },
    "&:hover .MuiFilledInput-root": {
        backgroundColor: "white"
    },
    '& .MuiInputLabel-root': {
        fontSize: 13,
    },
    "& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root": {
        transform: "translate(10px, 32px) scale(1) !important",
    },
    [theme.breakpoints.down("sm")]: {
        // height: "43px"
        marginBottom: "10px"
    },
}));
export const MuiPhone = ({ value, onChange, checkInputVal, errorMessage, ...restProps }) => {
    const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
        usePhoneInput({
            defaultCountry: 'us',
            value,
            countries: defaultCountries,
            onChange: (data) => {
                onChange(data.phone);
            },
        });

    return (
        <CustomTextField
            variant="outlined"
            placeholder="0000 0000000"
            value={inputValue}
            onChange={handlePhoneValueChange}
            type="tel"
            size="small"
            required
            inputRef={inputRef}
            error={checkInputVal.phoneError}
            helperText={errorMessage.phoneError}
            InputProps={{
                startAdornment: (
                    <InputAdornment
                        position="start"
                        style={{ marginRight: '2px', marginLeft: '-8px' }}
                    >
                        <Select
                            MenuProps={{
                                style: {
                                    height: '300px',
                                    width: '360px',
                                    top: '10px',
                                    left: '-34px',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                },
                            }}
                            sx={{
                                width: 'max-content',
                                // Remove default outline (display only on focus)
                                fieldset: {
                                    display: 'none',
                                },
                                '&.Mui-focused:has(div[aria-expanded="false"])': {
                                    fieldset: {
                                        display: 'block',
                                    },
                                },
                                // Update default spacing
                                '.MuiSelect-select': {
                                    padding: '8px',
                                    paddingRight: '24px !important',
                                },
                                svg: {
                                    right: 0,
                                },
                            }}
                            value={country.iso2}
                            onChange={(e) => setCountry(e.target.value)}
                            renderValue={(value) => (
                                <FlagImage iso2={value} style={{ display: 'flex' }} />
                            )}
                        >
                            {defaultCountries.map((c) => {
                                const country = parseCountry(c);
                                return (
                                    <MenuItem key={country.iso2} value={country.iso2}>
                                        <FlagImage
                                            iso2={country.iso2}
                                            style={{ marginRight: '8px' }}
                                        />
                                        <Typography marginRight="8px">{country.name}</Typography>
                                        <Typography color="gray">+{country.dialCode}</Typography>
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </InputAdornment>
                ),
            }}
            {...restProps}
        />
    );
};