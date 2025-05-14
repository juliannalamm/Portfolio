import React from "react";

const MobileMessageCard = () => {
  return (
    <div className="bg-lightblue p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold text-burgundy mb-2">Hey there! 👋</h3>
      <p className="text-burgundy">
        I see you're on mobile. This project is best viewed on desktop for the full experience,
        but in the meantime, check out the highlights below!
      </p>
    </div>
  );
};

export default MobileMessageCard;
