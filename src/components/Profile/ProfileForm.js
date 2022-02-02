import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";

import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const history = useHistory();
  
  const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const newPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZIFst83QpYvXsgNA8RinRkn-VTtoC8TU",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken: false
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      // assuming all is correct
      console.log(res);
      history.replace('/')
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="6" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
