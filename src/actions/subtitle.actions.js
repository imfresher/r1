import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { subtitlesAtom, subtitleAtom } from '../store';
import { useFetchWrapper } from '../services';

// const subtitlesData = [
//   {
//     id: 1,
//     language: 'English',
//     languageCode: 'en',
//     languageFullCode: 'en-US',
//     content: null,
//   },
//   {
//     id: 2,
//     language: 'Vietnamese',
//     languageCode: 'vi',
//     languageFullCode: 'vi-VN',
//     content: null,
//   }
// ];

function useSubtitleActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/subtitles`;
  const fetchWrapper = useFetchWrapper();
  const setSubtitles = useSetRecoilState(subtitlesAtom);
  const setSubtitle = useSetRecoilState(subtitleAtom);

  return {
    store,
    getAll,
    getById,
    destroy,
    resetSubtitles: useResetRecoilState(subtitlesAtom),
    resetSubtitle: useResetRecoilState(subtitleAtom)
  };

  function store(subtitle) {
    return fetchWrapper.post(`${baseUrl}/store`, subtitle);
    // const response = subtitlesData;
    // return setSubtitles(response);
  }

  function getAll() {
    return fetchWrapper.get(baseUrl);
    // return fetchWrapper.get(baseUrl).then(setSubtitles);
    // const response = subtitlesData;
    // return setSubtitles(response);
  }

  function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`).then(setSubtitle);
    // const response = subtitlesData.filter(function(item) {
    //   return item.id === id;
    // });

    // return setSubtitle(response);
  }

  function destroy(id) {
    setSubtitles(subtitles => subtitles.map(x => {
        // add isDeleting prop to user being deleted
        if (x.id === id)
            return { ...x, isDeleting: true };

        return x;
    }));

    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(() => {
            // remove user from list after deleting
            setSubtitles(subtitles => subtitles.filter(x => x.id !== id));
        });
  }
}

export { useSubtitleActions };
