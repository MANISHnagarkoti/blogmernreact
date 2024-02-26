import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 * {
        box-sizing: border-box;
        padding: 0px;
        margin: 0px;
        font-size: 95%;
        font-family: "Poppins", sans-serif;
    }
 
    body {
overflow-x: hidden;
}

.dot-bg{

  --dot-bg: white;
  --dot-color: #00000072;
  --dot-size:1.2px;
  --dot-space: 22px;
	background:
		linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		var(--dot-color)
}

.fade-last{
  background: rgb(255,255,255);
background: linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(110,40,40,0) 45%);
}

.box-shadow-css{

  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
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
