import Header from "./Header";
import Meta from './Meta'

export default function Layout(props) {
  return (
    <section
    className={`layout ${
      props.pathname == "info" &&
      "info_page"}`
    }
    style={{
      backgroundColor: `${props.bgColor && props.bgColor}`,
      color: `${props.pathname == "info" && 'white'}`
    }}
  >
    <Meta
      siteTitle={props.siteTitle}
      siteDescription={props.siteDescription}
    />
    <Header siteTitle={props.siteTitle} />
    <div className="content">{props.children}</div>
  </section>
  );
}