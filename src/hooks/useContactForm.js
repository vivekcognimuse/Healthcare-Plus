// src/hooks/useContactForm.js
import { useState } from "react";
import { z } from "zod";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  inquiryType: z.enum(["general", "press", "careers", "partnerships"], {
    required_error: "Please select an inquiry type",
  }),
  message: z.string().min(1, "message is required"),
  updates: z.boolean(),
});

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    inquiryType: "general",
    message: "",
    updates: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    try {
      contactFormSchema
        .pick({ [name]: true })
        .parse({ [name]: formData[name] });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
    }
  };

  const handleSubmit = async (onSuccess, onError) => {
    setIsSubmitting(true);
    try {
      const validatedData = contactFormSchema.parse(formData);
      setErrors({});
      await onSuccess(validatedData);
    } catch (validationErrors) {
      const formErrors = validationErrors.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(formErrors);
      onError(formErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
