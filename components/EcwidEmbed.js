import React, { useEffect, useRef, useState } from "react";
import { Grid, GridRow, Header, Container } from "semantic-ui-react";
sessionStorage.setItem('reloadCount', 1)

const EcwidEmbed = () => {
  const storeDiv = useRef(null);
  const scriptRef = useRef(null);
  const [scriptDoneSetting, setScriptDoneSetting] = useState(false)

  useEffect(() => {
    window.localStorage.setItem("show_ecwid_logs", "true");
    window.ecwid_script_defer = true;
    window.ecwid_dynamic_widgets = true;
    window.ec = window.ec || Object();
    window.ec.storefront = window.ec.storefront || Object();
    window.ec.enable_catalog_on_one_page = true;
    window._xnext_initialization_scripts = [
      {
        widgetType: "ProductBrowser",
        id: "my-store-36360190",
        arg: ["id=productBrowser", "views=grid(20,3)"],
      },
    ];

    var script = document.createElement("script");
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.src =
      "https://app.ecwid.com/script.js?36360190&data_platform=code&data_date=2022-02-09";
    script.defer = true;
    script.ref = scriptRef;

    if (!scriptRef?.current) {
      storeDiv?.current?.appendChild(script);
      setScriptDoneSetting(true)
    }
  }, []);

  return (
    <>
      <Container id="lesson-bundles" className="bundle-container">
        <Header>Lessons and Sheet Music</Header>
        <p>
          Get 5% off 5 lessons, 8% off 10 lessons, or 12% off 20 lessons by
          choosing one of the options below.
          <br />
          (The prices listed are for 5-lesson bundles, click on a box for more
          options)
        </p>
        <Grid>
          <GridRow columns={2}>
            <div className="booking-iframe-container">
              <div id="my-store-36360190" ref={storeDiv}></div>
            </div>
          </GridRow>
        </Grid>
      </Container>
    </>
  );
};

export default EcwidEmbed;
