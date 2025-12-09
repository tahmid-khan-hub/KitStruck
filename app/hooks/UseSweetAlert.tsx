"use client";
import Swal from "sweetalert2";

export default function UseSweetAlert() {
  // Success toast
  const successToast = (message: string) => {
    return Swal.fire({
      icon: "success",
      title: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  // Error toast
  const errorToast = (message: string = "Something went wrong!") => {
    return Swal.fire({
      icon: "error",
      title: message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2200,
      timerProgressBar: true,
    });
  };

  // Delete confirmation
  const confirmDelete = async (
    message: string = "Are you sure you want to delete this?"
  ) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    return result.isConfirmed; // returns true or false
  };

  const confirmProceed = async (
    message: string = "Do you want to mark this order as processing?"
  ) => {
    const result = await Swal.fire({
      title: "Proceed with Order?",
      text: message,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb", 
      cancelButtonColor: "#6b7280", 
      confirmButtonText: "Yes, proceed",
    });

    return result.isConfirmed; // true or false
  };

  return { successToast, errorToast, confirmDelete, confirmProceed };
}
