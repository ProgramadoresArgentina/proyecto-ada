import { FieldProps } from "formik";
import React from "react";
import Select, { StylesConfig } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options:any;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false
}: CustomSelectProps) => {
  const onChange = (option: any) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? field && field.value ? options.filter(option => field.value.indexOf(option.value) >= 0) : []
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  const colourStyles: StylesConfig<any, true> = {
    control: (styles) => ({ ...styles, backgroundColor: '#2D3138', padding: '0.5rem 0.5rem', color: "white", boxShadow: 'none', outline: 'none', border: '1px solid white !important' }),
    menu: (styles) => ({ ...styles, backgroundColor: '#2D3138' }), 
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isFocused  ? '#555'
          : undefined,
        color: 'white',
        padding: '0.5rem 1rem',
        cursor: isFocused ? 'pointer' : isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : data.color
            : undefined,
        },
      };
    },
    singleValue: (styles) => {
        return {
          ...styles,
          color: 'white'
        };
    },
    input: (styles) => {
        return {
          ...styles,
          color: 'white'
        };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        marginRight: '.3125rem',
        borderRadius: '5px',
        backgroundImage: "linear-gradient(92.88deg,#455eb5 9.16%,#5643cc 43.89%,#673fd7 64.72%)",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: 'white',
    }),
    clearIndicator: (styles) => ({
        ...styles,
        color: 'white',
        ':hover': {
          color: '#6840D8',
        },
        borderRadius: '5px',
        cursor: 'pointer'
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: 'white',
      ':hover': {
        backgroundColor: 'white',
        color: '#0D1117',
      },
    }),

  };

  return (
    <Select
        className={className}
        styles={colourStyles}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
    />
  );
};

export default CustomSelect;
