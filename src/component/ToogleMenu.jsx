import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch} from "react-redux";
import { editBlogIdFunction } from "../redux/currentuser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function BasicMenu({ deleteBlog, editBlogId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const Navigator = useNavigate();

  const editButtonGoto = () => {
    dispatch(editBlogIdFunction(editBlogId));

    Navigator("/editBlog");
  };

  const theme = {
    // other stuff
    shape: {
      buttonBorderRadius: "20px",
      paperBorderRadius: "4px",
      // other shape properties...
    },
    // other stuff
  };

  return (
    <div>
      <ion-icon
        name="ellipsis-vertical-outline"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="cursor-pointer"
        style={{ fontSize: "20px", cursor: "pointer" }}
      ></ion-icon>

      {/* <ThemeProvider theme={theme}> */}

      <CustomMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        disableScrollLock={true}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ borderRadius: "50%" }}
      >
        <MenuItem className="items-center flex" onClick={() => deleteBlog()}>
          <ion-icon name="trash-outline"></ion-icon>{" "}
          <div className="  px-3 py-1"> Delete </div>
        </MenuItem>

        <MenuItem className="items-center flex" onClick={editButtonGoto}>
          <ion-icon name="create-outline"></ion-icon>{" "}
          <div className=" px-3 py-1"> Edit </div>
        </MenuItem>
      </CustomMenu>
      {/* </ThemeProvider> */}
    </div>
  );
}

const CustomMenu = styled(Menu)`
  color: red;

  .MuiPaper-root {
    border-radius: 20px;
  }
`;
