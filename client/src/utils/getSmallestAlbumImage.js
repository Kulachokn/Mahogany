export const getSmallestAlbumImage = (album) => {
    return album.images.reduce((smallest, image) => {
        if (image.height < smallest.height) return image;
        return smallest;
      }, album.images[0]);
};