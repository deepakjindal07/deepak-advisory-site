/************************************
 * 1. Testimonial Slider
 ************************************/
let slideIndex = 1;
let autoSlideInterval;

function showSlides(n) {
  let slides = document.getElementsByClassName("testimonial-slide");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  
  for (let slide of slides) slide.classList.remove("active");
  for (let dot of dots) dot.classList.remove("active");
  
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}

function currentSlide(n) {
  clearInterval(autoSlideInterval);
  slideIndex = n;
  showSlides(slideIndex);
  startAutoSlide();
}

function autoSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 5000);
}

showSlides(slideIndex);
startAutoSlide();


/********************************************
 * 2. Smooth Scroll for Anchor Links
 ********************************************/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


/********************************************
 * 3. Enhanced Fade-in on Scroll with Stagger
 ********************************************/
const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("fade-in", "animated");
        observer.unobserve(entry.target);
      }, index * 100); // Stagger effect
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all elements that should animate
document.querySelectorAll(".section, .feature-card, .stats-card, .testimonial-slide, .service-item, .principle-card, .belief-card, .impact-card, .benefit-card, .addon-card, .contact-card, .pricing-card, .plan-card, .journey-section, .timeline-item, .quote-card, .process-step, .highlight-card")
  .forEach((el, index) => {
    el.classList.add("animate-on-scroll");
    if (index < 5) {
      el.classList.add(`animate-delay-${(index % 5) + 1}`);
    }
    fadeObserver.observe(el);
  });


/********************************************
 * 4. Typed Text Effect
 ********************************************/
const typedWords = ["Research", "Long-Term Thinking", "Compounding", "Value Investing"];
let i = 0, j = 0, isDeleting = false;

function typeEffect() {
  const target = document.getElementById("typing");
  if (!target) return;

  const word = typedWords[i];

  if (!isDeleting) {
    target.textContent = word.substring(0, j++);
  } else {
    target.textContent = word.substring(0, j--);
  }

  if (j === word.length + 1) isDeleting = true;
  if (j === 0) { isDeleting = false; i = (i + 1) % typedWords.length; }

  setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();


/********************************************
 * 5. Auto Dark Mode
 ********************************************/
const hour = new Date().getHours();
if (hour >= 19 || hour < 6) {
  document.body.classList.add("dark-mode");
}


/********************************************
 * 6. Enhanced Scroll-To-Top Button
 ********************************************/
const topBtn = document.createElement("button");
topBtn.id = "topBtn";
topBtn.innerHTML = "↑";
topBtn.style.cssText = `
  position: fixed;
  bottom: 25px;
  right: 25px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #2c5282, #1e3a5f);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 9999;
  display: none;
  box-shadow: 0 4px 15px rgba(44, 82, 130, 0.4);
  transition: all 0.3s ease;
  width: 50px;
  height: 50px;
`;
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
    topBtn.style.opacity = "1";
    topBtn.style.transform = "scale(1)";
  } else {
    topBtn.style.opacity = "0";
    topBtn.style.transform = "scale(0.8)";
    setTimeout(() => {
      if (window.scrollY <= 300) {
        topBtn.style.display = "none";
      }
    }, 300);
  }
});

topBtn.addEventListener("mouseenter", () => {
  topBtn.style.transform = "scale(1.1) translateY(-3px)";
  topBtn.style.boxShadow = "0 6px 20px rgba(44, 82, 130, 0.5)";
});

topBtn.addEventListener("mouseleave", () => {
  topBtn.style.transform = "scale(1)";
  topBtn.style.boxShadow = "0 4px 15px rgba(44, 82, 130, 0.4)";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/********************************************
 * 10. Scroll Progress Indicator
 ********************************************/
const scrollIndicator = document.createElement("div");
scrollIndicator.className = "scroll-indicator";
document.body.appendChild(scrollIndicator);

window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollIndicator.style.width = scrolled + "%";
});


/********************************************
 * 7. Lazy Loading Images
 ********************************************/
document.querySelectorAll("img").forEach(img => img.loading = "lazy");


/********************************************
 * 8. (DISABLED) Navbar Glass Effect — Header is not sticky anymore
 ********************************************/
// Disabled because header should scroll away
// window.addEventListener("scroll", () => {
//   document.querySelector("header").classList.toggle("nav-scroll", window.scrollY > 50);
// });


/********************************************
 * 9. Enhanced Floating Chat Button (AMA)
 ********************************************/
const chatBtn = document.createElement("div");
chatBtn.id = "chatBtn";
chatBtn.innerHTML = "💬";
chatBtn.style.cssText = `
  position: fixed;
  bottom: 25px;
  left: 25px;
  background: linear-gradient(135deg, #2c5282, #1e3a5f);
  color: white;
  padding: 15px 18px;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(44, 82, 130, 0.4);
  z-index: 9999;
  transition: all 0.3s ease;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 3s ease-in-out infinite;
`;
document.body.appendChild(chatBtn);

chatBtn.addEventListener("mouseenter", () => {
  chatBtn.style.transform = "scale(1.1)";
  chatBtn.style.boxShadow = "0 8px 25px rgba(44, 82, 130, 0.5)";
});

chatBtn.addEventListener("mouseleave", () => {
  chatBtn.style.transform = "scale(1)";
  chatBtn.style.boxShadow = "0 6px 20px rgba(44, 82, 130, 0.4)";
});

chatBtn.onclick = () => {
  window.location.href = "mailto:deepak.jindal07@gmail.com";
};

/********************************************
 * 11. Page Load Animation
 ********************************************/
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

/********************************************
 * 12. Parallax Effect for Hero Sections (Disabled - causing scroll issues)
 ********************************************/
// Parallax effect disabled to prevent container scroll issues
// If needed, can be re-enabled with proper implementation

/********************************************
 * 13. Number Counter Animation
 ********************************************/
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current + (element.textContent.includes('%') ? '%' : '') + 
                         (element.textContent.includes('x') ? 'x' : '') +
                         (element.textContent.includes('Cr') ? '+ Cr' : '');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('h3');
      if (statNumber && !statNumber.dataset.animated) {
        const text = statNumber.textContent;
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (!isNaN(number)) {
          statNumber.dataset.animated = 'true';
          animateValue(statNumber, 0, number, 2000);
        }
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stats-card").forEach(card => {
  statsObserver.observe(card);
});
