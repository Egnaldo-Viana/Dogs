import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1, 2, 3]);
  const [ifinite, setIfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    function infinitScroll() {
      if (ifinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    window.addEventListener('wheel', infinitScroll);
    window.addEventListener('scroll', infinitScroll);
    return () => {
      window.removeEventListener('wheel', infinitScroll);
      window.removeEventListener('scroll', infinitScroll);
    };
  }, [ifinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setIfinite={setIfinite}
        />
      ))}
    </div>
  );
};

export default Feed;
