import React from 'react'

export default function BlogLayout(props) {
  return (
    <>
      <section
        className={`blog-layout ${
          props.pathname == "info" &&
          "info_page"}`
        }
        style={{
          backgroundColor: `${props.bgColor && props.bgColor}`,
          color: `${props.pathname == "info" && 'white'}`
        }}
      >
      <div className="content">{props.children}</div>
      </section>
    </>
  );
}