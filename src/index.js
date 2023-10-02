import { Notify } from "notiflix/build/notiflix-notify-aio";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { renderGallery } from "./js/render-gallery";
import { PixabayAPI } from "./js/pixabay-api";
import { onScroll, onScrollToTop } from "./js/page-scrolling";

Notify.init({
	timeout: 4000,
	clickToClose: true,
	cssAnimationStyle: "zoom",
});

const lightbox = new SimpleLightbox(".gallery a");

const pixabayAPI = new PixabayAPI();

const galleryListEl = document.querySelector(".gallery");
const formSearchEl = document.querySelector(".search-form");
const loadMoreBtnEl = document.querySelector(".load-more");

formSearchEl.addEventListener("submit", onSearchFormSubmit);
loadMoreBtnEl.addEventListener("click", onLoadMoreBtnClick);

onScroll();
onScrollToTop();

async function onSearchFormSubmit(e) {
	e.preventDefault();
	clearGallery();

	pixabayAPI.query = e.currentTarget.elements.searchQuery.value.trim();

	if (!pixabayAPI.query) {
		Notify.info("Please enter at least a few characters to search");
		return;
	}

	try {
		const data = await pixabayAPI.searchPhotos();
		handleSearchResults(data);
	} catch (e) {
		Notify.info("An error occurred during the search.");
		console.error(e);
	}
}

function handleSearchResults(data) {
	const items = data.hits;
	const totalItems = data.totalHits;
	const markup = renderGallery(items);

	if (!items.length) {
		Notify.info(
			"Sorry, there are no images matching your search query. Please try again.",
		);
	} else {
		Notify.success(`Hooray! We found ${totalItems} images.`);
		loadMoreBtnEl.classList.toggle("is-hidden", items.length < 40);
		galleryListEl.innerHTML = markup;
		lightbox.on("show.simplelightbox");
		lightbox.refresh();
	}
}

async function onLoadMoreBtnClick() {
	pixabayAPI.page += 1;

	try {
		const data = await pixabayAPI.searchPhotos();
		const items = data.hits;

		if (items.length < 40) {
			loadMoreBtnEl.classList.add("is-hidden");
			Notify.info("We're sorry, but you've reached the end of search results.");
		}

		const newMarkup = renderGallery(items);
		galleryListEl.insertAdjacentHTML("beforeend", newMarkup);
		lightbox.refresh();
	} catch (e) {
		Notify.failure("An error occurred while loading more photos.");
		console.error(e);
	}
}

function clearGallery() {
	pixabayAPI.page = 1;
	galleryListEl.innerHTML = "";

	loadMoreBtnEl.classList.add("is-hidden");
}
