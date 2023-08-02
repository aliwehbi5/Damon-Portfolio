let navMenu = document.querySelector("body > i");
let nav = document.querySelector("aside");

navMenu.addEventListener("click", () => {
  nav.classList.toggle("active-nav");
});

const skills = ["Developer", "Designer", "Freelancer", "Gym Rat", "Bookworm"];
const span = document.querySelector(".cont p span:first-child");

let index = 0;
let skillIndex = 0;
let isDeleting = false;

function type() {
  if (!isDeleting && index <= skills[skillIndex].length) {
    span.textContent = skills[skillIndex].substring(0, index);
    index++;
    setTimeout(type, 200);
  } else if (isDeleting && index >= 0) {
    span.textContent = skills[skillIndex].substring(0, index);
    index--;
    setTimeout(type, 150);
  } else {
    isDeleting = !isDeleting;
    if (isDeleting) {
      setTimeout(type, 1000);
    } else {
      index = 0;
      skillIndex++;
      if (skillIndex >= skills.length) {
        skillIndex = 0;
      }
      setTimeout(type, 1000);
    }
  }
}

type();

let spans = document.querySelectorAll(".skills .skill div span");
let skill = document.querySelector(".skills");

window.addEventListener("scroll", () => {
  if (scrollY >= skill.offsetTop) {
    spans.forEach((span) => {
      setTimeout(() => {
        span.style.width = span.dataset.progress;
      }, 500);
    });
  }
});

let arrow = document.querySelector(".arrow a");

window.addEventListener("scroll", () => {
  if (scrollY >= 100) {
    arrow.style.display = "block";
  } else {
    arrow.style.display = "none";
  }
});

arrow.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

let sections = document.querySelectorAll("section");
let animation = document.querySelectorAll(
  '[data-animation="up"],[data-animation="left"],[data-animation="right"]'
);
let links = document.querySelectorAll("aside .main a");

links.forEach((link) => {
  link.onclick = () => {
    let id = link.textContent.toLowerCase();
    sections.forEach((section) => {
      if (section.id == id) {
        let eles = section.querySelectorAll(
          '[data-animation="up"],[data-animation="left"],[data-animation="right"]'
        );
        eles.forEach((ele) => {
          ele.style.animationName = ele.dataset.animation;
        });
      }
    });
  };
});

window.addEventListener("scroll", () => {
  animation.forEach((ele) => {
    if (scrollY >= ele.offsetTop - 250) {
      ele.style.animationName = ele.dataset.animation;
    }
  });
});

window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop) {
      links.forEach((link) => {
        link.classList.remove("active-section");
        if (link.textContent.toLowerCase() == section.id) {
          link.classList.add("active-section");
        }
      });
    }
  });
});

let section = document.querySelector(".facts");
let goals = document.querySelectorAll(".facts .rows > div h1");
let scroll = false;

window.addEventListener("scroll", () => {
  if (scrollY >= section.offsetTop - 250) {
    if (!scroll) {
      scroll = true;
      goals.forEach((goal) => {
        increase(goal);
      });
    }
  }
});

function increase(ele) {
  let goal = ele.dataset.goal;
  let counter = setInterval(() => {
    ele.textContent++;
    if (ele.textContent == goal) {
      clearInterval(counter);
    }
  }, 2000 / goal);
}

let titles = document.querySelectorAll("#portfolio .titles span");
let imgs = document.querySelectorAll("#portfolio .imgs > div");

titles.forEach((title) => {
  title.onclick = () => {
    titles.forEach((title) => {
      title.classList.remove("active-title");
    });
    title.classList.add("active-title");
    imgs.forEach((img) => {
      let id = img.dataset.id;
      if (!id.includes(title.textContent.toLowerCase())) {
        img.style.display = "none";
      } else {
        img.style.display = "block";
      }
    });
  };
});

let pluses = document.querySelectorAll("span.plus");
let shownImg = document.querySelector(".targeted");
let shown = document.querySelector(".shown-img");
let close = document.querySelector("#x");
let left = document.querySelector("#left");
let right = document.querySelector("#right");
let shownImgs = [];
let imgSrc;

close.onclick = () => {
  shown.style.display = "none";
  document.documentElement.classList.remove("hidden-html");
};

pluses.forEach((plus) => {
  shownImgs.push(plus.parentNode.previousElementSibling);
  plus.onclick = () => {
    imgSrc = plus.parentNode.previousElementSibling;
    shownImg.src = imgSrc.src;
    document.documentElement.classList.add("hidden-html");
    shown.style.display = "block";
    setInterval(() => {
      shown.style.top = `${scrollY}px`;
    }, 1);
    check();
  };
});

left.onclick = () => {
  check();
  if (left.classList.contains("disabled")) {
    return;
  } else {
    goBackward();
  }
};

right.onclick = () => {
  check();
  if (right.classList.contains("disabled")) {
    return;
  } else {
    goForward();
  }
};

function goForward() {
  let currentIndex = 0;
  shownImgs.forEach((img, index) => {
    if (shownImg.src.includes(img.src)) {
      currentIndex = index;
      return;
    }
  });
  shownImg.src = shownImgs[currentIndex + 1].src;
  check();
}

function goBackward() {
  let currentIndex = 0;
  shownImgs.forEach((img, index) => {
    if (shownImg.src.includes(img.src)) {
      currentIndex = index;
      return;
    }
  });
  shownImg.src = shownImgs[currentIndex - 1].src;
  check();
}

function check() {
  if (shownImg.src == shownImgs[shownImgs.length - 1].src) {
    right.classList.add("disabled");
  } else {
    right.classList.remove("disabled");
  }
  if (shownImg.src == shownImgs[0].src) {
    left.classList.add("disabled");
  } else {
    left.classList.remove("disabled");
  }
}

const testimonials = document.querySelector(".testimonials");
const carousel = document.querySelector(".carousel");
const firstPostWidth = carousel.querySelector(".post").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstPostWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!testimonials.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstPostWidth), 500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
testimonials.addEventListener("mouseenter", () => clearTimeout(timeoutId));
testimonials.addEventListener("mouseleave", autoPlay);
