let favNumber = 6;
let baseURL = "http://numbersapi.com";

async function favNumFact() {
  let fact = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(fact);
}
favNumFact();

const nums = [6, 12, 30, 81];
async function numFacts() {
  let data = await $.getJSON(`${baseURL}/${nums}?json`);
  console.log(data);
}
numFacts();

async function fourFavNumFacts() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
fourFavNumFacts();
