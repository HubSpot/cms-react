import '../../styles/CSSPropertiesPartial.css';

function CSSPropertiesPartial({
  wrapperPadding,
  wrapperBG,
  wrapperBorder,
  wrapperColor,
  sharedMargin = '2rem',
}) {
  return (
    <div
      className={`css-properties-partial`}
      style={{
        ['--wrapper-padding']: wrapperPadding,
        ['--wrapper-bg']: wrapperBG,
        ['--wrapper-border']: wrapperBorder,
        ['--wrapper-color']: wrapperColor,
        ['--shared-margin']: sharedMargin,
      }}
    >
      <h2>CSSPropertiesPartial</h2>
      <p>
        Muffin cake candy cookie fruitcake wafer gummies macaroon. sesame
        jujubes powder gummies cupcake macaroon brownie apple pie fruitcake.
        gingerbread chupa chups pudding apple pie pudding jujubes marshmallow
        powder sugar. toffee cake cupcake fruitcake icing topping halvah powder
        candy canes chocolate wafer powder danish powder. lollipop tiramisu
        brownie marshmallow donut muffin apple pie candy canes apple pie. oat
        cake.
      </p>
      <p>
        Gummies snaps muffin lemon drops bonbon croissant licorice toffee
        lollipop sugar plum. sugar plum oat cake cotton candy croissant candy
        jujubes ice cream gingerbread biscuit sugar plum fruitcake. apple pie.
      </p>
    </div>
  );
}

export default CSSPropertiesPartial;
