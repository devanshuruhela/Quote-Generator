const quoteContainer = document.getElementById('quote_Container');
const Quote_text = document.getElementById('quote');
const authorname = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newbtn = document.getElementById('newquotes');

const loader = document.getElementById('Loader');

function loading()
{
  loader.hidden =false;
  quote_container.hidden = true;
}

function loaded()
{
  if(!loader.hidden){
  loader.hidden = true;
  quote_container.hidden = false;}
}


// Get quotes from API
let apiquotes = [];

function newquote()
{
  loading();
  const quote  = apiquotes[Math.floor(Math.random() * apiquotes.length)];
  if (!quote.author)
  {
    authorname.textContent = 'Unknown';
  }
  else{
  authorname.textContent = quote.author;}

  if(quote.text.lenght >80)
  {
    Quote_text.classList.add('long_quote');
  }
  else
  {
    Quote_text.classList.remove('long_quote');
  }
  Quote_text.textContent = quote.text;
  loaded();
}

async function getquotes()
{
  loading();
  const url = 'https://type.fit/api/quotes';
  try {
    const res = await fetch(url);
    apiquotes = await res.json();
    //console.log(apiquotes[15]);
    newquote();
  } catch (error) {
    alert('oops try reloading the webpage', error);
    //catch error
  }
}

//tweeter work
function tweetquotes()
{
  const twitterUrl = `https://twitter.com/intent/tweet?text= ${Quote_text.textContent} - ${authorname.textContent}`;
  window.open(twitterUrl , '_blank');
}

newbtn.addEventListener('click' , newquote);
twitterbtn.addEventListener('click' , tweetquotes);

getquotes();
