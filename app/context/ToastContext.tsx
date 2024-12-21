"use client";
import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {            
            padding:"16px",
            width:"500px"
          },
        }}
        reverseOrder={false}
        gutter={12}
      />
    </div>
  );
};

export default ToasterContext;
