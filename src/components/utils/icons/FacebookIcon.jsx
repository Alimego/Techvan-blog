function FacebookIcon({ eventHandler }) {
  return (
    <div
      onClick={eventHandler}
      className={"p-3 w-10 h-10 justify-center items-center rounded-md bg-transparent cursor-pointer"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="17"
        viewBox="0 0 14 17"
        fill="none"
      >
        <path
          d="M12.5822 9.51948L13.2691 6.54344H8.97416V4.61219C8.97416 3.798 9.57413 3.00437 11.4977 3.00437H13.4502V0.470589C13.4502 0.470589 11.6784 0.269531 9.98425 0.269531C6.44724 0.269531 4.13529 1.69492 4.13529 4.27527V6.54344H0.203613V9.51948H4.13529V16.7139H8.97416V9.51948H12.5822Z"
          fill={"white"}
        />
      </svg>
    </div>
  );
}

export default FacebookIcon;
