import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MediaCard from "../MediaCard/MediaCard";
import styles from './Carousel.module.css';

const PlaylistCarousel = ({ playlists, type }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  
  return (
    <Carousel responsive={responsive} infinite={true} itemClass={styles.itemCard}>
      {playlists.map((playlist) => (
        <MediaCard type={type} playlist={playlist} key={playlist.id} />
      ))}
    </Carousel>
  );
};

export default PlaylistCarousel;
