window.onload = () => {
  window.FAQPage = (function () {
    //faq page variables 
    //Youtube tutorial https://www.youtube.com/watch?v=p8sN0VRWz74
    var acc = document.getElementsByClassName("accordion");
    var f;
    var len = acc.length;

    //faq page show/hide function
    for(f = 0; f < len; f++) {
      acc[f].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  })();
};
