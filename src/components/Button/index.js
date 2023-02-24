/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { mergeClass } from '../../styles';
import styles from './styles';

export default function Button(props) {
  const {
    children,
    type,
    ...rest
  } = props;

  const classType = type ? `btn-${type}` : '';

  return <button
    className={mergeClass(['btn', classType])}
    css={[styles.container]}
    type={type ? type : 'default'}
    {...rest}
  >{children}</button>;
};
