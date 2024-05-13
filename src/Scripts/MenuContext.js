import { useEffect } from "react";

export const MenuContext = (closeMenu) => {
  const handleMenuContext = (e) => {
    let clicked = false;
    let cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      if (
        !(
          e.pageY < card.offsetTop ||
          e.pageY > card.offsetTop + card.offsetHeight ||
          e.pageX < card.offsetLeft ||
          e.pageX > card.offsetLeft + card.offsetWidth
        )
      ) {
        clicked = true;
        //console.log(clicked);
      }
    });
    if (clicked == false) {
      closeMenu();
      //   console.log("close");
    }
  };

  window.addEventListener("click", handleMenuContext);
};
