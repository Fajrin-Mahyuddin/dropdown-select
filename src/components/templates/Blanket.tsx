const Blanket = (props: JSX.IntrinsicElements["div"]) => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
      zIndex: 1,
      // backgroundColor: 'salmon'
    }}
    {...props}
  />
);

export default Blanket;
