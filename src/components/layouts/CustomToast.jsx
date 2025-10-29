import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function CustomToast({ type = "success", message }) {
  return (
    <div className={`custom-toast ${type}`}>
      <div className="icon">
        {type === "success" ? (
          <CheckCircle size={22} />
        ) : (
          <XCircle size={22} />
        )}
      </div>
      <div className="text">
        <p>{message}</p>
      </div>
    </div>
  );
}
