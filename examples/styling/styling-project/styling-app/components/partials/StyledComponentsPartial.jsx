import { styled } from 'styled-components';
import StyledComponentsRegistry from '../StyledComponentsRegistry'
import StyledComponentsIsland from '../StyledComponentsIsland';
import InteractiveStyledComponent from '../InteractiveStyledComponent?island';

const StyledContainer = styled.div`
  padding: 1rem;
  background-color: lightcoral;
  border: 2px dotted crimson;
  color: white;
`;

const StyledHeader = styled.h2`
  margin: 0;
  marginBottom: 1rem;
`;

function StyledComponentsPartial({
}) {
  return (
    <StyledComponentsRegistry>
      <StyledContainer>
        <StyledHeader>
          StyledComponentsPartial
        </StyledHeader>
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
        {/* We need to wrap `Island` in something like `StyledComponentsIsland`
            to capture styles from the island subtree */}
        <StyledComponentsIsland module={InteractiveStyledComponent} />
      </StyledContainer>
    </StyledComponentsRegistry>
  );
}

export default StyledComponentsPartial;
