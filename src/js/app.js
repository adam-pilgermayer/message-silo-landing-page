const burgerBtn = document.querySelector(".js-burger");
const navList = document.querySelector(".js-nav-links");

function initializeNavbar() {
	if (!burgerBtn.getAttribute("aria-expanded")) {
		burgerBtn.setAttribute("aria-expanded", false);
	}

	if (!navList.classList.contains("mobile-collapsed")) {
		navList.classList.add("mobile-collapsed");
	}
}

function setAriaExpanded(element) {
	element.setAttribute(
		"aria-expanded",
		element.getAttribute("aria-expanded") === "false" ? true : false
	);
}

function toggleMenu() {
	const navListIsShown = navList.classList.toggle("show");

	setAriaExpanded(burgerBtn);
	navList.classList.toggle("mobile-collapsed", !navListIsShown);
	burgerBtn.classList.toggle("open");
}

burgerBtn.addEventListener("click", toggleMenu);

initializeNavbar();
