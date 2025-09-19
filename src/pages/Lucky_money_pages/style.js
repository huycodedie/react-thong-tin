import styled from "styled-components";

// export const Luckymoney = styled.div`
//      width: 800px;
//      height: 500px;
//      border: 10px solid #ccc;
//      display: flex;
//      justify-content: center;
//      align-items: center;
//      background-color: #fff;

//      @media (max-width: 480px){
//           height: 700px;
//      }
// `

// export const Container = styled.div`
//      position: relative;
//      z-index: 1;
//      max-width: 100%;
//      width: 100%;
//      display: grid;
//      grid-template-columns: repeat(3, 1fr); /* 3 cột bằng nhau */
//      gap: 10px;
//      padding: 65px 20px 0px 20px;
//      @media (max-width: 480px){
//           position: relative;
//           z-index: 1;
//           max-width: 100%;
//           width: 100%;
//           display: grid;
//           grid-template-columns: repeat(2, 1fr); /* 3 cột bằng nhau */
//           gap: 10px;
//           padding: 60px 5px 0px 5px;
//     }
     
// `
export const Cart = styled.div`
      background: rgba(255 255 255 / 0.25);
      border-radius: 16px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
      display: flex;
      padding: 12px;

     &:hover{
          transform: translateY(-8px);
          box-shadow: 0 20px 30px rgba(255, 167, 38, 0.7);
          background: rgba(255 255 255 / 0.45);
     }
`
export const Image = styled.div`
      width: 78px;
      height: 155px;
      display: flex;
      border-radius: 12px;
      object-fit: contain;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      align-items: center;
      justify-content: center;
`
export const Left = styled.div`
  
`
export const Right = styled.div`
     text-align: center;
     height: 130px;
     padding: 12px 0px 12px 12px;
`