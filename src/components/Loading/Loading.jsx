import React from "react";

import style from "./Loading.module.css"

export default function Loading() {
  return (
    <>
      <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span class={style.loader} ></span>
      </div>
      
    </>
  );
}
