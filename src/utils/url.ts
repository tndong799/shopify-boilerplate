/* eslint-disable @typescript-eslint/no-explicit-any */
// import ProdImageDefault from "@/assets/images/prod-default.png";

export const createUrlWithQueryString = (url: string, query?: any): string => {
    if (!query) return url;
    return `${url}?${decodeURIComponent(
        new URLSearchParams(query).toString()
    )}`;
};

export const shouldExistImagehURL = (imageURL: string) => {
    if (!imageURL) return false;

    const img = new Image();

    return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
};

// export const getImageWithURL = (imageURL: string) => {
//   const isExist = shouldExistImagehURL(imageURL);
//   if (isExist) return imageURL;

//   return ProdImageDefault;
// };
