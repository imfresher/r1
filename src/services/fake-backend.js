export { fakeBackend };

const subtitlesKey = 'react-subtitles';
let subtitles = JSON.parse(localStorage.getItem(subtitlesKey)) || [];

function fakeBackend() {
  let realFetch = window.fetch;

  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.endsWith('/subtitles/store') && opts.method === 'POST':
            return storeSubtitle();
          case url.endsWith('/subtitles') && opts.method === 'GET':
            return getSubtitles();
          case url.match(/\/subtitles\/\d+$/) && opts.method === 'GET':
            return getSubtitleById();
          case url.match(/\/subtitles\/\d+$/) && opts.method === 'PUT':
            return updateSubtitle();
          case url.match(/\/subtitles\/\d+$/) && opts.method === 'DELETE':
            return deleteSubtitle();
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then(response => resolve(response))
              .catch(error => reject(error));
        }
      }

      function storeSubtitle() {
        const subtitle = body();

        if (subtitles.find(x => x.languageCode === subtitle.languageCode)) {
          return error('Subtitle with languageCode "' + subtitle.languageCode + '" is already taken')
        }

        subtitle.id = subtitles.length ? Math.max(...subtitles.map(x => x.id)) + 1 : 1;
        subtitles.push(subtitle);
        localStorage.setItem(subtitlesKey, JSON.stringify(subtitles));

        return ok();
      }

      function getSubtitles() {
        return ok(subtitles.map(x => basicDetails(x)));
      }

      function getSubtitleById() {
        const subtitle = subtitles.find(x => x.id === idFromUrl());
        return ok(basicDetails(subtitle));
      }

      function updateSubtitle() {
        let params = body();
        let subtitle = subtitles.find(x => x.id === idFromUrl());

        // update and save subtitle
        Object.assign(subtitle, params);
        localStorage.setItem(subtitlesKey, JSON.stringify(subtitles));

        return ok();
      }

      function deleteSubtitle() {
        subtitles = subtitles.filter(x => x.id !== idFromUrl());
        localStorage.setItem(subtitlesKey, JSON.stringify(subtitles));

        return ok();
      }

      // helper functions
      function ok(body) {
        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
      }

      function error(message) {
        resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
      }

      function basicDetails(subtitle) {
        const { id, language, languageCode, languageFullCode, content } = subtitle;

        return { id, language, languageCode, languageFullCode, content };
      }

      function body() {
        return opts.body && JSON.parse(opts.body);
      }

      function idFromUrl() {
        const urlParts = url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
      }
    });
  };
}
