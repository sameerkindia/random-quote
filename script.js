const quoteContainer = document.querySelector("#quote-container");
const authorText = document.querySelector("#author");
const quoteText = document.querySelector("#quote");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

const showLoadingSipnner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = function () {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// Get quote From API

const getQuote = async function () {
  showLoadingSipnner();

  const apiUrl = `https://animechan.xyz/api/random`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    authorText.textContent = data.character;

    // Quote length
    if (data.quote.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    // Quote
    quoteText.textContent = data.quote;
    removeLoadingSpinner();
  } catch (err) {
    getQuote();
    console.log(`whoops, ${err}`);
  }
};

// Quote tweet functon
const tweetQuote = function () {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);

// on Load
getQuote();
