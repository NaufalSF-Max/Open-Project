/* ================= Section FAQ ================= */
document.querySelectorAll("details").forEach((detail) => {
    let content = detail.querySelector(".faq-answer");
  
    detail.addEventListener("toggle", function () {
        if (detail.open) {
            content.style.height = content.scrollHeight + "px";
            content.style.opacity = "1";
            content.style.transform = "translateY(0)";
  
            content.addEventListener("transitionend", function resetHeight() {
                content.style.height = "auto";
                content.removeEventListener("transitionend", resetHeight);
            });
        } else {
            content.style.height = content.scrollHeight + "px";
            requestAnimationFrame(() => {
                content.style.height = "0px";
                content.style.opacity = "0";
                content.style.transform = "translateY(-5px)";
            });
        }
    });
  
    content.addEventListener("transitionend", function () {
        if (!detail.open) {
            content.style.height = "";
        }
    });
  });
  