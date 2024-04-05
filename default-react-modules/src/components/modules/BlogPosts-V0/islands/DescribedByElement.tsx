const DescribedByElement = ({ describedByText }) => {
  const elementAlreadyExists = document.querySelector(
    '#hs-react-blog-listing-describedby-element'
  );

  if (!elementAlreadyExists)
    return (
      <span
        style={{ display: 'none' }}
        id="hs-react-blog-listing-describedby-element"
      >
        {describedByText}
      </span>
    );
};

export default DescribedByElement;
