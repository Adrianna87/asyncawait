let baseURL = 'https://deckofcardsapi.com/api/deck';

async function drawCard() {
  let data = await $.getJSON(`${baseURL}/new/draw/`);
  let { suit, value } = data.cards[0];
  console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}
drawCard();

async function drawTwoCards() {
  let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
  let deckId = firstCardData.deck_id;
  let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
  [firstCardData, secondCardData].forEach(card => {
    let { suit, value } = card.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });
}
drawTwoCards();

$(function () {
  async function setup() {
    let $btn = $('button');
    let $cardArea = $('#cardArea');

    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on('click', async function() {
      let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
      let cardSrc = cardData.cards[0].image;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }
  setup();
})