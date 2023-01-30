import { useState } from "react";
import styled from "styled-components/native";
import colors from "../../style/colors";
import { DarkModeAppliedText } from "../DarkModeAppliedStyledComponents";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-top-width: 2px;
  border-top-color: ${colors.lightGrey};
`;
const HeaderContainer = styled.View`
  flex-direction: row;
  background-color: ${colors.lightGrey};
`;
const SampleButton = styled.TouchableOpacity<{isSelected:boolean}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 2px 4px;
  background-color: ${({isSelected,theme:{backgroundColor}})=> isSelected ? backgroundColor : 'transparent'};
  border-radius: 10px;
`;
const SampleButtonText = styled(DarkModeAppliedText)<{isSelected:boolean}>`
  color: ${({isSelected,theme:{textColor}})=> isSelected ? textColor : "grey"};
`;

const DetailView = () => {

  const [selectedItem,setSelectedItem] = useState<string>("식단");

  return (
    <Container>
      <HeaderContainer>
        {["식단","운동","신체"].map(category=>
        <SampleButton
          key={category}
          isSelected={selectedItem === category}
          onPress={()=>setSelectedItem(category)}
        >
          <SampleButtonText isSelected={selectedItem === category}>
            {category}
          </SampleButtonText>
        </SampleButton>)}
      </HeaderContainer>
    </Container>
  );
};

export default DetailView;