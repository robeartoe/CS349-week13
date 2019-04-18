(function (window) {
  'use strict';

  // Create Articles:
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => createArticle(json))
    .then(() => {
      const BUTTON_SELECTOR = '[data-posts="id"]';
      let buttons = document.querySelectorAll(BUTTON_SELECTOR);

      buttons.forEach(function (button) {
        'use strict';

        let sectionSelector = `#comments-${button.value}`;
        let commentSection = document.querySelector(sectionSelector);

        button.addEventListener('click', function (event) {
          if (commentSection.hidden) {
          // If it's just the h3, the comments aren't loaded.
            if (commentSection.children.length === 1) {
              createComments(button.value).then(() => {
                commentSection.hidden = false;
                button.textContent = 'Hide comments';
              });
            } else {
              commentSection.hidden = false;
              button.textContent = 'Hide comments';
            }
          } else {
            commentSection.hidden = true;
            button.textContent = 'Show comments';
          }
          event.preventDefault();
        });
      });
    });
})(window);

function createArticle (res) {
  return new Promise((resolve, reject) => {
    let randomIndexes = [Math.floor(Math.random() * 99) + 0, Math.floor(Math.random() * 99) + 0];

    for (var index in randomIndexes) {
      var testArticle = document.createElement('article');

      // Title:
      var testTitle = document.createElement('h2');
      testTitle.innerHTML = res[randomIndexes[index]]['title'];

      // Body:
      var testBody = document.createElement('p');
      testBody.innerHTML = res[randomIndexes[index]]['body'];
      testBody.innerHTML.replace(/\n/g, '<br />');

      // Comments Button:
      var testButton = document.createElement('button');
      testButton.innerHTML = 'Show Comments';
      testButton.setAttribute('data-posts', 'id');
      testButton.setAttribute('value', randomIndexes[index]);
      testButton.setAttribute('type', 'button');

      // Create Comments Section:
      var testSection = document.createElement('section');
      testSection.setAttribute('class', 'comments');
      testSection.setAttribute('id', `comments-${randomIndexes[index]}`);
      testSection.hidden = true;
      var header = document.createElement('h3');
      header.innerHTML = 'Comments';
      testSection.appendChild(header);

      testArticle.appendChild(testTitle);
      testArticle.appendChild(testBody);
      testArticle.appendChild(testButton);
      testArticle.appendChild(testSection);

      document.body.appendChild(testArticle);
    }
    resolve();
  });
};

function createComments (commentId) {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then((results) => {
        let randomIndexes = [Math.floor(Math.random() * 499) + 0, Math.floor(Math.random() * 499) + 0, Math.floor(Math.random() * 499) + 0];
        var section = document.getElementById(`comments-${commentId}`);

        for (var index in randomIndexes) {
        // Body:
          var testBody = document.createElement('p');
          testBody.setAttribute('data-comments', 'body');
          testBody.innerHTML = results[randomIndexes[index]]['body'];
          testBody.innerHTML.replace(/\n/g, '<br />');

          // Email Address:
          var testAddress = document.createElement('address');
          testAddress.setAttribute('data-comments', 'name');
          var testAnchor = document.createElement('a');
          testAnchor.setAttribute('data-comments', 'email');
          testAnchor.setAttribute('href', `mailto:${results[randomIndexes[index]]['email']}`);
          testAnchor.innerHTML = `${results[randomIndexes[index]]['name']}`;

          section.appendChild(testBody);
          testAddress.appendChild(testAnchor);
          section.appendChild(testAddress);
        // testArticle.appendChild(testButton);
        // testArticle.appendChild(testSection);
        // document.body.appendChild(testArticle);
        }
        resolve();
      });
  });
}
