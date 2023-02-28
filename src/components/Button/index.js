export default function Button(props) {
  const {
    children,
    type,
    ...rest
  } = props;

  const classType = type ? `btn-${type}` : '';

  return <button
    className='btn'
    type={type ? type : 'default'}
    {...rest}
  >{children}</button>;
};
