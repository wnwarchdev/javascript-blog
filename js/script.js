{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('.post');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }


    const reference= clickedElement.getAttribute('href');

    const refArticle = document.querySelector(reference);

    refArticle.classList.add('active');
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optAuthorSelector = '.post-author',
    optArticleTagsSelector = '.post-tags .list',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5 ,
    optCloudClassPrefix = 'tag-size-',
    optAuthListSelector = '.authors.list';

  //function generateTitleLinks ()
  function generateTitleLinks(customSelector = '') {

    let titleList = document.querySelector(optTitleListSelector);

    document.querySelector(optTitleListSelector).innerHTML='';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {


      const articleId = article.getAttribute('id');
      //console.log(articleId);

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      //console.log(articleTitle);

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
      //console.log(linkHTML);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();



  function calculateTagsParams(tags) { //deklaracja funkcji liczącej wystąpienie tagów

    //console.log(tags);

    const countList = {min: 99 , max: 0}; //ehh jednak za kodillą...
    //console.log(Object.values[1](obj))

    for(let tag in tags){
      //console.log(tag + ' is used ' + tags[tag] + ' times');

      if(tags[tag] > countList.max){
        countList.max = tags[tag];
      }

      if(tags[tag] < countList.min){
        countList.min = tags[tag];
      }

    }

    return countList;
  } //koniec deklaracji calculateTagsParams

  function calculateTagClass (count, params) {

    const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * (optCloudClassCount -1) + 1 );


    return optCloudClassPrefix + classNumber;

  } //koniec deklaracji calculateTagClass


  function generateTags(){ //deklaracja funkcji dodajacej tagi pod artykulem
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
    /* [DONE] find all articles */
    //const titleList = document.querySelectorAll(optArticleSelector);
    const titleList = document.querySelectorAll(optArticleSelector); //wyszukuje elementy post - artykuly z calego dokumentu
    //console.log(titleList);
    /* [DONE] START LOOP: for every article: */
    for (let titleSingle of titleList) {
    /* [DONE] find tags wrapper */
      let tagsWrapper = titleSingle.querySelector(optArticleTagsSelector); //zmienna dla tresci wrappera tj kod html <li></li>
      //console.log(tagsWrapper);
      /* [DONE] make html variable with empty string */
      let html = ''; //pusta zmienna
      /* [DONE] get tags from data-tags attribute */
      let dataTags = titleSingle.getAttribute('data-tags'); //zmienna wyciagajaca nazwe tagow z atrybutu data-tags zapisane jako jeden ciag znakow
      //console.log(dataTags);
      /* [DONE] split tags into array */
      const articleTagsArray = dataTags.split(' '); //tworzy array z pojedynczego ciagu rozbijajac go na spacjach
      //console.log(articleTagsArray);
      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> '; // spacja!! // dla kazdego pojedynczego tagu w arrayu zostaje stworzeony nowy zapis html
        //console.log(linkHTML);
        /* [DONE] add generated code to html variable */
        html = html + linkHTML; //nowy zapis dopisany do pustej zmiennej
        //console.log(html);
        /* [DONE] END LOOP: for each tag */
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;  //dodaje nowy zapis do dokumentu html
      //console.log(html);
      /* [DONE] END LOOP: for every article: */
      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector(optTagsListSelector);

      const tagsParams = calculateTagsParams(allTags);
      //console.log('tagsParams:', tagsParams)

      /* [NEW] create variable for all links HTML code */
      let allTagsHTML = '';

      /* [NEW] START LOOP: for each tag in allTags: */
      for(let tag in allTags){
        //console.log(tag);
        const tagLinkHTML = '<a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a>&nbsp;(' + allTags[tag] + ') '; //spacja
        //console.log('tagLinkHTML:', tagLinkHTML);
        //console.log(allTags[tag]);
        /* [NEW] generate code of a link and add it to allTagsHTML */
        //allTagsHTML += '<a class="" href="#tag-' + tag + '">' + tag + '</a>' + ' (' + allTags[tag] + ') ';
        allTagsHTML += tagLinkHTML;
      }
      /* [NEW] END LOOP: for each tag in allTags: */

      /*[NEW] add HTML from allTagsHTML to tagList */
      tagList.innerHTML = allTagsHTML;
    }
  }

  generateTags(); //wywolanie funkcji powyzej

  function tagClickHandler(event){
    /* [DONE] prevent default action for this event */
    //console.log(event);
    event.preventDefault(); //wylacza domyslne dzialanie linku
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href'); //przypisuje atrybut href kliknietego elementu do stalej href
    //console.log(href);
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', ''); //usuwa fragmen tektu ze zmiennej i zapisuje do nowej stalej tag
    //console.log(tag);
    /* [DONE] find all tag links with class active */
    const activeClass = document.querySelectorAll('a.active'); //przypisuje do stalej atrybut aktywnego linku zaczynajacy sie od #tag-
    //console.log(activeClass);
    /* [DONE] START LOOP: for each active tag link */
    for (let activeSingle of activeClass) {
    /* [DONE] remove class active */
      activeSingle.classList.remove('active'); //usuwa klase active z linka
    /* [DONE] END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLink = document.querySelectorAll('a[href="' + href + '"]'); //dodaje do stalej likni z href jak w stalej href //demyt...
    /* [DONE] START LOOP: for each found tag link */
    for (let tagLinkSingle of tagLink) {
    /* [DONE] add class active */
      //console.log(tagLinkSingle);
      tagLinkSingle.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() { //deklaracja
  /* [DONE] find all links to tags */
    const allLinks = document.querySelectorAll('a[href^="#tag-"]'); //dodaje do stałej wszystkie linki hrefem "#tag-
    //console.log(allLinks);
    /* [DONE] START LOOP: for each link */
    for (let linkSingle of allLinks) {
      /* [DONE] add tagClickHandler as event listener for that link */
      linkSingle.addEventListener('click', tagClickHandler); //do wszystkich tych linkow dodaj listener wlaczany przez click i uruchamiajacy fnkcje tagClickHandler
      /* [DONE] END LOOP: for each link */
    }
  }

  addClickListenersToTags();  //wykonuje funkcje powyzej

  //wlasne


  function generateAuthors(){ //deklaracja funkcji dodajacej tagi pod artykulem
    /* [NEW] create a new variable allTags with an empty array */
    let allAuth = {};
    /* [DONE] find all articles */
    //const titleList = document.querySelectorAll(optArticleSelector);
    const articleList = document.querySelectorAll(optArticleSelector); //wyszukuje elementy post - artykuly z calego dokumentu
    //let allAuthors = {}
    //console.log(titleList);
    /* [DONE] START LOOP: for every article: */
    for (let articleSingle of articleList) {
    /* [DONE] find tags wrapper */
      let authWrapper = articleSingle.querySelector(optAuthorSelector); //zmienna dla tresci wrappera tj kod html <li></li>
      //console.log(tagsWrapper);
      /* [DONE] make html variable with empty string */
      let html = ''; //pusta zmienna
      /* [DONE] get tags from data-tags attribute */
      let dataAuth = articleSingle.getAttribute('data-author'); //zmienna wyciagajaca nazwe tagow z atrybutu data-tags zapisane jako jeden ciag znakow
      //console.log(dataTags);
      const linkHTML = 'wanted by: <a href="#auth-' + dataAuth + '">' + dataAuth + '</a> ';


      html = html + linkHTML;
      //console.log(articleTagsArray);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuth[dataAuth]) {
        /* [NEW] add tag to allTags object */
        allAuth[dataAuth] = 1;
      } else {
        allAuth[dataAuth]++; ////////////////////////////////
      }
      //console.log(allAuth);
      /* [DONE] START LOOP: for each tag */
      /* [DONE] insert HTML of all the links into the tags wrapper */
      authWrapper.innerHTML = html;  //dodaje nowy zapis do dokumentu html
      //console.log(html);


      const authList = document.querySelector(optAuthListSelector);
      //console.log(authList);
      const authParams = calculateTagsParams(allAuth);
      //console.log(authParams);
      /* [DONE] END LOOP: for every article: */
      /* [NEW] create variable for all links HTML code */
      let allAuthHTML = '';

      /* [NEW] START LOOP: for each tag in allTags: */
      for(let auth in allAuth){
        //console.log(tag);
        const authLinkHTML = '<a href="#auth-' + auth + '" class="' + calculateTagClass(allAuth[auth], authParams) + '">' + auth + '</a>&nbsp;(' + allAuth[auth] + ') '; //spacja
        //console.log('tagLinkHTML:', tagLinkHTML);
        //console.log(allTags[tag]);
        /* [NEW] generate code of a link and add it to allTagsHTML */
        //allTagsHTML += '<a class="" href="#tag-' + tag + '">' + tag + '</a>' + ' (' + allTags[tag] + ') ';
        allAuthHTML += authLinkHTML;
      }
      /* [NEW] END LOOP: for each tag in allTags: */

      /*[NEW] add HTML from allTagsHTML to tagList */
      authList.innerHTML = allAuthHTML;
    }
  }
  generateAuthors(); //wywolanie funkcji powyzej


  function authorClickHandler(event) {  //deklaracja
    event.preventDefault();
    //console.log('start!');
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    //console.log(href);
    const authName = href.replace('#auth-', '');  //zmiana na wybór hrefa zaczynajacego sie od auth...
    //console.log(authName);
    const activeClass = document.querySelectorAll('a.active');
    //console.log(activeClass);
    for (let activeSingle of activeClass) {
      activeSingle.classList.remove('active');
    }
    const authorLink = document.querySelectorAll('a[href="' + href + '"]'); //tBC !!!
    //console.log(authorLink);
    for (let authorLinkSingle of authorLink) {
      authorLinkSingle.classList.add('active');
    }
    generateTitleLinks('[data-author="' + authName + '"]'); //zmiana na generowanie listy po data-author
  }


  function addClickListenersToAuthors() { //deklaracja
    const allLinks = document.querySelectorAll('a[href^="#auth-"]'); //dodaje do stałej wszystkie linki hrefem "#auth-
    //console.log(allLinks);
    for (let linkSingle of allLinks) {
      linkSingle.addEventListener('click', authorClickHandler); //do wszystkich tych linkow dodaj listener wlaczany przez click i uruchamiajacy authorClickHandler
    }
  }

  addClickListenersToAuthors();  //wykonuje funkcje powyzej



}










/* To jest stary,prawie caly kod sprzed blednego zapisu w htmlu
  function generateAuthors() { //deklaracja funkcji dodajacej autorów do artykulow na podstawie customowego atrybuty "authors" w html

    const titleList = document.querySelectorAll(optArticleSelector); //wyszukuje elementy post - artykuly z calego dokumentu
    //console.log(titleList);
    for (let titleSingle of titleList) {

      let authorWrapper = titleSingle.querySelector(optAuthorSelector); //zmienna dla tresci html wrappera z info o autorze
      //console.log(authorWrapper);
      let authorTag = authorWrapper.getAttribute('author'); //zmienna wyciagajaca autora z w.w. zmiennej
      //console.log(authorTag);
      authorWrapper.innerHTML = 'wanted by <a href="#auth-' + authorTag + '">' + authorTag + '</a>';  //dodaje wyciagnietego autora do wczesniej wskazanego wrappera do dokumentu html w formie linka
    }
  }

  generateAuthors(); //wywolanie funkcji powyzej


  function authorClickHandler(event){
    //console.log(event);
    event.preventDefault(); //chyba niepotrzebne bo to paragraf ?
    const clickedElement = this;
    //console.log(clickedElement);
    const href = clickedElement.querySelector('a').getAttribute('href'); //chyba 2 godziny stracone na znalezienie rozwiazania z qselector...
    //console.log(href);
    const tag = href.replace('#auth-', '');
    console.log(tag);
    const activeClass = document.querySelectorAll('a.active[href^="#tag-"]'); //przypisuje do stalej atrybut aktywnego linku zaczynajacy sie od #tag-
    //console.log(activeClass);

    for (let activeSingle of activeClass) {

      activeSingle.classList.remove('active'); //usuwa klase active z linka

    }

    const tagLink = document.querySelectorAll(href); //dodaje do stalej likni z href jak w stalej href

    for (let tagLinkSingle of tagLink) {

      tagLinkSingle.classList.add('active');

    }

    generateTitleLinks('[data-author="' + href.replace('#', '') + '"]');



    //generateTitleLinks('[authors~="' + tag + '"]');



  }

  function addClickListenersToAuthors() { //deklaracja

    const allPs = document.querySelectorAll('p[author]'); //do stalej przypisz wszystkie paragrafy z custom attribute author
    //console.log(allPs);
    for (let pSingle of allPs) {
      pSingle.addEventListener('click', authorClickHandler); //do wszystkich tych paragrafów dodaj listener wlaczany przez click i uruchamiajacy fnkcje authorClickHandler    }
    }
  }
  addClickListenersToAuthors();  //wykonuje funkcje powyzej
}

*/
