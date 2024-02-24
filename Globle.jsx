import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 * {
        box-sizing: border-box;
        padding: 0px;
        margin: 0px;
        font-size: 95%;
    }
 
    body {
        overflow-x: hidden;
    }

    a{
      text-decoration: none;
    }

    *::-webkit-scrollbar {
  width:6px;
}
 
*::-webkit-scrollbar-track {
background:rgba(216, 216, 216, 0.322)

}
 
*::-webkit-scrollbar-thumb {
  background-color: rgb(175, 174, 174);
  border-radius: 10px;
}

 
`;

export default GlobalStyles;
