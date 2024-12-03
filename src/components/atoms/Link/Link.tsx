import { forwardRef } from 'react';
import { type LinkProps } from './types';

const Link = forwardRef(
  ({ ...props }: LinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => (
    <a ref={ref} {...props} />
  )
);

export default Link;
