import styled from "styled-components";

const STitle = styled.span`
  font-size: 20px;
  margin-left: 20px;
`;

const Title: React.FC<{ title: string }> = ({ title }) => (
  <STitle>{title}</STitle>
);
export default Title;
