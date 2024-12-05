import styled from "styled-components";

export const FilterButton = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const VillagerCard = styled.div`
  flex-shrink: 0;
  border-radius: 80px;
  border: 6px solid #4d3d35;
  background: #f6f2e5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: -10px;
`;

export const VillagerImage = styled.img`
  width: 201px;
  height: 198px;
  flex-shrink: 0;
  padding: 8px;
  border-radius: 56px;
  border: 6px solid #4d3d35;
  object-fit: contain;
  background-image: url("https://i.pinimg.com/736x/3d/2e/c3/3d2ec30036404eb943eefaa1e2a47409.jpg");
  background-repeat: no-repeat;
  background-size: 500px;
`;

export const ListBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  background-color: #f6f2e5;
  padding: 48px;
  border-radius: 100px;
  gap: 32px;
`;

export const IconDiv = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
