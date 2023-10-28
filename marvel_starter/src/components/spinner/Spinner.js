const Spinner = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        style={{
          margin: 'auto',
          background: 'none',
          display: 'block',
          shapeRendering: 'auto',
        }}
        width="210px"
        height="210px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M20 50A30 30 0 0 0 80 50A30 32.6 0 0 1 20 50"
          fill="#1a4f73"
          stroke="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1.1494252873563218s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 51.3;360 50 51.3"
          ></animateTransform>
        </path>
      </svg>
    </>
  )
}

export default Spinner
