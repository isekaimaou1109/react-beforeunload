import useBeforeunload from './useBeforeUnload';

const Beforeunload = ({ children = null, onBeforeunload }) => {
  useBeforeunload(onBeforeunload);
  return children;
};

export default Beforeunload;