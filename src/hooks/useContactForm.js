// src/hooks/useContactForm.js
import { useState } from "react";
import { contactFormSchema } from "@/lib/validations/contactSchema";

const defaultValues = {
  firstName: "",
  lastName: "",
  organization: "",
  email: "",
  inquiryType: "",
  message: "",
  updates: false,
};

export const useContactForm = () => {
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({
    inquiryType: "Please choose an inquiry type",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // If the form has been submitted or field was touched, validate on change
    if (formSubmitted || touchedFields[name]) {
      validateField(name, type === "checkbox" ? checked : value);
    }
  };

  const validateField = (name, value) => {
    try {
      // Create a partial schema for just this field
      const fieldSchema = z.object({ [name]: contactFormSchema.shape[name] });
      fieldSchema.parse({ [name]: value });

      // Clear error if validation passes
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((e) => e.path[0] === name);
        setErrors((prev) => ({
          ...prev,
          [name]: fieldError?.message || "",
        }));
        return false;
      }
      return false;
    }
  };

  const validateForm = () => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate on blur
    validateField(name, formData[name]);
  };

  const handleFocus = (e) => {
    setFocusedField(e.target.name);
  };

  const resetForm = () => {
    setFormData(defaultValues);
    setErrors({
      inquiryType: "Please choose an inquiry type",
    });
    setTouchedFields({});
    setFormSubmitted(false);
  };

  const handleSubmit = async (onSuccess, onError) => {
    setIsSubmitting(true);
    setFormSubmitted(true);

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouchedFields(allTouched);

    const isValid = validateForm();

    if (isValid) {
      try {
        // Simulate API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (onSuccess) {
          onSuccess(formData);
        }
        resetForm();
      } catch (apiError) {
        console.error("Form submission error:", apiError);
        if (onError) {
          onError(apiError);
        }
      }
    } else if (onError) {
      // Focus on the first field with an error
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.focus();
        }
      }

      onError(errors);
    }

    setIsSubmitting(false);
    return isValid;
  };

  const getFieldProps = (name) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const getFieldError = (name) => {
    // Only show errors for touched fields or after form submission
    if ((touchedFields[name] || formSubmitted) && errors[name]) {
      return errors[name];
    }
    return null;
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    resetForm,
    setFormData,
    getFieldProps,
    getFieldError,
    focusedField,
  };
};
