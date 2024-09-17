function InstagramIcon({ eventHandler }) {
  return (
    <div
      onClick={eventHandler}
      className={"p-3 w-10 h-10 justify-center items-center rounded-md bg-transparent cursor-pointer"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="none"
      >
        <path
          d="M9.94061 4.30829C7.12136 4.30829 4.84734 6.12346 4.84734 8.37385C4.84734 10.6242 7.12136 12.4394 9.94061 12.4394C12.7599 12.4394 15.0339 10.6242 15.0339 8.37385C15.0339 6.12346 12.7599 4.30829 9.94061 4.30829ZM9.94061 11.017C8.11873 11.017 6.62932 9.83164 6.62932 8.37385C6.62932 6.91605 8.1143 5.73071 9.94061 5.73071C11.7669 5.73071 13.2519 6.91605 13.2519 8.37385C13.2519 9.83164 11.7625 11.017 9.94061 11.017ZM16.4302 4.14199C16.4302 4.6692 15.8983 5.09027 15.2422 5.09027C14.5817 5.09027 14.0542 4.66567 14.0542 4.14199C14.0542 3.61832 14.5862 3.19372 15.2422 3.19372C15.8983 3.19372 16.4302 3.61832 16.4302 4.14199ZM19.8036 5.10442C19.7282 3.83416 19.3647 2.70897 18.1989 1.78192C17.0375 0.854875 15.6279 0.564731 14.0365 0.501041C12.3964 0.426736 7.48041 0.426736 5.84028 0.501041C4.25335 0.561193 2.84372 0.851337 1.6779 1.77838C0.51208 2.70543 0.153024 3.83062 0.0732343 5.10088C-0.0198541 6.41007 -0.0198541 10.3341 0.0732343 11.6433C0.148592 12.9135 0.51208 14.0387 1.6779 14.9658C2.84372 15.8928 4.24892 16.183 5.84028 16.2466C7.48041 16.321 12.3964 16.321 14.0365 16.2466C15.6279 16.1865 17.0375 15.8964 18.1989 14.9658C19.3603 14.0387 19.7238 12.9135 19.8036 11.6433C19.8966 10.3341 19.8966 6.41361 19.8036 5.10442ZM17.6847 13.048C17.3389 13.7415 16.6696 14.2758 15.7963 14.5553C14.4886 14.9693 11.3857 14.8738 9.94061 14.8738C8.49552 14.8738 5.38814 14.9658 4.0849 14.5553C3.21608 14.2793 2.54673 13.745 2.19654 13.048C1.6779 12.0042 1.79759 9.52734 1.79759 8.37385C1.79759 7.22035 1.68233 4.73997 2.19654 3.6997C2.54229 3.00619 3.21164 2.4719 4.0849 2.19237C5.39257 1.77838 8.49552 1.87392 9.94061 1.87392C11.3857 1.87392 14.4931 1.78192 15.7963 2.19237C16.6651 2.46836 17.3345 3.00265 17.6847 3.6997C18.2033 4.74351 18.0836 7.22035 18.0836 8.37385C18.0836 9.52734 18.2033 12.0077 17.6847 13.048Z"
          fill={"white"}
        />
      </svg>
    </div>
  );
}

export default InstagramIcon;
