import classes from '../../styles/CSSModulesPartial.module.css';

function CSSModulesPartial({ extraClassNames = '' }) {
  return (
    <div className={`${classes.wrapper} ${extraClassNames}`}>
      <h2>CSSModulesPartial</h2>
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

export default CSSModulesPartial;
