"use strict";

import "../css/reset.css";
import "../css/styles.css";

const navbar = document.querySelector(".js-navbar");
const burgerBtn = navbar.querySelector(".js-burger");
const navList = navbar.querySelector(".js-nav-links");

function initializeNavbar() {
	if (!burgerBtn.getAttribute("aria-expanded")) {
		burgerBtn.setAttribute("aria-expanded", false);
	}
}

function toggleNavbarBg() {
	if (window.scrollY > 0) {
		navbar.classList.add("bg-200");
	} else {
		navbar.classList.remove("bg-200");
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
	burgerBtn.classList.toggle("open");
}

function hideMenuOnAction(e) {
	if (window.innerWidth >= 768) return;
	if (!e.target.classList.contains("nav-link")) return;
	if (!e.currentTarget.classList.contains("show")) return;

	toggleMenu();
}

window.addEventListener("scroll", toggleNavbarBg);
burgerBtn.addEventListener("click", toggleMenu);
navList.addEventListener("click", hideMenuOnAction);

initializeNavbar();
