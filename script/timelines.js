var items = document.querySelectorAll(".timelines li");
        function isElementInViewport(el) {
          var rect = el.getBoundingClientRect();
          console.log(rect);
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        }
      
        function callback() {
          for (var i = 0; i < items.length; i++) {
            if (isElementInViewport(items[i])) {
              items[i].classList.add("in-view");
            }
          }
        }
        window.addEventListener("scroll", callback);