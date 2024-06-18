import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";

function Contact({ firstName, lastName, phone, address }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoading(false);
    }, 8000); // I have 8 secs for my contacts to load.

    return () => {
      clearTimeout(loader);
    };
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <Stack spacing={2} columnGap={3} bgcolor>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      ) : (
        <div className="w-full h-full bg-white rounded-xl p-4 shadow-custom-shadow flex flex-col justify-center items-center">
          <div className="w-full flex flex-col items-start">
            <h2 className="text-[#1e3a8a] font-semibold">
              Name:{" "}
              <span className="text-black font-semibold">
                {firstName[0].toUpperCase() + firstName.slice(1)}
              </span>
            </h2>
          </div>
          <div className=" w-full flex flex-col items-start">
            <h2 className="text-[#1e3a8a] font-semibold">
              Surname:{" "}
              <span className="text-black font-semibold">
                {lastName[0].toUpperCase() + lastName.slice(1)}
              </span>
            </h2>
          </div>
          <div className="w-full flex flex-col items-start">
            <h2 className="text-[#1e3a8a] font-semibold">
              Phone: <span className="text-black">{phone}</span>
            </h2>
          </div>
          <div className="w-full flex flex-col items-start">
            <h2 className="text-[#1e3a8a] font-semibold">
              Address: <span className="text-black">{address}</span>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
