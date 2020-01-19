{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');
    //console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add("active");
    //console.log('clickedElement:', clickedElement);
    //console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }


    /* [DONE] get 'href' attribute from the clicked link */
    const reference= clickedElement.getAttribute("href");
    //console.log(reference);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const refArticle = document.querySelector(reference);
    //console.log(refArticle);

    /* [DONE] add class 'active' to the correct article */

    refArticle.classList.add("active");
  }

  /*
  const links = document.querySelectorAll('.titles a');
  console.log("links here: " , links); // reveals links

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  */

  // }{  break in functions removed

    const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

  //document.addEventListener('DOMContentLoaded', generateTitleLinks());

  function generateTitleLinks () {
    //console.log("start!"); //check if function starts

    let titleList = document.querySelector(optTitleListSelector); //global constans
    //console.log(titleList);

  /* [DONE] remove left column innerHTML */

  //const removedLeft=document.getElementsByClassName("sidebar").innerHTML="";
    document.querySelector(optTitleListSelector).innerHTML="";
    //console.log("left links removed");

  /* [DONE] for each article: add article ID to const; get article title and add it to const; create html link code with the two consts; add link to left column */

    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles , " :list of articles");

    let html = ''; //as per example ; will not work inside loop

    for (let article of articles) {
    //console.log(article);

    const articleId = article.getAttribute("id");
    //console.log("ID is: " + articleId);

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log("title is: " + articleTitle);

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log("html link is: " + linkHTML);

    //let titleList = document.querySelector(optTitleListSelector).insertAdjacentHTML( "afterbegin", linkHTML );

    //titleList.insertAdjacentHTML('afterbegin',linkHTML ); // titleList = (...) nie działa
    //console.log(titleList);

     //console.log("before addition", html);
     html = html + linkHTML;
     //console.log("after addition: ", html);
   }
   //console.log("html after loop: " +  html);
    titleList.innerHTML = html;

    //moved from titleClickHandler()
    const links = document.querySelectorAll('.titles a');
    //console.log("links here: " , links); // reveals links

    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks()

let xxx = 1;

}
