// __mocks__/next/image.tsx
import React from "react";

const NextImage = ({ src, alt, ...props }: any) => {
  const { priority, unoptimized, ...rest } = props;

  return <img src={src} alt={alt} {...rest} />;
};

export default NextImage;
