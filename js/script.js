const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add("active");
  console.log('clickedElement:', clickedElement);
  //console.log('clickedElement (with plus): ' + clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }


  /* [DONE] get 'href' attribute from the clicked link */
  const reference= clickedElement.getAttribute("href");
  console.log(reference);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const refArticle = document.querySelector(reference);
  console.log(refArticle);

  /* [DONE] add class 'active' to the correct article */

  refArticle.classList.add("active");

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
