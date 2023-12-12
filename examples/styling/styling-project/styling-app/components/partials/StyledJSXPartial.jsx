import StyledJSXRegistry from '../StyledJSXRegistry';
import StyledJSXIsland from '../StyledJSXIsland';
import InteractiveStyledJSXComponent from '../InteractiveStyledJSXComponent?island'

function StyledJSXPartial() {
  return (
    <StyledJSXRegistry>
      <div className="root">
        <h2>
          StyledJSXPartial
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
        <p>
          Gummies snaps muffin lemon drops bonbon croissant licorice toffee
          lollipop sugar plum. sugar plum oat cake cotton candy croissant candy
          jujubes ice cream gingerbread biscuit sugar plum fruitcake. apple pie.
        </p>
        <style jsx>
          {`
            .root {
              padding: 1rem;
              background-color: lightcoral;
              border: 2px dotted crimson;
              color: white;
            }

            h2 {
              margin: 0;
              marginBottom: 1rem;
            }

            p:last {
              margin-bottom: 0;
            }
          `}
        </style>
        {/* We need to wrap `Island` in something like `StyledComponentsIsland`
            to capture styles from the island subtree */}
        <StyledJSXIsland module={InteractiveStyledJSXComponent} />
      </div>
    </StyledJSXRegistry>
  );
}

export default StyledJSXPartial;
