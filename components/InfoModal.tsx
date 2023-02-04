import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Discover from "./sidebar-child/Discover";
import SuggestedAccounts from "./sidebar-child/SuggestedAccounts";
import Footer from "./sidebar-child/Footer";

// icons
import { FaWindowClose } from "react-icons/fa";

const InfoModal = ({ show, onClose }: any) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <>
      <div className="absolute bg-white top-0 left-0 w-full h-full z-50">
        <div className="flex justify-end mt-2 mr-3">
          <button className="text-2xl text-[#F51997]" onClick={() => onClose()}>
            {<FaWindowClose />}
          </button>
        </div>
        <div className="w-250 flex flex-col justify-start mb-10 border-gray-100 xl:border-0 p-3">
          <Discover mobile={true} onClose={() => onClose()} />
          <SuggestedAccounts mobile={true} onClose={() => onClose()} />
          <Footer mobile={true} />
        </div>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("info-modal")
    );
  } else {
    return null;
  }
};

export default InfoModal;
