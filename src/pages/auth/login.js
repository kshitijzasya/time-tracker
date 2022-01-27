import React from "react";

export default () => {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <div className="columns-1">
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div className="columns-1">
          <label>Password</label>
          <input type="password" name="password" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-4">
        <button type="button" onClick={(e) => console.log("inside submit")}>
          Login
        </button>
      </div>
    </>
  );
};
