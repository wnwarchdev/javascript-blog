{

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };

  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    authorSelector: '.post-author',
    articleTagsSelector: '.post-tags .list',
    tagsListSelector: '.tags.list',
    cloudClassCount: 5 ,
    cloudClassPrefix: 'tag-size-',
    authListSelector: '.authors.list'
  };
  

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


  function generateTitleLinks(customSelector = '') {
    let titleList = document.querySelector(opt.titleListSelector);
    document.querySelector(opt.titleListSelector).innerHTML='';
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    let html = '';

    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      html = html + linkHTML;
    }

    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for(let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();



  function calculateTagsParams(tags) {
    const countList = {min: 99 , max: 0}; //ehh jednak za kodillą...

    for(let tag in tags){
      if(tags[tag] > countList.max){
        countList.max = tags[tag];
      }
      if(tags[tag] < countList.min){
        countList.min = tags[tag];
      }
    }

    return countList;
  }



  function calculateTagClass (count, params) {
    const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * (opt.cloudClassCount -1) + 1 );
    return opt.cloudClassPrefix + classNumber;
  }



  function generateTags(){
    let allTags = {};
    const titleList = document.querySelectorAll(opt.articleSelector);

    for (let titleSingle of titleList) {
      let tagsWrapper = titleSingle.querySelector(opt.articleTagsSelector);
      let html = '';
      let dataTags = titleSingle.getAttribute('data-tags');
      const articleTagsArray = dataTags.split(' ');

      for (let tag of articleTagsArray) {
        const linkHTMLData = {id: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        html = html + linkHTML;
        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }

      tagsWrapper.innerHTML = html;
      const tagList = document.querySelector(opt.tagsListSelector);
      const tagsParams = calculateTagsParams(allTags);
      const allTagsData = {tags: []};

      for(let tag in allTags) {
        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
      }

      tagList.innerHTML = templates.tagCloudLink(allTagsData);
    }
  }

  generateTags();

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeClass = document.querySelectorAll('a.active');

    for (let activeSingle of activeClass) {
      activeSingle.classList.remove('active');
    }

    const tagLink = document.querySelectorAll('a[href="' + href + '"]');

    for (let tagLinkSingle of tagLink) {
      tagLinkSingle.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    const allLinks = document.querySelectorAll('a[href^="#tag-"]');

    for (let linkSingle of allLinks) {
      linkSingle.addEventListener('click', tagClickHandler);
    }
  }

  addClickListenersToTags();


  function generateAuthors(){
    let allAuth = {};
    const articleList = document.querySelectorAll(opt.articleSelector);

    for (let articleSingle of articleList) {
      let authWrapper = articleSingle.querySelector(opt.authorSelector);
      let html = '';
      let dataAuth = articleSingle.getAttribute('data-author');
      const linkHTMLData = {id: dataAuth};
      const linkHTML = templates.authorLink(linkHTMLData);
      html = html + linkHTML;

      if(!allAuth[dataAuth]) {
        allAuth[dataAuth] = 1;
      } else {
        allAuth[dataAuth]++;
      }

      authWrapper.innerHTML = html;
      const authList = document.querySelector(opt.authListSelector);
      const authParams = calculateTagsParams(allAuth);
      const allAuthData = {auths: []};

      for(let auth in allAuth){
        allAuthData.auths.push({
          auth: auth,
          count: allAuth[auth],
          className: calculateTagClass(allAuth[auth], authParams)
        });
      }
      authList.innerHTML = templates.authCloudLink(allAuthData);
      console.log(authList);
    }
  }
  generateAuthors();


  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const authName = href.replace('#auth-', '');
    const activeClass = document.querySelectorAll('a.active');

    for (let activeSingle of activeClass) {
      activeSingle.classList.remove('active');
    }

    const authorLink = document.querySelectorAll('a[href="' + href + '"]');

    for (let authorLinkSingle of authorLink) {
      authorLinkSingle.classList.add('active');
    }

    generateTitleLinks('[data-author="' + authName + '"]');
  }


  function addClickListenersToAuthors() {
    const allLinks = document.querySelectorAll('a[href^="#auth-"]');

    for (let linkSingle of allLinks) {
      linkSingle.addEventListener('click', authorClickHandler);
    }

  }
  addClickListenersToAuthors();


}
