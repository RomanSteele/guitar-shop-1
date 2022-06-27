import React from 'react';
import ContentLoader from 'react-content-loader';

function SkeletonList() {
  return (
    <ContentLoader
      className="product-card"
      speed={2}
      width={220}
      height={310}
      viewBox="0 0 220 310"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="392" cy="293" r="20" />
      <rect x="126" y="117" rx="0" ry="0" width="1" height="0" />
      <rect x="4" y="0" rx="0" ry="0" width="209" height="216" />
      <rect x="3" y="221" rx="0" ry="0" width="211" height="44" />
      <rect x="3" y="283" rx="0" ry="0" width="98" height="25" />
      <rect x="111" y="283" rx="0" ry="0" width="104" height="25" />
    </ContentLoader>);
}

export default SkeletonList;
