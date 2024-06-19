import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";

function Contact({
  firstName,
  lastName,
  phone,
  address,
  onEdit,
  deleteContact,
  contactId
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoading(false);
    }, 3000); // I have 3 secs for my contacts to load.

    return () => {
      clearTimeout(loader);
    };
  }, []);

  return (
    <div className="w-full" contactId={contactId}>
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
            <h2 className="text-[#234c99] font-semibold">
              Name:{" "}
              <span className="text-black font-semibold">
                {firstName[0].toUpperCase() + firstName.slice(1)}
              </span>
            </h2>
          </div>
          <div className=" w-full flex flex-col items-start">
            <h2 className="text-[#234c99] font-semibold">
              Last Name:{" "}
              <span className="text-black font-semibold">
                {lastName[0].toUpperCase() + lastName.slice(1)}
              </span>
            </h2>
          </div>
          <div className="w-full flex flex-col items-start">
            <h2 className="text-[#234c99] font-semibold">
              Phone: <span className="text-black">{phone}</span>
            </h2>
          </div>
          <div className="w-full flex flex-col items-start">
            <h2 className="text-[#234c99] font-semibold">
              Address: <span className="text-black">{address}</span>
            </h2>
          </div>
          <div className="w-full flex justify-between items-center">
            <button /* button for deleting contacts */
              onClick={() => deleteContact(contactId)}
              className="mt-2 bg-[#b91c1c] hover:bg-[#7b1313] transition-all text-white py-0.5 px-3 rounded-xl"
            >
              Delete
            </button>
            <button /* button for editing contacts */
              onClick={onEdit}
              className="mt-2 bg-[#177823] hover:bg-[#104f17] transition-all text-white py-0.5 px-5 rounded-xl"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
