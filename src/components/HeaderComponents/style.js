import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 10%;
    background-color: rgb(26, 148, 255);
    align-items: center;
    text-align: center;
    height: 70px;
`
export const WrapperTextHeader = styled.span`
    font-size: 45px;
    color: #fff;
    font-weight:bold;
    text-align: left;
    cursor: pointer;
    font-family: 'Times New Roman', Times, serif;
    @media (max-width: 480px){
        font-size: 30px;
    }
`
export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    cursor: pointer;
`
export const HindenHeader = styled.div`
    display: none;

    @media (min-width: 768px){
    display: block;
    }
`