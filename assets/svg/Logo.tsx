import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Logo(props: Partial<SvgProps>) {
  return (
    <Svg width={80} height={65} viewBox="0 0 80 65" fill="none" {...props}>
      <Path
        opacity={0.75}
        d="M0 64.477c17.722 0 32.11-14.395 32.11-32.127C32.11 14.618 17.721.224 0 .224v64.253z"
        fill="#536DFE"
      />
      <Path
        opacity={0.75}
        d="M15.78 64.477c17.724 0 32.11-14.395 32.11-32.127C47.89 14.618 33.505.224 15.78.224v64.253z"
        fill="#3F51B5"
      />
      <Path
        opacity={0.75}
        d="M31.862 64.477c17.723 0 32.11-14.395 32.11-32.127 0-17.732-14.387-32.126-32.11-32.126v64.253z"
        fill="#F44336"
      />
      <Path
        opacity={0.75}
        d="M47.89 64.477C65.614 64.477 80 50.082 80 32.35 80 14.618 65.614.224 47.89.224v64.253z"
        fill="#FFA000"
      />
    </Svg>
  );
}

export default Logo;
