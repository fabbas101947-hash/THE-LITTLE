const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const filters = document.querySelectorAll("[data-filter]");
const products = Array.from(document.querySelectorAll(".product-card[data-color]"));
const productCount = document.querySelector("#productCount");
const emptyState = document.querySelector("#emptyState");

function applyFilters() {
  if (!products.length) return;

  const activeFilters = Array.from(filters).reduce((values, filter) => {
    values[filter.dataset.filter] = filter.value;
    return values;
  }, {});

  let visibleCount = 0;

  products.forEach((product) => {
    const matches = Object.entries(activeFilters).every(([key, value]) => {
      if (value === "all") return true;
      return product.dataset[key].split(" ").includes(value);
    });

    product.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  if (productCount) {
    productCount.textContent = `${visibleCount} product${visibleCount === 1 ? "" : "s"}`;
  }

  if (emptyState) {
    emptyState.hidden = visibleCount !== 0;
  }
}

filters.forEach((filter) => filter.addEventListener("change", applyFilters));
applyFilters();
