/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 14 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


/**
TIMELINE 
**/

  body{
    background-color: #f7f7f7;
    margin-top:20px;
}

.main-timeline {
    position: relative
}

.main-timeline:before {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background: #c6c6c6;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0
}

.main-timeline .timeline {
    margin-bottom: 40px;
    position: relative
}

.main-timeline .timeline:after {
    content: "";
    display: block;
    clear: both
}

.main-timeline .icon {
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0
}

.main-timeline .icon:before,
.main-timeline .icon:after {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.33s ease-out 0s
}

.main-timeline .icon:before {
    background: #fff;
    border: 2px solid #232323;
    left: -3px
}

.main-timeline .icon:after {
    border: 2px solid #c6c6c6;
    left: 3px
}

.main-timeline .timeline:hover .icon:before {
    left: 3px
}

.main-timeline .timeline:hover .icon:after {
    left: -3px
}

.main-timeline .date-content {
    width: 50%;
    float: left;
    margin-top: 22px;
    position: relative
}

.main-timeline .date-content:before {
    content: "";
    width: 36.5%;
    height: 2px;
    background: #c6c6c6;
    margin: auto 0;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0
}

.main-timeline .date-outer {
    width: 125px;
    height: 125px;
    font-size: 16px;
    text-align: center;
    margin: auto;
    z-index: 1
}

.main-timeline .date-outer:before,
.main-timeline .date-outer:after {
    content: "";
    width: 125px;
    height: 125px;
    margin: 0 auto;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: all 0.33s ease-out 0s
}

.main-timeline .date-outer:before {
    background: #fff;
    border: 2px solid #232323;
    left: -6px
}

.main-timeline .date-outer:after {
    border: 2px solid #c6c6c6;
    left: 6px
}

.main-timeline .timeline:hover .date-outer:before {
    left: 6px
}

.main-timeline .timeline:hover .date-outer:after {
    left: -6px
}

.main-timeline .date {
    width: 100%;
    margin: auto;
    position: absolute;
    top: 27%;
    left: 0
}

.main-timeline .month {
    font-size: 18px;
    font-weight: 700
}

.main-timeline .year {
    display: block;
    font-size: 30px;
    font-weight: 700;
    color: #232323;
    line-height: 36px
}

.main-timeline .timeline-content {
    width: 50%;
    padding: 20px 0 20px 50px;
    float: right
}

.main-timeline .title {
    font-size: 19px;
    font-weight: 700;
    line-height: 24px;
    margin: 0 0 15px 0
}

.main-timeline .description {
    margin-bottom: 0
}

.main-timeline .timeline:nth-child(2n) .date-content {
    float: right
}

.main-timeline .timeline:nth-child(2n) .date-content:before {
    left: 10px
}

.main-timeline .timeline:nth-child(2n) .timeline-content {
    padding: 20px 50px 20px 0;
    text-align: right
}

@media only screen and (max-width: 991px) {
    .main-timeline .date-content {
        margin-top: 35px
    }
    .main-timeline .date-content:before {
        width: 22.5%
    }
    .main-timeline .timeline-content {
        padding: 10px 0 10px 30px
    }
    .main-timeline .title {
        font-size: 17px
    }
    .main-timeline .timeline:nth-child(2n) .timeline-content {
        padding: 10px 30px 10px 0
    }
}

@media only screen and (max-width: 767px) {
    .main-timeline:before {
        margin: 0;
        left: 7px
    }
    .main-timeline .timeline {
        margin-bottom: 20px
    }
    .main-timeline .timeline:last-child {
        margin-bottom: 0
    }
    .main-timeline .icon {
        margin: auto 0
    }
    .main-timeline .date-content {
        width: 95%;
        float: right;
        margin-top: 0
    }
    .main-timeline .date-content:before {
        display: none
    }
    .main-timeline .date-outer {
        width: 110px;
        height: 110px
    }
    .main-timeline .date-outer:before,
    .main-timeline .date-outer:after {
        width: 110px;
        height: 110px
    }
    .main-timeline .date {
        top: 30%
    }
    .main-timeline .year {
        font-size: 24px
    }
    .main-timeline .timeline-content,
    .main-timeline .timeline:nth-child(2n) .timeline-content {
        width: 95%;
        text-align: center;
        padding: 10px 0
    }
    .main-timeline .title {
        margin-bottom: 10px
    }
}

















  
})();
