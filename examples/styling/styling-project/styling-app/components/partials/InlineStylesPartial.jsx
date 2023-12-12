function CSSPropertiesPartial({
  wrapperPadding = '1rem',
  wrapperBG = 'lightcoral',
  wrapperBorder = '2px dotted crimson',
  wrapperColor = 'white',
  sharedMargin = '1rem',
}) {
  return (
    <div
      style={{
        padding: wrapperPadding,
        backgroundColor: wrapperBG,
        border: wrapperBorder,
        color: wrapperColor,
      }}
    >
      <h2 style={{ margin: 0, marginBottom: sharedMargin }}>
        InlineStylesPartial
      </h2>
      <p>
        Muffin cake candy cookie fruitcake wafer gummies macaroon. sesame
        jujubes powder gummies cupcake macaroon brownie apple pie fruitcake.
        gingerbread chupa chups pudding apple pie pudding jujubes marshmallow
        powder sugar. toffee cake cupcake fruitcake icing topping halvah powder
        candy canes chocolate wafer powder danish powder. lollipop tiramisu
        brownie marshmallow donut muffin apple pie candy canes apple pie. oat
        cake.
      </p>
      <p style={{ marginBottom: 0 }}>
        Gummies snaps muffin lemon drops bonbon croissant licorice toffee
        lollipop sugar plum. sugar plum oat cake cotton candy croissant candy
        jujubes ice cream gingerbread biscuit sugar plum fruitcake. apple pie.
      </p>
    </div>
  );
}

export default CSSPropertiesPartial;
